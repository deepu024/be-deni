const zod = require('zod');
const { CATEGORY, SIZES } = require('../utils');

const createProductInterface = zod.object({
    name: zod.string().min(3).required,
    description: zod.string().min(10).required,
    price: zod.number().min(1).required,
    quantity: zod.number().min(0).optional,
    category: zod.enum(CATEGORY).required,
    image: zod.string().url().optional,
    sizes: zod.array(zod.enum(SIZES)).min(1).required,
});

module.exports = {createProductInterface};