import "../assets/components/uploadVideoModal.css";
import uploadVideoSvg from "../assets/image/uploadvideo.svg";
import { Modal } from "../components/index";
import { appStates } from "../hooks";
import { UploadVideoModalProps } from "../types";
import { useEffect, useRef } from "react";

function UploadVideoModal({ handleUpload }: UploadVideoModalProps) {
  const [_, dispatch] = appStates.useContextStates();
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headerRef.current !== null)
      headerRef.current.innerText = "Upload Video";
  }, [headerRef.current]);

  return (
    <Modal
      closeFn={() => dispatch({ type: "togglePopUpUploadVideo" })}
      // Check afterUploadModal.tsx for explanation about header using arrow function
      header={headerRef}
    >
      <div id="upload_video_modal">
        <div id="upload_video_modal__icon">
          <div id="upload_video_modal__icon__container">
            <img src={uploadVideoSvg} />
          </div>
        </div>
        <div id="upload_video_modal__desc">
          <p>Click Choose File to Upload Video</p>
        </div>
        <div id="upload_video_modal__button">
          <label htmlFor="video">Choose File</label>
          <input
            type="file"
            name="video"
            id="video"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={handleUpload}
          />
        </div>
      </div>
    </Modal>
  );
}

export default UploadVideoModal;
