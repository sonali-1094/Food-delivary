import express from "express";
import Order from "../models/Order.js";
import { requireClerkAuth } from "../middleware/clerkAuth.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { requireShopkeeperOrAdmin } from "../middleware/roleAuth.js";

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

// Shopkeeper: see own accepted orders and open orders waiting for a shopkeeper.
router.get("/shopkeeper", requireClerkAuth, requireShopkeeperOrAdmin, async (req, res) => {
  try {
    const shopkeeperId = req.auth?.userId;
    const orders = await Order.find({
      $or: [
        { shopkeeperId },
        { shopkeeperId: "" },
        { shopkeeperId: { $exists: false } }
      ],
      status: { $ne: "Cancelled" }
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Shopkeeper: accept an unassigned order.
router.patch("/:id/accept", requireClerkAuth, requireShopkeeperOrAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.shopkeeperId && order.shopkeeperId !== req.auth?.userId) {
      return res.status(409).json({ message: "Order already accepted by another shopkeeper" });
    }

    order.shopkeeperId = req.auth.userId;
    order.shopName = req.body.shopName || req.staffEmail || "Shopkeeper";
    order.status = "Accepted";
    await order.save();

    return res.json({ message: "Order accepted", order });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Shopkeeper: update only their accepted order status.
router.patch("/:id/shopkeeper-status", requireClerkAuth, requireShopkeeperOrAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["Accepted", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Allowed values: ${allowedStatuses.join(", ")}`
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (req.staffRole !== "admin" && order.shopkeeperId !== req.auth?.userId) {
      return res.status(403).json({ message: "You can update only your accepted orders" });
    }

    order.status = status;
    await order.save();

    return res.json({ message: "Shopkeeper order status updated", order });
  } catch (err) {
    return res.status(500).json({ error: err.message });
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
    const allowedStatuses = ["Pending", "Accepted", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];

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
