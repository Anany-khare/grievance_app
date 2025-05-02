const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// const User = require('../models/User');
const Department = require('../models/departmentModel');

exports.register = async (req, res) => {
  const { name, email, password, department, role } = req.body;

  try {
    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. Create new user with hashed password
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      department,
    });

    // 2. If user is HOD, update department
    if (role === 'HOD') {
      await Department.findByIdAndUpdate(department, { hod: newUser._id });
    }

    res.status(201).json({ message: 'HOD registered successfully!' });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // console.log('Generated Token:', token);  
    // console.log(user.department);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        proctor: user.proctor,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};
