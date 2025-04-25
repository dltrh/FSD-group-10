const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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
    budget: mongoose.Types.Decimal128,
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
