//Check admin
module.exports = (req, res, next) => {
    console.log("Session:", req.session); //For debug
    if (!req.session.userEmail || !req.session.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};