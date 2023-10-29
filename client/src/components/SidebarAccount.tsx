import "../assets/components/sidebarAccount.css";
import { appStates } from "../hooks";
import ButtonSidebarAccount from "./ButtonSidebarAccount";
import svgSignIn from "../assets/image/signin.svg";
import { VITE_BACKEND_URL } from "../config/app";
import { sidebarAccountButtons } from "../constants/index";

const { AUTHBUTTONS, UNAUTHBUTTONS } = sidebarAccountButtons;

type ManageAccountProps = {
  email: string;
  name: string;
  pictureUrl: string;
};

type ButtonsAuthProps = ManageAccountProps;

function ManageAccount({ email, name, pictureUrl }: ManageAccountProps) {
  return (
    <div id="sidebar_account__manage_account">
      <div id="sidebar_account__manage_account__img">
        <img src={pictureUrl} alt="" />
      </div>
      <div id="sidebar_account__manage_account__google_account">
        <div id="sidebar_account__manage_account__google_account__profile">
          <div id="sidebar_account__manage_account__google_account__profile__username">
            <p>{name}</p>
          </div>
          <div id="sidebar_account__manage_account__google_account__profile__email">
            <p>{email}</p>
          </div>
        </div>
        <div id="sidebar_account__manage_account__google_account__manage">
          <button disabled={true}>Manage your Google Account</button>
        </div>
      </div>
    </div>
  );
}

function ButtonsAuth({ email, name, pictureUrl }: ButtonsAuthProps) {
  return (
    <>
      {email && name && pictureUrl ? (
        <>
          {AUTHBUTTONS.map((val, idx) => {
            return (
              <ButtonSidebarAccount
                name={val.name}
                svg={val.svg}
                isShowBorder={val.isShowBorder}
                key={idx}
                href={val.href}
              />
            );
          })}
        </>
      ) : (
        <ButtonSidebarAccount
          key={svgSignIn}
          svg={svgSignIn}
          name="Sign In"
          isShowBorder={true}
          href={`${VITE_BACKEND_URL}/api/auth/url-login`}
        />
      )}

      {UNAUTHBUTTONS.map((val, idx) => {
        return (
          <ButtonSidebarAccount
            name={val.name}
            svg={val.svg}
            isShowBorder={val.isShowBorder}
            key={idx}
          />
        );
      })}
    </>
  );
}

function SidebarAccount() {
  const [states, dispatch] = appStates.useContextStates();
  const {
    Auth: { email, name, pictureUrl },
  } = states;

  return (
    <div id="sidebar_account">
      <div id="sidebar_account__header">
        <div id="sidebar_account__header__close">
          <button onClick={() => dispatch({ type: "togglePopUpAccount" })}>
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
        <div id="sidebar_account__header__account">
          <p>Account</p>
        </div>
      </div>
      {email && name && pictureUrl ? (
        <ManageAccount email={email} name={name} pictureUrl={pictureUrl} />
      ) : null}

      <div id="sidebar_account__buttons">
        <ButtonsAuth email={email} name={name} pictureUrl={pictureUrl} />
      </div>
      <div id="sidebar_account__footer">Privacy Policy • Terms of Service</div>
    </div>
  );
}

export default SidebarAccount;
