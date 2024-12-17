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

module.exports = { createUser };