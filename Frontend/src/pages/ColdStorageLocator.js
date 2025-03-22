import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Leaflet CSS
import "leaflet/dist/leaflet.css";

// Custom Cold Storage Marker Icon
const coldStorageIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});

// Function to Set the Map Center Dynamically
const SetMapCenter = ({ center }) => {
  const map = useMap();
  map.setView(center, 12);
  return null;
};

const ColdStorageLocator = () => {
  const [storages, setStorages] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyStorages, setNearbyStorages] = useState([]);

  const API_URL = "http://localhost:5000/api/cold-stores"; // Replace with backend API

  useEffect(() => {
    fetchColdStorages();
    getUserLocation();
  }, []);

  // Fetch Cold Storages from API
  const fetchColdStorages = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("Cold Storages API Response:", response.data);

      const data = Array.isArray(response.data) ? response.data : response.data.records || [];
      setStorages(data);
    } catch (error) {
      console.error("Error fetching cold storages:", error);
    }
  };

  // Get User's Current Location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log("User Location:", lat, lon);
          setUserLocation({ lat, lon });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Calculate Distance Between Two Coordinates (Haversine Formula)
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Filter Nearby Cold Storages (Within 10KM)
  useEffect(() => {
    if (userLocation && storages.length > 0) {
      const nearby = storages.filter((storage) => {
        const distance = getDistance(
          userLocation.lat,
          userLocation.lon,
          parseFloat(storage.Latitude),
          parseFloat(storage.Longitude)
        );
        return distance <= 10;
      });

      console.log("Nearby Cold Storages:", nearby);
      setNearbyStorages(nearby);
    }
  }, [userLocation, storages]);

  return (
    <div style={styles.container}>
      <h1>🗺️ Cold Storage Locator</h1>

      {/* Map Section */}
      {userLocation ? (
        <MapContainer center={[userLocation.lat, userLocation.lon]} zoom={12} style={styles.map}>
          <SetMapCenter center={[userLocation.lat, userLocation.lon]} />

          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* User's Location Marker */}
          <Marker position={[userLocation.lat, userLocation.lon]} icon={L.icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", iconSize: [30, 30] })}>
            <Popup>📍 You are here</Popup>
          </Marker>

          {/* Cold Storage Markers */}
          {Array.isArray(storages) && storages.length > 0 ? (
            storages.map((storage, index) => (
              <Marker key={index} position={[parseFloat(storage.Latitude), parseFloat(storage.Longitude)]} icon={coldStorageIcon}>
                <Popup>
                  <h3>{storage["Storage name"]}</h3>
                  <p><b>📍 Address:</b> {storage.Address}</p>
                  <p><b>📦 Capacity:</b> {storage["Capacity in MT"]} MT</p>
                </Popup>
              </Marker>
            ))
          ) : (
            <p>Loading Cold Storages...</p>
          )}
        </MapContainer>
      ) : (
        <p>Fetching your location...</p>
      )}

      {/* Nearby Cold Storages */}
      {userLocation && nearbyStorages.length > 0 && (
        <div style={styles.nearbyContainer}>
          <h2>🚚 Nearby Cold Storages (Within 10KM)</h2>
          {nearbyStorages.map((storage, index) => (
            <div key={index} style={styles.card}>
              <h3>{storage["Storage name"]}</h3>
              <p><b>📍 Address:</b> {storage.Address}</p>
              <p><b>📦 Capacity:</b> {storage["Capacity in MT"]} MT</p>
              <p><b>🗺️ Distance:</b> ~{getDistance(userLocation.lat, userLocation.lon, parseFloat(storage.Latitude), parseFloat(storage.Longitude)).toFixed(2)} km</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ✅ Styling for a Beautiful UI
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  map: {
    height: "500px",
    width: "90%",
    margin: "20px auto",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
  },
  nearbyContainer: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    margin: "20px auto",
    width: "80%",
  },
  card: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
    margin: "10px 0",
  },
};

export default ColdStorageLocator;
