interface CategoryProps {
  value: string;
  href: string;
  isSelected: boolean;
  index: number;
  handleStyleCategory(idx: number): void;
}

export default CategoryProps;
