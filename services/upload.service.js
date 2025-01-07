const path = require('path');
const ErrorHandler = require('../errors/ErrorHandler');
const STATUS_CODES = require('../statusCodes');

// Function to handle image upload
const uploadImage = (file, user) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new ErrorHandler('No file uploaded.', STATUS_CODES.NOT_FOUND));
    }

    const imageUrl = `${process.env.BASE_URL}/uploads/${file.filename}`;
    const responseObject = {
      fullUrl: imageUrl,
      createdAt: new Date().toISOString(),
      createdBy: user.email,
    };

    resolve(responseObject);
  });
};


module.exports = { uploadImage };
