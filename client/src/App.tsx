import "./assets/App.css";
import { useEffect } from "react";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import GoogleOauth from "./pages/GoogleOauth";
import { appStates, useGetProfile } from "./hooks/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import { RequestOnceProps } from "./types";

const ContextProvider = appStates.ContextProvider;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  // uuid instead of id because it contains video_id, users_id, and video file name
  // so make sense to chane it to uuid rather than id due to its structure (video_id)-(users_id)-(video_name)
  {
    path: "/watch/:uuid",
    element: <Watch />,
  },
  {
    path: `/google-callback`,
    element: <GoogleOauth />,
  },
]);

function RequestOnce({ handleRequestOnce }: RequestOnceProps) {
  const isDone = useGetProfile();

  useEffect(() => {
    if (isDone) handleRequestOnce(isDone);
  }, [isDone]);
  return null;
}

function App() {
  const [isRequestOnce, setIsRequestOnce] = useState<boolean>(false);

  function handleRequestOnce(isDone: boolean) {
    setIsRequestOnce(isDone);
  }
  // TODO handle error if server down and show fallback UI for it
  //* hint: clean all component (RequestOnce and RouterProvider) and show the fallback UI
  //*       the fallback UI will show if useGetProfile in requestOnce failed (email, pictureurl, name)
  return (
    <ContextProvider.Provider value={appStates.reducer()}>
      {!isRequestOnce ? (
        <RequestOnce handleRequestOnce={handleRequestOnce} />
      ) : null}
      <RouterProvider router={router} />
    </ContextProvider.Provider>
  );
}

export default App;
