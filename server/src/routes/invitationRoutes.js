const express = require("express");

const router = express.Router();

const invitationController = require("../controllers/invitationController.js");


// GET Invitation
router.get("/:id", invitationController.getInvitationById);
router.get("/", invitationController.getCurrentUserInvitations); // Get all invitations of the current user
router.get("/events/:eventId", invitationController.getInvitationByEventId); // Get invitation by event ID
// router.get("/currentUserInvitations", invitationController.getCurrentUserInvitations); // Get current user's invitations

// POST Invitation
router.post('/', invitationController.updateInvitationStatus) 
router.post('/create/:eventId', invitationController.createInvitation); // Create a new invitation
module.exports = router;
