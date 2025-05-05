const express = require("express");

const router = express.Router();

const {
    getInvitationById,
    getAllInvitations,
    updateInvitationStatus,
    getInvitationByEventId
} = require("../controllers/invitationController.js");


// GET Invitation
router.get("/:id", getInvitationById);
router.get("/", getAllInvitations); // Get all invitations 
router.get("/events/:eventId", getInvitationByEventId); // Get invitation by event ID

// POST Invitation
router.post('/', updateInvitationStatus) 
module.exports = router;
