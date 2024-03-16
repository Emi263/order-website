import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkIfTokenIsValid } from "../helper";
import Header from "../components/homepage/Header";
import ProductList from "../components/homepage/ProductList";
import products from "../data/products";
import ProductCategories from "../components/homepage/ProductCategories";

export const ThemeContext = createContext();
export const ProductContext = createContext();

function HomePage() {
  const nav = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    nav("/login");
  }

  useEffect(() => {
    if (checkIfTokenIsValid() === false) {
      nav("/login");
    }
  }, [nav]);

  const themeFromLocalStorage = localStorage.getItem("theme");

  const mode = themeFromLocalStorage ? themeFromLocalStorage === "lightMode" : true;
  const [isLightMode, setIsLightMode] = useState(mode);
  const [productList, setProductList] = useState(products);
  const productsFromLocalStorage = localStorage.getItem("productsInCart")
    ? localStorage.getItem("productsInCart")
    : "[]";

  const [productsInCart, setProductsInCart] = useState(JSON.parse(productsFromLocalStorage));

  useEffect(() => {
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
  }, [productsInCart]);

  return (
    <ThemeContext.Provider value={{ isLightMode, setIsLightMode }}>
      <ProductContext.Provider value={{ productList, setProductList, productsInCart, setProductsInCart }}>
        <Header></Header>
        <ProductCategories></ProductCategories>
        <ProductList></ProductList>
      </ProductContext.Provider>
    </ThemeContext.Provider>
  );
}

export default HomePage;
