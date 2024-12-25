const authService = require('../services/auth.service')
const { createToken, getErrorMessageFromZodErros } = require('../utils')
const {loginUserInterface, registerUserInterface} = require('../interfaces/auth.interface');


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
            const payload = await authService.googleLogin(token);
            const jwtToken = createToken(payload);
            return res.json({ message: 'User logged in successfully.', data: payload, token: jwtToken });
        }
        return res.status(401).json({ message: 'Invalid token.' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}

module.exports = { googleLogin, loginUser };