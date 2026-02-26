const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const router = express.Router();

// ✅ SEED: GET /api/products/seed
router.get("/seed", async (req, res) => {
  try {
    await Product.deleteMany({});

    const seedProducts = [
      { name: "Laptop", price: 60000, category: "Electronics", image: "/images/laptop.png", description: "Slim modern laptop perfect for work and study." },
      { name: "Smart Watch", price: 4999, category: "Electronics", image: "/images/smartwatch.png", description: "Track fitness, calls and notifications." },
      { name: "Wireless Headphones", price: 2499, category: "Electronics", image: "/images/headphones.png", description: "Noise cancelling over-ear headphones." },
      { name: "Gaming Keyboard", price: 3499, category: "Electronics", image: "/images/keyboard.png", description: "Mechanical keyboard for gaming and typing." },
      { name: "Monitor", price: 12999, category: "Electronics", image: "/images/monitor.png", description: "Full HD monitor for work and entertainment." },
      { name: "Wireless Mouse", price: 999, category: "Electronics", image: "/images/mouse.png", description: "Ergonomic wireless mouse for daily use." },
      { name: "Bluetooth Speaker", price: 1799, category: "Electronics", image: "/images/speaker.png", description: "Portable speaker with punchy sound." },
      { name: "Webcam", price: 1299, category: "Electronics", image: "/images/webcam.png", description: "HD webcam for online classes and meetings." }
    ];

    const created = await Product.insertMany(seedProducts);
    res.json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ CREATE: POST /api/products
router.post("/", async (req, res) => {
  try {
    const created = await Product.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ READ ALL: GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products); // IMPORTANT: returns ARRAY for products.map
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ READ ONE: GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid product id" });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ UPDATE: PUT /api/products/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid product id" });

    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE: DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid product id" });

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;