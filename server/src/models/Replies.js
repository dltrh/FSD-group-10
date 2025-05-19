const mongoose = require('mongoose');

const repliesSchema = new mongoose.Schema({
    replyId: {
        type: String,
        required: true,
        unique: true
    },
    questionId: {
        type: String,
        ref: 'QuestionThread',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'Replies',
    timestamps: false
});

module.exports = mongoose.model('Replies', repliesSchema);
