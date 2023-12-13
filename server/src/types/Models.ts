import { Schema } from "mongoose";

namespace Models {
  export interface IUsers {
    email: string;
    subscribers: Schema.Types.ObjectId;
    videos: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }
}

export default Models;
