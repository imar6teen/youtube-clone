import "../assets/components/buttonSidebarAccount.css";
import { ButtonSidebarAccountProps } from "../types";

function ButtonAccount({
  isShowBorder = false,
  name,
  svg,
  href = "",
}: ButtonSidebarAccountProps) {
  return (
    <a href={`${href}`}>
      <button
        className={`button_sidebar_account ${isShowBorder ? "bordered" : ""}`}
        disabled={href === "" ? true : false}
      >
        <div className="button_sidebar_account__icon">
          <img src={svg} alt={name} />
        </div>
        <div className="button_sidebar_account__name">
          <p>{name}</p>
        </div>
      </button>
    </a>
  );
}

export default ButtonAccount;
