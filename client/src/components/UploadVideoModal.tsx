import "../assets/components/uploadVideoModal.css";
import uploadVideoSvg from "../assets/image/uploadvideo.svg";
import { appStates } from "../hooks";

function UploadVideoModal() {
  const [_, dispatch] = appStates.useContextStates();

  return (
    <div id="upload_video_modal">
      <div id="upload_video_modal__modal">
        <div id="upload_video_modal__modal__header">
          <div id="upload_video_modal__modal__header__desc">
            <h3>Upload Videos</h3>
          </div>
          <div id="upload_video_modal__modal__header__close">
            <button
              onClick={() => dispatch({ type: "togglePopUpUploadVideo" })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M12.71,12l8.15,8.15l-0.71,0.71L12,12.71l-8.15,8.15l-0.71-0.71L11.29,12L3.15,3.85l0.71-0.71L12,11.29l8.15-8.15l0.71,0.71 L12.71,12z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div id="upload_video_modal__modal__body">
          <div id="upload_video_modal__modal__body__icon">
            <div id="upload_video_modal__modal__body__icon__container">
              <img src={uploadVideoSvg} />
            </div>
          </div>
          <div id="upload_video_modal__modal__body__desc">
            <p>Click Choose File to Upload Video</p>
          </div>
          <div id="upload_video_modal__modal__body__button">
            <label htmlFor="video">Choose File</label>
            <input
              type="file"
              name="video"
              id="video"
              accept="video/mp4,video/x-m4v,video/*"
            />
          </div>
        </div>
        <div id="upload_video_modal__modal__footer"></div>
      </div>
    </div>
  );
}

export default UploadVideoModal;
