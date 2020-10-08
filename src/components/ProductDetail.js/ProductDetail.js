import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";

const ProductDetail = () => {
  const { productkey } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  document.title = "Product Detail";

  useEffect(() => {
    fetch("http://localhost:5000/products/" + productkey)
      .then((res) => res.json())
      .then((product) => {
        setProduct(product);
        setLoading(false);
      });
  }, [productkey]);

  return (
    <div>
      {loading ? (
        "Loading...."
      ) : (
        <Product showAddToCart={false} product={product}></Product>
      )}
    </div>
  );
};

export default ProductDetail;
