interface CategoryProps {
  value: string;
  href: string;
  isSelected: boolean;
  index: number;
  handleStyleButton(idx: number): void;
}

export default CategoryProps;
