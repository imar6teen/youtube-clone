import { useState } from "react";
import "../assets/components/commentInput.css";
import { appStates } from "../hooks";
import axios from "axios";
import { VITE_BACKEND_URL } from "../config/app";

type CommentInputProps = {
  videoId: string;
};

function CommentInput({ videoId }: CommentInputProps) {
  const [isAppear, setIsAppear] = useState<boolean>(false);
  const [commentVal, setCommentVal] = useState<string>("");
  const [states, _] = appStates.useContextStates();

  async function addComment() {
    try {
      if (commentVal === "") return;
      await axios.post(
        `${VITE_BACKEND_URL}/api/v1/comment`,
        {
          comment: commentVal,
          videoId: videoId,
        },
        {
          withCredentials: true,
        }
      );

      alert("Comment added");
    } catch (err) {
      alert("Comment Failed to Add");
    } finally {
      setCommentVal("");
      setIsAppear(false);
    }
  }

  function cancelComment() {
    setCommentVal("");
    setIsAppear(false);
  }

  return (
    <div id="comment_input">
      <div id="comment_input__image">
        <img src={states.Auth.pictureUrl} alt="picture" />
      </div>
      <div id="comment_input__input">
        <div id="comment_input__input__input">
          <input
            type="text"
            id="comment_input__input__input__input"
            placeholder="Comment"
            value={commentVal}
            onChange={(e) => setCommentVal(e.target.value)}
            onFocus={() => setIsAppear(true)}
          />
        </div>
        {isAppear && (
          <div id="comment_input__input__submit">
            <button
              id="comment_input__input__submit__cancel"
              onClick={cancelComment}
            >
              Cancel
            </button>
            <button
              id="comment_input__input__submit__comment"
              onClick={addComment}
              disabled={commentVal == "" ? true : false}
            >
              Comment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentInput;
