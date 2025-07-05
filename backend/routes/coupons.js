const express = require('express');
const Coupon = require('../models/Coupon');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Create coupon (admin only)
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { code, discount, expiresAt } = req.body;
    const coupon = new Coupon({ code, discount, expiresAt });
    await coupon.save();
    res.status(201).json(coupon);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Validate coupon (public)
router.post('/validate', async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ code });
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
    if (coupon.expiresAt < new Date()) return res.status(400).json({ message: 'Coupon expired' });
    res.json({ valid: true, discount: coupon.discount });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// List all coupons (admin only)
router.get('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 