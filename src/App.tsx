import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import CreateProduct from "./pages/CreateProduct";
import "./App.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  
  return (
    <div className="Home-page">
      <h1>Welcome to our Shop!</h1>
      <button className="Products-button" 
      onClick={() => navigate("/products")}
      >
        Press Here to Go to Products
      </button>
    </div>
  )
}

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/create-product" element={<CreateProduct />} />
    </Routes>
  </Router>
);

export default App;
