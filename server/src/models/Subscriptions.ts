import mongoose from "mongoose";

const SubscriptionsSchema = new mongoose.Schema({
  users_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  subscribe_to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
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

export default mongoose.model("Subscriptions", SubscriptionsSchema);
