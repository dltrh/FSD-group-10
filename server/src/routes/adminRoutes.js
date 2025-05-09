const express = require('express');
const router = express.Router();
const checkAdmin = require("../middleware/checkAdmin")
const adminController = require('../controllers/adminController');
const { requireLogin } = require("../middleware/auth");
const User = require("../models/User");

router.get('/stats', checkAdmin, adminController.getStats);

//get all users
router.get("/users", checkAdmin, async (req, res) => {
    try {
        const users = await User.find({}, "fullname email phone userId");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

module.exports = router;
