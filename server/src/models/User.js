const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        default: ""
    },
    resetToken: {
        type: String,
        default: null
    },
    tokenExpiration: {
        type: Date,
        default: null
    }
}, {
    collection: 'User',
    timestamps: false,
});

module.exports = mongoose.model('User', userSchema);
