const Department = require('../models/departmentModel');

const addDepartment = async (req, res) => {
  const { name } = req.body;

  try {
    const exists = await Department.findOne({ name });
    if (exists) return res.status(400).json({ message: 'Department already exists' });

    const department = new Department({ name });
    await department.save();
    res.status(201).json({ message: 'Department added', department });
  } catch (err) {
    res.status(500).json({ message: 'Error adding department', error: err });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('hod', 'name').populate('proctors', 'name');
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching departments', error: err });
  }
};

module.exports = {
  addDepartment,
  getDepartments
};
