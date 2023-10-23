import React, { useState, useEffect } from "react";
import axios from "axios";

const AddOrder = () => {
  const [order, setOrder] = useState({
    user: "",
    products: [],
    totalAmount: "",
  });

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/orders", order);
      alert("success order add");
      console.log(response.data);
    } catch (error) {
      console.error("Error add order:", error);
    }
  };

  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/usernames`
        );
        setUsernames(response.data);
      } catch (error) {
        console.error("Error fetch user name:", error);
      }
    };
    fetchUsernames();
  }, []);

  return (
    <div>
      <h2>Add Order</h2>
      <form onSubmit={handleSubmit}>
        <select name="user" value={order.user} onChange={handleChange}>
          <option value="">--Select User--</option>
          {usernames.map((user) => (
            <option key={user._id} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="totalAmount"
          placeholder="Total Amount"
          value={order.totalAmount}
          onChange={handleChange}
        />
        <button type="submit">Add Order</button>
      </form>
    </div>
  );
};

export default AddOrder;
