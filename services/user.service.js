const mongoose = require('mongoose');
const User = require('../models/user.model');

const createUser = async (user) => {
    try {
        const { name, email, password } = user;

        const newUser = await User.create({
            name,
            email,
            password,
        });
        
        return newUser;
    } catch (error) {
        throw new Error('Failed to create user.');
    }
}

// login user
const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            throw new Error('Invalid email or password.');
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new Error('Invalid email or password.');
        }

        return user;
    } catch (error) {
        throw new Error('Failed to login user.');
    }
}

module.exports = { createUser,loginUser };