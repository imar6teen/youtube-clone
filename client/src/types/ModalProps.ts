import { RefObject } from "react";

type ModalProps = {
  closeFn: () => void;
  children: JSX.Element | JSX.Element[];
  header: RefObject<HTMLHeadingElement>;
};

export default ModalProps;
