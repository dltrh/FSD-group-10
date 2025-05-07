import Counter from "../models/Counter.js";

export async function getNextEventId() {
    const counter = await Counter.findByIdAndUpdate(
        { _id: "event" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    const paddedNumber = String(counter.seq).padStart(6, "0");
    return `event_${paddedNumber}`;
}

