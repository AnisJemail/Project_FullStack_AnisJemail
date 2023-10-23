import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({
    user: "",
    products: [],
    totalAmount: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error("Error :", error);
      }
    };

    fetchOrder();
  }, [id]);

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/orders/${id}`,
        order
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div>
      <h2>Update Order</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user"
          placeholder="User ID"
          value={order.user}
          onChange={handleChange}
        />

        <input
          type="number"
          name="totalAmount"
          placeholder="Total Amount"
          value={order.totalAmount}
          onChange={handleChange}
        />
        <button type="submit">Update Order</button>
      </form>
    </div>
  );
};

export default UpdateOrder;
