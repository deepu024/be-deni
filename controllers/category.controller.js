
const categoryService = require('../services/category.service');

const getAllCategories = async (req, res) => {
    try {
        const category = categoryService.getAllCategories();
        console.log(category);
        res.status(200).json({message: "Categories fetched successfully", data: category});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error.' });
    }
}

module.exports = { getAllCategories };