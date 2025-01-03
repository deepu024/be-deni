const mongoose = require('mongoose');
const User = require('../models/user.model');
const ErrorHandler = require('../errors/ErrorHandler');
const STATUS_CODES = require('../statusCodes');

const createUser = async (userData) => {
    try {
        const { name, email, password } = userData;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ErrorHandler('User with this email already exists.', STATUS_CODES.CONFLICT);
        }

        const newUser = await User.create({
            name,
            email,
            password,
        });
        
        return newUser;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler('Failed to create user.', STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler('Failed to fetch user by email.', STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
}

module.exports = { createUser, getUserByEmail };