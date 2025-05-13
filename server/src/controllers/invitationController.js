const Invitation = require("../models/Invitation.js");

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

exports.updateInvitationStatus = async (req, res) => {
    const { invitationId, eventId, status, message } = req.body;

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

        res.json({ message: "Invitation updated successfully", invitation });
    } catch (err) {
        console.error("Error updating invitation:", err);
        res.status(500).json({ error: "Server error" });
    }
};

