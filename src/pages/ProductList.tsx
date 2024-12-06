import React, { useEffect, useState } from "react";
import useProductStore from "../store/productsStore";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";

const ProductList: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "favorites">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const toggleLike = useProductStore((state) => state.toggleLike);
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products
    .filter((product) => (filter === "favorites" ? product.isLiked : true))
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <h1>Product List</h1>

      <div className="filter-buttons">
        <button
          className={`filter-button ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Products
        </button>
        <button
          className={`filter-button ${filter === "favorites" ? "active" : ""}`}
          onClick={() => setFilter("favorites")}
        >
          Favorites
        </button>
        <button
          className="filter-button new-button"
          onClick={() => navigate("/create-product")}
        >
          Create Product
        </button>
      </div>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {filteredProducts.length === 0 ? (
        <p className="No-products">No products to display</p>
      ) : (
        <div className="product-container">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h3 className="product-title">{product.title}</h3>
              <p className="product-description">
                {product.description.slice(0, 50)}...
              </p>
              <div className="button-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(product.id);
                  }}
                  className={`like-button ${
                    product.isLiked ? "liked" : "unliked"
                  }`}
                >
                  {product.isLiked ? "Liked ❤️" : "Like ♡"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProduct(product.id);
                  }}
                  className="delete-button"
                >
                  Delete 🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
