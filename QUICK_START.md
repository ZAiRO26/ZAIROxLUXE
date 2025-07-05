# 🚀 RAANA Quick Start Guide

Get your luxury fashion e-commerce platform running in minutes!

## ⚡ Quick Setup

### 1. Install Dependencies
```bash
# Install all dependencies (frontend + backend)
npm run install-all
```

### 2. Environment Setup
```bash
# Backend
cd backend
cp env.example .env
# Edit .env with your MongoDB URI and Stripe keys

# Frontend  
cd ../gucci-clone
cp env.example .env
# Edit .env with your API URL and Stripe publishable key
```

### 3. Database Setup
```bash
# Start MongoDB (if local)
mongod

# Seed database with sample data
cd backend
npm run seed
```

### 4. Start Development Servers
```bash
# Start both frontend and backend
npm run dev
```

## 🎯 What You Get

### Frontend (http://localhost:3000)
- **Luxury Homepage** - Elegant landing page with hero sections
- **Product Catalog** - Browse luxury fashion items
- **Shopping Cart** - Add items and manage cart
- **Checkout Flow** - Complete purchase with Stripe
- **User Authentication** - Login/register system
- **Admin Dashboard** - Manage products and orders

### Backend (http://localhost:5000)
- **RESTful API** - Complete CRUD operations
- **Authentication** - JWT-based user management
- **Payment Processing** - Stripe integration
- **Order Management** - Track and process orders
- **Product Management** - Admin product CRUD

## 🔑 Sample Login Credentials

### Admin User
- **Email:** admin@raana.com
- **Password:** admin123

### Regular User  
- **Email:** john@example.com
- **Password:** password123

## 📱 Test the Platform

1. **Browse Products** - Visit http://localhost:3000
2. **Add to Cart** - Click on any product
3. **Complete Checkout** - Use Stripe test card: 4242 4242 4242 4242
4. **Admin Panel** - Login as admin to manage products

## 🛠 Development Commands

```bash
# Start both servers
npm run dev

# Start backend only
npm run server

# Start frontend only  
npm run client

# Build for production
npm run build

# Seed database
cd backend && npm run seed
```

## 🔧 Environment Variables Needed

### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/raana-store
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 🎨 Features Ready to Use

✅ **Stage 1 Complete:** Backend MVP with product/order models, CRUD routes, and Stripe integration  
✅ **Stage 2 Complete:** Admin authentication and product management  
✅ **Stage 3 Complete:** Frontend-backend integration with auth, cart, and checkout  
✅ **Stage 4 Complete:** Luxury-themed responsive UI  
✅ **Stage 5 Complete:** Newsletter, coupons, and email system  

## 🚀 Ready to Deploy!

Your RAANA luxury fashion platform is now complete and ready for:
- **Development** - Full local development environment
- **Testing** - Comprehensive test data and flows
- **Production** - Ready for deployment to cloud platforms

---

**RAANA** - Where luxury meets technology! ✨ 