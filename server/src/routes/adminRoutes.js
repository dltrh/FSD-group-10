const express = require('express');
const router = express.Router();
const checkAdmin = require("../middleware/checkAdmin")
const adminController = require('../controllers/adminController');
const { requireLogin } = require("../middleware/auth");
const User = require("../models/User");
const Event = require("../models/Event")

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

//get all events
router.get("/events", checkAdmin, async (req, res) => {
    try {
        const events = await Event.find().lean();
        const users = await User.find({}, "userId fullname").lean();

        // Create mapping userId → fullname
        const userMap = {};
        users.forEach(user => {
            userMap[user.userId] = user.fullname;
        });

        // Assign organizer manually 
        const formattedEvents = events.map(event => ({
            ...event,
            organizer: userMap[event.organizerId] || "Unknown"
        }));

        res.status(200).json(formattedEvents);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Error fetching events" });
    }
});

module.exports = router;
