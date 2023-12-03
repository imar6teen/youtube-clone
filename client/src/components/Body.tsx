import "../assets/components/body.css";
import Videos from "./Videos";
import { appStates } from "../hooks";
import { useEffect, useRef, useState } from "react";

function Body() {
  const [states, _] = appStates.useContextStates();
  const bodyRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState<number>(window.scrollY);

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

  return (
    <div id="body" ref={bodyRef}>
      <Videos />
      <Videos />
      <Videos />
      <Videos />
      <Videos />
    </div>
  );
}

export default Body;
