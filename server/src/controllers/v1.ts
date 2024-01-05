import { Request, request } from "express";
import { ExtendsResponse, UpdateMetadataVideo } from "../types";
import tmp from "tmp";
import busboy from "busboy";
import logger from "../util/winstonLog";
import path from "path";
import { randomFillSync } from "crypto";
import fs from "fs";
import handleError, { HTTPError } from "../util/handleError";
import { Videos, VideosLikes, Comments } from "../models";
import Ffmpeg from "../util/FfmpegPromisify";
import HttpStatusCode from "../constants/StatusCode";
import { LOCAL_STORAGE } from "../config/app";
import mongoose, { Types } from "mongoose";

const removeDir = (videoPath: string, imagePath: string) => {
  fs.rmSync(path.join(videoPath), { recursive: true, force: true });
  fs.rmSync(path.join(imagePath), { recursive: true, force: true });
};

export const profile = (req: Request, res: ExtendsResponse) => {
  res.status(HttpStatusCode.OK_200).json(res.locals.user);
};

export const uploadVideo = (req: Request, res: ExtendsResponse) => {
  // wait videos uploaded 100% using busboy
  // save to temporary file and use it on ffmpeg
  // if it fails then failed
  // create videos row or docs and get the id
  // get the duration using ffmpeg
  // get image using ffmpeg
  // make it 144p 240p
  // remove temporary file
  // send the id video for updating metadata or open video
  let videoPath = "";
  let imagePath = "";
  try {
    //   this must be change when integrate with google cloud storage
    const bb = busboy({ headers: req.headers });

    const { user } = res.locals;
    let randomName = randomFillSync(Buffer.alloc(16)).toString("hex");
    videoPath = path.join(LOCAL_STORAGE, "videos", user.id, randomName);
    imagePath = path.join(LOCAL_STORAGE, "thumbnails", user.id, randomName);
    let videoName = `${randomName}.m3u8`;
    let imageName = `${randomName}.jpg`;
    let tempFile: tmp.FileResult;

    fs.mkdirSync(videoPath);
    fs.mkdirSync(imagePath);

    bb.on("file", (name, file, info) => {
      const { filename, encoding, mimeType } = info;
      logger(module).info(
        `File [${name}]: filename: ${filename}, encoding: ${encoding}, mimeType: ${mimeType}`
      );

      const { ext } = path.parse(filename);
      tempFile = tmp.fileSync({ postfix: ext });
      file.pipe(fs.createWriteStream(tempFile.name));
    });

    bb.on("close", async () => {
      const saveVideoTo = path.join(videoPath, videoName);

      await Ffmpeg.convertAndSaveFile(tempFile.name, saveVideoTo);

      const { format } = await Ffmpeg.probe(tempFile.name);

      await Ffmpeg.takeScreenShot(saveVideoTo, imagePath, format);

      tempFile.removeCallback();

      const video = new Videos({
        users_id: res.locals.user.id,
        name: videoName,
        duration: format.duration,
        thumbnail: imageName,
      });
      await video.save();

      res
        .setHeader("Connection", "close")
        .status(HttpStatusCode.CREATED_201)
        .json({
          msg: "File Uploaded Successfully",
          video_id: `${video._id}-${res.locals.user.id}-${
            videoName.split(".")[0]
          }`,
          thumbnail: imageName,
        });
    });
    req.pipe(bb);
  } catch (err) {
    console.log(err);
    removeDir(videoPath, imagePath);
    logger(module).info(err);
    handleError(err as Error, res);
  }
};

export const updateMetadataVideo = async (
  req: Request<any, any, UpdateMetadataVideo>,
  res: ExtendsResponse
) => {
  try {
    const bb = busboy({ headers: req.headers });
    const { user } = res.locals;
    let tempFile: tmp.FileResult | null = null;

    bb.on("field", (name, value) => {
      req.body[name] = value;
    });

    bb.on("file", async (name, file, info) => {
      const { filename, encoding, mimeType } = info;
      const { ext } = path.parse(filename);

      logger(module).info(
        `File [${name}]: filename: ${filename}, encoding: ${encoding}, mimeType: ${mimeType}`
      );

      tempFile = tmp.fileSync({ postfix: ext });
      file.pipe(fs.createWriteStream(tempFile.name));
    });

    bb.on("finish", async () => {
      const { id, description, title } = req.body;
      const videoDb = await Videos.findOne({
        _id: id,
        users_id: user.id,
      });

      if (tempFile !== null) {
        if (!videoDb) {
          tempFile.removeCallback();
          throw new HTTPError({
            message: "Video not found",
            name: "VideoNotFound",
            status: HttpStatusCode.BAD_REQUEST_400,
          });
        }

        const parseThumbnail = path.parse(videoDb?.thumbnail as string);
        const thumbnailPath = path.join(
          LOCAL_STORAGE,
          "thumbnails",
          user.id,
          parseThumbnail.name,
          parseThumbnail.base
        );

        fs.rmSync(thumbnailPath, { force: true });

        const readTemp = fs.createReadStream(tempFile.name, { flags: "r" });
        const destination = fs.createWriteStream(thumbnailPath, {
          flags: "w+",
        });
        readTemp.pipe(destination).on("finish", async () => {
          tempFile?.removeCallback();

          await Videos.updateOne(
            { _id: id },
            {
              description: description || videoDb.description,
              name: title || videoDb.name,
            }
          );

          res.status(HttpStatusCode.ACCEPTED_202).json({
            msg: "Success",
          });
        });
      } else {
        if (!videoDb) {
          throw new HTTPError({
            message: "Video not found",
            name: "VideoNotFound",
            status: HttpStatusCode.BAD_REQUEST_400,
          });
        }

        await Videos.updateOne(
          { _id: id },
          {
            description: description || videoDb.description,
            name: title || videoDb.name,
            updatedAt: Date.now(),
          }
        );

        res.status(HttpStatusCode.ACCEPTED_202).json({
          msg: "Success",
        });
      }
    });
    req.pipe(bb);
  } catch (err) {
    logger(module).info(err);
    handleError(err as Error, res);
  }
};

