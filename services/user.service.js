const mongoose = require('mongoose');
const User = require('../models/user.model');

const createUser = async (userData) => {
    try {
        const { name, email, password } = userData;

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

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch (error) {
        throw new Error('Failed to fetch user by email.');
    }

}


module.exports = { createUser, getUserByEmail };