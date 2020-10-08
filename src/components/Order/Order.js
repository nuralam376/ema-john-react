import React from "react";
import { useEffect, useState } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import OrderItem from "../OrderItem/OrderItem";
import Cart from "../Cart/Cart";
import { useHistory } from "react-router-dom";
import confirmImage from "../../images/giphy.gif";

const Order = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced] = useState(false);

  const removeFromCart = (productKey) => {
    const newCart = cart.filter((product) => product.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  const history = useHistory();

  const handleCheckout = () => {
    history.push(`/shipment`);
  };

  useEffect(() => {
    const products = getDatabaseCart();
    const productKeys = Object.keys(products);

    fetch("http://localhost:5000/cartproducts", {
      method: "POST",
      body: JSON.stringify(productKeys),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((cartProducts) => {
        const newCartProducts = cartProducts.map((product) => {
          product.quantity = products[product.key];
          return product;
        });

        setCart(newCartProducts);
      });
  }, []);

  let confirmOrderPlacedImage;

  if (orderPlaced) {
    confirmOrderPlacedImage = <img src={confirmImage} alt="" />;
  }
  return (
    <div className="shop-container">
      <div className="product-container">
        {cart.map((product) => (
          <OrderItem
            key={product.key}
            product={product}
            removeFromCart={removeFromCart}
          ></OrderItem>
        ))}

        {confirmOrderPlacedImage}
      </div>
      <div className="cart-container">
        {orderPlaced === false && (
          <Cart cart={cart}>
            <button onClick={handleCheckout} className="main-button">
              Proceed to Checkout
            </button>
          </Cart>
        )}
      </div>
    </div>
  );
};

export default Order;
