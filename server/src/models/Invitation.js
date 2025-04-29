const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
    invitationId: { type: String, required: true },
    organizerId: {
        type: String,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: String,
        ref: 'User',
        required: true
    },
    eventId: {
        type: String,
        ref: 'Event',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Declined'],
        default: 'Pending'
    },
    sentAt: {
        type: Date,
        default: Date.now
    },
    message: {
        type: String,
        default: ""  // Default message
    }
}, {
    collection: 'Invitation',  // better naming
    timestamps: false
});

module.exports = mongoose.model('Invitation', invitationSchema);
