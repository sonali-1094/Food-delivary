import React, { useContext, useMemo, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import "./Placeorder.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Placeorder = () => {
  const { food_list, cartItems, clearCart, getTotalCartAmount } = useContext(StoreContext);
  const { isSignedIn, getToken } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const cartSummary = useMemo(() => {
    const items = Object.entries(cartItems)
      .filter(([, quantity]) => quantity > 0)
      .map(([itemId, quantity]) => {
        const item = food_list.find((food) => food._id === itemId);
        if (!item) return null;
        return {
          foodId: item._id,
          name: item.name,
          price: item.price,
          quantity,
        };
      })
      .filter(Boolean);

    const total = getTotalCartAmount();
    return { items, total };
  }, [cartItems, food_list, getTotalCartAmount]);

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!cartSummary.items.length) {
      setMessage("Cart is empty. Add items before payment.");
      return;
    }

    if (!address.trim()) {
      setMessage("Please enter delivery address.");
      return;
    }

    if (!isSignedIn) {
      setMessage("Please sign in before placing an order.");
      navigate("/sign-in");
      return;
    }

    setIsProcessing(true);
    setMessage("");

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Unable to load Razorpay checkout script.");
      }

      const token = await getToken();
      if (!token) {
        throw new Error("Authentication token not available. Please sign in again.");
      }

      const orderResponse = await fetch(`${API_BASE_URL}/api/order/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartSummary.items,
          totalAmount: cartSummary.total,
          address: address.trim(),
        }),
      });

      const orderData = await orderResponse.json();
      if (!orderResponse.ok) {
        throw new Error(orderData.message || orderData.error || "Failed to create order.");
      }

      const appOrderId = orderData.order?._id;
      if (!appOrderId) {
        throw new Error("Order ID missing from backend response.");
      }

      const paymentResponse = await fetch(`${API_BASE_URL}/api/payment/create-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId: appOrderId }),
      });

      const paymentData = await paymentResponse.json();
      if (!paymentResponse.ok) {
        throw new Error(paymentData.message || paymentData.error || "Failed to create payment session.");
      }

      const options = {
        key: paymentData.key,
        amount: paymentData.amount,
        currency: paymentData.currency || "INR",
        name: "Food Delivery",
        description: `Order #${appOrderId.slice(-6)}`,
        order_id: paymentData.razorpayOrderId,
        prefill: {
          name: customerName,
          email,
          contact: phone,
        },
        theme: {
          color: "#e85d04",
        },
        handler: async (razorpayResult) => {
          try {
            const verifyResponse = await fetch(`${API_BASE_URL}/api/payment/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                orderId: appOrderId,
                razorpay_order_id: razorpayResult.razorpay_order_id,
                razorpay_payment_id: razorpayResult.razorpay_payment_id,
                razorpay_signature: razorpayResult.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();
            if (!verifyResponse.ok) {
              throw new Error(verifyData.message || verifyData.error || "Payment verification failed.");
            }

            clearCart();
            setMessage("Payment successful. Your order is confirmed.");
          } catch (error) {
            setMessage(error.message);
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            setMessage("Payment was not completed.");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setMessage(error.message);
      setIsProcessing(false);
    }
  };

  return (
    <section className="placeorder">
      <div className="placeorder__grid">
        <form className="placeorder__form" onSubmit={handlePayment}>
          <h2>Delivery Details</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="4"
            required
          />
          <button type="submit" disabled={isProcessing || !cartSummary.items.length}>
            {isProcessing ? "Processing..." : "Pay with Razorpay"}
          </button>
          {message ? <p className="placeorder__message">{message}</p> : null}
        </form>

        <aside className="placeorder__summary">
          <h3>Order Summary</h3>
          <div className="placeorder__items">
            {cartSummary.items.length ? (
              cartSummary.items.map((item) => (
                <div key={item.foodId} className="placeorder__item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>Rs. {item.price * item.quantity}</span>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          <div className="placeorder__total">
            <span>Total</span>
            <strong>Rs. {cartSummary.total}</strong>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Placeorder;
