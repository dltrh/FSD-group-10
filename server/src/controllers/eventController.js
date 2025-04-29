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

module.exports = { getAllEvents };