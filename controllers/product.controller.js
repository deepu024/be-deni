const { createProductInterface } = require("../interfaces/product.interface");
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


module.exports = {createProduct, getAllProducts};