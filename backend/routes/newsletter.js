const express = require('express');
const Subscriber = require('../models/Subscriber');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    const existing = await Subscriber.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Already subscribed' });
    const subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// List all subscribers (admin only)
router.get('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 