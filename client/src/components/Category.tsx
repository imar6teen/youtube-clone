import "../assets/components/category.css";
import { CategoryProps } from "../types";

function Category({
  value,
  isSelected,
  index,
  handleStyleCategory,
}: CategoryProps) {
  function handleClick() {
    if (!isSelected) handleStyleCategory(index);
  }
  return (
    <button
      className={`navbar__category ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    >
      <div id="navbar__category__text">
        <p>{value}</p>
      </div>
    </button>
  );
}

export default Category;
