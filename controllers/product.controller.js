const { createProductInterface } = require("../interfaces/product.interface");


const createProduct = async (req, res) => {
    try {
        const validateProduct = createProductInterface.safeParse(req.body);

        if(!validateProduct){
            return res.status(400).json({ message: 'Invalid product data.' });
        }

        const { name, description, price, quantity, category, image, sizes } = validateProduct;

        console.log(name, description, price, quantity, category, image, sizes);
        // const product = await productService.createProduct({ name, description, price, quantity, category, image, sizes });

        res.status(201).json({ message: 'Product created successfully.' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error!' });   
    }
}


module.exports = {createProduct};