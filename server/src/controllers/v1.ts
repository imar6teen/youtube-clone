import { Request } from "express";
import { ExtendsResponse } from "../types";
import tmp from "tmp";
import busboy from "busboy";
import logger from "../util/winstonLog";
import path from "path";
import { randomFillSync } from "crypto";
import fs from "fs";
import handleError, { HTTPError } from "../util/handleError";
import { Videos } from "../models";
import Ffmpeg from "../util/FfmpegPromisify";
import HttpStatusCode from "../constants/StatusCode";
import { LOCAL_STORAGE } from "../config/app";

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
      tempFile.removeCallback();

      const { format } = await Ffmpeg.probe(saveVideoTo);

      await Ffmpeg.takeScreenShot(saveVideoTo, imagePath, format);

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
          video_id: video._id,
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

interface MetadataVideo {
  [key: string]: any;
  title: string;
  description: string;
  id: string;
  isFileExist?: boolean;
}

export const updateMetadataVideo = async (
  req: Request<any, any, MetadataVideo>,
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
          }
        );
      }
    });
    req.pipe(bb);
  } catch (err) {
    logger(module).info(err);
    handleError(err as Error, res);
  }
};
