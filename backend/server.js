import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.js";
import foodRoutes from "./routes/Food.js";
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";

const app = express();
app.use(cors());
app.use("/api/payment/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("GharSeBite healthy Indian tiffin backend running");
});

const PORT = process.env.PORT || 5000;
let isDbConnected = false;

app.get("/api/health", (req, res) => {
  res.json({
    app: "GharSeBite API",
    dbConnected: isDbConnected,
  });
});

const startServer = async () => {
  try {
    isDbConnected = await connectDB();
  } catch (error) {
    console.error(error.message);
    console.warn(
      "Server will keep running, but database-backed APIs will fail until MongoDB connects."
    );
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
