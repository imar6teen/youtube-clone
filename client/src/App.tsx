import "./assets/App.css";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import { appStates } from "./hooks/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
]);

function App() {
  return (
    <ContextProvider.Provider value={appStates.reducer()}>
      <RouterProvider router={router} />
    </ContextProvider.Provider>
  );
}

export default App;
