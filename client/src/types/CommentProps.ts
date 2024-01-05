namespace Comment {
  export type Data = {
    pictureUrl: string;
    username: string;
    text: string;
    likesCount: number;
  };

  export type Props = Data & {
    replies?: [Data];
  };
}

export default Comment;
