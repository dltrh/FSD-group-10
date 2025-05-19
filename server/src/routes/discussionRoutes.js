const discussionController = require('../controllers/discussionController');
const express = require('express');

const router = express.Router();

// Get requests
router.get('/:eventId', discussionController.getDiscussionsByEventId); // Get all discussions in an event

// Post requests
router.post('/:eventId', discussionController.createDiscussion); // Post a new discussion for an event

module.exports = router;