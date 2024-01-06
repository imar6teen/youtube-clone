import express from "express";
import {
  addComment,
  getMetadataVideo,
  getVideos,
  likeVideo,
  profile,
  sseCommentVideo,
  updateMetadataVideo,
  uploadVideo,
} from "../controllers/v1";
import decodeAccessToken from "../middlewares/decodeAccessToken";

const router = express.Router();

// get videos
router.get("/video/:limit/:offset", getVideos);

router.get("/metadata-video/:videoId", getMetadataVideo);

router.get("/comment/:videoId", sseCommentVideo);

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

router.put("/like", likeVideo);

router.post("/comment", addComment);

export default router;
