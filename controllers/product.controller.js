const { createProductInterface, updateProductInterface } = require("../interfaces/product.interface");
const z = require("zod");
const productService = require("../services/product.service");
const { getErrorMessageFromZodErros } = require("../utils");


const createProduct = async (req, res) => {
    try {
       const validateProduct = createProductInterface.safeParse(req.body);

       if (!validateProduct.success) {
           return res.status(400).json({ message: 'Invalid product data.', error: getErrorMessageFromZodErros(validateProduct) });
       }

       const product = await productService.createProduct(validateProduct.data);

        res.status(201).json({ message: 'Product created successfully.', data: product });
        
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log(error.issues);
        }
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });   
    }
}

const getAllProducts = async (req, res) => {
    try {
        
        const products = await productService.getAllProducts();
        res.json({ message: 'Products fetched successfully.', data: products });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const validateProduct = updateProductInterface.safeParse(req.body);

        if (!validateProduct.success) {
            return res.status(400).json({ message: 'Invalid product data.', error: getErrorMessageFromZodErros(validateProduct) });
        }

        const updatedProduct = await productService.updateProduct(id, validateProduct.data);
        res.json({ message: 'Product updated successfully.', data: updatedProduct });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error!' });   
    }
}

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productService.deleteProduct(id);
        res.json({ message: 'Product deleted successfully.', data: product });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error!', errro: error.message });   
    }
}

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productService.getProductById(id);
        res.json({ message: 'Product fetched successfully.', data: product });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });   
    }
}

module.exports = {createProduct, getAllProducts, updateProduct, deleteProduct, getProductById};