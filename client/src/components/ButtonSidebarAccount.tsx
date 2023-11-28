import "../assets/components/buttonSidebarAccount.css";
import { ButtonSidebarAccountProps } from "../types";
import { debounce } from "../utils";

function ButtonAccount({
  isShowBorder = false,
  name,
  svg,
  disabled = true,
  isDebounce = true,
  fn,
}: ButtonSidebarAccountProps) {
  const anotherFn = () => {
    if (fn !== undefined) fn();
  };
  const btnFunction = isDebounce ? debounce(anotherFn, 500) : anotherFn;
  return (
    <button
      className={`button_sidebar_account ${isShowBorder ? "bordered" : ""}`}
      disabled={disabled}
      onClick={btnFunction}
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
