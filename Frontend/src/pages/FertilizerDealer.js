import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/dealers"; // Backend URL

function App() {
  const [dealers, setDealers] = useState([]); // Stores dealer data
  const [states, setStates] = useState([]); // Stores unique state names
  const [cities, setCities] = useState([]); // Stores unique city names
  const [selectedState, setSelectedState] = useState(""); // Selected state
  const [selectedCity, setSelectedCity] = useState(""); // Selected city
  const [filteredDealers, setFilteredDealers] = useState([]); // Filtered dealers based on selection

  // Fetch all dealers and unique states on component mount
  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setDealers(response.data.dealers);
        setStates(response.data.uniqueStates);
        setFilteredDealers(response.data.dealers);
      })
      .catch(error => console.error("Error fetching dealers:", error));
  }, []);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      axios.get(`${API_URL}/${selectedState}`)
        .then(response => {
          setCities(response.data.uniqueCities);
          setFilteredDealers(response.data.dealers);
          setSelectedCity(""); // Reset city selection
        })
        .catch(error => console.error("Error fetching cities:", error));
    } else {
      setCities([]); // Reset cities if no state is selected
      setFilteredDealers(dealers); // Show all dealers
    }
  }, [selectedState]);

  // Fetch dealers when a city is selected
  useEffect(() => {
    if (selectedCity && selectedState) {
      axios.get(`${API_URL}/${selectedState}/${selectedCity}`)
        .then(response => {
          setFilteredDealers(response.data.dealers);
        })
        .catch(error => console.error("Error fetching dealers:", error));
    }
  }, [selectedCity, selectedState]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Fertilizer Dealer Directory</h2>

      {/* Filters */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {/* State Selection */}
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">Select State</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* City Selection (Disabled until a state is selected) */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Dealer Data Table */}
      <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>State</th>
            <th>City</th>
            <th>Dealer Name</th>
            <th>Contact</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {filteredDealers.length > 0 ? (
            filteredDealers.map((dealer, index) => (
              <tr key={index}>
                <td>{dealer.State}</td>
                <td>{dealer.City}</td>
                <td>{dealer["Dealer Name"]}</td>
                <td>{dealer["Mobile No"] || "N/A"}</td>
                <td>{dealer.Address || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No dealers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
