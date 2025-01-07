const express = require('express');
const uploadController = require('../controllers/upload.controller.js');
const { checkIfUserIsLoggedIn } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

const router = express.Router();

// v1/api/upload
router.post('/', checkIfUserIsLoggedIn, upload.single('image'),  uploadController.uploadImage);

module.exports = router;