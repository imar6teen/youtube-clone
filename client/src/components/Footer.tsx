import "../assets/components/footer.css";
import svgFooterHome from "../assets/image/footerhome.svg";
import svgFooterLibrary from "../assets/image/footerlibrary.svg";
import svgFooterShorts from "../assets/image/footershorts.svg";
import svgFooterSubscription from "../assets/image/footersubscription.svg";
import { appStates } from "../hooks";

type ButtonProps = {
  svg: string;
  name: string;
  isDisabled?: boolean;
};

function Button({ svg, name, isDisabled = false }: ButtonProps) {
  return (
    <button disabled={isDisabled}>
      <div>
        <img src={svg} />
      </div>
      <div>
        <p>{name}</p>
      </div>
    </button>
  );
}

function Footer() {
  const [states, _] = appStates.useContextStates();
  const {
    Auth: { email, name, pictureUrl },
  } = states;
  return (
    <div id="footer">
      <div id="footer__buttons">
        <Button svg={svgFooterHome} name="Home" />
        <Button svg={svgFooterShorts} name="Shorts" isDisabled={true} />
        {email && name && pictureUrl ? (
          <Button
            svg={svgFooterSubscription}
            name="Subscriptions"
            isDisabled={true}
          />
        ) : null}
        <Button svg={svgFooterLibrary} name="Library" isDisabled={true} />
      </div>
    </div>
  );
}

export default Footer;
