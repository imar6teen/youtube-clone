import mongoose from "mongoose";
import { Models } from "../types";

const CommentsSchema = new mongoose.Schema<Models.IComment>({
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
  // if not exist, that means the comment is root
  // reply_to is tag for the comment that replied
  reply_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
    // required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CommentsLikes",
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

export default mongoose.model<Models.IComment>("Comments", CommentsSchema);
