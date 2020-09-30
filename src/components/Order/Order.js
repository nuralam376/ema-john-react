import React from "react";
import { useEffect, useState } from "react";
import {
	getDatabaseCart,
	removeFromDatabaseCart,
	processOrder,
} from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import OrderItem from "../OrderItem/OrderItem";
import Cart from "../Cart/Cart";
import { Link, useHistory } from "react-router-dom";
import confirmImage from "../../images/giphy.gif";

const Order = () => {
	const [cart, setCart] = useState([]);
	const [orderPlaced, setOrderPlaced] = useState(false);

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
		const cartProducts = productKeys.map((product) => {
			const findProduct = fakeData.find((pd) => pd.key === product);
			findProduct.quantity = products[product];
			return findProduct;
		});

		setCart(cartProducts);
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
