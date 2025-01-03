const User = require("../models/user.model");
const ErrorHandler = require("../errors/ErrorHandler");
const STATUS_CODES = require("../statusCodes");
const { ROLE } = require("../utils");

const createAdmin = async (payload) => {
    try {
        const { name, email, password } = payload;

        const admin = await User.create({
            name,
            email,
            password,
            role: ROLE.ADMIN,
        });

        return admin;
        
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler(error.message, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
}

module.exports = { createAdmin };