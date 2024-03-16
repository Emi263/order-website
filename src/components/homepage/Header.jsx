import { Badge, Switch } from "antd";
import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined";
import { useContext, useState } from "react";
import { ProductContext, ThemeContext } from "../../screens/HomePage";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import products from "../../data/products";

function Header() {
  const context = useContext(ThemeContext);

  const nav = useNavigate();

  const { productsInCart, setProductsInCart, productList, setProductList } = useContext(ProductContext);

  function handleSwitchOnChange(checked) {
    if (checked) {
      localStorage.setItem("theme", "darkMode");
    } else {
      localStorage.setItem("theme", "lightMode");
    }
    context.setIsLightMode(!checked);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function handleAddQuantity(product) {
    const updatedProducts = productsInCart.map((prod) => {
      if (prod.name === product.name) {
        const newUpdatedProd = { ...prod, quantity: product.quantity + 1 };
        return newUpdatedProd;
      } else {
        return prod;
      }
    });
    setProductsInCart(updatedProducts);
  }

  function removeProduct(product) {
    const updatedProducts = productsInCart.filter((productItem) => productItem.name !== product.name);
    setProductsInCart(updatedProducts);
  }

  function handleRemoveQuantity(product) {
    if (product.quantity === 1) {
      return removeProduct(product);
    }

    const updatedProducts = productsInCart.map((prod) => {
      if (prod.name === product.name) {
        const newUpdatedProd = { ...prod, quantity: product.quantity - 1 };
        return newUpdatedProd;
      } else {
        return prod;
      }
    });
    setProductsInCart(updatedProducts);
  }

  function calculateTotal() {
    let total = 0;

    productsInCart.forEach((product) => {
      total = total + product.price * product.quantity;
    });
    return total;
  }

  function handleOrder() {
    if (productsInCart.length === 0) {
      return alert("Empty cart!");
    }
    console.log(productsInCart);
    nav("order-success");
  }

  const total = calculateTotal();

  function handleItemsFilter(e) {
    const value = e.target.value;

    if (value === "") {
      return setProductList(products);
    }

    const updatedProducts = products.filter((prod) => {
      if (prod.product.name.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      return false;
    });
    setProductList(updatedProducts);
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
        <input
          onChange={(e) => {
            handleItemsFilter(e);
          }}
          type="text"
          placeholder="Search for a product"
        />
      </div>
      <div className="cart-container">
        <Switch defaultChecked={!context.isLightMode} onChange={handleSwitchOnChange} />
        Cart
        <Badge count={productsInCart.length} showZero>
          <ShoppingCartOutlined
            onClick={showModal}
            style={{ fontSize: 27, color: context.isLightMode ? "black" : "white" }}
          />
        </Badge>
      </div>

      <Modal footer={null} title="Shopping Cart" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {productsInCart.map((prod) => {
          return (
            <li className="cart-item" key={prod.name}>
              <button onClick={() => handleAddQuantity(prod)}>+</button>
              <span>{prod.quantity}</span>
              <button onClick={() => handleRemoveQuantity(prod)}>-</button>
              <span>{prod.name}</span>
              <span>{prod.price}L</span>
              <span onClick={() => removeProduct(prod)} style={{ color: "red" }}>
                X
              </span>
            </li>
          );
        })}

        {productsInCart.length === 0 && <p>Your cart is empty</p>}

        {productsInCart.length > 0 && <p>Total: {total}L </p>}

        {productsInCart.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              className="login-button"
              onClick={() => {
                setProductsInCart([]);
              }}
            >
              Empty Cart
            </button>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 30,
          }}
        >
          <button className="login-button" onClick={handleOrder}>
            Order
          </button>
        </div>
      </Modal>
    </header>
  );
}

export default Header;
