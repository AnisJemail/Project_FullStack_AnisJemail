import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error ", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      alert("User deleted with success");
    } catch (error) {
      console.error("Error ", error);
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {" "}
        {users.map((user) => (
          <div key={user._id} className="product-card">
            <div className="product-title">{user.username}</div>
            <div className="product-description">{user.email}</div>

            <Link to={`/users/update/${user._id}`} className="update-button">
              Update
            </Link>

            <button
              onClick={() => handleDelete(user._id)}
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

export default UsersList;
