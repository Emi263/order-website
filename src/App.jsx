import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./screens/HomePage";
import Login from "./screens/Login";
import OrderSuccess from "./screens/OrderSuccess";

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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
