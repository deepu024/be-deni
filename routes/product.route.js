
const express = require('express');
const productController = require('../controllers/product.controller');
const { isAdmin } = require('../middleware/auth.middleware');
const router = express.Router();


// v1/api/product
router.post('/', isAdmin, productController.createProduct);
router.get('/', productController.getAllProducts);

module.exports = router;


