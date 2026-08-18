const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    shortDescription: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0
    },
    originalPrice: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      index: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
      index: true
    },
    images: [
      {
        type: String
      }
    ],
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5
    },
    reviewCount: {
      type: Number,
      default: 0
    },
    stock: {
      type: Number,
      default: 10,
      min: 0
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

productSchema.index({ name: 'text', brand: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
