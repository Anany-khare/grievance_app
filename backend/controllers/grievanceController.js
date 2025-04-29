const Grievance = require('../models/grievanceModel');
const Department = require('../models/departmentModel');

const generateTicketNo = () => {
  return 'TICKET-' + Math.random().toString(36).substring(2, 10).toUpperCase();
};

const submitGrievance = async (req, res) => {
  const { departmentId, title, description } = req.body;

  try {
    const department = await Department.findById(departmentId);
    if (!department) return res.status(404).json({ message: 'Department not found' });

    const ticketNo = generateTicketNo();
    const grievance = new Grievance({ department, title, description, ticketNo });
    await grievance.save();

    res.status(201).json({ message: 'Grievance submitted', ticketNo });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting grievance', error: err });
  }
};

const updateGrievanceStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const grievance = await Grievance.findByIdAndUpdate(id, { status }, { new: true });
    if (!grievance) return res.status(404).json({ message: 'Grievance not found' });

    res.status(200).json({ message: 'Status updated', grievance });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status', error: err });
  }
};

const searchGrievanceByTicket = async (req, res) => {
  const { ticketNo } = req.params;

  try {
    const grievance = await Grievance.findOne({ ticketNo }).populate('department', 'name');
    if (!grievance) return res.status(404).json({ message: 'Ticket not found' });

    res.status(200).json(grievance);
  } catch (error) {
    res.status(500).json({ message: 'Error searching ticket', error });
  }
};

const getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find().populate('department');
    res.status(200).json(grievances);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching grievances', error: err });
  }
};

module.exports = {
  submitGrievance,
  updateGrievanceStatus,
  searchGrievanceByTicket,
  getAllGrievances
};
