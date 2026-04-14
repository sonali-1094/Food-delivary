import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { API_BASE_URL } from "../config/api.js";

const initialFoodState = {
  name: "",
  price: "",
  category: "",
  image: "",
  shopName: "",
  description: ""
};

const orderStatuses = ["Pending", "Accepted", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];
const shopkeeperStatuses = ["Accepted", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];

const AdminDashboard = () => {
  const { getToken } = useAuth();
  const [activeTab, setActiveTab] = useState("shopkeeper");
  const [foods, setFoods] = useState([]);
  const [adminOrders, setAdminOrders] = useState([]);
  const [shopkeeperOrders, setShopkeeperOrders] = useState([]);
  const [foodForm, setFoodForm] = useState(initialFoodState);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const adminCounts = useMemo(() => {
    return orderStatuses.reduce((counts, status) => {
      counts[status] = adminOrders.filter((order) => order.status === status).length;
      return counts;
    }, {});
  }, [adminOrders]);

  const apiFetch = async (path, options = {}) => {
    const token = await getToken();
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {})
      }
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || data.error || "Request failed");
    }
    return data;
  };

  const loadFoods = async () => {
    const response = await fetch(`${API_BASE_URL}/api/food`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to load foods");
    setFoods(Array.isArray(data) ? data : []);
  };

  const loadAdminOrders = async () => {
    const data = await apiFetch("/api/order");
    setAdminOrders(Array.isArray(data) ? data : []);
  };

  const loadShopkeeperOrders = async () => {
    const data = await apiFetch("/api/order/shopkeeper");
    setShopkeeperOrders(Array.isArray(data) ? data : []);
  };

  const refresh = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      await Promise.allSettled([loadFoods(), loadAdminOrders(), loadShopkeeperOrders()]).then((results) => {
        const errors = results.filter((result) => result.status === "rejected");
        if (errors.length === results.length) {
          throw errors[0].reason;
        }
        if (errors.length) {
          setMessage("Some admin data is hidden because your account may only have shopkeeper access.");
        }
      });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const onFoodFieldChange = (event) => {
    const { name, value } = event.target;
    setFoodForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFood = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      await apiFetch("/api/food/add", {
        method: "POST",
        body: JSON.stringify({
          ...foodForm,
          price: Number(foodForm.price)
        })
      });
      setFoodForm(initialFoodState);
      setMessage("Food item added to the shop menu.");
      await loadFoods();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDeleteFood = async (foodId) => {
    try {
      await apiFetch(`/api/food/${foodId}`, { method: "DELETE" });
      setMessage("Food item deleted.");
      await loadFoods();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const updateAdminStatus = async (orderId, status) => {
    try {
      await apiFetch(`/api/order/${orderId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status })
      });
      await loadAdminOrders();
      await loadShopkeeperOrders();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const acceptOrder = async (orderId) => {
    try {
      await apiFetch(`/api/order/${orderId}/accept`, {
        method: "PATCH",
        body: JSON.stringify({ shopName: foodForm.shopName })
      });
      setMessage("Order accepted. You can now prepare and deliver it.");
      await loadShopkeeperOrders();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const updateShopkeeperStatus = async (orderId, status) => {
    try {
      await apiFetch(`/api/order/${orderId}/shopkeeper-status`, {
        method: "PATCH",
        body: JSON.stringify({ status })
      });
      await loadShopkeeperOrders();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const renderOrderCard = (order, mode) => (
    <article className="order-card" key={order._id}>
      <div>
        <p className="eyebrow">Order #{order._id.slice(-6)}</p>
        <h3>Rs. {order.totalAmount}</h3>
        <p>{order.address}</p>
        <p>Payment: {order.paymentStatus} | Status: {order.status}</p>
        {order.shopName ? <p>Shop: {order.shopName}</p> : <p>Shop: Not accepted yet</p>}
      </div>
      <div className="order-items">
        {order.items?.map((item) => (
          <span key={`${order._id}-${item.foodId}-${item.name}`}>
            {item.name} x {item.quantity}
          </span>
        ))}
      </div>
      {mode === "shopkeeper" ? (
        <div className="actions">
          {!order.shopkeeperId ? (
            <button onClick={() => acceptOrder(order._id)}>Accept Order</button>
          ) : (
            <select value={order.status} onChange={(event) => updateShopkeeperStatus(order._id, event.target.value)}>
              {shopkeeperStatuses.map((status) => (
                <option value={status} key={status}>{status}</option>
              ))}
            </select>
          )}
        </div>
      ) : (
        <select value={order.status} onChange={(event) => updateAdminStatus(order._id, event.target.value)}>
          {orderStatuses.map((status) => (
            <option value={status} key={status}>{status}</option>
          ))}
        </select>
      )}
    </article>
  );

  return (
    <main className="dashboard">
      <section className="hero-panel">
        <p className="eyebrow">Operations</p>
        <h1>Manage users, shopkeepers, food and delivery flow</h1>
        <p>Shopkeepers can accept incoming orders, prepare them and update delivery status. Admins can see the full system.</p>
        <button onClick={refresh}>{isLoading ? "Refreshing..." : "Refresh dashboard"}</button>
      </section>

      {message ? <p className="message">{message}</p> : null}

      <nav className="tabs">
        <button className={activeTab === "shopkeeper" ? "active" : ""} onClick={() => setActiveTab("shopkeeper")}>Shopkeeper Orders</button>
        <button className={activeTab === "foods" ? "active" : ""} onClick={() => setActiveTab("foods")}>Food Menu</button>
        <button className={activeTab === "admin" ? "active" : ""} onClick={() => setActiveTab("admin")}>Admin Orders</button>
        <button className={activeTab === "roles" ? "active" : ""} onClick={() => setActiveTab("roles")}>Users & Roles</button>
      </nav>

      {activeTab === "shopkeeper" && (
        <section className="grid-list">
          {shopkeeperOrders.map((order) => renderOrderCard(order, "shopkeeper"))}
          {!shopkeeperOrders.length ? <p>No shopkeeper orders found.</p> : null}
        </section>
      )}

      {activeTab === "foods" && (
        <section className="food-layout">
          <form className="panel" onSubmit={handleAddFood}>
            <h2>Add shop food</h2>
            <input name="shopName" value={foodForm.shopName} onChange={onFoodFieldChange} placeholder="Shop / kitchen name" />
            <input name="name" value={foodForm.name} onChange={onFoodFieldChange} placeholder="Food name" required />
            <input name="category" value={foodForm.category} onChange={onFoodFieldChange} placeholder="State or category" required />
            <input name="price" value={foodForm.price} onChange={onFoodFieldChange} placeholder="Price" type="number" min="1" required />
            <input name="image" value={foodForm.image} onChange={onFoodFieldChange} placeholder="Image URL optional" />
            <textarea name="description" value={foodForm.description} onChange={onFoodFieldChange} placeholder="Description" rows="4" />
            <button type="submit">Add Food</button>
          </form>

          <section className="grid-list">
            {foods.map((food) => (
              <article className="food-row" key={food._id}>
                <div>
                  <h3>{food.name}</h3>
                  <p>{food.category} | Rs. {food.price}</p>
                  <p>{food.shopName || "No shop assigned"}</p>
                </div>
                <button onClick={() => handleDeleteFood(food._id)}>Delete</button>
              </article>
            ))}
          </section>
        </section>
      )}

      {activeTab === "admin" && (
        <>
          <section className="stats">
            {orderStatuses.map((status) => (
              <span key={status}>{status}: {adminCounts[status] || 0}</span>
            ))}
          </section>
          <section className="grid-list">
            {adminOrders.map((order) => renderOrderCard(order, "admin"))}
            {!adminOrders.length ? <p>No admin orders found or this account is shopkeeper-only.</p> : null}
          </section>
        </>
      )}

      {activeTab === "roles" && (
        <section className="panel">
          <h2>Users and shopkeepers</h2>
          <p>Customers sign in from the main frontend. Shopkeepers sign in here and must be added to <strong>SHOPKEEPER_EMAILS</strong> on the backend environment. Admins are controlled by <strong>ADMIN_EMAILS</strong>.</p>
          <p>This keeps roles simple while using your existing Clerk authentication.</p>
        </section>
      )}
    </main>
  );
};

export default AdminDashboard;
