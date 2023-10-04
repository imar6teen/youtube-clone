import "../assets/components/account.css";
import ButtonAccount from "./ButtonAccount";

function Account() {
  return (
    <div id="account">
      <div id="account__header">
        <div id="account__header__close"></div>
        <div id="account__header__account"></div>
      </div>
      <div id="account__buttons">
        <ButtonAccount />
        <ButtonAccount />
        <ButtonAccount />
      </div>
    </div>
  );
}

export default Account;
