const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true }, // percent (e.g., 10 for 10%)
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema); 