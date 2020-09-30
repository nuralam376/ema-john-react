import React from "react";

const Cart = (props) => {
  const { cart } = props;
  const productsPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity || 1,
    0
  );

  let shipping = 0;

  if (productsPrice > 35) {
    shipping = 0;
  } else if (productsPrice > 15) {
    shipping = 4.99;
  } else if (productsPrice > 0) {
    shipping = 12.99;
  }

  const tax = productsPrice / 10;
  const total = productsPrice + shipping + tax;

  const numberPrice = (number) => number.toFixed(2);

  return (
    <div>
      <h4>Order Summary - {cart.length}</h4>
      <p>Products Price : ${numberPrice(productsPrice)}</p>
      <p>Shipping : ${numberPrice(shipping)}</p>
      <p>Tax : ${numberPrice(tax)}</p>
      <p>Total : ${numberPrice(total)}</p>
      {props.children}
    </div>
  );
};

export default Cart;
