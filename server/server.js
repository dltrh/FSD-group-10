const express = require("express");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const connectDB = require("./src/config/database");

// Import routes
const eventRoutes = require("./src/routes/eventRoutes");
const invitationRoutes = require("./src/routes/invitationRoutes");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const devRoutes = require("./src/routes/devRoutes");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB database
connectDB();
console.log(process.env.MONGODB_URI);

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173', // React frontend origin
    credentials: true
}));
app.use(express.json());

// Session
app.use(
    session({
        secret: process.env.SESSION_SECRET || "mySecretKey",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // secure: true nếu dùng HTTPS
    })
);

// Routes
app.use("/api", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/invitations", invitationRoutes);
app.use("/api/users", userRoutes);

// AuthRoutes
app.use("/api", authRoutes);

// DevRoutes
app.use("/dev", devRoutes);

//express initial
app.get("/", (req, res) => {
    res.send("Hello from EventApp Server!");
});

const Event = require("./src/models/Event");
app.get("/events", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
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
