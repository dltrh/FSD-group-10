// utils/getNextId.js
const Counter = require("../models/Counter");

// export async function getNextId(prefix, length = 6) {
//   const counter = await Counter.findByIdAndUpdate(
//     prefix,                      // e.g., "event_"
//     { $inc: { seq: 1 } },         // increment by 1
//     { new: true, upsert: true }   // create if doesn't exist
//   );

//   // Format the seq number to have leading 0s
//   const paddedSeq = counter.seq.toString().padStart(length, '0');

//   // Return the formatted ID with the prefix
//   return `${prefix}_${paddedSeq}`;
// }

exports.getNextDiscussionId = async () => {
    const counter = await Counter.findByIdAndUpdate(
        { _id: "discussion" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    const paddedNumber = String(counter.seq).padStart(6, "0");
    return `discussion_${paddedNumber}`;
};

exports.getNextQuestionId = async () => {
    const counter = await Counter.findByIdAndUpdate(
        { _id: "question" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    const paddedNumber = String(counter.seq).padStart(6, "0");
    return `question_${paddedNumber}`;
};

exports.getNextReplyId = async () => {
    const counter = await Counter.findByIdAndUpdate(
        { _id: "reply" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    const paddedNumber = String(counter.seq).padStart(6, "0");
    return `reply_${paddedNumber}`;
};

exports.getNextInvitationId = async () => {
    const counter = await Counter.findByIdAndUpdate(
        { _id: "invitation" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    const paddedNumber = String(counter.seq).padStart(6, "0");
    return `invitation_${paddedNumber}`;
};
