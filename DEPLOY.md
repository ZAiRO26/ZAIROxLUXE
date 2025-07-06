# 🚀 RAANA Luxury Fashion Platform - Complete Deployment Guide

## 📋 Prerequisites
- GitHub account with ZAIROxLUXE repository
- MongoDB Atlas account (free tier available)
- Stripe account (for payments)
- Gmail account (for email notifications)

## 🎯 Step 1: Set Up MongoDB Database

1. **Go to [MongoDB Atlas](https://mongodb.com/atlas)**
2. **Create a free cluster**
3. **Create a database user**
4. **Get your connection string**
5. **Add your IP to whitelist (or 0.0.0.0/0 for all)**

## 🎯 Step 2: Set Up Stripe

1. **Go to [Stripe Dashboard](https://dashboard.stripe.com)**
2. **Get your test keys:**
   - Publishable key: `pk_test_...`
   - Secret key: `sk_test_...`
3. **Set up webhook endpoint (optional)**

## 🎯 Step 3: Deploy Backend to Railway

### Option A: Deploy from GitHub
1. **Visit [Railway](https://railway.app)**
2. **Sign up with GitHub**
3. **Click "New Project" → "Deploy from GitHub repo"**
4. **Select `ZAIROxLUXE` repository**
5. **Set root directory to `backend`**
6. **Add environment variables:**

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/raana?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### Option B: Deploy with Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
cd backend
railway init

# Deploy
railway up
```

## 🎯 Step 4: Deploy Frontend to Netlify

### Option A: Deploy from GitHub
1. **Visit [Netlify](https://netlify.com)**
2. **Click "New site from Git"**
3. **Connect GitHub and select `ZAIROxLUXE`**
4. **Configure build settings:**
   - **Base directory**: `gucci-clone`
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
5. **Add environment variables:**
   ```env
   REACT_APP_API_URL=https://your-railway-backend-url.railway.app/api
   REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
   ```

### Option B: Deploy with Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
cd gucci-clone
npm run build
netlify deploy --prod --dir=build
```

## 🎯 Step 5: Configure Custom Domain (Optional)

### Netlify Domain
1. **Go to Site settings → Domain management**
2. **Add custom domain**
3. **Configure DNS records**

### Railway Domain
1. **Go to Railway dashboard**
2. **Click on your project**
3. **Go to Settings → Domains**
4. **Add custom domain**

## ✅ Post-Deployment Checklist

- [ ] Backend API responds at `/`
- [ ] Frontend loads without errors
- [ ] User registration works
- [ ] User login works
- [ ] Products display correctly
- [ ] Shopping cart functions
- [ ] Checkout process works
- [ ] Stripe payments process
- [ ] Admin panel accessible
- [ ] Email notifications sent
- [ ] Mobile responsive

## 🛠️ Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure Railway backend allows Netlify domain
2. **Build Failures**: Check Node.js version compatibility
3. **Environment Variables**: Verify all variables are set correctly
4. **Database Connection**: Check MongoDB connection string

### Performance Tips:
1. **Enable Netlify asset optimization**
2. **Set up CDN caching**
3. **Enable compression**
4. **Monitor Railway usage**

## 📞 Support
- **Railway Docs**: https://docs.railway.app
- **Netlify Docs**: https://docs.netlify.com
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Stripe Docs**: https://stripe.com/docs

## 🔗 Quick Links
- **Frontend**: https://your-netlify-site.netlify.app
- **Backend API**: https://your-railway-backend.railway.app
- **GitHub Repo**: https://github.com/ZAiRO26/ZAIROxLUXE 