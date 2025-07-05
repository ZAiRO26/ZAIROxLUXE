const express = require('express');
const Order = require('../models/Order');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const { sendOrderConfirmation } = require('../utils/mailer');

const router = express.Router();

// Place order
router.post('/', requireAuth, async (req, res) => {
  try {
    const { products, total, shipping, coupon, discount, paymentIntentId } = req.body;
    
    const order = new Order({
      user: req.user.id,
      products,
      total,
      shipping,
      coupon,
      discount: discount || 0,
      paymentIntentId,
      status: 'pending'
    });
    
    await order.save();
    
    // Send confirmation email
    try {
      await sendOrderConfirmation(req.user.email, order);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }
    
    res.status(201).json(order);
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get orders for a user
router.get('/user/:userId', requireAuth, async (req, res) => {
  try {
    // Ensure user can only access their own orders
    if (req.user.id !== req.params.userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const orders = await Order.find({ user: req.params.userId })
      .populate('products.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Get user orders error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all orders (admin only)
router.get('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('products.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Get all orders error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single order
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('products.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Ensure user can only access their own orders (unless admin)
    if (order.user._id.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(order);
  } catch (err) {
    console.error('Get order error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status (admin only)
router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    ).populate('user', 'name email').populate('products.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (err) {
    console.error('Update order error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel order (user can cancel their own pending orders)
router.put('/:id/cancel', requireAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Ensure user can only cancel their own orders
    if (order.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Only allow cancellation of pending orders
    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Order cannot be cancelled' });
    }
    
    order.status = 'cancelled';
    await order.save();
    
    res.json(order);
  } catch (err) {
    console.error('Cancel order error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 