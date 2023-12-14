import express from "express";
import {
  getVideos,
  profile,
  updateMetadataVideo,
  uploadVideo,
} from "../controllers/v1";
import decodeAccessToken from "../middlewares/decodeAccessToken";

const router = express.Router();

// get videos
router.get("/video/:limit/:offset", getVideos);

router.use(decodeAccessToken);

router.get("/profile", profile);

router
  .route("/video")
  // upload video using busboy
  // it must return id and the link
  // where id for send metadata
  // where link for user to share it
  .post(uploadVideo)
  // update metadata of a video
  .put(updateMetadataVideo);

export default router;
