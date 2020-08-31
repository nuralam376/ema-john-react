import React from "react";
import { useParams } from "react-router-dom";
import fakeData from "../../fakeData";
import Product from "../Product/Product";

const ProductDetail = () => {
	const { productkey } = useParams();
	const product = fakeData.find((product) => product.key === productkey);

	return (
		<div>
			<Product showAddToCart={false} product={product}></Product>
		</div>
	);
};

export default ProductDetail;
