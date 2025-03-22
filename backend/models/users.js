const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: String, unique: true, required: true },  // Replaced ip_address with user_id
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  contact_no: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Admin', 'Farmer'],   // Enum for role
    default: 'Farmer'             // Default role is Farmer
  },
  location: {
    state: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true }
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
