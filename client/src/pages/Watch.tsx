import "../assets/pages/watch.css";
import { useParams } from "react-router-dom";
// import { Navbar } from "../components";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { VITE_BACKEND_URL } from "../config/app";

function Watch() {
  const { uuid } = useParams();
  let splitted: string[] = uuid?.split("-") as string[];
  // this is videoId, it used for next development to get metadata from server
  const [_, __] = useState<string>(splitted[0]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls>(new Hls());
  const onceRef = useRef<boolean>(false);

  const hlsInit = () => {
    const curRef = videoRef.current as HTMLVideoElement;
    hlsRef.current.startLevel = -1;
    hlsRef.current.loadSource(
      `${VITE_BACKEND_URL}/streams/${splitted[1]}/${splitted[2]}/master.m3u8`
    );
    hlsRef.current.attachMedia(curRef);
    hlsRef.current.on(Hls.Events.MEDIA_ATTACHED, () => {
      curRef.play();
    });
  };

  const checkLevel = () => {
    console.log(hlsRef.current.levels);
  };

  const currLevel = () => {
    console.log(hlsRef.current.currentLevel);
  };

  const raiseLevel = () => {
    if (hlsRef.current.currentLevel === hlsRef.current.levels.length - 1)
      return console.log("reso max");
    console.log("reso changed");
    hlsRef.current.currentLevel = hlsRef.current.currentLevel + 1;
  };
  const lowerLevel = () => {
    if (hlsRef.current.currentLevel === 0) return console.log("reso min");
    console.log("reso changed");
    hlsRef.current.currentLevel = hlsRef.current.currentLevel - 1;
  };

  useEffect(() => {
    if (!onceRef.current) {
      hlsInit();
    }
    onceRef.current = true;
  }, []);

  return (
    <div id="watch">
      {/* <Navbar /> */}
      <div id="watch__video">
        <video
          ref={videoRef}
          autoPlay={true}
          controls={true}
          controlsList={"nodownload"}
        ></video>
      </div>
      <button onClick={checkLevel}>Check Level</button>
      <button onClick={currLevel}>Current Level</button>
      <button onClick={raiseLevel}>Up Reso</button>
      <button onClick={lowerLevel}>Down Reso</button>
    </div>
  );
}

export default Watch;
