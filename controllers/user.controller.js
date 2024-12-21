
const userService = require('../services/user.service');
const { createToken } = require('../utils');

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Please provide all required fields. name, email, password' });
        }

        const user = await userService.createUser({ name, email, password });
        res.status(201).json({
            message: 'User created successfully.',
            user,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error!' });   
    }
}

// login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email ||!password) {
            return res.status(400).json({ message: 'Please provide email and password.' });
        }

        const user = await userService.loginUser(email, password);

        const token = createToken(user);

        res.status(200).json({ message: 'User logged in successfully.', token, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}

module.exports = { createUser, loginUser};