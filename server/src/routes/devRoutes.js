const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Route for dev to create admin account for maintenance
router.post('/create-admin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // check input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new admin user
        const newUser = new User({
            email,
            password: hashedPassword,
            isAdmin: true,
            fullname: 'Admin',
            phone: '00000000',
            userId: `admin_${Date.now()}`
        });

        // save into database
        await newUser.save();

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
