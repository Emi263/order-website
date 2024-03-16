import React, { useContext } from "react";
import { ThemeContext } from "../../screens/HomePage";

function ProductList() {
  const context = useContext(ThemeContext);
  return (
    <div
      style={{
        background: context.isLightMode ? "white" : "black",
        color: context.isLightMode ? "black" : "white",
      }}
    >
      ProductList
    </div>
  );
}

export default ProductList;
