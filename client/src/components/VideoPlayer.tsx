import { useRef, useState, useEffect, useId } from "react";
import Hls from "hls.js";
import Plyr, { PlyrOptions, APITypes, PlyrProps } from "plyr-react";
import "plyr-react/plyr.css";

type VideoPlayerProps = {
  url: string;
};

function VideoPlayer({ url }: VideoPlayerProps) {
  const videoRef = useRef<APITypes | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [playerOptions, setPlayerOptions] = useState<PlyrOptions>({});
  const videoPlayerId = useId();

  const loadOptions = async () => {
    if (hlsRef.current === null) return;
    const hls = hlsRef.current;
    if (Hls.isSupported() && hls.levels.length !== 0) {
      setPlayerOptions((rest) => {
        return {
          ...rest,
          quality: {
            default: hls.levels[hls.levels.length - 1].height,
            options: hls.levels.map((level) => level.height),
            forced: true,
            onChange(quality: number) {
              hls.levels.forEach((level, levelIndex) => {
                if (level.height === quality) {
                  hls.currentLevel = levelIndex;
                }
              });
            },
          },
        };
      });
    }
  };

  const attachMedia = () => {
    const hls = hlsRef.current;
    if (hls === null) return;
    const video = document.getElementById(videoPlayerId) as HTMLVideoElement;
    hls.attachMedia(video);
    // @ts-ignore
    videoRef.current!.plyr.media = video;
  };

  //* NOTE : ALL USE EFFECT ARE ORDER MATTER. DO NOT CHANGE THE ORDER
  //   load quality options on listener when event loaded and hls.levels is exists
  useEffect(() => {
    const hls = hlsRef.current;
    if (hls === null) return;
    hls.on(Hls.Events.LEVEL_LOADED, function () {
      if (playerOptions.quality === undefined && hls.levels.length !== 0) {
        loadOptions();
        attachMedia();
      }
    });
  }, [hlsRef.current]);

  //   load video source
  useEffect(() => {
    hlsRef.current = new Hls();
    const hls = hlsRef.current;
    hls.loadSource(url);
  }, []);

  //   attach media when playerOptions change
  useEffect(() => {
    attachMedia();
  }, [playerOptions]);

  return (
    <Plyr
      id={videoPlayerId}
      options={playerOptions}
      source={{} as PlyrProps["source"]}
      ref={videoRef}
    />
  );
}

export default VideoPlayer;
