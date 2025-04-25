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
        enum: ['pending', 'accepted', 'declined'], // có thể tuỳ chỉnh nếu bạn dùng các trạng thái khác
        required: true
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
