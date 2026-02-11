const rawApiUrl =
  import.meta.env.VITE_API_URL || "https://food-delivary-3zmq.onrender.com";

export const API_BASE_URL = rawApiUrl.replace(/\/+$/, "");
