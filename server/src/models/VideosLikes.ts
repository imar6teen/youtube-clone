import mongoose from "mongoose";
import { Models } from "../types";

const VideosLikesSchema = new mongoose.Schema<Models.IVideosLikes>({
  videos_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Videos",
    required: true,
  },
  users_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  is_like: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<Models.IVideosLikes>(
  "VideosLikes",
  VideosLikesSchema
);
