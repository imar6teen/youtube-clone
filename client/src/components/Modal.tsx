import "../assets/components/modal.css";
import { ModalProps } from "../types";

function Modal({ children, closeFn, header }: ModalProps) {
  return (
    <div className="modal">
      <div className="modal__modal">
        <div className="modal__modal__header">
          <div className="modal__modal__header__desc">
            <h3 ref={header}></h3>
          </div>
          <div className="modal__modal__header__close">
            <button onClick={closeFn}>
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
        <div className="modal__modal__body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
