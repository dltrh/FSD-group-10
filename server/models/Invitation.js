const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
    organizerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'], // optional validation
        default: 'pending'
    },
    sentAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'Invitation',
    timestamps: false
});

module.exports = mongoose.model('Invitation', invitationSchema);
