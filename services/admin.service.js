const User = require("../models/user.model");
const ErrorHandler = require("../errors/ErrorHandler");
const STATUS_CODES = require("../statusCodes");
const { ROLE } = require("../utils");
const ApiFeature = require("../ApiFeature");

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

const getAllAdmins = async (query) => {
    try {
        const apiFeature = new ApiFeature(User.find({ role: ROLE.ADMIN }), query);
        apiFeature.filter().sort().selectFields().paginate();
        return await apiFeature.getResults();
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler('Failed to fetch admins', STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
}

const getAllUsers = async (query) => {
    try {
        const apiFeature = new ApiFeature(User.find({}), query);
        apiFeature.filter().sort().selectFields().paginate();
        return await apiFeature.getResults();
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler('Failed to fetch users', STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
}


module.exports = { createAdmin, getAllAdmins, getAllUsers };