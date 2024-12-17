const mongoose = require('mongoose');
const { ROLE } = require('../utils');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(email);
            },
            message: 'Please enter a valid email address.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
    },
    role: {
        type: String,
        enum: ROLE,
        default: ROLE.USER,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});


const User = mongoose.model('User', userSchema);
module.exports = User;