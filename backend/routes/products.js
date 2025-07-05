const express = require('express');
const Product = require('../models/Product');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// List all products with filtering, search, and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      subcategory,
      brand,
      minPrice,
      maxPrice,
      search,
      sort = 'createdAt',
      order = 'desc',
      featured,
      newArrival,
      onSale,
      colors,
      sizes,
      tags
    } = req.query;

    // Build filter object
    const filter = { active: true };
    
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (brand) filter.brand = brand;
    if (featured === 'true') filter.featured = true;
    if (newArrival === 'true') filter.isNewArrival = true;
    if (onSale === 'true') filter.isOnSale = true;
    
    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    // Colors and sizes
    if (colors) filter.colors = { $in: colors.split(',') };
    if (sizes) filter.sizes = { $in: sizes.split(',') };
    if (tags) filter.tags = { $in: tags.split(',') };

    // Search functionality
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sortObj)
        .skip(skip)
        .limit(parseInt(limit)),
      Product.countDocuments(filter)
    ]);

    res.json({
      products,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (err) {
    console.error('Get products error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get featured products
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find({ featured: true, active: true })
      .limit(8)
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error('Get featured products error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get new arrivals
router.get('/new-arrivals', async (req, res) => {
  try {
    const products = await Product.find({ isNewArrival: true, active: true })
      .limit(8)
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error('Get new arrivals error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get sale products
router.get('/sale', async (req, res) => {
  try {
    const products = await Product.find({ isOnSale: true, active: true })
      .limit(8)
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error('Get sale products error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get one product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.active) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Get product error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create product (admin only)
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    // Generate SKU if not provided
    if (!req.body.sku) {
      const count = await Product.countDocuments();
      req.body.sku = `RAANA-${String(count + 1).padStart(6, '0')}`;
    }

    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Create product error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'SKU already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product (admin only)
router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product (admin only) - soft delete
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      { active: false }, 
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Product.distinct('category', { active: true });
    res.json(categories);
  } catch (err) {
    console.error('Get categories error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product brands
router.get('/brands/list', async (req, res) => {
  try {
    const brands = await Product.distinct('brand', { active: true });
    res.json(brands);
  } catch (err) {
    console.error('Get brands error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 