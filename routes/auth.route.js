
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// /v1/api/auth/google
router.post('/google', authController.googleLogin)

// /v1/api/auth/login
router.post('/login', authController.loginUser);

// /v1/api/auth/refresh-token
router.post('/refresh-token', authController.refreshToken);

module.exports = router;