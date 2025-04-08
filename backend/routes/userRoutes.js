const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Add user
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Get proctors by department
router.get('/proctors/:department', async (req, res) => {
  try {
    const proctors = await User.find({ role: 'proctor', department: req.params.department });
    res.json(proctors);
  } catch (error) {
    console.error('Fetch Proctors Error:', error.message);
    res.status(500).json({ message: 'Error fetching proctors' });
  }
});

module.exports = router;
