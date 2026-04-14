import express from "express";
import Food from "../models/Food.js";
import { requireClerkAuth } from "../middleware/clerkAuth.js";
import { requireShopkeeperOrAdmin } from "../middleware/roleAuth.js";

const router = express.Router();

router.post("/add", requireClerkAuth, requireShopkeeperOrAdmin, async (req, res) => {
  try {
    const food = await Food.create({
      ...req.body,
      shopkeeperId: req.body.shopkeeperId || req.auth.userId,
      shopName: req.body.shopName || req.staffEmail || ""
    });
    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", requireClerkAuth, requireShopkeeperOrAdmin, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    if (req.staffRole !== "admin" && food.shopkeeperId !== req.auth.userId) {
      return res.status(403).json({ message: "You can delete only your own food items" });
    }

    await food.deleteOne();
    return res.json({ message: "Food deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.patch("/:id", requireClerkAuth, requireShopkeeperOrAdmin, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    if (req.staffRole !== "admin" && food.shopkeeperId !== req.auth.userId) {
      return res.status(403).json({ message: "You can update only your own food items" });
    }

    Object.assign(food, req.body);
    await food.save();
    return res.json(food);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
