import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      alert("Product deleted with success");
    } catch (error) {
      console.error("Error ", error);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {" "}
        {products.map((product) => (
          <div key={product._id} className="product-card">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="product-image"
              />
            )}

            <div className="product-title">{product.title}</div>
            <div className="product-description">{product.description}</div>
            <div className="product-category">{product.category}</div>
            <div className="product-price">${product.price}</div>
            <Link
              to={`/products/update/${product._id}`}
              className="update-button"
            >
              Update
            </Link>
            <button
              onClick={() => handleDelete(product._id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
