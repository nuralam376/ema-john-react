import React, { useState } from "react";
import fakeData from "../../fakeData";
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
	const first10 = fakeData.slice(0, 10);
	const [products, setProducts] = useState(first10);
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const savedCart = getDatabaseCart();
		const savedProductKeys = Object.keys(savedCart);
		const cartProducts = savedProductKeys.map((existingKey) => {
			const existingProduct = fakeData.find((pd) => pd.key === existingKey);
			existingProduct.quantity = savedCart[existingKey];
			return existingProduct;
		});

		setCart(cartProducts);
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
