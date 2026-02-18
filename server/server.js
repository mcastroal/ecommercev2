require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// GET /api/products?type=Electronics&minPrice=0&maxPrice=200
app.get("/api/products", async (req, res) => {
  try {
    const { type, minPrice, maxPrice } = req.query;

    let sql = "SELECT * FROM products WHERE 1=1";
    const params = [];

    if (type && type !== "All") {
      sql += " AND type = ?";
      params.push(type);
    }

    if (minPrice !== undefined && minPrice !== "") {
      sql += " AND price >= ?";
      params.push(Number(minPrice));
    }

    if (maxPrice !== undefined && maxPrice !== "") {
      sql += " AND price <= ?";
      params.push(Number(maxPrice));
    }

    sql += " ORDER BY createdAt DESC";

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// For building your type dropdown
app.get("/api/types", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT DISTINCT type FROM products");
    res.json(rows.map((r) => r.type));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
