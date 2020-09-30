import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";

const ProductDetail = () => {
  const { productkey } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/products/" + productkey)
      .then((res) => res.json())
      .then((product) => setProduct(product));
  }, [productkey]);

  return (
    <div>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetail;
