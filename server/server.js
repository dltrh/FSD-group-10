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

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB database
connectDB();
console.log(process.env.MONGODB_URI);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/invitations", invsitationRoutes);
app.use("/api/users", userRoutes);

// Session
app.use(
    session({
        secret: process.env.SESSION_SECRET || "mySecretKey",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // secure: true nếu dùng HTTPS
    })
);

// AuthRoutes
const authRoutes = require("./src/routes/authRoutes");
app.use("/api", authRoutes);

// DevRoutes
const devRoutes = require("./src/routes/devRoutes");
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

// Port
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
