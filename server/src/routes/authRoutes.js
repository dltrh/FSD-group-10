const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//register
router.post('/register', authController.register);

//login
router.post('/login', authController.login);

//logout
router.post('/logout', authController.logout);

module.exports = router;
