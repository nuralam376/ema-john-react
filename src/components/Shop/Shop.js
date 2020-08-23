import React, { useState } from "react";
import fakeData from "../../fakeData";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";

const Shop = () => {
	const first10 = fakeData.slice(0, 10);
	const [products, setproducts] = useState(first10);
	const [cart, setCart] = useState([]);

	const handleProductClick = (product) => {
		const newCart = [...cart, product];
		setCart(newCart);
	};
	return (
		<div className="shop-container">
			<div className="product-container">
				{products.map((product) => (
					<Product
						key={product.key}
						product={product}
						handleProductClick={handleProductClick}
					></Product>
				))}
			</div>
			<div className="cart-container">
				<Cart cart={cart}></Cart>
			</div>
		</div>
	);
};

export default Shop;
