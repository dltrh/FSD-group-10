const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    notificationId: {
        type: String,
        required: true,
        unique: true,
    },
    recipientId: {
        type: String,
        required: true, // e.g., user_1746540269071
    },
    senderId: {
        type: String,
        required: true, // e.g., admin_1746379864442
    },
    eventId: {
        type: String,
        required: false, // Optional if the notification isn't tied to an event
    },
    type: {
        type: String,
        enum: ['invite', 'reminder', 'update', 'announcement'],
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    sentAt: {
        type: Date,
        default: Date.now,
    }
}, {
    collection: 'Notification',  // better naming
    timestamps: false
});
   

module.exports = mongoose.model('Notification', notificationSchema);
