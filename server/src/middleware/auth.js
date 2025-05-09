const User = require("../models/User");

exports.requireLogin = async (req, res, next) => {
    const email = req.session.userEmail;
    // const userId = req.session.userId; // Assuming you have userId in session as well
    // console.log("Username from session:", username);
    // console.log("UserId from session:", userId);
    if (!email) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const user = await User.findOne({ email: username });

        if (!user) {
            console.error("User not found:", username);
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Error during authentication:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
