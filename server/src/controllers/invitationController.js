const Invitation = require("../models/Invitation.js");
const User = require("../models/User.js");
const Event = require("../models/Event.js");
const { getNextInvitationId } = require("../utils/getNextId.js");

exports.getInvitationById = async (req, res) => {
    try {
        const { id } = req.params;
        const invitation = await Invitation.findOne({ invitationId: id });
        if (!invitation) {
            return res.status(404).json({ message: "Invitation not found" });
        }
        res.json(invitation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getInvitationByEventId = async (req, res) => {
    try {
        const { eventId } = req.params;
        const invitation = await Invitation.findOne({ eventId: eventId });
        if (!invitation) {
            return res.status(404).json({ message: "Invitation not found" });
        }
        res.json(invitation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllInvitations = async (req, res) => {
    try {
        const invitations = await Invitation.find();
        res.json(invitations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCurrentUserInvitations = async (req, res) => {
    try {
        const { userId } = req.session; // Assuming userId is passed as a URL parameter
        const invitations = await Invitation.find({ receiverId: userId });
        res.json(invitations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateInvitationStatus = async (req, res) => {
    const { invitationId, eventId, status, message } = req.body;
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    if (!invitationId || !eventId || !status) {
        alert("Missing required fields");
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const invitation = await Invitation.findOneAndUpdate(
            { invitationId, eventId }, // Find by invite ID and event ID
            {
                status: status,
                message: message,
                // respondedAt: new Date()
            },
            { new: true } // Return the updated document
        );

        if (!invitation) {
            return res.status(404).json({ error: "Invitation not found" });
        }

        if (status === "accepted") {
            await Event.findOneAndUpdate(
                { eventId: eventId }, // Find by event ID
                { $push: { attendeesList: userId } }, // Add the attendee to array
                { new: true }
            );
        } else {
            await Event.findOneAndUpdate(
                { eventId: eventId },
                { $pull: { attendeesList: userId } },
                { new: true }
            );
        }

        res.json({ message: "Invitation updated successfully", invitation });
    } catch (err) {
        console.error("Error updating invitation:", err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.createInvitation = async (req, res) => {
    const { receiverEmail, message } = req.body;
    const organizerId = req.session.userId;
    const invitationId = await getNextInvitationId();
    const eventId = req.params.eventId;
    if (!eventId || !receiverEmail || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const receiver = await User.findOne({ email: receiverEmail });
    if (!receiver) {
        return res
            .status(404)
            .json({ error: "Receiver's email not found in database." });
    }
    const receiverId = receiver ? receiver.userId : null;

    if (!organizerId) {
        return res.status(400).json({ error: "Organizer ID is required" });
    }
    try {
        const existing = await Invitation.findOne({ eventId, receiverId });
        if (existing) {
            return res.status(409).json({
                error: "This user has already been invited to the event.",
            });
        }
        const newInvitation = new Invitation({
            eventId: eventId,
            receiverId: receiverId,
            organizerId: organizerId,
            message: message,
            status: "pending",
            invitationId: invitationId,
        });

        const savedInvitation = await newInvitation.save();
        if (!savedInvitation) {
            return res.status(500).json({ error: "Failed to save invitation" });
        }
        res.json({ savedInvitation, message: "Invitation sent successfully" });
    } catch (err) {
        console.error("Error adding invitation:", err);
        res.status(500).json({ error: "Server error" });
    }
};
