namespace Comment {
  export type Data = {
    pictureUrl: string;
    username: string;
    text: string;
    createdAt: string;
  };

  export type Props = Data;
  // export type Props = Data & {
  //   replies?: [Data];
  // };
}

export default Comment;
