import React, { useState } from "react";
import AddProduct from "./RentProduct"; // Component for adding products
import ViewProduct from "./RentProductList"; // Component for viewing products

const Ecommerce = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <div style={styles.container}>
      <h1>🛍️ E-commerce for Farmers</h1>

      {/* Buttons to Toggle Components */}
      <div style={styles.buttonContainer}>
        <button onClick={() => setActiveComponent("add")} style={styles.button}>➕ Add Product</button>
        <button onClick={() => setActiveComponent("view")} style={styles.button}>👀 View Products</button>
      </div>

      {/* Conditional Rendering */}
      <div style={styles.componentContainer}>
        {activeComponent === "add" && <AddProduct />}
        {activeComponent === "view" && <ViewProduct />}
      </div>
    </div>
  );
};

// Styles for UI
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#2E8B57",
    color: "white",
    transition: "0.3s",
  },
  componentContainer: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
  },
};

export default Ecommerce;
