import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetch order:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/orders/${orderId}`);

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
      alert("Order deleted success");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <divs style={{ display: "flex", flexWrap: "wrap" }}>
        {" "}
        {orders.map((order) => (
          <div key={order._id} className="product-card">
            User ID: <div className="product-title">{order.user} </div>
            Total Amount:{" "}
            <div className="product-price">${order.totalAmount}</div>
            Date:{" "}
            <div className="product-category">
              {new Date(order.date).toLocaleDateString()}
            </div>
            <Link to={`/orders/update/${order._id}`} className="update-button">
              Update
            </Link>
            <button
              onClick={() => handleDelete(order._id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </divs>
    </div>
  );
};

export default OrdersList;
