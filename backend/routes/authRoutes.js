const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const authenticateUser = require("../middleware/auth.js")

const User = require('../models/userModel.js');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
