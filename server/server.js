const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');
const PORT = process.env.PORT || 5000;
const app = express();
require('dotenv').config();
const cors = require('cors');

//Connect to MongoDB database
connectDB();

// Middlewares
app.use(cors())

// Routes
app.use(express.json());

//session
app.use(session({
    secret: process.env.SESSION_SECRET || "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // secure: true nếu bạn dùng HTTPS
}));

// AuthRoutes
const authRoutes = require('./src/routes/authRoutes');
app.use('/api', authRoutes);

// DevRoutes
const devRoutes = require('./src/routes/devRoutes');
app.use('/dev', devRoutes);

//express initial
app.get('/', (req, res) => {
    res.send('Hello from EventApp Server!');
});

const Event = require('./src/models/Event');
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/events/:id', async (req, res) => {
    const { id } = req.params; // This is your eventId like "event_000006"
    const { maxPpl, timeStart, location } = req.body;

    try {
        const updatedEvent = await Event.findOneAndUpdate(
            { eventId: id },
            { maxPpl, timeStart, location },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json(updatedEvent);
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ error: 'Failed to update event' });
    }
});



//Port
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
