import React, { useState, useEffect } from "react";
import axios from "axios";

const MarketPrice = () => {
  const [marketData, setMarketData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedMarket, setSelectedMarket] = useState("All");
  const [selectedCommodity, setSelectedCommodity] = useState("All");
  const [sortOption, setSortOption] = useState("");

  const API_URL = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001987c65666f9c49656f0f9ef4fa3650e7&format=json&offset=0&limit=8000";

  useEffect(() => {
    fetchMarketPrices();
  }, []);

  const fetchMarketPrices = async () => {
    try {
      const response = await axios.get(API_URL);
      setMarketData(response.data.records);
      setFilteredData(response.data.records);
    } catch (error) {
      console.error("Error fetching market prices:", error);
    }
  };

  useEffect(() => {
    let data = marketData;

    if (selectedState !== "All") {
      data = data.filter((item) => item.state === selectedState);
    }
    if (selectedMarket !== "All") {
      data = data.filter((item) => item.market === selectedMarket);
    }
    if (selectedCommodity !== "All") {
      data = data.filter((item) => item.commodity === selectedCommodity);
    }
    if (searchQuery) {
      data = data.filter((item) =>
        item.commodity.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === "min_price") {
      data.sort((a, b) => a.min_price - b.min_price);
    } else if (sortOption === "max_price") {
      data.sort((a, b) => a.max_price - b.max_price);
    } else if (sortOption === "modal_price") {
      data.sort((a, b) => a.modal_price - b.modal_price);
    }

    setFilteredData(data);
  }, [searchQuery, selectedState, selectedMarket, selectedCommodity, sortOption]);

  const states = ["All", ...new Set(marketData.map((item) => item.state))];
  const markets = ["All", ...new Set(marketData.map((item) => item.market))];
  const commodities = ["All", ...new Set(marketData.map((item) => item.commodity))];

  return (
    <div style={styles.container}>
      <h1>📊 Market Prices</h1>

      {/* Search & Filter Section */}
      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="🔍 Search Commodity..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />

        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} style={styles.select}>
          {states.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>

        <select value={selectedMarket} onChange={(e) => setSelectedMarket(e.target.value)} style={styles.select}>
          {markets.map((market, index) => (
            <option key={index} value={market}>{market}</option>
          ))}
        </select>

        <select value={selectedCommodity} onChange={(e) => setSelectedCommodity(e.target.value)} style={styles.select}>
          {commodities.map((commodity, index) => (
            <option key={index} value={commodity}>{commodity}</option>
          ))}
        </select>

        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} style={styles.select}>
          <option value="">Sort By</option>
          <option value="min_price">Min Price</option>
          <option value="max_price">Max Price</option>
          <option value="modal_price">Modal Price</option>
        </select>
      </div>

      {/* Market Price Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>State</th>
              <th>Market</th>
              <th>Commodity</th>
              <th>Arrival Date</th>
              <th style={styles.priceColumn}>Min Price (₹)</th>
              <th style={styles.priceColumn}>Max Price (₹)</th>
              <th style={styles.priceColumn}>Modal Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} style={index % 2 === 0 ? styles.stripedRow : {}}>
                  <td>{item.state}</td>
                  <td>{item.market}</td>
                  <td>{item.commodity}</td>
                  <td>{item.arrival_date}</td>
                  <td style={styles.priceData}>₹{item.min_price}</td>
                  <td style={styles.priceData}>₹{item.max_price}</td>
                  <td style={styles.priceData}>₹{item.modal_price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={styles.noData}>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Updated Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  searchInput: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "250px",
    boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
  },
  select: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
    cursor: "pointer",
  },
  tableContainer: {
    overflowX: "auto",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
    padding: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    background: "#2E86C1",
    color: "#fff",
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
    position: "sticky",
    top: "0",
  },
  priceColumn: {
    background: "#FFA726",
    color: "#fff",
  },
  priceData: {
    fontWeight: "bold",
    color: "#2E7D32",
  },
  stripedRow: {
    backgroundColor: "#f9f9f9",
  },
  noData: {
    textAlign: "center",
    padding: "15px",
    fontWeight: "bold",
    fontSize: "18px",
    color: "#FF5722",
  },
};

export default MarketPrice;
