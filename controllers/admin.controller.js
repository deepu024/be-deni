const { createAdminInterface } = require("../interfaces/admin.interface");
const adminService = require('../services/admin.service');
const { getErrorMessageFromZodErros } = require("../utils");
const ErrorHandler = require('../errors/ErrorHandler');
const STATUS_CODES = require('../statusCodes');

const createAdmin = async (req, res, next) => {
    try {
        const validateAdmin = createAdminInterface.safeParse(req.body);

        if (!validateAdmin.success) {
            throw new ErrorHandler('Invalid admin data.', STATUS_CODES.BAD_REQUEST, getErrorMessageFromZodErros(validateAdmin));
        }

        const admin = await adminService.createAdmin(validateAdmin.data);
        res.status(STATUS_CODES.CREATED).json({ message: 'Admin created successfully.', data: admin });
    } catch (error) {
        next(error);
    }
}

const getAllAdmins = async (req, res, next) => {
    try {
        const query = req.query;
        const admins = await adminService.getAllAdmins(query);
        res.status(STATUS_CODES.OK).json({ message: 'Admins fetched successfully.', data: admins.results, ...admins.pagination });
    } catch (error) {
        next(error);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const query = req.query;
        const users = await adminService.getAllUsers(query);
        res.status(STATUS_CODES.OK).json({ message: 'Users fetched successfully.', data: users.results, ...users.pagination });
    } catch (error) {
        next(error);
    }
}



module.exports = { createAdmin, getAllAdmins, getAllUsers };