interface ButtonAccountProps {
  isShowBorder?: boolean;
  name: string;
  svg: string;
  fn?: (...args: any) => void;
  disabled?: boolean;
}

export default ButtonAccountProps;
