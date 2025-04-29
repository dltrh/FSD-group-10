// utils/getNextId.js
const Counter = require('../models/Counter');

async function getNextId(prefix, length = 6) {
  const counter = await Counter.findByIdAndUpdate(
    prefix,                      // e.g., "event_"
    { $inc: { seq: 1 } },         // increment by 1
    { new: true, upsert: true }   // create if doesn't exist
  );
  
  // Format the seq number to have leading 0s
  const paddedSeq = counter.seq.toString().padStart(length, '0'); 

  // Return the formatted ID with the prefix
  return `${prefix}_${paddedSeq}`;
}

module.exports = getNextId;
