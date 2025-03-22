import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true); // Default: Sidebar Open

  return (
    <div style={styles.container}>
      {/* Sidebar Navigation */}
      <div style={{ ...styles.sidebar, width: isOpen ? "250px" : "60px" }}>
        <button style={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>

        <div style={styles.logoContainer}>
          <Link to="/" style={styles.logo}>🌿 {isOpen && "कृषिबंधू"}</Link>
        </div>

        <ul style={styles.navLinks}>
          <li><Link to="/" style={styles.link}>🏠 {isOpen && "Home"}</Link></li>
          <li><Link to="/weather" style={styles.link}>☁️ {isOpen && "Weather"}</Link></li>
          <li><Link to="/schemes" style={styles.link}>🏛️ {isOpen && "Schemes"}</Link></li>
          <li><Link to="/ecommerce" style={styles.link}>🛒 {isOpen && "E-commerce"}</Link></li>
          <li><Link to="/market-price" style={styles.link}>📊 {isOpen && "Market Price"}</Link></li>
          <li><Link to="/crop-disease-detect" style={styles.link}>🩺 {isOpen && "Disease Detection"}</Link></li>
          <li><Link to="/FertilizerDealer" style={styles.link}>🌾 {isOpen && "Fertilizer Dealer"}</Link></li>
          <li><Link to="/news" style={styles.link}>📰 {isOpen && "News"}</Link></li>
          <li><Link to="/loans" style={styles.link}>💰 {isOpen && "Loans"}</Link></li>
          <li><Link to="/YieldSellForm" style={styles.link}>🌱 {isOpen && "Yield Sell"}</Link></li>
          <li><Link to="/RentProductForm" style={styles.link}>🚜 {isOpen && "Rent Product"}</Link></li>
          <li><Link to="/cold-storages" style={styles.link}>🚜 {isOpen && "cold-storages locator"}</Link></li>

        </ul>
      </div>
    </div>
  );
};

// ✅ Styles for Sidebar Navigation
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    position: "fixed",
    top: "0",
    left: "0",
  },
  sidebar: {
    height: "100vh",
    background: "#2E8B57",
    color: "white",
    padding: "20px 10px",
    position: "fixed",
    left: "0",
    top: "0",
    transition: "width 0.3s ease",
    boxShadow: "2px 0px 10px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  toggleButton: {
    background: "transparent",
    color: "white",
    fontSize: "22px",
    border: "none",
    cursor: "pointer",
    marginBottom: "10px",
    transition: "0.3s",
  },
  logoContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  logo: {
    textDecoration: "none",
    color: "white",
    fontSize: "22px",
    fontWeight: "bold",
  },
  navLinks: {
    listStyle: "none",
    padding: "0",
    width: "100%",
  },
  link: {
    textDecoration: "none",
    color: "white",
    padding: "12px",
    display: "flex",
    alignItems: "center",
    borderRadius: "5px",
    transition: "0.3s",
    fontSize: "16px",
    width: "100%",
  },
};

// Responsive Styling for Mobile
styles.sidebar['@media (max-width: 768px)'] = {
  width: "60px",
};
styles.navLinks['@media (max-width: 768px)'] = {
  display: "flex",
  flexDirection: "column",
};
styles.link['@media (max-width: 768px)'] = {
  justifyContent: "center",
};

export default Navbar;
