const Event = require("../models/Event.js");
const {getNextEventId} = require("../utils/getNextEventId.js");

exports.getAllEvents = async (req, res) => {
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

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findOne({ eventId: req.params.eventId });
        if (!event) return res.status(404).json({ error: "Event not found" });
        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.updateEvent = async (req, res) => {
    const { id } = req.params; // This is your eventId like "event_000006"
    const { maxPpl, timeStart, location } = req.body;

    try {
        const updatedEvent = await Event.findOneAndUpdate(
            { eventId: id },
            { maxPpl, timeStart, location },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.json(updatedEvent);
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ error: "Failed to update event" });
    }
};

// This function is used to delete an event by its ID. 
// But deletion is not a good practise so changing status of isFinished attribute is a safer option
exports.finishEvent = async (req, res) => {
    const { id } = req.params;
    const { isFinished } = req.body;

    console.log("Request received for finishing event with data:", { id, isFinished });  // Log data

    try {
        const result = await Event.updateOne(
            { eventId: id }, // Matching by eventId
            { $set: { isFinished: isFinished } }  // Use $set to explicitly update the field
        );

        if (result.nModified === 0) {
            return res.status(404).json({ error: "Event not found or no update occurred" });
        }

        // Fetch the updated event to confirm changes
        const updatedEvent = await Event.findOne({ eventId: id });

        console.log("Updated Event:", updatedEvent);  // Log the updated event

        res.json(updatedEvent);
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ error: "Failed to update event" });
    }
};

// Create a new event
exports.createEvent = async (req, res) => {
    
    try {
        // Debugging log to inspect the request body
        console.log("Request body:", req.body);

        // Check if req.body is defined
        if (!req.body) {
            return res.status(400).json({ error: "Request body is missing" });
        }
        const eventId = await getNextEventId();
        const organizerId = "user_00001"; // Replace with actual user ID from session or token
        let imageUrl = null;

        if (req.file) {
            // Store locally or upload to cloud
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const {
            title,
            description,
            maxPpl,
            timeStart,
            timeEnd,
            eventTheme,
            budget,
            location,
            gifts,
            eventType,
            canBring,
            isPublic,
            notes,
            
        } = req.body;

        // Validate required fields
        if (!title || !description || !maxPpl || !timeStart || !timeEnd || !budget || !location || !eventType || !eventTheme) {
            alert('Please provide all required fields');
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        // Create event data object
        const eventData = {
            title,
            description,
            maxPpl: parseInt(maxPpl),
            timeStart,
            timeEnd,
            eventTheme,
            budget: parseFloat(budget),
            location,
            gifts,
            eventType,
            canBring: String(canBring).toLowerCase() === 'true' || canBring === true,
            isPublic: String(isPublic).toLowerCase() === 'public' || isPublic === true,
            isFinished: false,
            notes,
            eventId,
            organizerId,
            imageUrl: imageUrl || null,
        };

        // Create new event
        const newEvent = new Event(eventData);
        const savedEvent = await newEvent.save();

        res.status(201).json(savedEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

