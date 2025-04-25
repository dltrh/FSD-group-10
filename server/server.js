const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');

const app = express();
require('dotenv').config();

//Connect to MongoDB database
connectDB();

// Middlewares

// Routes
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from EventApp Server!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
