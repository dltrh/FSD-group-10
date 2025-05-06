const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { validateRegister, validateLogin, validateResetPassword } = require('../utils/validators');
const User = require('../models/User'); // Import model MongoDB

// REGISTER
exports.register = async (req, res) => {
    const error = validateRegister(req.body);
    if (error) return res.status(400).json({ message: error });

    const {
        email,
        password,
        isAdmin = false,
        fullname,
        phone,
        userId,
    } = req.body;
    // const fullname = `${firstname} ${lastname}`;
    // const userId = `user_${Date.now()}`;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            isAdmin,
            fullname,
            phone,
            userId,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Server error during registration" });
    }
};

// LOGIN
exports.login = async (req, res) => {
    const error = validateLogin(req.body);
    if (error) return res.status(400).json({ message: error });

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        // For Test only
        // if (user.password !== password) {
        //     return res.status(401).json({ message: 'Invalid credentials' });
        // }

        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" });

        // Set session
        req.session.user = {
            email: user.email,
            isAdmin: user.isAdmin,
        };
        res.cookie("user", user.email, { // store user email in cookie
            signed: true,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000, // 1 hour
        });
        console.log("Session user:", req.session.user);

        return res.json({
            message: "Login successful",
            isAdmin: user.isAdmin,
            email: user.email,
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error during login" });
    }
};

// LOGOUT
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: "Logout failed" });

        // res.clearCookie('connect.sid');
        res.clearCookie("token", { path: "/" });
        res.json({ message: "Logged out" });
    });
};

//Profile
exports.getProfile = async (req, res) => {
    if (req.session.user) {
        return res.json({ user: req.session.user });
    }
    res.status(401).json({ message: "Not authenticated" });
};

// Forgot password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    // Simple token replacement with userId for reset link
    res.status(200).json({ resetLink: `/reset-password-user?userId=${user.userId}` });
};

// Reset password
exports.resetPassword = async (req, res) => {
    try {
        const { userId, newPassword, confirmPassword } = req.body;
        console.log("Reset request:", req.body); // Debug log

        if (!userId || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};