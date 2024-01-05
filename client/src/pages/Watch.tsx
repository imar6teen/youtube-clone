import "../assets/pages/watch.css";

import { useParams } from "react-router-dom";
import { Header, SidebarAccount, VideoPlayer } from "../components";
import { VITE_BACKEND_URL } from "../config/app";
import AppStates from "../hooks/AppStates";

import { useState } from "react";

import WatchDescription from "../components/WatchDescription";

function Watch() {
  const { uuid } = useParams();
  let splitted: string[] = uuid?.split("-") as string[];
  // this is videoId
  const [videoId, _] = useState<string>(splitted[0]);
  const [states, __] = AppStates.useContextStates();

  return (
    <div id="watch">
      <Header />
      {states.PopAccount.isClosed ? null : <SidebarAccount />}
      <div id="watch__video">
        <VideoPlayer
          url={`${VITE_BACKEND_URL}/streams/${splitted[1]}/${splitted[2]}/master.m3u8`}
        />
      </div>
      <WatchDescription videoId={videoId} />
    </div>
  );
}

export default Watch;
