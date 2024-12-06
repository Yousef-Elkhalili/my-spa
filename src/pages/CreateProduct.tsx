import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductStore from "../store/productsStore";
import "./CreateProduct.css"; 


const CreateProduct: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const addProduct = useProductStore((state) => state.addProduct);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !image) {
      setError("All fields are required.");
      return;
    }

    const newProduct = {
      id: Date.now().toString(), 
      title,
      description,
      image,
      isLiked: false, 
    };

    addProduct(newProduct);

    navigate("/products"); 
  };

  return (
    <div className="create-product-container">
      <h1>Create New Product</h1>
      <form onSubmit={handleSubmit} className="create-product-form">
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter product image URL"
          />
        </div>
        <button type="submit" className="submit-button">
          Create Product
        </button>
        <button
        onClick={() => navigate("/products")}
        className="product-details-back-button"
       >
        Back to Products
      </button>
      </form>
    </div>
  );
};

export default CreateProduct;
