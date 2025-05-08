exports.requireLogin = (req, res, next) => {
    if (!req.session.userEmail) {
        return res.status(401).json({ message: "You must be logged in." });
    }
    next();
};