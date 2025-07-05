# RAANA - Luxury Fashion E-commerce Platform

A sophisticated, luxury-themed e-commerce platform inspired by high-end fashion brands, built with modern web technologies.

## 🚀 Features

### Customer Features
- **Luxury Product Catalog** - Curated collection of high-end fashion items
- **Advanced Product Filtering** - Search by category, price, brand, colors, sizes
- **Shopping Cart & Checkout** - Seamless shopping experience with Stripe payments
- **User Authentication** - Secure login/registration system
- **Order Management** - Track orders and view order history
- **Newsletter Subscription** - Stay updated with latest collections
- **Coupon System** - Exclusive discounts for loyal customers

### Admin Features
- **Product Management** - Add, edit, delete products with rich metadata
- **Order Management** - Process orders, update status, track inventory
- **Customer Management** - View customer data and order history
- **Analytics Dashboard** - Sales metrics and business insights
- **Coupon Management** - Create and manage promotional codes

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for luxury styling
- **React Router** for navigation
- **Stripe Elements** for secure payments
- **Context API** for state management

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Stripe** for payment processing
- **Nodemailer** for email notifications
- **bcryptjs** for password hashing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Stripe account for payments

### Backend Setup
```bash
cd backend
npm install
cp env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup
```bash
cd gucci-clone
npm install
cp env.example .env
# Edit .env with your configuration
npm start
```

## 🔧 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/raana-store
JWT_SECRET=your-super-secret-jwt-key-here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=5000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

## 🏗 Project Structure

```
GUCCIxRAANA/
├── backend/                 # Node.js API server
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Authentication & validation
│   ├── utils/              # Helper functions
│   └── index.js            # Server entry point
├── gucci-clone/            # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # State management
│   │   ├── utils/          # API utilities
│   │   └── App.tsx         # Main app component
│   └── public/             # Static assets
└── README.md
```

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List products with filtering
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders` - Get all orders (admin)
- `PUT /api/orders/:id` - Update order status (admin)

### Payments
- `POST /api/payment/create-intent` - Create Stripe payment intent
- `POST /api/payment/webhook` - Stripe webhook handler

### Newsletter & Coupons
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/coupons/validate` - Validate coupon code

## 🎨 Design Philosophy

RAANA embodies luxury fashion aesthetics with:
- **Minimalist Design** - Clean, sophisticated layouts
- **Premium Typography** - Elegant font choices
- **High-Quality Imagery** - Professional product photography
- **Responsive Design** - Seamless experience across devices
- **Smooth Animations** - Subtle, elegant interactions

## 🔒 Security Features

- **JWT Authentication** - Secure user sessions
- **Password Hashing** - bcryptjs for password security
- **Input Validation** - Comprehensive data validation
- **CORS Protection** - Cross-origin request security
- **Stripe Security** - PCI-compliant payment processing

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices
- High-resolution displays

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Deploy to Heroku, Vercel, or AWS
4. Set up Stripe webhooks

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to Vercel, Netlify, or AWS S3
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team.

---

**RAANA** - Where luxury meets technology. ✨ 