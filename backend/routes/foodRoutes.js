const express = require("express");
const router = express.Router();
const pool = require("../db");

// Create table if it doesn’t exist
pool.query(`
  CREATE TABLE IF NOT EXISTS foods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    description TEXT,
    image TEXT
  )
`);

// Add new food item
router.post("/", async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    const result = await pool.query(
      "INSERT INTO foods (name, price, description, image) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, price, description, image]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all food items
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM foods");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
