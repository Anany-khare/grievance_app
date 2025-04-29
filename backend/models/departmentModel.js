const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: String,
  hod: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  proctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Department', departmentSchema);
