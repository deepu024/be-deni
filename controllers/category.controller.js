
const categoryService = require('../services/category.service');
const STATUS_CODES = require('../statusCodes');

const getAllCategories = async (req, res, next) => {
    try {
        const category = categoryService.getAllCategories();
        res.status(STATUS_CODES.OK).json({ message: "Categories fetched successfully", data: category });
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllCategories };