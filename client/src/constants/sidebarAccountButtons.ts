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
import { VITE_BACKEND_URL } from "../config/app";

const AUTHBUTTONS = [
  {
    svg: svgYourChannel,
    name: "Your Channel",
  },
  {
    svg: svgSignIn,
    name: "Switch Account",
  },
  {
    svg: svgOpenApp,
    name: "Sign Out",
    isShowBorder: true,
    href: `${VITE_BACKEND_URL}/api/auth/logout`,
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

const UNAUTHBUTTONS = [
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
