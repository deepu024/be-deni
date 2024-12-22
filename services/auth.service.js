const { OAuth2Client } = require("google-auth-library");
const User = require('../models/user.model');
const userService = require('../services/user.service');
const { generateRandomPassword } = require("../utils");


// login user
const loginUser = async (userData) => {
    try {
        const { email, password } = userData;
        const user = await User.findOne({ email: email }).select('+password');

        if (!user) {
            throw new Error('Invalid email or password.');
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new Error('Invalid email or password.');
        }
        
        return user;
    } catch (error) {
        throw new Error('Failed to login user.');
    }
}

// google login
const googleLogin = async (token) => {
    try {
        const client = new OAuth2Client();
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "966416161943-ei2p86e6mq2da05tn1mven4v87konelk.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const { name, email } = payload;
        const password = generateRandomPassword();
        const user = await userService.createUser({ name, email, password })
        return user;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}



module.exports = {googleLogin, loginUser}
