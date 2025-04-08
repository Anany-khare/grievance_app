const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (allowedRoles = []) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'No token' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return res.status(401).json({ message: 'Invalid token' });
      if (allowedRoles.length && !allowedRoles.includes(user.role))
        return res.status(403).json({ message: 'Not allowed' });

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = auth;
