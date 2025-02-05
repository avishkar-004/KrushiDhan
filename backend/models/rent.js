const mongoose = require('mongoose');

const rentProductSchema = new mongoose.Schema({
    farmer_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    equipment_name: { type: String, required: true },
    description: { type: String, required: true },
    rent_price_per_day: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    images: { type: [String], default: [] },
    created_at: { type: Date, default: Date.now }
});

const RentProduct = mongoose.model('RentProduct', rentProductSchema);

module.exports = RentProduct;
