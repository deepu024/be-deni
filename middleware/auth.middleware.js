const { verifyToken } = require("../utils");
const ErrorHandler = require('../errors/ErrorHandler');
const STATUS_CODES = require('../statusCodes');

const checkIfUserIsLoggedIn = (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
        return next(new ErrorHandler('You are Unauthorized', STATUS_CODES.UNAUTHORIZED)); // Unauthorized access
    }

    const token = authorization.split(' ')[1];
    try {
        const payload = verifyToken(token);
        req.user = payload;
        return next();
    } catch (error) {
        return next(new ErrorHandler('Token expired or invalid.', STATUS_CODES.FORBIDDEN)); // Token expired or invalid
    }
}

const isAdmin = (req, res, next) => {
    checkIfUserIsLoggedIn(req, res, (err) => {
        if (err) {
            return next(err);
        }
        if (req.user.role !== 'admin') {
            return next(new ErrorHandler('You are not authorized to access this resource.', STATUS_CODES.FORBIDDEN));
        }
        next();
    });
}

module.exports = { checkIfUserIsLoggedIn, isAdmin }