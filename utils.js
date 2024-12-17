const jwt = require('jsonwebtoken');

const ROLE = {
    USER: 'user',
    ADMIN: 'admin',
};


const createToken = (user) => {
    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

module.exports = { ROLE, createToken };