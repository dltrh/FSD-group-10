const mongoose = require('mongoose');

const questionThreadSchema = new mongoose.Schema({
    discussId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discussion',
        required: true
    },
    questionContent: {
        type: String,
        required: true
    }
}, {
    collection: 'QuestionThread',
    timestamps: false
});

module.exports = mongoose.model('QuestionThread', questionThreadSchema);
