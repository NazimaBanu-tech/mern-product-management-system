require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("./models/Product");

const app = express();

app.use(cors());
app.use(express.json());

// ---------------- MongoDB Connection ----------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("Mongo Error ❌", err.message));

// ---------------- Root ----------------
app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

// =====================================================
// IMPORTANT: Seed & Clear routes must be BEFORE /:id
// =====================================================

// ---------------- Seed Products ----------------
app.get("/api/products/seed", async (req, res) => {
  try {
    await Product.deleteMany({});

    const products = [
      {
        name: "Laptop",
        price: 60000,
        category: "Electronics",
        description: "Slim modern laptop for work and study."
      },
      {
        name: "Smart Watch",
        price: 4999,
        category: "Electronics",
        description: "Track fitness and notifications."
      },
      {
        name: "Wireless Headphones",
        price: 2499,
        category: "Electronics",
        description: "Comfortable over-ear headphones."
      },
      {
        name: "Gaming Keyboard",
        price: 3499,
        category: "Electronics",
        description: "Mechanical keyboard with RGB lighting."
      },
      {
        name: "Monitor",
        price: 12999,
        category: "Electronics",
        description: "Full HD display monitor."
      },
      {
        name: "Wireless Mouse",
        price: 999,
        category: "Electronics",
        description: "Ergonomic wireless mouse."
      },
      {
        name: "Bluetooth Speaker",
        price: 1799,
        category: "Electronics",
        description: "Portable speaker with strong bass."
      },
      {
        name: "AirPods",
        price: 10999,
        category: "Electronics",
        description: "Wireless earbuds with clean sound."
      }
    ];

    const created = await Product.insertMany(products);
    res.json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------------- Clear Products ----------------
app.get("/api/products/clear", async (req, res) => {
  await Product.deleteMany({});
  res.json({ message: "All products deleted" });
});

// ---------------- Create ----------------
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------------- Read All ----------------
app.get("/api/products", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// ---------------- Read One ----------------
app.get("/api/products/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });

  res.json(product);
});

// ---------------- Delete ----------------
app.delete("/api/products/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  const deleted = await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted", deleted });
});

// ---------------- Start Server ----------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});