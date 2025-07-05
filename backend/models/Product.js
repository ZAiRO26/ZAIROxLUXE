const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number }, // For sale items
  images: [{ type: String }],
  category: { 
    type: String, 
    enum: ['handbags', 'ready-to-wear', 'shoes', 'accessories', 'jewelry', 'watches', 'fragrances', 'makeup', 'gifts'],
    required: true 
  },
  subcategory: { type: String }, // e.g., 'crossbody', 'evening', 'casual'
  brand: { type: String, default: 'RAANA' },
  materials: [{ type: String }], // e.g., ['leather', 'brass', 'cotton']
  colors: [{ type: String }], // Available colors
  sizes: [{ type: String }], // Available sizes
  stock: { type: Number, default: 0 },
  sku: { type: String, unique: true }, // Stock keeping unit
  weight: { type: Number }, // in grams
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number }
  },
  isLimitedEdition: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isOnSale: { type: Boolean, default: false },
  tags: [{ type: String }], // For search and filtering
  featured: { type: Boolean, default: false },
  active: { type: Boolean, default: true }, // Soft delete
}, { timestamps: true });

// Add indexes for better query performance
productSchema.index({ category: 1, active: 1 });
productSchema.index({ brand: 1, active: 1 });
productSchema.index({ tags: 1, active: 1 });
productSchema.index({ isNewArrival: 1, active: 1 });
productSchema.index({ isOnSale: 1, active: 1 });
productSchema.index({ featured: 1, active: 1 });

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.price < this.originalPrice) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Ensure virtuals are included in JSON output
productSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', productSchema); 