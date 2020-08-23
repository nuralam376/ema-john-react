import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";

const Product = (props) => {
	const { img, name, seller, price, stock } = props.product;
	return (
		<div className="product">
			<div className="product-image">
				<img src={img} alt={img} />
			</div>
			<div className="product-description">
				<h4 className="product-name">{name}</h4>
				<br />
				<p>
					<small>by {seller}</small>
				</p>
				<p>${price}</p>
				<p>
					<small>only {stock} left in stock</small>
				</p>
				<button
					className="main-button"
					onClick={() => props.handleProductClick(props.product)}
				>
					<FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> Add to cart
				</button>
			</div>
		</div>
	);
};

export default Product;
