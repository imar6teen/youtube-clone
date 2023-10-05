import "../assets/components/buttonAccount.css";
import { ButtonAccountProps } from "../types";

function ButtonAccount({
  isShowBorder = false,
  name,
  svg,
  isDisabled = true,
}: ButtonAccountProps) {
  return (
    <button
      className={`button_account ${isShowBorder ? "bordered" : ""}`}
      disabled={isDisabled}
    >
      <div className="button_account__icon">
        <img src={svg} alt={name} />
      </div>
      <div className="button_account__name">
        <p>{name}</p>
      </div>
    </button>
  );
}

export default ButtonAccount;
