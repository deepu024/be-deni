const authService = require('../services/auth.service')
const { createTokens, getErrorMessageFromZodErros, generateRandomPassword } = require('../utils')
const { loginUserInterface } = require('../interfaces/auth.interface');
const userService = require('../services/user.service');
const ErrorHandler = require('../errors/ErrorHandler');
const STATUS_CODES = require('../statusCodes');

// login user
const loginUser = async (req, res, next) => {
    try {
        const validateLoginUser = loginUserInterface.safeParse(req.body);
        if(!validateLoginUser.success){
            throw new ErrorHandler("Invalid user data", STATUS_CODES.BAD_REQUEST, getErrorMessageFromZodErros(validateLoginUser))
        }
        const user = await authService.loginUser(validateLoginUser.data);
        const token = createTokens(user);
        res.status(200).json({ message: 'User logged in successfully.', token, user });

    } catch (error) {
        next(error);
    }
}

// google login
const googleLogin = async (req, res, next) => {
    try {
        const header = req.headers['authorization'];
        if(header){
            const token = header.split(' ')[1];
            const {name, email} = await authService.googleLogin(token);
            const alreadyUser = await userService.getUserByEmail(email);
            if(alreadyUser){
                const jwtToken = createTokens(alreadyUser);
                return res.status(200).json({ message: 'Logged In Successfully', user: alreadyUser, token: jwtToken });
            } else {
                const password = generateRandomPassword();
                const user = await userService.createUser({ name, email, password });
                const jwtToken = createTokens(user);
                return res.status(201).json({ message: 'User created successfully', user, token: jwtToken });
            }
        }
        throw new ErrorHandler('Invalid token.', STATUS_CODES.UNAUTHORIZED);
    } catch (error) {
        next(error);
    }
}

const refreshToken = (req, res, next) => {
    try {
        const refreshToken = req.body.refreshToken;
        const token = authService.refreshToken(refreshToken);
        console.log("refresh token: " + refreshToken);
        return res.json({ message: 'Token refreshed successfully.', accessToken: token });
    } catch (error) {
        next(error);
    }
}

module.exports = { googleLogin, loginUser, refreshToken };