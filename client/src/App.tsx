import "./assets/App.css";
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
  {
    path: "/watch",
    element: <Watch />,
  },
  {
    path: `/google-callback`,
    element: <GoogleOauth />,
  },
]);

function RequestOnce({ handleRequestOnce }: RequestOnceProps) {
  const isDone = useGetProfile();
  if (isDone) handleRequestOnce(isDone);
  return null;
}

function App() {
  const [isRequestOnce, setIsRequestOnce] = useState<boolean>(false);

  function handleRequestOnce(isDone: boolean) {
    setIsRequestOnce(isDone);
  }
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
