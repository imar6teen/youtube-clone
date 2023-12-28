import "../assets/pages/watch.css";
import { useParams } from "react-router-dom";
import { Header, VideoPlayer } from "../components";
import { VITE_BACKEND_URL } from "../config/app";

function Watch() {
  const { uuid } = useParams();
  let splitted: string[] = uuid?.split("-") as string[];
  // this is videoId, it used for next development to get metadata from server
  // const [_, __] = useState<string>(splitted[0]);

  return (
    <div id="watch">
      <Header />
      <div id="watch__video">
        <VideoPlayer
          url={`${VITE_BACKEND_URL}/streams/${splitted[1]}/${splitted[2]}/master.m3u8`}
        />
      </div>
    </div>
  );
}

export default Watch;
