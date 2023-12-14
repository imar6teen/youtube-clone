import "../assets/components/body.css";
import Videos from "./Videos";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { appStates } from "../hooks";
import { useEffect, useRef, useState } from "react";
import { VITE_BACKEND_URL, VITE_NODE_ENV } from "../config/app";
import { VideosFormat, GetVideosResponse } from "../types";

function Body() {
  const [states, _] = appStates.useContextStates();
  const bodyRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState<number>(window.scrollY);
  const [videos, setVideos] = useState<VideosFormat[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit: number = 5;
  const isClearVideos = useRef<boolean>(false);

  const fetchData = async () => {
    try {
      const res = await axios.get<GetVideosResponse>(
        `${VITE_BACKEND_URL}/api/v1/video/${limit}/${offset}`,
        { withCredentials: true }
      );
      console.log(res.data.videos);
      if (res.data.videos.length === 0) setHasMore(false);

      // this is for preventing duplicate request because React.Strictmode
      if (!isClearVideos.current) setVideos((_) => []);
      else setVideos((videos) => [...videos, ...res.data.videos]);
      isClearVideos.current = true;
    } catch (err) {
      if (VITE_NODE_ENV !== "production") console.error(err);
    }
  };

  // this effect to prevent bug when open modal (sidebar or other modal)
  // where the body scrollable even modal opened
  // and when body position fixed when that position remove
  // it back to scrollY = 0
  useEffect(() => {
    const currRef = bodyRef.current as HTMLDivElement;

    if (!states.isModalClosed) {
      setScrollY(window.scrollY);
      currRef?.classList.add("stopscroll");
    } else {
      currRef?.classList.remove("stopscroll");
      window.scrollTo({ left: window.scrollX, top: scrollY });
    }
  }, [states.isModalClosed]);

  useEffect(() => {
    fetchData();
  }, [offset]);

  return (
    <div id="body" ref={bodyRef}>
      <InfiniteScroll
        dataLength={videos.length}
        next={() => setOffset((prev) => prev + 1)}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        // endMessage={<p>No more data to load.</p>}
      >
        {videos.map((video) => (
          <Videos prop={video} key={video.videos_id} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Body;
