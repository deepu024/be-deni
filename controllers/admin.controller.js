const { createAdminInterface } = require("../interfaces/admin.interface");
const adminService = require('../services/admin.service');
const { getErrorMessageFromZodErros } = require("../utils");


const createAdmin = async (req, res) => {
    try {
        const validateAdmin = createAdminInterface.safeParse(req.body);

        if (!validateAdmin.success) {
            return res.status(400).json({ message: 'Invalid admin data.', error: getErrorMessageFromZodErros(validateAdmin) });
        }

        const admin = await adminService.createAdmin(validateAdmin.data);
        res.status(201).json({ message: 'Admin created successfully.', data: admin });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}

module.exports = { createAdmin };