const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true,
        unique: true
    },
    organizerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: String,
    description: String,
    timeStart: Date,
    timeEnd: Date,
    eventType: String,
    eventTheme: String,
    budget: Number,
    location: String,
    maxPpl: Number,
    attendeesList: String,
    canBring: Boolean,
    gifts: String
}, {
    collection: 'Event',
    timestamps: false
});

module.exports = mongoose.model('Event', eventSchema);
