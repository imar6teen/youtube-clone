import "../assets/pages/home.css";
import Account from "../components/Account";
import Body from "../components/Body";
import Footer from "../components/Footer";
import Header from "../components/Header";
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