interface GetVideosParams {
  limit: string | undefined;
  offset: string | undefined;
}

export const getVideos = async (
  req: Request<GetVideosParams>,
  res: ExtendsResponse
) => {
  try {
    let { limit, offset } = req.params;
    limit = limit || undefined;
    offset = offset || undefined;

    if (!limit || !offset)
      throw new HTTPError({
        message: "Limit and Offset not set",
        name: "OffsetLimitNotFound",
        status: HttpStatusCode.BAD_REQUEST_400,
      });

    const videos = await Videos.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "users_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          videos_id: "$_id",
          "users_id._id": "$user._id",
          "users_id.name": "$user.name",
          "users_id.image": "$user.image",
          name: "$name",
          duration: "$duration",
          thumbnail: "$thumbnail",
          likes: { $size: "$likes" },
          createdAt: "$createdAt",
        },
      },
    ])
      .skip(parseInt(offset) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(HttpStatusCode.OK_200).json({
      videos,
    });
  } catch (err) {
    console.error(err);
    logger(module).info(err);
    handleError(err as Error, res);
  }
};

type ClientsConnect = {
  [key: string]: any[];
};
// {videoId : [all clients]}
const clientsConnect: ClientsConnect = {};

export const getMetadataVideo = async (req: Request, res: ExtendsResponse) => {
  const { videoId } = req.params;

  const metadata = await Videos.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "videoslikes",
        localField: "_id",
        foreignField: "videos_id",
        as: "likes",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "users_id",
        foreignField: "_id",
        as: "user",
      },
    },
    // {
    //   $lookup: {
    //     from: "comments",
    //     localField: "_id",
    //     foreignField: "videos_id",
    //     as: "comments",
    //     pipeline: [
    //       {
    //         $lookup: {
    //           from: "commentslikes",
    //           localField: "_id",
    //           foreignField: "comments_id",
    //           as: "likes",
    //         },
    //       },
    //     ],
    //   },
    // },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "videos_id",
        as: "comments",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        videos_id: "$_id",
        name: "$name",
        duration: "$duration",
        thumbnail: "$thumbnail",
        likes: {
          $size: {
            $filter: {
              input: "$likes",
              as: "likes",
              cond: { $eq: ["$$likes.is_like", true] },
            },
          },
        },
        // dislikes: {
        //   $size: {
        //     $filter: {
        //       input: "$likes",
        //       as: "dislikes",
        //       cond: { $eq: ["$$dislikes.is_like", false] },
        //     },
        //   },
        // },
        comments: { $size: "$comments" },
        createdAt: "$createdAt",
        updatedAt: "$updatedAt",
        description: "$description",
        "user._id": "$user._id",
        "user.name": "$user.name",
        "user.image": "$user.image",
        "user.email": "$user.email",
      },
    },
  ]);

  if (!clientsConnect[videoId]) clientsConnect[videoId] = [res];
  else clientsConnect[videoId].push(res);

  res.send(metadata);
};

export const likeVideo = async (req: Request, res: ExtendsResponse) => {
  try {
    const { user } = res.locals;
    const { isLike, videoId } = req.body;
    const videoLikes = await VideosLikes.findOne({
      videos_id: videoId,
      users_id: user.id,
    });

    if (videoLikes === null) {
      await new VideosLikes({
        videos_id: videoId,
        users_id: user.id,
        is_like: isLike,
      }).save();
      res.status(HttpStatusCode.CREATED_201).json({ msg: "success" });
    } else if (isLike !== videoLikes.is_like) {
      await VideosLikes.updateOne(
        {
          _id: videoLikes?._id,
        },
        { is_like: isLike }
      );
      res.status(HttpStatusCode.ACCEPTED_202).json({ msg: "success" });
    } else if (isLike === videoLikes.is_like) {
      await VideosLikes.deleteOne({
        _id: videoLikes?._id,
      });
      res
        .status(HttpStatusCode.RESET_CONTENT_205)
        .json({ msg: "deleted like" });
    }
  } catch (err) {
    logger(module).error({
      name: (err as Error).name,
      msg: (err as Error).message,
    });
    handleError(err as Error, res);
  }
};

export const sseCommentVideo = async (req: Request, res: ExtendsResponse) => {};

export const addComment = async (req: Request, res: ExtendsResponse) => {
  try {
    const { user } = res.locals;
    const { comment, videoId } = req.body;
    await new Comments({
      users_id: user.id,
      videos_id: videoId,
      comment: comment,
    }).save();
    res.status(HttpStatusCode.CREATED_201).json({ msg: "success" });
  } catch (err) {
    logger(module).error({
      name: (err as Error).name,
      msg: (err as Error).message,
    });
    handleError(err as Error, res);
  }
};

export const likeComment = async (req: Request, res: ExtendsResponse) => {};
