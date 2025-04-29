const express = require("express");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const connectDB = require("./src/config/database");

// Import routes
const eventRoutes = require("./src/routes/eventRoutes");
const invitationRoutes = require("./src/routes/invitationRoutes");

const app = express();
dotenv.config();

// Connect to MongoDB database
connectDB();
console.log(process.env.MONGODB_URI);

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/events", eventRoutes)
app.use("/api/invitations", invitationRoutes)

// Routes
app.get("/", (req, res) => {
    res.send("Hello from EventApp Server!");
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
