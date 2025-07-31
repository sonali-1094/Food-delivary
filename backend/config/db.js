const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Railway requires SSL
});

pool.connect()
  .then(() => console.log("✅ Connected to Railway Postgres"))
  .catch(err => console.error("❌ Database connection error:", err));

module.exports = pool;
