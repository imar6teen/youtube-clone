import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema({
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
  reply_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
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

export default mongoose.model("Comments", CommentsSchema);
