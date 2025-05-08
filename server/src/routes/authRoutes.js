const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Register and login routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

//get user 
router.get('/user', authMiddleware.requireLogin, authController.getProfile);
router.get('/getCurrentUserId', authController.getCurrentUserId)

// Forgot and reset password
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
