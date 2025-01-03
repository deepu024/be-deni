const express = require('express');
const { isAdmin } = require('../middleware/auth.middleware');
const adminController = require('../controllers/admin.controller');
const router = express.Router();

// v1/api/admin/create-admin
router.post('/create-admin', isAdmin, adminController.createAdmin);

// v1/api/admin/users
router.get('/users', isAdmin, adminController.getAllUsers);

// v1/api/admin
router.get('/', isAdmin, adminController.getAllAdmins);



module.exports = router;