const express = require("express");
const app = require("./app");
const db = require("./db");
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const cors = require("cors");
const User = require("./models/users.js");
const jwt = require("jsonwebtoken");
const YieldSell = require("./models/yieldsell.js");
require('dotenv').config({ path: './config/.env' });
require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.use(cors());    
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// Farmer Signup
app.post('/api/farmer/signup', async (req, res) => {
    console.log("Farmer signup route hit with data:", req.body);
    const { first_name, last_name, contact_no, email, password, confirmPassword, street, state, city } = req.body;

    if (!first_name || !last_name || !contact_no || !email || !password || !confirmPassword || !state || !city || !street) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already registered' });
        }

        const newFarmer = new User({
            user_id: "user102",
            first_name, last_name, contact_no, email, password,
            role: 'Farmer',
            location: { street, state, city }
        });

        const savedFarmer = await newFarmer.save();
        res.status(201).json({
            message: 'Farmer registered successfully',
            farmer: {
                user_id: savedFarmer._id,
                first_name: savedFarmer.first_name,
                last_name: savedFarmer.last_name,
                email: savedFarmer.email,
                role: savedFarmer.role,
                location: savedFarmer.location
            }
        });
    } catch (error) {
        console.error('Error during farmer registration:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Farmer Login
app.post('/api/farmer/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const farmer = await User.findOne({ email, role: 'Farmer' });
        if (!farmer) return res.status(404).json({ message: 'Farmer not found' });
        if (farmer.password !== password) return res.status(401).json({ message: 'Invalid credentials' });

        res.status(200).json({
            message: 'Login successful',
            farmer: {
                user_id: farmer._id,
                first_name: farmer.first_name,
                last_name: farmer.last_name,
                email: farmer.email,
                role: farmer.role,
                location: farmer.location
            }
        });
    } catch (error) {
        console.error('Error during farmer login:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Rent Product CRUD
app.post('/api/farmer/addEqp', async (req, res) => {
    const { farmer_id, equipment_name, description, rent_price_per_day, availability, location, images } = req.body;
    if (!farmer_id || !equipment_name || !rent_price_per_day || !location) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const RentProduct = require("./models/rent.js");
        const newRentProduct = new RentProduct({ farmer_id, equipment_name, description, rent_price_per_day, availability, location, images });
        const savedProduct = await newRentProduct.save();
        res.status(201).json({ message: 'Rent product added successfully', product: savedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.get('/api/farmer/SerachEqp', async (req, res) => {
    const { state, city } = req.query;
    try {
        const RentProduct = require("./models/rent.js");
        let query = {};
        if (state) query['location.state'] = state;
        if (city) query['location.city'] = city;
        const products = await RentProduct.find(query);
        if (products.length === 0) return res.status(404).json({ message: "No rent products found" });
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Yield Sell CRUD
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

const server = app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});

process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('Shutting down...');
    process.exit(1);
});
