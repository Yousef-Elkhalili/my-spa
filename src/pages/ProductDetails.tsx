import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProductStore from "../store/productsStore";
import "./ProductDetails.css";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const toggleLike = useProductStore((state) => state.toggleLike);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      if (products.length === 0) {
        await fetchProducts(); 
      }
      setLoading(false); 
    };

    loadProducts();
  }, [products.length, fetchProducts]);

  const product = products.find((p) => p.id == id);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="product-details-container">
      <h1 className="product-details-title">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="product-details-image"
      />
      <p className="product-details-description">{product.description}</p>
      <div className="button-container">
        <button
          onClick={() => toggleLike(product.id)} 
          className={`like-button ${product.isLiked ? "liked" : "unliked"}`}
        >
          {product.isLiked ? "Liked ❤️" : "Like ♡"}
        </button>
      </div>
      <button
        onClick={() => navigate("/products")}
        className="product-details-back-button"
      >
        Back to Products
      </button>
    </div>
  );
};

export default ProductDetails;
