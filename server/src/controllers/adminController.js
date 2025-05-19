const User = require('../models/User');
const Event = require('../models/Event');

//Get total stat for users and events
exports.getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalEvents = await Event.countDocuments();
        res.json({ totalUsers, totalEvents });
    } catch (err) {
        console.error("Error fetching stats:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Setting default of EventType, EventTheme, and setup welcome message
let adminSettings = {
    defaultEventType: "Indoor",
    defaultEventTheme: "General",
    welcomeMessage: "Welcome back, Admin!"
};

exports.getAdminSettings = (req, res) => {
    res.json(adminSettings);
};

exports.updateAdminSettings = (req, res) => {
    const { defaultEventType, defaultEventTheme, welcomeMessage } = req.body;
    adminSettings = { defaultEventType, defaultEventTheme, welcomeMessage };
    res.json({ message: "Settings updated", settings: adminSettings });
};
