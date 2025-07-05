const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOrderConfirmation(to, order) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your Order Confirmation',
    html: `<h2>Thank you for your order!</h2>
      <p>Order ID: ${order._id}</p>
      <p>Total: $${order.total}</p>
      <p>Status: ${order.status}</p>
      <p>We appreciate your business.</p>`
  };
  await transporter.sendMail(mailOptions);
}

module.exports = { sendOrderConfirmation }; 