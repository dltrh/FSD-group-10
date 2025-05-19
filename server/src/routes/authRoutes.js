const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireLogin } = require('../middleware/auth');

// === AUTH ROUTES ===
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// === AUTHENTICATED USER ROUTES ===
// Return user info at the momment 
router.get('/user', requireLogin, (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(404).json({ message: 'User not found in request' });
    }

    res.status(200).json({
        user: {
            email: user.email,
            fullname: user.fullname,
            userId: user.userId,
            phone: user.phone,
            isAdmin: user.isAdmin,
        }
    });
});

// Store userId
router.get('/getCurrentUserId', authController.getCurrentUserId);

// Get user or admin profile
router.get('/profile', authController.getProfile);

// === PASSWORD RESET ===
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
