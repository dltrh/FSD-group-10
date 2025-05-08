const QuestionThread = require("../models/QuestionThread");
const { getNextQuestionId } = require("../utils/getNextId.js");

exports.getQuestionsByDiscussionId = async (req, res) => {
    const { discussionId } = req.params;

    try {
        const questions = await QuestionThread.find({
            discussionId: discussionId,
        });
        res.status(200).json(questions);
    } catch (error) {
        console.error("Error fetching questions by discussionId:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.createQuestion = async (req, res) => {
    const { discussionId } = req.params;
    const { content } = req.body;
    const questionId = await getNextQuestionId();

    try {
        const newQuestion = new QuestionThread({
            discussionId: discussionId,
            questionId: questionId,
            content: content,
            createdAt: new Date(),
        });

        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error("Error creating question:", error);
        res.status(500).json({ message: "Server error" });
    }
};
