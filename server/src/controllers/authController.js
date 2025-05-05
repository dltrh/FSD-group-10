const bcrypt = require('bcrypt');
const { validateRegister, validateLogin } = require('../utils/validators');
const User = require('../models/User'); // Import model MongoDB

// REGISTER
exports.register = async (req, res) => {
    const error = validateRegister(req.body);
    if (error)
        return res.status(400).json({ message: error });

    const { email, password, isAdmin = false, fullname, phone, userId } = req.body;
    // const fullname = `${firstname} ${lastname}`;
    // const userId = `user_${Date.now()}`;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            isAdmin,
            fullname,
            phone,
            userId
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// LOGIN
exports.login = async (req, res) => {
    console.log("Body received:", req.body);

    const error = validateLogin(req.body);
    if (error)
        return res.status(400).json({ message: error });

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log("User found:", user);

        if (!user)
            return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        // For Test only
        // if (user.password !== password) {
        //     return res.status(401).json({ message: 'Invalid credentials' });
        // }

        if (!isMatch)
            return res.status(401).json({ message: 'Invalid credentials' });

        // Set session
        req.session.user = {
            email: user.email,
            isAdmin: user.isAdmin
        };

        // Set cookie 
        res.cookie('token', token, {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            sameSite: 'Strict' 
        });

        return res.json({
            message: "Login successful",
            isAdmin: user.isAdmin,
            email: user.email
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// LOGOUT
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err)
            return res.status(500).json({ message: 'Logout failed' });

        // res.clearCookie('connect.sid');
        res.clearCookie('token', { path: '/' });
        res.json({ message: 'Logged out' });
    });
};

exports.getProfile = async (req, res) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Not authenticated" });

    try {
        const userData = jwt.verify(token, SECRET);
        res.json({ message: "Welcome!", user: userData });
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

