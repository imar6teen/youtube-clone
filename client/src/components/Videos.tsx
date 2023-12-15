import { Link } from "react-router-dom";
import "../assets/components/videos.css";
import { VITE_BACKEND_URL } from "../config/app";
// this thumbnail and profilePicture for example only. it constant
// import thumbnail from "../assets/image/thumbnailex1.jpg";
// import profilePicture from "../assets/image/pfp.jpg";
import { VideosFormat } from "../types";
import humanizeDuration from "../utils/humanizeDuration";
import timeSince from "../utils/timeSince";

interface Props {
  prop: VideosFormat;
}

function Videos(props: Props) {
  const { createdAt, duration, likes, name, thumbnail, users_id, videos_id } =
    props.prop;
  const thumbnailName = thumbnail.split(".")[0];
  return (
    <Link
      to={`/watch/${videos_id}-${users_id._id}-${thumbnailName}`}
      className="video"
    >
      <div className="video__thumbnail">
        <img
          src={`${VITE_BACKEND_URL}/static/${users_id._id}/${thumbnailName}/${thumbnail}`}
          alt="Thumbnail"
        />
        <div className="video__thumbnail__time">
          <div className="video__thumbnail__time__time">
            <p>{humanizeDuration(duration)}</p>
          </div>
        </div>
      </div>
      <div className="video__desc">
        <div className="video__desc__profile_picture">
          <img src={users_id.image} alt="pfp" />
        </div>
        <div className="video__desc__description">
          <div className="video__desc__description__video_name">
            <p>{name}</p>
          </div>
          <div className="video__desc__description__channel_status">
            <p>
              {users_id.name} • {likes} likes • {timeSince(new Date(createdAt))}{" "}
              ago
            </p>
          </div>
        </div>
        <div className="video__desc__triple_dots">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M12,16.5c0.83,0,1.5,0.67,1.5,1.5s-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5S11.17,16.5,12,16.5z M10.5,12 c0,0.83,0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5s-0.67-1.5-1.5-1.5S10.5,11.17,10.5,12z M10.5,6c0,0.83,0.67,1.5,1.5,1.5 s1.5-0.67,1.5-1.5S12.83,4.5,12,4.5S10.5,5.17,10.5,6z"></path>
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default Videos;
