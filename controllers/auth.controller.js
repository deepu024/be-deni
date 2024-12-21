const authService = require('../services/auth.service')

const googleLogin = async (req, res) => {
    try {
        const header = req.headers['authorization'];
        if(header){
            const token = header.split(' ')[1];
            const payload = await authService.googleLogin(token);
            return res.json({ message: 'User logged in successfully.', data: payload });
        }
        return res.status(401).json({ message: 'Invalid token.' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}

module.exports = { googleLogin };