const repliesController = require("../controllers/repliesController");
const express = require("express");
const router = express.Router();

router.get("/:questionId", repliesController.getRepliesByQuestionId); // Get all replies for a specific question

router.post("/:questionId", repliesController.createReply); // Create a new reply for a specific question



module.exports = router;
 
