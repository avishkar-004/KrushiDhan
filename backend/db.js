const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/pikvardhan';

mongoose.connect(mongoUrl, {});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('successfully connected to mongodb server');
});

db.on('error', (err) => {
    console.log('Error occured: ', err);
});

module.exports = db;
