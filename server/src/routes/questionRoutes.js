const questionController = require('../controllers/questionController');
const express = require('express');
const router = express.Router();

router.get('/:discussionId', questionController.getQuestionsByDiscussionId); // Get all questions for a discussion

router.post('/:discussionId', questionController.createQuestion); // Create a new question for a discussion

module.exports = router;