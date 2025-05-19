const mongoose = require('mongoose');

const organizeListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, {
    collection: 'OrganizeList',
    timestamps: false
});

// Create unique index to ensure it not the same (userId, eventId)
organizeListSchema.index({ userId: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model('OrganizeList', organizeListSchema);
