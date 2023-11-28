import "../assets/components/uploadVideoModal.css";
import uploadVideoSvg from "../assets/image/uploadvideo.svg";
import { Modal } from "../components/index";
import { appStates } from "../hooks";

function UploadVideoModal() {
  const [_, dispatch] = appStates.useContextStates();

  return (
    <Modal
      closeFn={() => dispatch({ type: "togglePopUpUploadVideo" })}
      header="Upload Videos"
    >
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
        />
      </div>
    </Modal>
  );
}

export default UploadVideoModal;
