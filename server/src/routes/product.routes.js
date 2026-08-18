const express = require('express');
const router = express.Router();
const {
  getProducts,
  getFeaturedProducts,
  getProductBySlug
} = require('../controllers/product.controller');

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:slug', getProductBySlug);

module.exports = router;
