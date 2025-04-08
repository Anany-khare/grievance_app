const express = require('express');
const router = express.Router();
const Grievance = require('../models/grievance');

router.post('/', async (req, res) => {
  try {
    const { student, department, content } = req.body;

    if (!student || !department || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const grievance = new Grievance({ student, department, content });
    await grievance.save();

    res.status(201).json(grievance);
  } catch (err) {
    res.status(400).json({ message: 'Error creating grievance', error: err.message });
  }
});

module.exports = router;
