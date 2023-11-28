import "../assets/components/sidebarAccount.css";
import { useState } from "react";
import { appStates } from "../hooks";
import ButtonSidebarAccount from "./ButtonSidebarAccount";
import svgSignIn from "../assets/image/signin.svg";
import { VITE_BACKEND_URL, VITE_NODE_ENV } from "../config/app";
import { sidebarAccountButtons } from "../constants/index";
import { ButtonSidebarAccountProps } from "../types";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

const { AUTHBUTTONS, UNAUTHBUTTONS } = sidebarAccountButtons;

interface ManageAccountProps {
  email: string;
  name: string;
  pictureUrl: string;
}

interface ButtonsProps extends ManageAccountProps {
  authButtons: ButtonSidebarAccountProps[];
}

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

function Buttons({ email, name, pictureUrl, authButtons }: ButtonsProps) {
  const [__, dispatch] = appStates.useContextStates();
  const navigate = useNavigate();
  const [buttonParams, _] = useState<any[]>([navigate, axios, dispatch]);

  async function handleSignIn() {
    try {
      // this will get to catch due to server using status code 300 - 500
      // axios only not throw an error if the resopnse code is 200
      await axios.get(`${VITE_BACKEND_URL}/api/auth/url-login`);
    } catch (err) {
      const axiosErr = err as AxiosError;
      if (axiosErr.response?.status === 302) {
        const response = axiosErr.response?.data as { [key: string]: any };
        window.location.href = response.url;
      }
      if (VITE_NODE_ENV !== "production") console.log(err);
    }
  }

  return (
    <>
      {email && name && pictureUrl ? (
        <>
          {authButtons.map((val, idx) => {
            return (
              <ButtonSidebarAccount
                name={val.name}
                svg={val.svg}
                isShowBorder={val.isShowBorder}
                key={idx}
                disabled={val.disabled}
                fn={() => {
                  if (val.fn !== undefined) val.fn(...buttonParams);
                }}
                isDebounce={val.isDebounce}
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
          disabled={false}
          fn={() => {
            handleSignIn();
          }}
        />
      )}

      {UNAUTHBUTTONS.map((val, idx) => {
        return (
          <ButtonSidebarAccount
            name={val.name}
            svg={val.svg}
            isShowBorder={val.isShowBorder}
            key={idx}
            disabled={val.disabled}
            isDebounce={val.isDebounce}
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
        <Buttons
          email={email}
          name={name}
          pictureUrl={pictureUrl}
          authButtons={AUTHBUTTONS}
        />
      </div>
      <div id="sidebar_account__footer">Privacy Policy • Terms of Service</div>
    </div>
  );
}

export default SidebarAccount;
