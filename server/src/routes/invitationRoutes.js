const express = require("express");

const router = express.Router();

const invitationController = require("../controllers/invitationController.js");


// GET Invitation
router.get("/:id", invitationController.getInvitationById);
router.get("/", invitationController.getAllInvitations); // Get all invitations 
router.get("/events/:eventId", invitationController.getInvitationByEventId); // Get invitation by event ID

// POST Invitation
router.post('/', invitationController.updateInvitationStatus) 
module.exports = router;
