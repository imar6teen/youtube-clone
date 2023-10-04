import "./assets/App.css";
import Home from "./pages/Home";
import { appStates } from "./hooks/index";

const ContextProvider = appStates.ContextProvider;

// TODO Route Here
function App() {
  return (
    <ContextProvider.Provider value={appStates.reducer()}>
      <Home />
    </ContextProvider.Provider>
  );
}

export default App;
