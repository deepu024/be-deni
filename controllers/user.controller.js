const userService = require('../services/user.service');
const { createToken } = require('../utils');

const createUser = async (req, res) => {
    try {
        const validateUser = createAdminInterface.parse(req.body);
        if(!validateUser.success){
            return res.status(400).json({ message: "Invalid user data", errors: getErrorMessageFromZodErros(validateUser)});
        }

        const user = await userService.createUser(validateUser.data);
        const token = createToken(user);
        res.status(201).json({
            message: 'User created successfully.',
            user,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error!' });   
    }
}


module.exports = { createUser};