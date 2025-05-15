const Event = require("../models/Event.js");
const Invitation = require('../models/Invitation');
const Notification = require('../models/Notification');
const { getNextEventId } = require("../utils/getNextEventId.js");

// Get all events
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

// Get public events
exports.getPublicEvents = async (req, res) => {
    try {
        const events = await Event.find({ isPublic: true });
        if (!events) {
            return res.status(404).json({ message: "No public events found" });
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

    try {
        const result = await Event.updateOne(
            { eventId: id }, // Matching by eventId
            { $set: { isFinished: isFinished } } // Use $set to explicitly update the field
        );

        if (result.nModified === 0) {
            return res
                .status(404)
                .json({ error: "Event not found or no update occurred" });
        }

        // Fetch the updated event to confirm changes
        const updatedEvent = await Event.findOne({ eventId: id });

        res.json(updatedEvent);
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ error: "Failed to update event" });
    }
};

// Create a new event
exports.createEvent = async (req, res) => {
    const userId = req.session.userId;
    try {
        const eventId = await getNextEventId();
        // const organizerId = req.session.userId;
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
        if (
            !title ||
            !description ||
            !maxPpl ||
            !timeStart ||
            !timeEnd ||
            !budget ||
            !location ||
            !eventType ||
            !eventTheme
        ) {
            alert("Please provide all required fields");
            return res
                .status(400)
                .json({ error: "Please provide all required fields" });
        }

        // Create event data object
        const eventData = {
            organizerId: userId,
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
            canBring:
                String(canBring).toLowerCase() === "true" || canBring === true,
            isPublic:
                String(isPublic).toLowerCase() === "true" || isPublic === true,
            isFinished: false,
            notes,
            eventId,
            imageUrl: imageUrl || null,
        };

        // Create new event
        const newEvent = new Event(eventData);
        const savedEvent = await newEvent.save();

        res.status(201).json(savedEvent);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getEventByEmail = async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const events = await Event.find({ organizerId: userId });
        if (!events) {
            return res
                .status(404)
                .json({ message: "Event hosted by this user not found" });
        }
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.addAttendeeToEvent = async (req, res) => {
    const { eventId } = req.params;
    const { userId } = req.body;

    try {
        const result = await Event.updateOne(
            { eventId: eventId },
            { $addToSet: { attendeesList: userId } } // prevents duplicates
        );

        if (result?.modifiedCount === 0) {
            return res
                .status(404)
                .json({ message: "Event not found or user already added" });
        }

        res.status(200).json({ message: "User added to attendees list" });
    } catch (error) {
        console.error("Error updating attendees list:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.removeAttendeeFromEvent = async (req, res) => {
    const { eventId } = req.params;
    const { userId } = req.body;

    try {
        const result = await Event.updateOne(
            { eventId },
            { $pull: { attendeesList: userId } }
        );

        const inviteResult = await Invitation.findOneAndUpdate(
            { eventId: eventId, receiverId: userId },
            { $set: { status: "declined" } } // Update the status to "declined"
        );

        if (result?.modifiedCount === 0 || inviteResult?.modifiedCount === 0) {
            // If no documents were modified, it means the event was not found or the user was not in the list
            return res
                .status(404)
                .json({ message: "Event not found or user not in list" });
        }

        res.status(200).json({
            message:
                "User removed from attendees list and Invitation status set to declined",
        });
    } catch (error) {
        console.error("Error removing attendee:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Add this new route to save the updated attendees list
exports.saveUpdatedAttendeesList = async (req, res) => {
    const { eventId } = req.params;
    const { attendeesList } = req.body;


    try {
        const updatedEvent = await Event.findOne({ eventId });

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        const result = await Event.updateOne(
            { eventId },
            { $set: { attendeesList } }
        );

        res.status(200).json({ message: "Attendees list saved successfully" });
    } catch (error) {
        console.error("Error saving attendees list:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.findAttendeeInEvent = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.session.userId;

    try {
        const result = await Event.findOne({
            eventId: eventId,
            attendeesList: userId,
        });
        if (result) {
            return res.status(200).json({ found: true, event: result });
        } else {
            return res.status(404).json({ found: false, message: "User not found in this event." });
        }
    } catch (error) {
        console.error("Error finding attendee:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.joinEvent = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.session.userId;
    try {
        const result = await Event.updateOne(
            { eventId: eventId },
            { $addToSet: { attendeesList: userId } } // prevents duplicates
        );

        if (result?.modifiedCount === 0) {
            return res
                .status(404)
                .json({ message: "Event not found or user already added" });
        }

        res.status(200).json({ message: "User added to attendees list" });
    } catch (error) {
        console.error("Error updating attendees list:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.unjoinEvent = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.session.userId;

    try {
        const result = await Event.updateOne(
            { eventId },
            { $pull: { attendeesList: userId } }
        );

        if (result?.modifiedCount === 0) {
            // If no documents were modified, it means the event was not found or the user was not in the list
            return res
                .status(404)
                .json({ message: "Event not found or user not in list" });
        }

        res.status(200).json({
            message:
                "User removed from attendees list and Invitation status set to declined",
        });
    } catch (error) {
        console.error("Error removing attendee:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.notifyAttendeesOfUpdate = async (req, res) => {
    try {
        const { eventId } = req.params;

        const event = await Event.findOne({ eventId });
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        if (!event.attendeesList || event.attendeesList.length === 0) {
            return res.status(400).json({ error: "No attendees to notify" });
        }
        const acceptedInvitations = await Invitation.find({
            eventId: eventId,
            status: "accepted"
        });

        const acceptedUserIds = acceptedInvitations.map(invite => invite.receiverId);

        const notifications = acceptedUserIds.map((recipientId) => ({
            notificationId: `notif_${Date.now()}_${recipientId}`,
            recipientId,
            senderId: event.organizerId,
            eventId,
            type: "update",
            message: `📣 Update: Details for event "${event.title}" have changed.`,
            sentAt: new Date(),
        }));

        await Notification.insertMany(notifications);

        res.status(200).json({ message: "Attendees notified." });
    } catch (error) {
        console.error("Error notifying attendees:", error);
        res.status(500).json({ error: "Failed to send notifications" });
    }
};

//Search Function
exports.searchEvents = async (req, res) => {
    const query = req.query.q;
    if (!query) return res.json([]);

    try {
        const events = await Event.find({
            title: { $regex: query, $options: "i" }
        }).limit(5).select("_id eventId title");
        res.json(events);
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ message: "Search failed" });
    }
};

