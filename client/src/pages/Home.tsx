import "../assets/pages/home.css";
import { SidebarAccount, Body, Footer, Header } from "../components";
import { appStates } from "../hooks";

function Home() {
  const [states, _] = appStates.useContextStates();

  return (
    <div id="home">
      <Header />
      {states.PopAccount.isClosed ? null : <SidebarAccount />}
      <Body />
      <Footer />
    </div>
  );
}

export default Home;
