const express = require("express");

const router = express.Router();

const {
    getInvitationById,
    getAllInvitations,
    updateInvitationStatus,
} = require("../controllers/invitationController.js");


// GET Invitation
router.get("/:id", getInvitationById);
router.get("/", getAllInvitations);

// POST Invitation
router.post('/', updateInvitationStatus) 
module.exports = router;
