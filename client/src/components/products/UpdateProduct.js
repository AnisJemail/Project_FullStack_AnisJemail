import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  console.log("product", product);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error ", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/products/${id}`, product);
      console.log("product", product);
      alert("Product updated with success");
    } catch (error) {
      console.error("Error ", error);
    }
  };

  return (
    <div>
      <h2>Update Product</h2>

      {product && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={product.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
          ></textarea>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={product.imageUrl}
            onChange={handleChange}
          />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default UpdateProduct;
