import { Request } from "express";
import { ExtendsResponse } from "../types";
import tmp from "tmp";
import busboy from "busboy";
import logger from "../util/winstonLog";
import path from "path";
import { randomFillSync } from "crypto";
import fs from "fs";
import handleError from "../util/handleError";
import Ffmpeg from "fluent-ffmpeg";

export const profile = (req: Request, res: ExtendsResponse) => {
  res.status(200).json(res.locals.user);
};

export const uploadVideo = (req: Request, res: ExtendsResponse) => {
  // wait videos uploaded 100% using busboy
  // save to temporary file and use it on ffmpeg
  // if it fails then failed
  // create videos row or docs and get the id
  // get the duration using ffmpeg
  // make it 144p 240p
  // remove temporary file
  // send the id video for updating metadata or open video
  try {
    //   this must be change when integrate with google cloud storage
    const bb = busboy({ headers: req.headers });

    let videoName = "";
    let tempFile: tmp.FileResult;
    bb.on("file", (name, file, info) => {
      const { filename, encoding, mimeType } = info;
      logger(module).info(
        `File [${name}]: filename: ${filename}, encoding: ${encoding}, mimeType: ${mimeType}`
      );

      const { ext } = path.parse(filename);
      videoName = `${randomFillSync(Buffer.alloc(16)).toString("hex")}${ext}`;

      tempFile = tmp.fileSync({ postfix: ext });
      file.pipe(fs.createWriteStream(tempFile.name));
    });

    bb.on("close", () => {
      const saveTo = path.join(process.cwd(), "storages", "videos", videoName);
      Ffmpeg.ffprobe(tempFile.name, (err, data) => {
        if (err) throw new Error(err);
        console.log(data.format);
        tempFile.removeCallback();
      });
      res.setHeader("Connection", "close").status(200).json({
        msg: "File Uploaded Successfully",
        // link:
        // id:
      });
    });
    req.pipe(bb);
  } catch (err) {
    logger(module).info(err);
    handleError(err as Error, res);
  }
};

export const updateMetadataVideo = (req: Request, res: ExtendsResponse) => {};
