import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkIfTokenIsValid } from "../helper";
import Header from "../components/homepage/Header";
import ProductList from "../components/homepage/ProductList";
import ProductCategories from "../components/homepage/ProductCategories";
import ProductTable from "../components/dashboard/ProductTable";

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

  return (
    <ThemeContext.Provider value={{ isLightMode, setIsLightMode }}>
      <Header></Header>
      {/* <ProductCategories></ProductCategories>
      <ProductList></ProductList> */}

      <ProductTable />
    </ThemeContext.Provider>
  );
}

export default HomePage;
