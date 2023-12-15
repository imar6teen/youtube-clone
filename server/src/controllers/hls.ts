import path from "path";
import logger from "../util/winstonLog";
import fs from "fs";
import { LOCAL_STORAGE } from "../config/app";

async function exists(req: Request, cb: any) {
  try {
    const extSplit = req.url.split(".");
    const splitUrl = extSplit[0].split("/").slice(1);
    // this is to seperate between hls server and http server
    if (splitUrl[0] !== "streams") return cb(null, true);
    if (extSplit[1] !== "m3u8" && extSplit[1] !== "ts") return cb(null, true);

    // first index is users_id, second one is thumbnailName for videoname
    const videoPath = path.join(
      LOCAL_STORAGE,
      "videos",
      splitUrl[1],
      splitUrl[2],
      splitUrl[3]
    );

    logger(module).info({ name: "HLSExists", message: videoPath });
    const isExist = fs.existsSync(`${videoPath}.${extSplit[1]}`);

    if (!isExist) return cb(null, false);

    cb(null, true);
  } catch (err) {
    const error = err as Error;
    logger(module).info({ message: error.message, name: error.name });
    cb(new Error("Something Wrong!"));
  }
}

async function getManifestStream(req: Request, cb: any) {
  try {
    const extSplit = req.url.split(".");
    const splitUrl = extSplit[0].split("/").slice(1);

    const videoPath = path.join(
      LOCAL_STORAGE,
      "videos",
      splitUrl[1],
      splitUrl[2],
      splitUrl[3]
    );

    logger(module).info({ name: "ManifestHLSInfo", message: videoPath });
    const stream = fs.createReadStream(videoPath + "." + extSplit[1]);
    cb(null, stream);
  } catch (err) {
    const error = err as Error;
    logger(module).error({ message: error.message, name: error.name });
    cb(new Error("Something Wrong!"), null);
  }
}

async function getSegmentStream(req: Request, cb: any) {
  try {
    const extSplit = req.url.split(".");
    const splitUrl = extSplit[0].split("/").slice(1);

    const videoPath = path.join(
      LOCAL_STORAGE,
      "videos",
      splitUrl[1],
      splitUrl[2],
      splitUrl[3]
    );
    logger(module).info({ name: "SegmentHLSInfo", message: videoPath });
    const stream = fs.createReadStream(videoPath + "." + extSplit[1]);
    cb(null, stream);
  } catch (err) {
    console.error(err);
    const error = err as Error;
    logger(module).info({ message: error.message, name: error.name });
    cb(new Error("Something Wrong!"), null);
  }
}

export default { exists, getManifestStream, getSegmentStream };
