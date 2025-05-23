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
const discussionRoutes = require("./src/routes/discussionRoutes");
const questionRoutes = require("./src/routes/questionRoutes");
const repliesRoutes = require("./src/routes/repliesRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB database
connectDB();
console.log(process.env.MONGODB_URI);

// Cors
app.use(
    cors({
        origin: "http://localhost:5173", // React frontend origin port
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);

// Middlewares
app.use(cookieParser(process.env.SESSION_SECRET || "mySecretKey"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
    session({
        secret: process.env.SESSION_SECRET || "mySecretKey",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            sameSite: "Lax",
        },
    })
);

// Routes
app.use("/api", authRoutes); // AuthRoutes
app.use("/api/events", eventRoutes); // EventRoutes
app.use("/api/invitations", invitationRoutes); // InvitationRoutes
app.use("/api/users", userRoutes); // UserRoutes
app.use("/dev", devRoutes); // DevRoutes
app.use("/api/discussions", discussionRoutes); // DiscussionRoutes
app.use("/api/questions", questionRoutes); // QuestionRoutes
app.use("/api/replies", repliesRoutes); // RepliesRoutes
app.use("/api/admin", adminRoutes); //AdminRoutes
app.use("/api/notifications", notificationRoutes); // NotificationRoutes
app.use("/uploads", express.static("uploads"));

// Port
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
