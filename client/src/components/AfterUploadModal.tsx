import "../assets/components/afterUploadModal.css";
import { AfterUploadModalProps } from "../types";
import { Modal } from ".";
import { appStates } from "../hooks";
import { useRef, useEffect, FormEvent } from "react";
import axios from "axios";
import {
  VITE_BACKEND_URL,
  VITE_FRONTEND_URL,
  VITE_NODE_ENV,
} from "../config/app";
import { Link } from "react-router-dom";

type TempForm = {
  title: HTMLTextAreaElement;
  description: HTMLTextAreaElement;
  visibility: HTMLInputElement;
  thumbnail: HTMLInputElement;
};

function AfterUploadModal({
  uploadProgress,
  video,
  uploadResponse,
}: AfterUploadModalProps) {
  const [_, dispatch] = appStates.useContextStates();
  //   const [videoName, setVideoName] = useState<string | undefined>(video?.name);
  //   const [description, setDescription] = useState<string>();
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  const changeHeader = () => {
    if (headerRef.current !== null) {
      const currTitle = titleRef.current?.value as string;
      headerRef.current.innerText =
        currTitle === "" ? "Upload Video" : currTitle;
    }
  };

  useEffect(() => {
    if (titleRef.current !== null) {
      const tempTitleRef = titleRef.current;
      tempTitleRef.value = video?.name as string;
    }

    if (titleRef.current !== null) {
      titleRef.current.addEventListener("change", changeHeader);
    }

    return () => {
      titleRef.current?.removeEventListener("change", changeHeader);
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let target = e.target as unknown as TempForm;
    let files = target.thumbnail.files as FileList;
    const videoId = uploadResponse?.data.video_id.split("-")[0];

    axios
      .put(
        `${VITE_BACKEND_URL}/api/v1/video`,
        {
          id: videoId,
          title: target.title.value,
          description: target.description.value,
          thumbnail: files.length !== 0 ? files[0] : "",
        },
        {
          headers: { "Content-Type": "multipart/form-data", Accept: "*/*" },
          withCredentials: true,
        }
      )
      .then(() => {
        dispatch({ type: "togglePopUpAfterUpload" });
        // alert("change metadata success. Capek raw css :')");
      })
      .catch((err) => {
        if (VITE_NODE_ENV !== "production") console.error(err);
      });
  };

  return (
    <Modal
      closeFn={() => dispatch({ type: "togglePopUpAfterUpload" })}
      header={headerRef}
    >
      <form id="after_upload_modal" onSubmit={handleSubmit}>
        <div id="after_upload_modal__preview">
          <div id="after_upload_modal__preview__video">
            <video
              src={URL.createObjectURL(video as File)}
              autoPlay={true}
              controls={true}
              controlsList={"nodownload"}
            ></video>
          </div>
          <div id="after_upload_modal__preview__links">
            <div id="after_upload_modal__preview__links__link">
              {/* upload video get the id */}
              <span>Link Video</span>
              <br />
              {uploadResponse?.data ? (
                <Link
                  to={`${VITE_FRONTEND_URL}/watch/${uploadResponse?.data.video_id}`}
                >
                  {VITE_FRONTEND_URL}/watch/{uploadResponse?.data.video_id}
                </Link>
              ) : (
                "-"
              )}
            </div>
            <div id="after_upload_modal__preview__links__filename">
              <span>File Name</span>
              <br />
              <span>{video?.name}</span>
            </div>
          </div>
        </div>
        <div id="after_upload_modal__detail">
          <div id="after_upload_modal__detail__header">
            <h2>Detail</h2>
          </div>
          <div id="after_upload_modal__detail__title">
            <textarea
              name="title"
              placeholder="Title"
              ref={titleRef}
            ></textarea>
          </div>
          <div id="after_upload_modal__detail__desc">
            <textarea
              name="description"
              ref={descriptionRef}
              placeholder="Description"
            ></textarea>
          </div>
        </div>
        <div id="after_upload_modal__thumbnail">
          <div id="after_upload_modal__thumbnail__header">
            <h2>Thumbnail</h2>
          </div>
          <div id="after_upload_modal__thumbnail__desc">
            <span>Choose Image</span>
          </div>
          <input
            type="file"
            name="thumbnail"
            id="thumbnail"
            accept="image/jpg, image/png"
            style={{ position: "absolute", opacity: 0 }}
          />
          <label htmlFor="thumbnail">Upload</label>
        </div>
        <div id="after_upload_modal__upload">
          <span>{uploadProgress}</span>
          <br />
          {uploadProgress === 100 ? <button type="submit">Submit</button> : ""}
        </div>
      </form>
    </Modal>
  );
}

export default AfterUploadModal;
