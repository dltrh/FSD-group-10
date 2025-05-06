const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

//register
router.post('/register', authController.register);

//login
router.post('/login', authController.login);

//logout
router.post('/logout', authController.logout);

//get user 
router.get('/user', authMiddleware.requireLogin, authController.getProfile);

module.exports = router;
