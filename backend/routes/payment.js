const express = require('express');
const Stripe = require('stripe');
const Order = require('../models/Order');
const router = express.Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create payment intent
router.post('/create-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', metadata = {} } = req.body;
    
    if (!amount || amount < 50) { // Minimum 50 cents
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id 
    });
  } catch (err) {
    console.error('Payment intent creation error:', err);
    res.status(500).json({ message: 'Payment error', error: err.message });
  }
});

// Stripe webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object);
        break;
      case 'charge.refunded':
        await handleRefund(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', err);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

// Handle successful payment
async function handlePaymentSuccess(paymentIntent) {
  try {
    const order = await Order.findOne({ paymentIntentId: paymentIntent.id });
    if (order) {
      order.status = 'processing';
      await order.save();
      console.log(`Order ${order._id} payment confirmed`);
    }
  } catch (err) {
    console.error('Error updating order status:', err);
  }
}

// Handle failed payment
async function handlePaymentFailure(paymentIntent) {
  try {
    const order = await Order.findOne({ paymentIntentId: paymentIntent.id });
    if (order) {
      order.status = 'cancelled';
      await order.save();
      console.log(`Order ${order._id} payment failed`);
    }
  } catch (err) {
    console.error('Error updating order status:', err);
  }
}

// Handle refund
async function handleRefund(charge) {
  try {
    const order = await Order.findOne({ paymentIntentId: charge.payment_intent });
    if (order) {
      order.status = 'cancelled';
      await order.save();
      console.log(`Order ${order._id} refunded`);
    }
  } catch (err) {
    console.error('Error updating order status:', err);
  }
}

// Get payment status
router.get('/status/:paymentIntentId', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.paymentIntentId);
    res.json({ status: paymentIntent.status });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving payment status' });
  }
});

module.exports = router; 