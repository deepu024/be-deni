const authService = require('../services/auth.service')
const { createToken, getErrorMessageFromZodErros, generateRandomPassword } = require('../utils')
const { loginUserInterface } = require('../interfaces/auth.interface');
const userService = require('../services/user.service');


// login user
const loginUser = async (req, res) => {
    try {
        const validateLoginUser = loginUserInterface.safeParse(req.body);
        if(!validateLoginUser.success){
            return res.status(400).json({ message: "Invalid user data", errors: getErrorMessageFromZodErros(validateLoginUser)});
        }

        // login user
        const user = await authService.loginUser(validateLoginUser.data);
        // create token
        const token = createToken(user);
        // send response
        res.status(200).json({ message: 'User logged in successfully.', token, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}

// google login
const googleLogin = async (req, res) => {
    try {
        const header = req.headers['authorization'];
        if(header){
            const token = header.split(' ')[1];
            const {name, email} = await authService.googleLogin(token);
            const alreadyUser = await userService.getUserByEmail(email);
            if(alreadyUser){
                const jwtToken = createToken(alreadyUser);
                return res.status(200).json({ message: 'Logged In Successfully', user: alreadyUser, token: jwtToken });
            } else {
                const password = generateRandomPassword();
                const user = await userService.createUser({ name, email, password });
                const jwtToken = createToken(user);
                return res.status(201).json({ message: 'User created successfully', user, token: jwtToken });
            }
        }
        return res.status(401).json({ message: 'Invalid token.' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}

module.exports = { googleLogin, loginUser };