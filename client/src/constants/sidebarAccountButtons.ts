import svgSignIn from "../assets/image/signin.svg";
import svgSettings from "../assets/image/settings.svg";
import svgHelp from "../assets/image/help.svg";
import svgFeedback from "../assets/image/feedback.svg";
import svgYtMusic from "../assets/image/youtubemusic.svg";
import svgYtKids from "../assets/image/youtubekids.svg";
import svgOpenApp from "../assets/image/openapp.svg";
import svgYourChannel from "../assets/image/yourchannel.svg";
import svgYtPremium from "../assets/image/ytpremium.svg";
import svgPurchases from "../assets/image/purchases.svg";
import svgYourData from "../assets/image/yourdata.svg";
import svgYtUpload from "../assets/image/ytupload.svg";
import { ButtonSidebarAccountProps, AppStatesProps as P } from "../types/index";
import { AxiosStatic } from "axios";
import { VITE_BACKEND_URL, VITE_NODE_ENV } from "../config/app";
import { NavigateFunction } from "react-router-dom";

async function signOut(
  _: NavigateFunction,
  axios: AxiosStatic,
  ___: React.Dispatch<P.Actions>
) {
  try {
    await axios.post(
      `${VITE_BACKEND_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
  } catch (err) {
    if (VITE_NODE_ENV !== "production") console.error(err);
  } finally {
    window.location.href = "/";
  }
}

async function uploadVideo(
  _: NavigateFunction,
  __: AxiosStatic,
  dispatch: React.Dispatch<P.Actions>
) {
  console.log("Open pop up upload video");
  dispatch({ type: "togglePopUpUploadVideo" });
}

const AUTHBUTTONS: ButtonSidebarAccountProps[] = [
  {
    svg: svgSignIn,
    name: "Switch Account",
  },
  {
    svg: svgYourChannel,
    name: "Your Channel",
  },
  {
    svg: svgYtUpload,
    name: "Upload Video",
    disabled: false,
    fn: uploadVideo,
    isDebounce: false,
  },
  {
    svg: svgOpenApp,
    name: "Sign Out",
    isShowBorder: true,
    disabled: false,
    fn: signOut,
  },
  {
    svg: svgYtPremium,
    name: "Get YouTube Premium",
  },
  {
    svg: svgPurchases,
    name: "Purchases and memberships",
  },
  {
    svg: svgYourData,
    name: "Your data in YouTube",
    isShowBorder: true,
  },
];

const UNAUTHBUTTONS: ButtonSidebarAccountProps[] = [
  {
    svg: svgSettings,
    name: "Settings",
    isShowBorder: true,
  },
  {
    svg: svgHelp,
    name: "Help",
  },
  {
    svg: svgFeedback,
    name: "Feedback",
    isShowBorder: true,
  },
  {
    svg: svgYtMusic,
    name: "Youtube Music",
  },
  {
    svg: svgYtKids,
    name: "Youtube Kids",
    isShowBorder: true,
  },
  {
    svg: svgOpenApp,
    name: "Open App",
  },
];

export default { AUTHBUTTONS, UNAUTHBUTTONS };
