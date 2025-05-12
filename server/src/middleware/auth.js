const User = require("../models/User");

//Require user to first login
exports.requireLogin = async (req, res, next) => {
    const email = req.session.userEmail;

    if (!email) {
        return res.status(401).json({ error: "Unauthorized: No session found" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.error("User not found:", email);
            return res.status(401).json({ error: "Unauthorized: User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Error during authentication:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Admin role authority
exports.requireAdmin = (req, res, next) => {
    if (!req.session.isAdmin) {
        return res.status(403).json({ error: "Admin access only" });
    }
    next();
};

// User role authority
exports.requireUser = (req, res, next) => {
    if (req.session.isAdmin) {
        return res.status(403).json({ error: "User-only access" });
    }
    next();
};