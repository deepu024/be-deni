const { registerUserInterface } = require('../interfaces/auth.interface');
const userService = require('../services/user.service');
const { createTokens, getErrorMessageFromZodErros } = require('../utils');

const createUser = async (req, res) => {
    try {
        const validateUser = registerUserInterface.safeParse(req.body);
        if(!validateUser.success){
            return res.status(400).json({ message: "Invalid user data", error: getErrorMessageFromZodErros(validateUser)});
        }

        const user = await userService.createUser(validateUser.data);
        const token = createTokens(user);
        res.status(201).json({
            message: 'User created successfully.',
            user,
            token
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error!' });   
    }
}


module.exports = { createUser};