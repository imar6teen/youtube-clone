import "../assets/components/comment.css";
import { Comment as C } from "../types";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

function Comment({ pictureUrl, text, username, createdAt }: C.Props) {
  const timeAgo = new TimeAgo("en-US");

  return (
    <div className="comment">
      <div className="comment__picture">
        <img src={pictureUrl} alt="pic" />
      </div>
      <div className="comment__comment">
        <div className="comment__comment__username">
          <p>{username}</p>
          <p>{timeAgo.format(Date.parse(createdAt))}</p>
        </div>
        <div className="comment__comment__text">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
