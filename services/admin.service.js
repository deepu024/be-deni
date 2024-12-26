const User = require("../models/user.model");
const { ROLE } = require("../utils");

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
        console.error(error.message);
        throw new Error(error.message);        
    }
}

module.exports = { createAdmin };