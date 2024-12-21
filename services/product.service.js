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

// Update product
const updateProduct = async (id, productSchema) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, productSchema, {new: true});
        if (!updatedProduct) {
            throw new Error('Product not found');
        }
        return updatedProduct;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

// Delete product
const deleteProduct = async (id) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            throw new Error('Product not found');
        }
        return deletedProduct;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

// Get product by ID
const getProductById = async (id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

module.exports = { createProduct, getAllProducts, updateProduct, deleteProduct, getProductById };