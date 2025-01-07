const path = require('path');
const ErrorHandler = require('../errors/ErrorHandler');
const STATUS_CODES = require('../statusCodes');
const { Stream } = require('stream');
const cloudinary = require('cloudinary').v2;

// Function to handle image upload
const uploadImage = (file, user) => {
  if (!file || !file.buffer) {
    throw new ErrorHandler('Invalid file provided.', STATUS_CODES.BAD_REQUEST);
  }

  return new Promise((resolve, reject) => {
    const bufferStream = new Stream.PassThrough();
    bufferStream.end(file.buffer);

    cloudinary.uploader.upload_stream(
      { folder: `products/${user?.id || 'default'}` }, // Organize uploads by user ID or a default folder
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload failed:', error);
          reject(new ErrorHandler('Failed to upload to Cloudinary.', STATUS_CODES.INTERNAL_SERVER_ERROR));
        } else {
          resolve(result); // Send back the result received from Cloudinary
        }
      }
    ).end(file.buffer);
  });
};


module.exports = { uploadImage };
