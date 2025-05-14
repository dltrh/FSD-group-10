const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {
    validateRegister,
    validateLogin,
    validateResetPassword,
} = require("../utils/validators");
const User = require("../models/User"); // Import model MongoDB

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

        // Strore user data in session
        req.session.userEmail = user.email; // Store user email in session
        req.session.userId = user.userId; // Store userId in session
        req.session.isAdmin = user.isAdmin; // Store isAdmin in session

        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ message: "Session save failed" });
            }

            return res.json({
                message: "Login successful",
                isAdmin: user.isAdmin,
                email: user.email,
            });
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

        res.clearCookie("connect.sid");
        // res.clearCookie("user", { path: "/" });
        res.json({ message: "Logged out" });
    });
};

// Profile
exports.getProfile = async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const user = await User.findOne({ userId });
        if (!user) return res.status(404).json({ message: "User not found" });

        const { email, fullname, isAdmin, phone } = user;

        return res.status(200).json({
            user: { email, fullname, isAdmin, userId, phone }
        });
    } catch (err) {
        console.error("Get profile error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    // Simple token replacement with userId for reset link
    res.status(200).json({
        resetLink: `/reset-password-user?userId=${user.userId}`,
    });
};

// Reset password
exports.resetPassword = async (req, res) => {
    try {
        const { userId, newPassword, confirmPassword } = req.body;

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

// Find userId of session
exports.getCurrentUserId = async (req, res) => {
    if (req.session.userId) {
        return res.json({ user: req.session.userId });
    }
    return res.status(401).json({ message: "Not authenticated" });
};
