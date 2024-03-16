import React, { useContext } from "react";
import { ProductContext } from "../../screens/HomePage";

const ProductCard = (props) => {
  const { setProductsInCart, productsInCart } = useContext(ProductContext);

  function checkIfProductExists() {
    const productInCart = productsInCart.find((product) => product.name === props.name);
    if (productInCart) return true;
    return false;
  }

  function handleAddProduct() {
    if (checkIfProductExists()) {
      const updatedListOfProductsInCart = productsInCart.filter((prod) => prod.name !== props.name);
      setProductsInCart(updatedListOfProductsInCart);
    } else {
      setProductsInCart([
        ...productsInCart,
        {
          name: props.name,
          price: props.price,
          quantity: 1,
        },
      ]);
    }
  }

  return (
    <article className="product-card">
      <section>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <h4>{props.name}</h4>
          <p style={{ fontSize: 10 }}>{props.description} </p>
          <p
            style={{
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Price: {props.price}L
          </p>
        </div>
        <div>
          <img
            alt={props.name + props.description}
            src={props.image}
            style={{
              width: 200,
            }}
          />
        </div>
      </section>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handleAddProduct} className="login-button">
          {checkIfProductExists() ? "Remove from cart" : "Add to cart"}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
