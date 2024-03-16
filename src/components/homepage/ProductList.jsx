import { useContext, useState } from "react";
import { ProductContext, ThemeContext } from "../../screens/HomePage";
import products from "../../data/products";
import ProductCard from "./ProductCard";

function ProductList() {
  const { isLightMode } = useContext(ThemeContext);
  const { productList, setProductsInCart } = useContext(ProductContext);

  return (
    <div
      className="product-list-container"
      style={{
        background: isLightMode ? "white" : "black",
        color: isLightMode ? "black" : "white",
      }}
    >
      {productList.map((productItem) => {
        return (
          <ProductCard
            description={productItem.product.description}
            key={productItem.product.id}
            price={productItem.product.price}
            name={productItem.product.name}
            image={productItem.product.imageUrl}
          />
        );
      })}
    </div>
  );
}

export default ProductList;
