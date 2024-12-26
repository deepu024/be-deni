const express = require('express');
const { isAdmin } = require('../middleware/auth.middleware');
const adminController = require('../controllers/admin.controller');
const router = express.Router();

// v1/api/admin/create-admin
router.post('/create-admin', isAdmin, adminController.createAdmin);


module.exports = router;