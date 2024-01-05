import "../assets/components/comment.css";
import { useState } from "react";
import { Comment as C } from "../types";

function Comment({ likesCount, pictureUrl, text, username, replies }: C.Props) {
  const [isRepliesOpen, setIsRepliesOpen] = useState<boolean>(false);
  const [isReplyInputOpen, setIsReplyInputOpen] = useState<boolean>(false);

  return (
    <div className="comment">
      <div className="comment__picture">
        <img src={pictureUrl} alt="pic" />
      </div>
      <div className="comment__comment">
        <div className="comment__comment__username">
          <p>@imar6teen</p>
          <p>2 years Ago</p>
        </div>
        <div className="comment__comment__text">
          <p>{text}</p>
        </div>
        <div className="comment__comment__respond">
          <button className="comment__comment__respond__like"></button>
          <button className="comment__comment__respond__dislike"></button>
          <button
            onClick={() => setIsReplyInputOpen(!isReplyInputOpen)}
            className="comment__comment__respond__reply"
          >
            Reply
          </button>
        </div>
        {isReplyInputOpen && (
          <div className="comment__comment__reply">
            <input type="text" />
          </div>
        )}
        {replies && (
          <div className="comment__comment__replies">
            <button onClick={() => setIsRepliesOpen(!isRepliesOpen)}>
              26 Replies
            </button>
            {isRepliesOpen &&
              replies.map((v, idx) => (
                <Comment
                  likesCount={v.likesCount}
                  pictureUrl={v.pictureUrl}
                  text={v.text}
                  username={v.username}
                  key={idx}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
