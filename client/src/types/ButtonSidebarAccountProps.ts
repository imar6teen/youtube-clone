interface ButtonAccountProps {
  isShowBorder?: boolean;
  name: string;
  svg: string;
  fn?: (...args: any) => void;
  disabled?: boolean;
  isDebounce?: boolean;
}

export default ButtonAccountProps;
