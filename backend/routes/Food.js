import express from "express";
import Food from "../models/Food.js";
import { requireClerkAuth } from "../middleware/clerkAuth.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/add", requireClerkAuth, requireAdmin, async (req, res) => {
  try {
    const food = await Food.create(req.body);
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

router.delete("/:id", requireClerkAuth, requireAdmin, async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) {
      return res.status(404).json({ message: "Food not found" });
    }

    return res.json({ message: "Food deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.patch("/:id", requireClerkAuth, requireAdmin, async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedFood) {
      return res.status(404).json({ message: "Food not found" });
    }

    return res.json(updatedFood);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
