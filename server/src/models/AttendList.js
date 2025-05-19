const mongoose = require('mongoose');

const attendListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    }
}, {
    collection: 'AttendList',
    timestamps: false
});

module.exports = mongoose.model('AttendList', attendListSchema);
