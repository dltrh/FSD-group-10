const Event = require("../models/Event.js");

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        if (!events) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getEventById = async (req, res) => {
    try {
        const event = await Event.findOne({ eventId: req.params.eventId });
        if (!event) return res.status(404).json({ error: "Event not found" });
        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { getAllEvents, getEventById };
