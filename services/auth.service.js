const { OAuth2Client } = require("google-auth-library");
const User = require('../models/user.model');
const { createToken, verifyRefreshToken } = require("../utils");
const ErrorHandler = require("../errors/ErrorHandler");
const STATUS_CODES = require("../statusCodes");

const loginUser = async (userData) => {
    try {
        const { email, password } = userData;
        const user = await User.findOne({ email: email }).select('+password');

        if (!user) {
            throw new ErrorHandler('Invalid email or password', STATUS_CODES.UNAUTHORIZED);
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new ErrorHandler('Invalid email or password', STATUS_CODES.UNAUTHORIZED);
        }
        
        return user;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler('Internal Server Error', STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
}

// google login
const googleLogin = async (token) => {
    try {
        const client = new OAuth2Client();
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { name, email } = payload;
        return { name, email };
    } catch (error) {
        throw new ErrorHandler('Google login failed', STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
}

const refreshToken = (refreshToken) => {
    try {
        const user = verifyRefreshToken(refreshToken);

        if (!user) {
            throw new ErrorHandler('Invalid refresh token.', STATUS_CODES.UNAUTHORIZED);
        }

        const token = createToken(user);
        return token;
    } catch (error) {
        throw new ErrorHandler('Refresh token error', STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
}

module.exports = { googleLogin, loginUser, refreshToken }
