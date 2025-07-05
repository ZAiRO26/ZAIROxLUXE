# 🧪 RAANA Testing Guide

Complete testing guide for the luxury fashion e-commerce platform.

## 🔑 Test User Credentials

### Admin User
- **Email:** admin@raana.com
- **Password:** admin123
- **Role:** Administrator (full access)

### Regular Customer
- **Email:** john@example.com
- **Password:** password123
- **Role:** Customer

### Stripe Test Cards
- **Success Card:** 4242 4242 4242 4242
- **Decline Card:** 4000 0000 0000 0002
- **Expiry:** Any future date (e.g., 12/25)
- **CVC:** Any 3 digits (e.g., 123)
- **ZIP:** Any 5 digits (e.g., 12345)

## 🧪 Test Scenarios

### 1. User Authentication
```bash
# Test Registration
POST /api/auth/register
{
  "name": "Test User",
  "email": "test@example.com", 
  "password": "password123"
}

# Test Login
POST /api/auth/login
{
  "email": "admin@raana.com",
  "password": "admin123"
}
```

### 2. Product Browsing
```bash
# Get all products
GET /api/products

# Get featured products
GET /api/products/featured

# Get new arrivals
GET /api/products/new-arrivals

# Get sale products
GET /api/products/sale

# Filter products
GET /api/products?category=handbags&minPrice=1000&maxPrice=5000
```

### 3. Shopping Cart Flow
1. **Browse Products** - Visit homepage or products page
2. **Add to Cart** - Click "Add to Cart" on any product
3. **View Cart** - Click cart icon in header
4. **Update Quantities** - Change quantities in cart
5. **Remove Items** - Remove items from cart
6. **Proceed to Checkout** - Click "Checkout" button

### 4. Checkout Process
1. **Shipping Information** - Fill out shipping form
2. **Apply Coupon** - Test coupon code: "WELCOME10"
3. **Payment** - Use Stripe test card
4. **Order Confirmation** - Verify order creation

### 5. Admin Functions
1. **Login as Admin** - Use admin credentials
2. **Product Management** - Add/edit/delete products
3. **Order Management** - View and update order status
4. **Customer Management** - View customer data

## 🔧 API Endpoint Testing

### Authentication Endpoints
```bash
# Register new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login user
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@raana.com","password":"admin123"}'
```

### Product Endpoints
```bash
# Get all products
curl http://localhost:5000/api/products

# Get single product
curl http://localhost:5000/api/products/[PRODUCT_ID]

# Create product (admin only)
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer [ADMIN_TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":1000,"category":"handbags"}'
```

### Order Endpoints
```bash
# Create order
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer [USER_TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{"products":[{"product":"[PRODUCT_ID]","quantity":1}],"total":1000}'

# Get user orders
curl http://localhost:5000/api/orders/user/[USER_ID] \
  -H "Authorization: Bearer [USER_TOKEN]"
```

## 🎯 Frontend Testing Checklist

### Homepage
- [ ] Hero section displays correctly
- [ ] Featured products load
- [ ] Navigation links work
- [ ] Cart icon shows item count
- [ ] Responsive design on mobile

### Product Pages
- [ ] Product grid loads products
- [ ] Product cards display correctly
- [ ] "Add to Cart" buttons work
- [ ] Product images load
- [ ] Product details are accurate

### Shopping Cart
- [ ] Items add to cart correctly
- [ ] Cart drawer opens/closes
- [ ] Quantity updates work
- [ ] Remove items works
- [ ] Total calculation is correct
- [ ] Checkout button works

### Authentication
- [ ] Login form works
- [ ] Registration form works
- [ ] Logout works
- [ ] Protected routes redirect
- [ ] User menu displays correctly

### Checkout
- [ ] Shipping form validation
- [ ] Coupon application works
- [ ] Stripe payment form loads
- [ ] Payment processing works
- [ ] Order confirmation displays

### Admin Dashboard
- [ ] Admin login works
- [ ] Product management interface
- [ ] Order management interface
- [ ] Statistics display correctly
- [ ] CRUD operations work

## 🐛 Common Issues & Solutions

### Frontend Issues
1. **Products not loading**
   - Check API URL in .env
   - Verify backend is running
   - Check browser console for errors

2. **Cart not working**
   - Check localStorage in browser dev tools
   - Verify CartContext is properly wrapped
   - Check for JavaScript errors

3. **Payment form not loading**
   - Verify Stripe publishable key
   - Check network requests
   - Ensure Stripe Elements are loaded

### Backend Issues
1. **Database connection**
   - Check MongoDB URI in .env
   - Verify MongoDB is running
   - Check connection logs

2. **Authentication errors**
   - Verify JWT secret in .env
   - Check token expiration
   - Verify user exists in database

3. **Payment processing**
   - Check Stripe secret key
   - Verify webhook configuration
   - Check payment intent creation

## 📊 Performance Testing

### Load Testing
```bash
# Test product listing performance
ab -n 100 -c 10 http://localhost:5000/api/products

# Test authentication performance
ab -n 50 -c 5 -p login.json -T application/json http://localhost:5000/api/auth/login
```

### Database Performance
- Monitor MongoDB query performance
- Check index usage
- Verify connection pooling

## 🔒 Security Testing

### Authentication Security
- [ ] JWT tokens are secure
- [ ] Passwords are hashed
- [ ] Session management works
- [ ] Logout clears tokens

### API Security
- [ ] CORS is configured correctly
- [ ] Input validation works
- [ ] SQL injection prevention
- [ ] Rate limiting (if implemented)

### Payment Security
- [ ] Stripe integration is secure
- [ ] Payment data is not stored
- [ ] Webhook signature verification
- [ ] PCI compliance

## 🚀 Deployment Testing

### Environment Variables
- [ ] All required env vars are set
- [ ] API URLs are correct
- [ ] Database connection works
- [ ] Stripe keys are valid

### Build Process
- [ ] Frontend builds successfully
- [ ] Backend starts without errors
- [ ] Database migrations run
- [ ] Seed data loads correctly

---

**Ready to test!** 🎉 