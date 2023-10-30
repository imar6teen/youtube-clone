import "../assets/components/buttonSidebarAccount.css";
import { ButtonSidebarAccountProps } from "../types";
import { debounce } from "../utils";

function ButtonAccount({
  isShowBorder = false,
  name,
  svg,
  disabled = true,
  fn,
}: ButtonSidebarAccountProps) {
  return (
    <button
      className={`button_sidebar_account ${isShowBorder ? "bordered" : ""}`}
      disabled={disabled}
      onClick={debounce(() => {
        if (fn !== undefined) fn();
      }, 500)}
    >
      <div className="button_sidebar_account__icon">
        <img src={svg} alt={name} />
      </div>
      <div className="button_sidebar_account__name">
        <p>{name}</p>
      </div>
    </button>
  );
}

export default ButtonAccount;
