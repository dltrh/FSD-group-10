const User = require('../models/User');

exports.requireLogin = async (req, res, next) => {
    const username = req.signedCookies.user;
    if (!username) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const user = await User.findOne({ username: username });
  
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      req.user = user;
      next();
    } catch (err) {
      console.error('Error during authentication:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }