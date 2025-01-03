const { createProductInterface, updateProductInterface } = require("../interfaces/product.interface");
const z = require("zod");
const productService = require("../services/product.service");
const { getErrorMessageFromZodErros } = require("../utils");
const ErrorHandler = require('../errors/ErrorHandler');
const STATUS_CODES = require('../statusCodes');

const createProduct = async (req, res, next) => {
    try {
       const validateProduct = createProductInterface.safeParse(req.body);

       if (!validateProduct.success) {
           throw new ErrorHandler('Invalid product data.', STATUS_CODES.BAD_REQUEST, getErrorMessageFromZodErros(validateProduct));
       }

       const product = await productService.createProduct(validateProduct.data);
       res.status(201).json({ message: 'Product created successfully.', data: product });
        
    } catch (error) {
        next(error);
    }
}

const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();

        res.status(STATUS_CODES.OK).json({ message: 'Products fetched successfully.', data: products });
    } catch (error) {
        next(error);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const validateProduct = updateProductInterface.safeParse(req.body);

        if (!validateProduct.success) {
            throw new ErrorHandler('Invalid product data.', STATUS_CODES.BAD_REQUEST, getErrorMessageFromZodErros(validateProduct));
        }

        const updatedProduct = await productService.updateProduct(id, validateProduct.data);
        res.status(STATUS_CODES.CREATED).json({ message: 'Product updated successfully.', data: updatedProduct });
    } catch (error) {
        next(error);
    }
}

// Delete a product
const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await productService.deleteProduct(id);
        res.status(STATUS_CODES.NO_CONTENT).json({ message: 'Product deleted successfully.', data: product });
    } catch (error) {
        next(error);  
    }
}

// Get product by ID
const getProductById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await productService.getProductById(id);
        res.status(STATUS_CODES.OK).json({ message: 'Product fetched successfully.', data: product });
    } catch (error) {
        next(error);  
    }
}

const getProductByCategoryName = async (req, res, next) => {
    try {
        const categoryName = req.params.categoryName;
        const products = await productService.getProductByCategoryName(categoryName);
        res.status(STATUS_CODES.OK).json({ message: 'Products fetched successfully.', data: products });
    } catch (error) {
        next(error);  
    }
}

const getProductBySearch = async (req, res, next) => {
    try {
        const search = req.query.search;
        if(search){
            const products = await productService.getProductBySearch(search);
            return res.status(STATUS_CODES.OK).json({ message: 'Products fetched successfully.', data: products });
        }
        throw new ErrorHandler('Please provide a search query.', STATUS_CODES.BAD_REQUEST);
    } catch (error) {
        next(error);   
    }
}

module.exports = {createProduct, getAllProducts, updateProduct, deleteProduct, getProductById, getProductByCategoryName, getProductBySearch};