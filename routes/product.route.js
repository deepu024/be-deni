
const express = require('express');
const productController = require('../controllers/product.controller');
const router = express.Router();


// v1/api/product
router.post('/', productController.createProduct);


module.exports = router;


