const { OAuth2Client } = require("google-auth-library");
const userService = require('../services/user.service');
const { generateRandomPassword } = require("../utils");

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



module.exports = {googleLogin}
