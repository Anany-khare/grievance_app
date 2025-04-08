const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: String, required: true },
  content: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Solved', 'Not Solved'],
    default: 'Pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Grievance', grievanceSchema);
