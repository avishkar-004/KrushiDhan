const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const multer = require('multer');
const YieldSell = require("./models/yieldsell.js");
require('dotenv').config({ path: './config/.env' });
require("dotenv").config();
const db = require("./db.js");
const RentProduct = require("./models/rent.js");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/uploads', express.static('uploads'));
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });
app.use(cors());

db.on('connected', () => {
    console.log('successfully connected to mongodb server');
});

const loadJSONData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading JSON file:", filePath, error);
        return [];
    }
};

// Rent Products API
app.post('/api/rentproducts/add', async (req, res) => {
    const { farmer_id, equipment_name, description, rent_price_per_day, start_date, end_date, street, city, state, images } = req.body;
    if (!farmer_id) return res.status(400).json({ message: 'Farmer ID is required' });
    if (!equipment_name) return res.status(400).json({ message: 'Equipment name is required' });
    if (!rent_price_per_day) return res.status(400).json({ message: 'Rent price per day is required' });

    try {
        const newProduct = new RentProduct({ farmer_id, equipment_name, description, rent_price_per_day, start_date, end_date, street, city, state, images: images || [] });
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Rent product added successfully', product: savedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Yield Sell API
app.post('/api/farmer/yieldadd', async (req, res) => {
    const { farmer_id, crop_name, description, price_per_kg, quantity, location, images } = req.body;
    if (!farmer_id || !crop_name || !price_per_kg || !quantity || !location) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const newYieldSell = new YieldSell({ farmer_id, crop_name, description, price_per_kg, quantity, location, images });
        const savedYield = await newYieldSell.save();
        res.status(201).json({ message: 'Yield added successfully', yield: savedYield });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.get('/api/farmer/getallyield', async (req, res) => {
    const { state, city } = req.query;
    try {
        let query = {};
        if (state) query['location.state'] = state;
        if (city) query['location.city'] = city;
        const yields = await YieldSell.find(query);
        if (yields.length === 0) return res.status(404).json({ message: "No yield products found" });
        res.status(200).json({ yields });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Data APIs
const dealersFilePath = path.join(__dirname, "dealers.json");
const loansFilePath = path.join(__dirname, "loans.json");
const cold_sto = path.join(__dirname, "ColdStore.json");

app.get("/api/dealers", (req, res) => {
    try {
        let data = loadJSONData(dealersFilePath);
        data.sort((a, b) => (a.State || "").localeCompare(b.State || "") || (a.City || "").localeCompare(b.City || ""));
        const uniqueStates = [...new Set(data.map((item) => item.State).filter(Boolean))];
        res.json({ dealers: data, uniqueStates });
    } catch (error) {
        res.status(500).json({ error: "Failed to load dealer data" });
    }
});

app.get("/api/dealers/:state", (req, res) => {
    try {
        const state = req.params.state.toLowerCase();
        let data = loadJSONData(dealersFilePath);
        const filteredData = data.filter(item => (item.State || "").toLowerCase() === state);
        filteredData.sort((a, b) => (a.City || "").localeCompare(b.City || ""));
        const uniqueCities = [...new Set(filteredData.map((item) => item.City).filter(Boolean))];
        res.json({ dealers: filteredData, uniqueCities });
    } catch (error) {
        res.status(500).json({ error: "Failed to load dealer data" });
    }
});

app.get("/api/dealers/:state/:city", (req, res) => {
    try {
        const { state, city } = req.params;
        let data = loadJSONData(dealersFilePath);
        const filteredData = data.filter((item) => (item.State || "").toLowerCase() === state.toLowerCase() && (item.City || "").toLowerCase() === city.toLowerCase());
        res.json({ dealers: filteredData });
    } catch (error) {
        res.status(500).json({ error: "Failed to load dealer data" });
    }
});

app.get("/api/loans", (req, res) => {
    try {
        const data = loadJSONData(loansFilePath);
        res.json({ loans: data });
    } catch (error) {
        res.status(500).json({ error: "Failed to load loan data" });
    }
});

app.get("/api/cold-stores", (req, res) => {
    try {
        const data = loadJSONData(cold_sto);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to load cold store data" });
    }
});

app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
});
