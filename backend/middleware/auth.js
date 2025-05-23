const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = (allowedRoles = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : req.cookies.token;

    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).populate('department');
      if (!user) return res.status(401).json({ message: 'Invalid token' });

      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Not allowed' });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token', error: err.message });
    }
  };
};

module.exports = auth;
