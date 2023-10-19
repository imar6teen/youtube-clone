import "../assets/components/buttonAccount.css";
import { ButtonAccountProps } from "../types";

function ButtonAccount({
  isShowBorder = false,
  name,
  svg,
  href = "",
}: ButtonAccountProps) {
  return (
    <a href={`${href}`}>
      <button
        className={`button_account ${isShowBorder ? "bordered" : ""}`}
        disabled={href === "" ? true : false}
      >
        <div className="button_account__icon">
          <img src={svg} alt={name} />
        </div>
        <div className="button_account__name">
          <p>{name}</p>
        </div>
      </button>
    </a>
  );
}

export default ButtonAccount;
