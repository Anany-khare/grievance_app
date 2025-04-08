// backend/models/Department.js
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  hod: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to HOD
});

module.exports = mongoose.model('Department', departmentSchema);
