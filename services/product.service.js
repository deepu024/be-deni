const Product = require('../models/product.model');

const createProduct = async (productSchema) => {
    try {
        const newProduct = await Product.create(productSchema);
        return newProduct;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

const getAllProducts = () => {
    try {
        return Product.find({});
    } catch (error) {
        console.error(error.message);
        throw new Error('Failed to fetch products');
    }
}

module.exports = { createProduct, getAllProducts };