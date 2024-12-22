const {CATEGORY} = require('../utils');

const getAllCategories = () => {
    try {
        const categories = Object.values(CATEGORY);
        return categories;
    } catch (error) {
        console.error(error.message);
    }
}

module.exports =  {getAllCategories} ;