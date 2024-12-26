
const mongoose = require('mongoose');
const { SIZES, CATEGORY } = require('../utils');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 1,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        enum: CATEGORY,
    },
    image: {
        type: String,
        required: true,
    },
    sizes: {
        type: [String],
        required: true,
        enum: SIZES
    }
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;