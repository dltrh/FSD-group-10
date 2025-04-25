//redirect when user has role Admin 
const autoRedirectByRole = (req, res) => {
    if (req.session.user?.isAdmin) {
        return res.redirect('/admin/dashboard');
    }
    return res.redirect('/user/home');
};

module.exports = (req, res, next) => {
    if (!req.session.user || !req.session.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};