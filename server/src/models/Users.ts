import mongoose from "mongoose";
import { Models } from "../types";

const UsersSchema = new mongoose.Schema<Models.IUsers>({
  // removed username. Get username from google API instead, no need to save it
  // there is an email that can difference users
  // username: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  subscribers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscriptions",
    },
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Videos",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<Models.IUsers>("Users", UsersSchema);
