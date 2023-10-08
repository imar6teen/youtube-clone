import "../assets/pages/home.css";
import { Account, Body, Footer, Header } from "../components";
import { appStates } from "../hooks";

function Home() {
  const [states, _] = appStates.useContextStates();

  return (
    <div id="home">
      <Header />
      {states.PopAccount.isClosed ? null : <Account />}
      <Body />
      <Footer />
    </div>
  );
}

export default Home;
