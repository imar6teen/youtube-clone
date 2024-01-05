import { Schema } from "mongoose";

namespace Models {
  export interface IUsers {
    name: string;
    email: string;
    subscribers: Schema.Types.ObjectId;
    image: string;
    videos: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IVideos {
    users_id: Schema.Types.ObjectId;
    name: String;
    duration: number;
    description?: String;
    thumbnail?: String;
    likes: Schema.Types.ObjectId[];
    comments: Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IVideosLikes {
    videos_id: Schema.Types.ObjectId;
    users_id: Schema.Types.ObjectId;
    is_like: Boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IComment {
    videos_id: Schema.Types.ObjectId;
    users_id: Schema.Types.ObjectId;
    reply_to: Schema.Types.ObjectId;
    comment: String;
    likes: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }
}

export default Models;
