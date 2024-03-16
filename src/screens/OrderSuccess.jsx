import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const nav = useNavigate();

  useEffect(() => {
    localStorage.setItem("productsInCart", "[]");
    setTimeout(() => {
      nav("/");
    }, 2000);
  }, [nav]);

  return (
    <div>
      <h1>Thank you for your order</h1>
      <p>You will be redirected to homepage </p>
    </div>
  );
}

export default OrderSuccess;
