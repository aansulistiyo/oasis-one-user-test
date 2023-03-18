import React, { useState } from "react";
import { useSelector } from "react-redux";

const CategoryButton = () => {
  const menus = useSelector((state) => state.menus);
  const color = useSelector((state) => state.color);
  const [activeCategory, setActiveCategory] = useState("category-0");

  const onClickCategory = (id) => {
    setActiveCategory("category-" + id);
    const element = document.getElementById("category-" + id);
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="row mx-0 scrolling-wrapper-x flex-row flex-nowrap">
      <button
        type="button"
        className={
          activeCategory === `category-0`
            ? "btn btn-category-active mr-2"
            : "btn btn-category mr-2"
        }
        onClick={() => onClickCategory("0")}
        style={
          activeCategory === `category-0`
            ? {
                backgroundColor: color,
                color: "#fff",
              }
            : {
                borderColor: color,
                color: color,
              }
        }
      >
        <span className="material-icons-outlined">menu_book</span>
      </button>
      {Object.keys(menus).map((index) => {
        const item = menus[index].category;
        var categoryClass =
          activeCategory === `category-${item.id}`
            ? "btn btn-category-active mr-2"
            : "btn btn-category mr-2";
        const isActive = activeCategory === `category-${item.id}`;
        return (
          <button
            type="button"
            className={categoryClass}
            onClick={() => onClickCategory(item.id)}
            key={item.id}
            style={
              isActive
                ? {
                    backgroundColor: color,
                    color: "#fff",
                  }
                : {
                    borderColor: color,
                    color: color,
                  }
            }
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryButton;
