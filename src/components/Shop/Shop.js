import React, { useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://afternoon-woodland-77284.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const savedProductKeys = Object.keys(savedCart);

    fetch("https://afternoon-woodland-77284.herokuapp.com/cartproducts/", {
      method: "POST",
      body: JSON.stringify(savedProductKeys),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const newProducts = data.map((product) => {
          product.quantity = savedCart[product.key];
          return product;
        });
        setCart(newProducts);
      });
  }, []);

  const handleProductClick = (product) => {
    const sameProduct = cart.find((pd) => pd.key === product.key);
    let count = 1;
    if (sameProduct) {
      sameProduct.quantity += count;
      const otherProducts = cart.filter((pd) => pd.key !== product.key);
      const newCart = [...otherProducts, sameProduct];
      setCart(newCart);
    } else {
      product.quantity = count;
      const newCart = [...cart, product];
      setCart(newCart);
    }
    setProducts(products);
    console.log(cart);
    addToDatabaseCart(product.key, product.quantity);
  };
  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            showAddToCart={true}
            key={product.key}
            product={product}
            handleProductClick={handleProductClick}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/order">
            <button className="main-button">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
