const express = require("express");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const connectDB = require("./src/config/database");
const cookieParser = require("cookie-parser");

// Import routes
const eventRoutes = require("./src/routes/eventRoutes");
const invitationRoutes = require("./src/routes/invitationRoutes");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const devRoutes = require("./src/routes/devRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB database
connectDB();
console.log(process.env.MONGODB_URI);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static("uploads"));
app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:3000"], // React frontend origin port
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);
app.use(cookieParser(process.env.SESSION_SECRET || "mySecretKey"));

// Session
app.use(
    session({
        secret: process.env.SESSION_SECRET || "mySecretKey",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, httpOnly: true, sameSite: "Lax" }, // Set secure to true if using HTTPS
    })
);

// Routes
app.use("/api", authRoutes); // AuthRoutes
app.use("/api/events", eventRoutes); // EventRoutes
app.use("/api/invitations", invitationRoutes); // InvitationRoutes
app.use("/api/users", userRoutes); // UserRoutes
app.use("/dev", devRoutes); // DevRoutes
app.use("/api/admin", adminRoutes); //AdminRoutes

// Port
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
