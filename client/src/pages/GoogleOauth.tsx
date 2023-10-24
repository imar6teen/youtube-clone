import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { appStates } from "../hooks";
import axios from "axios";
import { VITE_BACKEND_URL, VITE_NODE_ENV } from "../config/app";

function GoogleOauth() {
  const isLogin = useRef<boolean>(false);
  const [_, dispatch] = appStates.useContextStates();
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const queries = new URL(window.location.href).searchParams;
      const code = queries.get("code");

      if (!code) throw new Error("code is required");

      const response = await axios.post(
        `${VITE_BACKEND_URL}/api/auth/login?code=${code}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { email, picture, name } = response.data;

      dispatch({
        type: "fillAuth",
        value: { email, pictureUrl: picture, name },
      });
      setTimeout(() => {
        return navigate("/");
      }, 1000);
    } catch (err) {
      if (VITE_NODE_ENV !== "production") console.error(err);
      setTimeout(() => {
        return navigate("/");
      }, 3000);
    }
  }

  useEffect(() => {
    if (!isLogin.current) handleLogin();
    isLogin.current = true;
  }, []);
  return (
    <>
      {/* TODO Create Loading Page */}
      <h1>Loading...</h1>
    </>
  );
}

export default GoogleOauth;
