const express = require('express');
const router = express.Router();
const { getCategories, getCategoryBySlug } = require('../controllers/category.controller');

router.get('/', getCategories);
router.get('/:slug', getCategoryBySlug);

module.exports = router;
