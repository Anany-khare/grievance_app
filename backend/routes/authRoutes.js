const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const authenticateUser = require("../middleware/auth.js")

const User = require('../models/userModel.js');

router.post('/register', register);
router.post('/login', login);
// GET /api/user/me — Get current logged-in user
router.get('/me', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('department');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("❌ Error fetching user info:", err);
    res.status(500).json({ message: 'Error fetching user info', error: err.message });
  }
});


module.exports = router;
