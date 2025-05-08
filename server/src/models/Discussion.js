const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema(
    {
        discussionId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            ref: "User",
            required: true,
        },
        eventId: {
            type: String,
            ref: "Event",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: "Discussion",
        timestamps: false,
    }
);

module.exports = mongoose.model("Discussion", discussionSchema);
