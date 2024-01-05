import "../assets/components/watchDescription.css";
import likeSvg from "../assets/image/likecom.svg";
import dislikeSvg from "../assets/image/dislikecom.svg";
import shareSvg from "../assets/image/sharecom.svg";
import CommentInput from "../components/CommentInput";
import statusCode from "../constants/StatusCode";
import axios, { AxiosResponse } from "axios";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useEffect, useState } from "react";
import { VITE_BACKEND_URL, VITE_NODE_ENV } from "../config/app";
import { appStates } from "../hooks";
import Comment from "../components/Comment";

type WatchDescriptionProps = {
  videoId: string;
};

type MetadataUser = {
  _id: string;
  email: string;
  name: string;
  image: string;
};

type MetadataVideo = {
  _id: string;
  videos_id: string;
  name: string;
  duration: number;
  thumbnail: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  user: MetadataUser;
  comments: number;
};

TimeAgo.addDefaultLocale(en);

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function WatchDescription({ videoId }: WatchDescriptionProps) {
  const [states, __] = appStates.useContextStates();
  const [metadataVideo, setMetadataVideo] = useState<MetadataVideo | null>(
    null
  );

  const timeAgo = new TimeAgo("en-US");

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    axios
      .get<MetadataVideo, AxiosResponse<MetadataVideo[], any>, any>(
        `${VITE_BACKEND_URL}/api/v1/metadata-video/${videoId}`,
        { signal }
      )
      .then((res) => {
        setMetadataVideo(res.data[0]);
      })
      .catch((err) => {
        if (VITE_NODE_ENV !== "production") console.error(err);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  async function likeVideo() {
    const { status } = await axios.put(
      `${VITE_BACKEND_URL}/api/v1/like`,
      {
        isLike: true,
        videoId,
      },
      { withCredentials: true }
    );
    if (status === statusCode.CREATED_201 || status === statusCode.ACCEPTED_202)
      setMetadataVideo((prevState) => {
        if (prevState === null) return null;
        return {
          ...prevState,
          likes: prevState.likes + 1,
        };
      });
    else if (status === statusCode.RESET_CONTENT_205)
      setMetadataVideo((prevState) => {
        if (prevState === null) return null;
        return {
          ...prevState,
          likes: prevState.likes - 1,
        };
      });
  }
  async function dislikeVideo() {
    const { status } = await axios.put(
      `${VITE_BACKEND_URL}/api/v1/like`,
      {
        isLike: false,
        videoId,
      },
      { withCredentials: true }
    );
    if (status === statusCode.ACCEPTED_202) {
      setMetadataVideo((prevState) => {
        if (prevState === null) return null;
        return {
          ...prevState,
          likes: prevState.likes - 1,
        };
      });
    }
  }

  if (metadataVideo === null) return;
  return (
    <>
      <div id="watch__description">
        <div id="watch__description__title">
          <h1>{metadataVideo.name}</h1>
        </div>
        <div id="watch__description__account">
          <div id="watch__description__account__image">
            <img src={metadataVideo.user.image} alt="account_image" />
          </div>
          <div id="watch__description__account__name">
            <div id="watch__description__account__name__name">
              <h2>{metadataVideo.user.name}</h2>
            </div>
            <div id="watch__description__account__name__subscribers">
              {/* subs is static. My Bad :) */}
              <p>200K subscribers</p>
            </div>
          </div>
          <div id="watch__description__account__subscribers_button">
            <button>Subscribe</button>
          </div>
        </div>
        <div id="watch__description__likes_share">
          <div id="watch__description__likes_share__likes">
            <button
              id="watch__description__likes_share__likes__likes"
              onClick={likeVideo}
            >
              <div id="watch__description__likes_share__likes__likes__image">
                <img src={likeSvg} alt="like" />
              </div>
              <div id="watch__description__likes_share__likes__likes__count">
                <p>{metadataVideo.likes}</p>
              </div>
            </button>
            <button
              id="watch__description__likes_share__likes__dislikes"
              onClick={dislikeVideo}
            >
              <div id="watch__description__likes_share__likes__dislikes__image">
                <img src={dislikeSvg} alt="dislike" />
              </div>
            </button>
            <button id="watch__description__likes_share__likes__share">
              <div id="watch__description__likes_share__likes__share__image">
                <img src={shareSvg} alt="share" />
              </div>
              <div id="watch__description__likes_share__likes__share__name">
                <p>Share</p>
              </div>
            </button>
          </div>
        </div>
        <div id="watch__description__description">
          <div id="watch__description__description__dates">
            <p>
              <b>
                {timeAgo.format(Date.parse(metadataVideo.updatedAt as string))}
              </b>
            </p>
          </div>
          <div id="watch__description__description__description">
            <p>{metadataVideo.description}</p>
            <br />
          </div>
        </div>
      </div>
      <div id="watch__comment">
        <div id="watch__comment__count">
          <h3>{numberWithCommas(metadataVideo.comments as number)} Comments</h3>
        </div>
        {states.Auth.email && states.Auth.name && states.Auth.pictureUrl && (
          <CommentInput videoId={videoId} />
        )}
        <div id="watch__comment__comments">{/* <Comment /> */}</div>
      </div>
    </>
  );
}

export default WatchDescription;
