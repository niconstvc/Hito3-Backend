const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('./login.js', authController.login);

module.exports = router;
