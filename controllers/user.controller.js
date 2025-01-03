const { registerUserInterface } = require('../interfaces/auth.interface');
const userService = require('../services/user.service');
const { createTokens, getErrorMessageFromZodErros } = require('../utils');
const ErrorHandler = require('../errors/ErrorHandler');
const STATUS_CODES = require('../statusCodes');

const createUser = async (req, res, next) => {
    try {
        const validateUser = registerUserInterface.safeParse(req.body);
        if (!validateUser.success) {
            throw new ErrorHandler('Invalid user data', STATUS_CODES.BAD_REQUEST, getErrorMessageFromZodErros(validateUser));
        }

        const user = await userService.createUser(validateUser.data);
        const token = createTokens(user);

        res.status(STATUS_CODES.CREATED).json({
            message: 'User created successfully.',
            user,
            token
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { createUser };