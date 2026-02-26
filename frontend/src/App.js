import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./components/ProductCard";
import "./App.css";

const API_BASE = "http://localhost:5000/api/products";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  // ✅ prevents double-run / repeated fetch
  const didFetch = useRef(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    fetchProducts();
  }, []);

  const handleSeed = async () => {
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/seed`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      alert("Seed failed");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    setBusy(true);
    try {
      await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page">
      <h1 className="heading">Product Management System</h1>

      <div className="topBar">
        <button className="btn" onClick={fetchProducts} disabled={busy}>
          Refresh
        </button>
        <button className="btn ghost" onClick={handleSeed} disabled={busy}>
          Seed 8 Products
        </button>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div className="list">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}