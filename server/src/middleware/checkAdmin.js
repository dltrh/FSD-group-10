// Checking whether user logged in has an admin role or not
module.exports = (req, res, next) => {
    if (!req.session.userEmail) {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};