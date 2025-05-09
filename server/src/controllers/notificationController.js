const Notification = require("../models/Notification.js");


// Route to fetch notifications for a user
exports.getNotifications =  async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ recipientId: userId }).sort({ sentAt: -1 });
        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Server error' });
    }
};