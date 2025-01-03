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

module.exports = { createAdmin };