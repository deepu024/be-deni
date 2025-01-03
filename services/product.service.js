const Product = require('../models/product.model');
const ErrorHandler = require('../errors/ErrorHandler');
const STATUS_CODES = require('../statusCodes');

const createProduct = async (productSchema) => {
    try {
        const newProduct = await Product.create(productSchema);
        return newProduct;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler(error.message, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
}

const getAllProducts = async () => {
    try {
        return await Product.find({});
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler('Failed to fetch products', STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
}

// Update product
const updateProduct = async (id, productSchema) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, productSchema, { new: true });
        if (!updatedProduct) {
            throw new ErrorHandler('Product not found', STATUS_CODES.NOT_FOUND);
        }
        return updatedProduct;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler(error.message, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
}

// Delete product
const deleteProduct = async (id) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            throw new ErrorHandler('Product not found', STATUS_CODES.NOT_FOUND);
        }
        return deletedProduct;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler(error.message, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
}

// Get product by ID
const getProductById = async (id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw new ErrorHandler('Product not found', STATUS_CODES.NOT_FOUND);
        }
        return product;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler(error.message, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
}

const getProductByCategoryName = async (categoryName) => {
    try {
        const products = await Product.find({ category: categoryName });
        return products;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler('Failed to fetch products by category', STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
}

const getProductBySearch = async (search) => {
    try {
        const products = await Product.find({
            name: {
                $regex: new RegExp(search, 'i')
            }
        });
        return products;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler('Failed to fetch products by search', STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
}

module.exports = { createProduct, getAllProducts, updateProduct, deleteProduct, getProductById, getProductByCategoryName, getProductBySearch };