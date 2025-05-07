const mongoose = require('mongoose');
const Counter = require( "../models/Counter.js"); // adjust the path as needed

const MONGO_URI = "mongodb+srv://s3980813:Mongo-s3980813@eventapp.0cv2lum.mongodb.net/EventApp?retryWrites=true&w=majority"; // Replace with your DB

async function resetCounter() {
    try {
        await mongoose.connect(MONGO_URI);
        await Counter.findByIdAndUpdate(
            { _id: "event" },
            { $set: { seq: 6 } },
            { upsert: true }
        );
        console.log("Counter reset to 6."); // Because there are 6 events in the database, you can modify this number if there are more than 6 eventd
    } catch (err) {
        console.error("Error resetting counter:", err);
    } finally {
        mongoose.connection.close();
    }
}

resetCounter();
// please run this to reset counter only