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

//Port
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
