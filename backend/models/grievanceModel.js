const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
  ticketNo: { type: String, unique: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  title: String,
  description: String,
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'], default: 'Pending' },
  dateSubmitted: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Grievance', grievanceSchema);