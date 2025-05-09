const User = require('../models/User');
const Event = require('../models/Event');

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

