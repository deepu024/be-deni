const userController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

// v1/api/user
router.post('/', userController.createUser);

// v1/api/user/login
router.post('/login', userController.loginUser);

module.exports = router;