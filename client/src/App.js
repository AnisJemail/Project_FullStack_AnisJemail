import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";

// Import components
import UsersList from "./components/users/UsersList";
import AddUser from "./components/users/AddUser";
import UpdateUser from "./components/users/UpdateUser";
//import DeleteUser from "./components/users/DeleteUser";
import ProductsList from "./components/products/ProductsList";
import AddProduct from "./components/products/AddProduct";
import UpdateProduct from "./components/products/UpdateProduct";
//import DeleteProduct from "./components/products/DeleteProduct";
import OrderList from "./components/orders/OrdersList";
import AddOrder from "./components/orders/AddOrder";
import UpdateOrder from "./components/orders/UpdateOrder";
//import DeleteOrder from "./components/orders/DeleteOrder";

function App() {
  const [activeMenu, setActiveMenu] = React.useState(null);

  const toggleMenu = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
  };

  return (
    <div className="app-container">
      <h1>Project RBK</h1>
      <div className="navigation-container">
        <nav>
          <div onClick={() => toggleMenu("users")}>
            Users
            {activeMenu === "users" && (
              <div className="submenu">
                <Link to="/users">Users List</Link>
                <Link to="/users/add">Add User</Link>
              </div>
            )}
          </div>
          <div onClick={() => toggleMenu("products")}>
            Products
            {activeMenu === "products" && (
              <div className="submenu">
                <Link to="/products">Products List</Link>
                <Link to="/products/add">Add Product</Link>
              </div>
            )}
          </div>
          <div onClick={() => toggleMenu("orders")}>
            Orders
            {activeMenu === "orders" && (
              <div className="submenu">
                <Link to="/orders">Orders List</Link>
                <Link to="/orders/add">Add Order</Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="content-container">
        <Routes>
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/update/:id" element={<UpdateUser />} />

          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/update/:id" element={<UpdateProduct />} />

          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/add" element={<AddOrder />} />
          <Route path="/orders/update/:id" element={<UpdateOrder />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
