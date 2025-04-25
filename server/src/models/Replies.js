const mongoose = require('mongoose');

const repliesSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionThread',
        required: true
    },
    repContent: {
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
