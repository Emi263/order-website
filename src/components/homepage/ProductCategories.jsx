import React, { useContext, useState } from "react";
import { getCategories } from "../../helper";
import { ProductContext } from "../../screens/HomePage";
import products from "../../data/products";

function ProductCategories() {
  const allCategories = getCategories();
  const { setProductList } = useContext(ProductContext);

  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: 12,
        flexWrap: "wrap",
      }}
    >
      {allCategories.map((category) => (
        <span
          onClick={() => {
            setSelectedCategory(category);
            if (category === "All") {
              return setProductList(products);
            }
            const updatedProductList = products.filter((prod) => {
              if (prod.category === category) {
                return true;
              }
              return false;
            });
            setProductList(updatedProductList);
          }}
          style={{
            color: category === selectedCategory ? "green" : "black",
            cursor: "pointer",
          }}
          key={category}
        >
          {category}
        </span>
      ))}
    </div>
  );
}

export default ProductCategories;
