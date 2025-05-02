const Grievance = require('../models/grievanceModel');
const Department = require('../models/departmentModel');
const User = require('../models/userModel'); // Assuming this is how you access the logged-in user

// Generate ticket number
const generateTicketNo = () => {
  return 'TICKET-' + Math.random().toString(36).substring(2, 10).toUpperCase();
};

// Submit grievance function
const submitGrievance = async (req, res) => {
  const { title, description, departmentId } = req.body;

  try {
    // Check if departmentId is provided
    if (!departmentId) {
      return res.status(400).json({ message: 'Department is required' });
    }

    // Validate if the department exists
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Generate a ticket number for the grievance
    const ticketNo = generateTicketNo();

    // Create and save grievance
    const grievance = new Grievance({
      department: department._id,
      title,
      description,
      ticketNo,
      status: 'Pending', // Default status
    });

    await grievance.save();
    return res.status(201).json({ message: 'Grievance submitted successfully', ticketNo });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error submitting grievance', error: err.message });
  }
};

// Update grievance status (for HOD or Admin)
const updateGrievanceStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Ensure status is one of the allowed values
  const allowedStatuses = ['Pending', 'In Progress', 'Resolved', 'Rejected'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    // Find the grievance by ID and update the status
    const updatedGrievance = await Grievance.findByIdAndUpdate(
      id,
      { status: status },
      { new: true } // Return the updated grievance
    );

    if (!updatedGrievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    return res.status(200).json(updatedGrievance);
  } catch (error) {
    console.error('Error updating grievance status:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Search grievance by ticket number
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

// Get all grievances (Admin or Proctor can view all)
const getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find()
    .populate('department');
    return res.status(200).json(grievances);
  } catch (error) {
    console.error('Error fetching grievances:', error);
    return res.status(500).json({ message: 'Error fetching grievances', error: error.message });
  }
};
// Get grievances for HOD's department
const getGrievancesByDepartment = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ message: 'User not found' });

    const departmentName = user.department?.name;
    if (!departmentName) return res.status(400).json({ message: 'Department not assigned' });

    const grievances = await Grievance.find({ department: user.department._id }).populate('department');
    res.status(200).json(grievances);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching grievances', error: err.message });
  }
};


// Delete grievance (for Admin or HOD)

const deleteGrievance = async (req, res) => {
  const grievanceId = req.params.id;

  try {
    const grievance = await Grievance.findById(grievanceId);
    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    // Perform deletion directly
    await Grievance.findByIdAndDelete(grievanceId);

    res.status(200).json({ message: 'Grievance deleted successfully' });
  } catch (err) {
    console.error('Error deleting grievance:', err);
    res.status(500).json({ message: 'Error deleting grievance' });
  }
};

module.exports = {
  submitGrievance,
  updateGrievanceStatus,
  searchGrievanceByTicket,
  getAllGrievances,
  getGrievancesByDepartment,
  deleteGrievance,
};
