const Notification = require("../models/Notification.js");
const Event = require("../models/Event.js");

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

exports.scheduleReminder = async (req, res) => {
    const { eventId, reminderTime, organizerId } = req.body;

    try {
        // You might want to validate that `organizerId` matches the event's organizer

        const event = await Event.findOne({ eventId });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        
        console.log(event);
        const attendees = event.attendeesList || [];
        if (attendees.length === 0) {
            return res.status(400).json({ message: "No attendees to notify." });
        }
        // Create notification records for each attendee
        const notifications = attendees.map((recipientId) => ({
            notificationId: `notif_${Date.now()}_${recipientId}`,
            recipientId,
            senderId: organizerId,
            eventId,
            type: "reminder",
            message: `Reminder: "${event.title}" starts soon!`,
            sentAt: new Date(reminderTime),
        }));
        console.log("Notifications to be inserted:", notifications);
        await Notification.insertMany(notifications);

        return res.status(201).json({ message: "Reminders scheduled." });
    } catch (error) {
        console.error("Error scheduling reminder:", error);
        res.status(500).json({ message: "Server error" });
    }
};
