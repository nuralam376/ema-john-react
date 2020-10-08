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
  const [search, setSearch] = useState("");

  document.title = "Shop More";

  useEffect(() => {
    console.log(search);
    fetch("http://localhost:5000/products?search=" + search)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [search]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const savedProductKeys = Object.keys(savedCart);

    fetch("http://localhost:5000/cartproducts/", {
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

  const handleBlur = (event) => {
    setSearch(event.target.value);
  };

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
      {products.length === 0 && <p>Loading.....</p>}
      <div className="product-container">
        <input
          type="text"
          className="form-control w-50 mt-3 mx-auto"
          placeholder="Product Search"
          onBlur={handleBlur}
        />
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
