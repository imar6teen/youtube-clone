interface User {
  _id: string;
  name: string;
  image: string;
}

export interface VideosFormat {
  videos_id: string;
  users_id: User;
  name: string;
  duration: number;
  thumbnail: string;
  likes: number;
  createdAt: string;
}

export interface GetVideosResponse {
  videos: VideosFormat[];
}
