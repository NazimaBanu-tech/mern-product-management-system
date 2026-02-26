import React from "react";

function ProductCard({ product, onDelete }) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p>{product.description}</p>
      <h4>₹{product.price}</h4>
      <button onClick={() => onDelete(product._id)}>
        Delete
      </button>
    </div>
  );
}

export default ProductCard;