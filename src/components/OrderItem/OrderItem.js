import React from "react";

const OrderItem = (props) => {
	const { name, quantity, key, price } = props.product;

	const orderItem = {
		width: "80%",
		margin: "auto",
		marginBottom: "50px",
		paddingBottom: "30px",
		borderBottom: "1px solid lightgray",
	};
	return (
		<div className="order-item" style={orderItem}>
			<h4>{name}</h4>
			<h6>Quantity : {quantity}</h6>
			<p>Price : ${price}</p>
			<br />
			<button className="main-button" onClick={() => props.removeFromCart(key)}>
				Remove
			</button>
		</div>
	);
};

export default OrderItem;
