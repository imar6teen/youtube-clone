import { useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import { VITE_BACKEND_URL } from "../config/app";

type ComemntsProps = {
  videoId: string;
};

type CommentResponse = {
  createdAt: string;
  pictureUrl: string;
  text: string;
  username: string;
};

function Comments({ videoId }: ComemntsProps) {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const listening = useRef<boolean>(false);

  useEffect(() => {
    if (!listening.current) {
      const events = new EventSource(
        `${VITE_BACKEND_URL}/api/v1/comment/${videoId}`
      );
      // using eventSource, we need to work without abstraction a bit. addEventListener we need to match it within the server.
      // See on server after res.writeHead where res.write need to write "event: {name of the listener}"
      // for this case the event called "data" and after that don't forget to add \n
      // after \n this is where the data comes in. we need to write as "data: {data in stringify}"
      //!NOTE: \n IS IMPORTANT, CAREFUL!
      events.addEventListener("data", (e) => {
        const parsedData: CommentResponse[] = JSON.parse(e.data);
        setComments(parsedData);
      });
    }
    listening.current = true;
  }, [comments]);
  return (
    <div className="watch_comments">
      {/* <Comment
        createdAt="2024-01-04T16:00:00.000+00:00"
        pictureUrl="https://lh3.googleusercontent.com/a/ACg8ocKu2j17BLnYPdzPue9j9GTe3MWPg0wA9MPpfEK82oha=s96-c"
        text="Nice VIdeo"
        username="@imar6teen"
        key={1}
      />
      <Comment
        createdAt="2024-01-04T16:00:00.000+00:00"
        pictureUrl="https://lh3.googleusercontent.com/a/ACg8ocKu2j17BLnYPdzPue9j9GTe3MWPg0wA9MPpfEK82oha=s96-c"
        text="Nice VIdeo"
        username="@imar6teen"
        key={2}
      /> */}
      {comments.map((val, idx) => (
        <Comment
          createdAt={val.createdAt}
          key={idx}
          pictureUrl={val.pictureUrl}
          text={val.text}
          username={val.username}
        />
      ))}
    </div>
  );
}

export default Comments;
