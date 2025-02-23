const mongoose = require('mongoose');
const shopSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    shop_name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    location: { state: { type: String }, city: { type: String }, street: { type: String } },
    created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Shop', shopSchema);
