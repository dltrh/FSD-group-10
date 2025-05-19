const mongoose = require("mongoose");

const questionThreadSchema = new mongoose.Schema(
    {
        questionId: {
            type: String,
            required: true,
        },
        discussionId: {
            type: String,
            ref: "Discussion",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: "QuestionThread",
        timestamps: false,
    }
);

module.exports = mongoose.model("QuestionThread", questionThreadSchema);
