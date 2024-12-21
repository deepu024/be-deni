const jwt = require('jsonwebtoken');

const ROLE = {
    USER: 'user',
    ADMIN: 'admin',
};

const CATEGORY = {
    MEN: 'Men',
    WOMEN: 'Women',
    KIDS: 'Kids',
}

const SIZES = {
    S: 'S',
    M: 'M',
    L: 'L',
    XL: 'XL',
    XXL: 'XXL',
    XS: 'XS',
}

const createToken = (user) => {
    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload;
    } catch (error) {
        throw new Error('Invalid token.');
    }
}


const getErrorMessageFromZodErros = (schema) => {
    const errors = schema.error.errors.map((err) => ({
        field: err.path.join('.'), // Path to the field that caused the error
        message: err.message,     // Error message
    }));
    return errors;
}

const generateRandomPassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 10; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

module.exports = { ROLE, createToken, CATEGORY, SIZES, getErrorMessageFromZodErros, verifyToken, generateRandomPassword };