const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        eventId: {
            type: String,
            required: true,
            unique: true
        },
        organizerId: {
            type: String,
            ref: "User",
            required: true,
        },
        title: { type: String, required: true },
        description: { type: String, required: true },
        timeStart: { type: Date, required: true },
        timeEnd: { type: Date, required: true },
        eventType: String,
        eventTheme: String,
        budget: Number,
        location: String,
        maxPpl: Number,
        attendeesList: [
            {
                type: String,
                ref: "User",
            },
        ],
        canBring: Boolean,
        isPublic: { type: Boolean, required: true },
        isFinished: { type: Boolean, default: false },
        gifts: String
    },
    {
        collection: "Event",
        timestamps: false,
    }
);

module.exports = mongoose.model("Event", eventSchema);
