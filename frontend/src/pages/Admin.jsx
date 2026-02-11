import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import "./Admin.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const initialFoodState = {
  name: "",
  price: "",
  category: "",
  image: "",
  description: ""
};

const Admin = () => {
  const { isSignedIn, getToken } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [hasAdminAccess, setHasAdminAccess] = useState(null);
  const [activeTab, setActiveTab] = useState("foods");
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [foodForm, setFoodForm] = useState(initialFoodState);
  const [isLoadingFoods, setIsLoadingFoods] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [message, setMessage] = useState("");

  const orderCounts = useMemo(() => {
    const counts = { Pending: 0, Preparing: 0, Delivered: 0, Cancelled: 0 };
    orders.forEach((order) => {
      if (counts[order.status] !== undefined) {
        counts[order.status] += 1;
      }
    });
    return counts;
  }, [orders]);

  const loadFoods = async () => {
    setIsLoadingFoods(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/food`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to load foods");
      }
      setFoods(Array.isArray(data) ? data : []);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoadingFoods(false);
    }
  };

  const loadOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const token = await getToken();
      if (!token) {
        setHasAdminAccess(false);
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/api/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 403) {
        setHasAdminAccess(false);
        return false;
      }
      if (!response.ok) {
        throw new Error(data.error || "Failed to load orders");
      }
      setHasAdminAccess(true);
      setOrders(Array.isArray(data) ? data : []);
      return true;
    } catch (error) {
      setMessage(error.message);
      return false;
    } finally {
      setIsLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      (async () => {
        const allowed = await loadOrders();
        if (allowed) {
          await loadFoods();
        }
        setIsReady(true);
      })();
    }
  }, [isSignedIn]);

  const onFoodFieldChange = (event) => {
    const { name, value } = event.target;
    setFoodForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFood = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Please sign in.");
      }

      const response = await fetch(`${API_BASE_URL}/api/food/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...foodForm,
          price: Number(foodForm.price)
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to add food");
      }

      setFoodForm(initialFoodState);
      setMessage("Food item added.");
      await loadFoods();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDeleteFood = async (foodId) => {
    setMessage("");
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Please sign in.");
      }

      const response = await fetch(`${API_BASE_URL}/api/food/${foodId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to delete food");
      }

      setMessage("Food item deleted.");
      await loadFoods();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleStatusChange = async (orderId, nextStatus) => {
    setMessage("");
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Please sign in.");
      }

      const response = await fetch(`${API_BASE_URL}/api/order/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to update order status");
      }

      setMessage("Order status updated.");
      await loadOrders();
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (!isReady && isSignedIn) {
    return <section className="admin"><p>Loading...</p></section>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  if (hasAdminAccess === false) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="admin">
      <div className="admin__header">
        <h2>Admin Panel</h2>
        <div className="admin__tabs">
          <button
            className={activeTab === "foods" ? "active" : ""}
            onClick={() => setActiveTab("foods")}
          >
            Manage Foods
          </button>
          <button
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            Manage Orders
          </button>
        </div>
      </div>

      {message ? <p className="admin__message">{message}</p> : null}

      {activeTab === "foods" ? (
        <div className="admin__layout">
          <form className="admin-card" onSubmit={handleAddFood}>
            <h3>Add Food Item</h3>
            <input
              name="name"
              value={foodForm.name}
              onChange={onFoodFieldChange}
              placeholder="Food Name"
              required
            />
            <input
              name="price"
              value={foodForm.price}
              onChange={onFoodFieldChange}
              placeholder="Price"
              type="number"
              min="1"
              required
            />
            <input
              name="category"
              value={foodForm.category}
              onChange={onFoodFieldChange}
              placeholder="Category"
              required
            />
            <input
              name="image"
              value={foodForm.image}
              onChange={onFoodFieldChange}
              placeholder="Image URL (optional)"
            />
            <textarea
              name="description"
              value={foodForm.description}
              onChange={onFoodFieldChange}
              placeholder="Description"
              rows="4"
            />
            <button type="submit">Add Food</button>
          </form>

          <div className="admin-card">
            <h3>Food List</h3>
            {isLoadingFoods ? <p>Loading foods...</p> : null}
            <div className="admin-list">
              {foods.map((food) => (
                <div className="admin-list__row" key={food._id}>
                  <div>
                    <strong>{food.name}</strong>
                    <p>
                      {food.category} | Rs. {food.price}
                    </p>
                  </div>
                  <button onClick={() => handleDeleteFood(food._id)}>Delete</button>
                </div>
              ))}
              {!foods.length && !isLoadingFoods ? <p>No foods found.</p> : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="admin-card">
          <h3>Order Management</h3>

          <div className="admin-stats">
            <span>Pending: {orderCounts.Pending}</span>
            <span>Preparing: {orderCounts.Preparing}</span>
            <span>Delivered: {orderCounts.Delivered}</span>
            <span>Cancelled: {orderCounts.Cancelled}</span>
          </div>

          {isLoadingOrders ? <p>Loading orders...</p> : null}

          <div className="admin-list">
            {orders.map((order) => (
              <div className="admin-list__row admin-list__row--order" key={order._id}>
                <div>
                  <strong>Order #{order._id.slice(-6)}</strong>
                  <p>
                    Amount: Rs. {order.totalAmount} | Payment: {order.paymentStatus}
                  </p>
                  <p>Address: {order.address}</p>
                </div>

                <select
                  value={order.status}
                  onChange={(event) => handleStatusChange(order._id, event.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            ))}
            {!orders.length && !isLoadingOrders ? <p>No orders found.</p> : null}
          </div>
        </div>
      )}
    </section>
  );
};

export default Admin;
