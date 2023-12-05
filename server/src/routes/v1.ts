import express from "express";
import { profile, uploadVideo } from "../controllers/v1";
import decodeAccessToken from "../middlewares/decodeAccessToken";
import busboy from "busboy";
import logger from "../util/winstonLog";
import { randomFillSync } from "crypto";
import path from "path";
import fs from "fs";
import handleError from "../util/handleError";
import mongoose from "mongoose";
import ExtendsResponse from "../types/ExtendsResponse";

const router = express.Router();

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
  .put((req, res) => {});

export default router;
