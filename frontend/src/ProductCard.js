function ProductCard({ name, price, category, description }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "16px",
      borderRadius: "10px",
      marginBottom: "15px",
      backgroundColor: "#fff"
    }}>
      <h3>{name}</h3>
      <p><strong>Category:</strong> {category}</p>
      <p>{description}</p>
      <p><strong>Price:</strong> ₹{price}</p>
    </div>
  );
}

export default ProductCard;