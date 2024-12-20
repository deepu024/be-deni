const zod = require('zod');
const { CATEGORY, SIZES } = require('../utils');

const createProductInterface = zod.object({
    name: zod.string().min(3),
    description: zod.string().min(10),
    price: zod.number().min(1),
    quantity: zod.number().min(0).optional(),
    category: zod.enum(Object.values(CATEGORY)),
    image: zod.string().url().optional(),
    sizes: zod.array(zod.enum(Object.values(SIZES))).min(1),
});

module.exports = {createProductInterface};