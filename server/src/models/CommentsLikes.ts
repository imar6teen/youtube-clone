import mongoose from "mongoose";

const CommentsLikesSchema = new mongoose.Schema({
  comments_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
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

export default mongoose.model("CommentsLikes", CommentsLikesSchema);
