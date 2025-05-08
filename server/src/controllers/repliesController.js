const Replies = require("../models/Replies");
const { getNextReplyId } = require("../utils/getNextId");

exports.getRepliesByQuestionId = async (req, res) => {
    try {
        const { questionId } = req.params;
        const replies = await Replies.find({ questionId: questionId });
        if (!replies) {
            return res.status(404).json({ message: "Replies not found" });
        }
        res.json(replies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createReply = async (req, res) => { 
    try {
        const replyId = await getNextReplyId(); // Generate a new reply ID
        const { questionId } = req.params;
        const { content } = req.body;
        const newReply = new Replies({
            replyId: replyId,
            questionId: questionId,
            content: content,
            createdAt: new Date(),
        });
        await newReply.save();
        res.status(201).json(newReply);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}