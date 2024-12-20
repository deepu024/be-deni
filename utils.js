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

module.exports = { ROLE, createToken, CATEGORY, SIZES };