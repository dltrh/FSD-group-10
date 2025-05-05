const User = require("../models/User");

exports.getUserByID = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

