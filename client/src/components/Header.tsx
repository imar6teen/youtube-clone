import { useEffect, useRef } from "react";
import "../assets/components/header.css";
import Navbar from "./Navbar";

function Header() {
  const headerRef = useRef<any>(false);
  const clientScroll = useRef<number>(window.scrollY);

  const handleHideHeader = () => {
    if (clientScroll.current < window.scrollY)
      headerRef.current.style.transform = "translateY(-6.25rem)";
    else headerRef.current.style.transform = "translateY(0)";
    clientScroll.current = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleHideHeader);

    return () => {
      window.removeEventListener("scroll", handleHideHeader);
    };
  }, []);
  return (
    <header ref={headerRef}>
      <Navbar />
    </header>
  );
}

export default Header;
