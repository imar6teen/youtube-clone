import { useEffect, useRef } from "react";
import axios from "axios";
import { appStates } from ".";
import { VITE_BACKEND_URL, VITE_NODE_ENV } from "../config/app";

export default function useGetProfile(): boolean {
  const [_, dispatch] = appStates.useContextStates();
  const isDone = useRef<boolean>(false);

  async function getProfile() {
    try {
      if (window.location.pathname === "/google-callback") return;
      const response = await axios.get(`${VITE_BACKEND_URL}/api/v1/profile`, {
        withCredentials: true,
      });
      const { email, picture, name } = response.data;

      dispatch({
        type: "fillAuth",
        value: { email, pictureUrl: picture, name },
      });
    } catch (err) {
      if (VITE_NODE_ENV !== "production") console.error(err);
    }
  }

  useEffect(() => {
    if (!isDone.current) getProfile();
    isDone.current = true;
  }, []);

  return isDone.current;
}
