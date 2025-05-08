const Discussion = require('../models/Discussion');
const {getNextDiscussionId} = require('../utils/getNextId.js');

exports.getDiscussionsByEventId = async (req, res) => {
    const { eventId } = req.params;

    try {
        const discussions = await Discussion.find({ eventId: eventId });
        res.status(200).json(discussions);
    } catch (error) {
        console.error("Error fetching discussions by eventId:", error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.createDiscussion = async (req, res) => {
    const eventId = req.params.eventId; // Get eventId from request parameters
    if (!eventId) {
        return res.status(400).json({ message: "Event ID is required" });
    }
    const { content, description } = req.body;

    if (!content || !description) {
        return res.status(400).json({ error: "Missing content or description" });
      }
    const userId = req.session.userId; 
    const discussionId = await getNextDiscussionId(); // Generate a new discussion ID

    try {
        const newDiscussion = new Discussion({
            discussionId: discussionId,
            eventId: eventId,
            userId: userId,
            content: content,
            description: description,
            createdAt: new Date(),
        });

        const savedDiscussion = await newDiscussion.save();
        res.status(201).json(savedDiscussion);
    } catch (error) {
        console.error("Error creating discussion:", error);
        res.status(500).json({ message: "Server error" });
    }
}