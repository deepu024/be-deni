const userController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

// v1/api/user
router.post('/', userController.createUser);


module.exports = router;