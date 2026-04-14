import React, { useState } from "react";
import { StoreContext } from "./StoreContext";
import { food_list } from "../assets/assets";

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [searchText, setSearchText] = useState("");

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const updated = { ...prev, [itemId]: prev[itemId] - 1 };
      if (updated[itemId] <= 0) delete updated[itemId];
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  const getTotalCartAmount = () => {
    let total = 0;

    Object.entries(cartItems).forEach(([itemId, quantity]) => {
      const item = food_list.find((food) => food._id === itemId);
      if (item) {
        total += item.price * quantity;
      }
    });

    return total;
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  };

  const contextValue = {
    food_list,
    cartItems,
    searchText,
    setSearchText,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
