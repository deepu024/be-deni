const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/category.controller");

// v1/api/category
router.get('/', categoryController.getAllCategories) // get all categories

module.exports = router;