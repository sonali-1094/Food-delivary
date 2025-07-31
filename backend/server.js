const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const pool = require("./db"); // ✅ Import db.js

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "🍔 Food Delivery API running", time: new Date() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
