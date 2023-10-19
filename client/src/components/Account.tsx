import "../assets/components/account.css";
import { appStates } from "../hooks";
import ButtonAccount from "./ButtonAccount";
import svgSignIn from "../assets/image/signin.svg";
import svgSettings from "../assets/image/settings.svg";
import svgHelp from "../assets/image/help.svg";
import svgFeedback from "../assets/image/feedback.svg";
import svgYtMusic from "../assets/image/youtubemusic.svg";
import svgYtKids from "../assets/image/youtubekids.svg";
import svgOpenApp from "../assets/image/openapp.svg";
import { VITE_BACKEND_URL } from "../config/app";

function Account() {
  const [_, dispatch] = appStates.useContextStates();

  return (
    <div id="account">
      <div id="account__header">
        <div id="account__header__close">
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
        <div id="account__header__account">
          <p>Account</p>
        </div>
      </div>
      <div id="account__buttons">
        <ButtonAccount
          key={svgSignIn}
          svg={svgSignIn}
          name="Sign In"
          isShowBorder={true}
          href={`${VITE_BACKEND_URL}/api/auth/url-login`}
        />
        <ButtonAccount
          key={svgSettings}
          svg={svgSettings}
          name="Settings"
          isShowBorder={true}
        />
        <ButtonAccount key={svgHelp} svg={svgHelp} name="Help" />
        <ButtonAccount
          key={svgFeedback}
          svg={svgFeedback}
          name="Feedback"
          isShowBorder={true}
        />
        <ButtonAccount key={svgYtMusic} svg={svgYtMusic} name="YouTube Music" />
        <ButtonAccount
          key={svgYtKids}
          svg={svgYtKids}
          name="YouTube Kids"
          isShowBorder={true}
        />
        <ButtonAccount key={svgOpenApp} svg={svgOpenApp} name="Open App" />
      </div>
    </div>
  );
}

export default Account;
