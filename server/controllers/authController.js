const bcrypt = require('bcrypt');
const { validateRegister, validateLogin } = require('../utils/validators');


//register section
exports.register = async (req, res) => {
    const error = validateRegister(req.body);
    if (error)
        return res.status(400).json({ message: error });

    const { username, password } = req.body;
    const existingUser = users.find(user => user.username === username);
    if (existingUser)
        return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    ~
        res.status(201).json({ message: 'User registered successfully' });
};

//login section 
exports.login = async (req, res) => {
    const error = validateLogin(req.body);
    if (error)
        return res.status(400).json({ message: error });

    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (!user)
        return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        return res.status(401).json({ message: 'Invalid credentials' });

    req.session.user = { username };
    res.json({ message: 'Login successful' });
};

//logout section
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err)
            return res.status(500).json({ message: 'Logout failed' });
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out' });
    });
};
