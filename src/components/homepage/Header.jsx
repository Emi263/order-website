import { Badge, Switch } from "antd";
import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined";
import { useContext, useState } from "react";
import { ThemeContext } from "../../screens/HomePage";

function Header() {
  const context = useContext(ThemeContext);

  function handleSwitchOnChange(checked) {
    if (checked) {
      localStorage.setItem("theme", "darkMode");
    } else {
      localStorage.setItem("theme", "lightMode");
    }

    context.setIsLightMode(!checked);
  }

  return (
    <header
      style={{
        background: context.isLightMode ? "white" : "black",
        color: context.isLightMode ? "black" : "white",
      }}
      className="header-container"
    >
      <div>
        <img
          style={{
            width: 50,
          }}
          src="https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-food-logo-png-image_5297921.png"
        />
      </div>
      <div>
        <input type="text" placeholder="Search for a product" />
      </div>
      <div className="cart-container">
        <Switch defaultChecked={!context.isLightMode} onChange={handleSwitchOnChange} />
        Cart
        <Badge count={0} showZero>
          <ShoppingCartOutlined style={{ fontSize: 27, color: context.isLightMode ? "black" : "white" }} />
        </Badge>
      </div>
    </header>
  );
}

export default Header;
