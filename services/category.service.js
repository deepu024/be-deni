const { CATEGORY } = require('../utils');
const ErrorHandler = require('../errors/ErrorHandler');
const STATUS_CODES = require('../statusCodes');

const getAllCategories = () => {
    try {
        const categories = Object.values(CATEGORY);
        return categories;
    } catch (error) {
        throw new ErrorHandler('Failed to fetch categories', STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
}

module.exports = { getAllCategories };