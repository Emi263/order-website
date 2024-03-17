import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage, { ProductContext } from "./screens/HomePage";
import Login from "./screens/Login";
import OrderSuccess from "./screens/OrderSuccess";
import DynamicProducts from "./screens/DynamicProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import products from "./data/products";
import SingleProductFromApi from "./screens/SingleProductFromApi";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/order-success",
      element: <OrderSuccess />,
    },
    {
      path: "/dynamic-products",
      element: <DynamicProducts />,
    },
    {
      path: "/products-api/:id",
      element: <SingleProductFromApi />,
    },
  ]);
  const productsFromLocalStorage = localStorage.getItem("productsInCart")
    ? localStorage.getItem("productsInCart")
    : "[]";
  const [productsInCart, setProductsInCart] = useState(JSON.parse(productsFromLocalStorage));

  useEffect(() => {
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
  }, [productsInCart]);

  const [productList, setProductList] = useState(products);

  return (
    <QueryClientProvider client={queryClient}>
      <ProductContext.Provider value={{ productList, setProductList, productsInCart, setProductsInCart }}>
        <RouterProvider router={router} />
      </ProductContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
