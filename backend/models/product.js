const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    shop_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String },
    price_unit: { type: String },
    quantity_unit: { type: String },
    image: { type: String },
    selling_quantities: { type: String },
    created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Product', productSchema);
