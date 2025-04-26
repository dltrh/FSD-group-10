const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');
const PORT = process.env.PORT || 5000;
const app = express();
require('dotenv').config();

//Connect to MongoDB database
connectDB();

// Middlewares

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

//express initial
app.get('/', (req, res) => {
    res.send('Hello from EventApp Server!');
});

//Port
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
