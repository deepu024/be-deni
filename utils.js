const jwt = require('jsonwebtoken');
const fs = require('fs');

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

const createTokens = (user) => {
    const accessToken = createToken(user);

    const refreshToken = jwt.sign(
        { id: user._id, role: user.role, email: user.email },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
};

const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload;
    } catch (error) {
        throw new ErrorHandler('Invalid token.', STATUS_CODES.UNAUTHORIZED);
    }
}

const verifyRefreshToken = (token) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return payload;
    } catch (error) {
        throw new ErrorHandler('Invalid token.', STATUS_CODES.UNAUTHORIZED);
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

const ensureFolderExists = async (folderPath) => {
    try {
      // Check if the folder exists
      await fs.promises.access(folderPath, fs.constants.F_OK);
      console.log(`Folder already exists: ${folderPath}`);
    } catch (error) {
      // If the folder doesn't exist, create it
      try {
        await fs.promises.mkdir(folderPath, { recursive: true });
        console.log(`Folder created: ${folderPath}`);
      } catch (mkdirError) {
        console.error(`Error creating folder: ${folderPath}`, mkdirError);
        throw mkdirError;
      }
    }
  };

module.exports = { ROLE, createToken, CATEGORY, SIZES, getErrorMessageFromZodErros, verifyToken,verifyRefreshToken, generateRandomPassword, createTokens, ensureFolderExists };