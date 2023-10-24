import "../assets/components/sidebarAccount.css";
import { appStates } from "../hooks";
import ButtonSidebarAccount from "./ButtonSidebarAccount";
import svgSignIn from "../assets/image/signin.svg";
import svgSettings from "../assets/image/settings.svg";
import svgHelp from "../assets/image/help.svg";
import svgFeedback from "../assets/image/feedback.svg";
import svgYtMusic from "../assets/image/youtubemusic.svg";
import svgYtKids from "../assets/image/youtubekids.svg";
import svgOpenApp from "../assets/image/openapp.svg";
import { VITE_BACKEND_URL } from "../config/app";

function SidebarAccount() {
  const [states, dispatch] = appStates.useContextStates();

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
      <div id="sidebar_account__buttons">
        <ButtonSidebarAccount
          key={svgSignIn}
          svg={svgSignIn}
          name="Sign In"
          isShowBorder={true}
          href={`${VITE_BACKEND_URL}/api/auth/url-login`}
        />
        <ButtonSidebarAccount
          key={svgSettings}
          svg={svgSettings}
          name="Settings"
          isShowBorder={true}
        />
        <ButtonSidebarAccount key={svgHelp} svg={svgHelp} name="Help" />
        <ButtonSidebarAccount
          key={svgFeedback}
          svg={svgFeedback}
          name="Feedback"
          isShowBorder={true}
        />
        <ButtonSidebarAccount
          key={svgYtMusic}
          svg={svgYtMusic}
          name="YouTube Music"
        />
        <ButtonSidebarAccount
          key={svgYtKids}
          svg={svgYtKids}
          name="YouTube Kids"
          isShowBorder={true}
        />
        <ButtonSidebarAccount
          key={svgOpenApp}
          svg={svgOpenApp}
          name="Open App"
        />
      </div>
    </div>
  );
}

export default SidebarAccount;
