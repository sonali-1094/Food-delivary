import express from "express";
import Order from "../models/Order.js";
import { requireClerkAuth } from "../middleware/clerkAuth.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

// Place order
router.post("/place", requireClerkAuth, async (req, res) => {
  try {
    const userId = req.auth?.userId;
    const { items, totalAmount, address } = req.body;

    const order = await Order.create({
      userId,
      items,
      totalAmount,
      address,
    });

    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user orders
router.get("/user/:id", requireClerkAuth, async (req, res) => {
  try {
    if (req.auth?.userId !== req.params.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const orders = await Order.find({ userId: req.params.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: get all orders
router.get("/", requireClerkAuth, requireAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: update order status
router.patch("/:id/status", requireClerkAuth, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["Pending", "Preparing", "Delivered", "Cancelled"];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Allowed values: ${allowedStatuses.join(", ")}`
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    return res.json({ message: "Order status updated", order });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
