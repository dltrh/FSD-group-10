const express = require('express');
const router = express.Router();
const checkAdmin = require("../middleware/checkAdmin")
const adminController = require('../controllers/adminController');
const { requireLogin } = require("../middleware/auth");
const User = require("../models/User");
const Event = require("../models/Event")

// get stats for users and events
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

// PUT: update user
router.put("/users/:id", checkAdmin, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Error updating user" });
    }
});

// DELETE: remove user
router.delete("/users/:id", checkAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user" });
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

// PUT /admin/events/:id - Update event
router.put("/events/:id", checkAdmin, async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedEvent);
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ message: "Error updating event" });
    }
});

// DELETE /admin/events/:id - Delete event
router.delete("/events/:id", checkAdmin, async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Event deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting event" });
    }
});

// Admin settings
router.get("/settings", checkAdmin, adminController.getAdminSettings);
router.post("/settings", checkAdmin, adminController.updateAdminSettings);

module.exports = router;
