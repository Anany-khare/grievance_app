const express = require('express');
const router = express.Router();
const Department = require('../models/Department');

// Add department
router.post('/', async (req, res) => {
  const dept = new Department(req.body);
  await dept.save();
  res.status(201).json(dept);
});

// Get all departments
router.get('/', async (req, res) => {
  const departments = await Department.find();
  res.json(departments);
});

module.exports = router;
