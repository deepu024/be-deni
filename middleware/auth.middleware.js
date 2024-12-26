const { verifyToken } = require("../utils");

const checkIfUserIsLoggedIn = (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        if(authorization){
            const token = authorization.split(' ')[1];
            const payload = verifyToken(token);
            if(!payload) {
                return res.status(403).json({ message: 'Token expired.' }); // Token expired
            }
            req.user = payload;
            return next();
        }
        res.status(401).json({ message: 'You are Unauthorized' });   // Unauthorized access

    } catch (error) {
        console.error(error.message);
        res.status(401).json({ message: 'You are Unauthorized.' });   // Unauthorized access
    }
}


const isAdmin = async (req, res, next) => {
    checkIfUserIsLoggedIn(req, res, () => {
        if(req.user.role !== 'admin'){
            return res.status(403).json({ message: 'You are not authorized to access this resource.' });
        }
        next();
    });
}

module.exports = {checkIfUserIsLoggedIn, isAdmin}