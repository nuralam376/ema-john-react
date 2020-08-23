import React, { useState } from "react";
import fakeData from "../../fakeData";
import "./Shop.css";
import Product from "../Product/Product";

const Shop = () => {
	const first10 = fakeData.slice(0, 10);
	const [products, setproducts] = useState(first10);

	const handleProductClick = (product) => {
		console.log("Product Clicked", product);
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
				<h1>Cart</h1>
			</div>
		</div>
	);
};

export default Shop;
