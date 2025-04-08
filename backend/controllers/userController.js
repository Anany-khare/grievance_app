const User = require('../models/User');

exports.addUser = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    const user = new User({ name, email, password, role, department });
    await user.save();

    res.status(201).json({ message: 'User added successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
