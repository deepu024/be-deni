
const express = require('express');
const productController = require('../controllers/product.controller');
const { isAdmin } = require('../middleware/auth.middleware');
const router = express.Router();


// v1/api/product
router.post('/', isAdmin, productController.createProduct); // create product
router.get('/', productController.getAllProducts); // get all products
router.put('/:id', isAdmin, productController.updateProduct); // update product
router.delete('/:id', isAdmin, productController.deleteProduct); // delete product
router.get('/search', productController.getProductBySearch); // get product by search
router.get('/:id', productController.getProductById); // get product by id
router.get('/category/:categoryName', productController.getProductByCategoryName); // get product by category

module.exports = router;

