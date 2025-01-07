
const ErrorHandler = require('../errors/ErrorHandler');
const uploadService = require('../services/upload.service');
const STATUS_CODES = require('../statusCodes');

const uploadImage = async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) {
            throw new ErrorHandler('No file uploaded.', STATUS_CODES.BAD_REQUEST);
        }
        const imageUrl = await uploadService.uploadImage(file, req.user);
        res.status(STATUS_CODES.OK).json({ message: 'Image uploaded successfully.', data: imageUrl });
    } catch (error) {
        next(error);
    }
}

module.exports = { uploadImage };
