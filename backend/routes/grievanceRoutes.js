const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth.js'); 
const {
  submitGrievance,
  getAllGrievances,
  searchGrievanceByTicket,
  updateGrievanceStatus,
  deleteGrievance,
  getGrievancesByDepartment, 
} = require('../controllers/grievanceController.js');
const authenticateUser = require("../middleware/auth.js")
const User = require("../models/userModel.js")

router.get('/', getAllGrievances);
router.get('/search/:ticketNo', searchGrievanceByTicket);
router.put('/:id/status', updateGrievanceStatus);
router.delete('/:id', deleteGrievance);
router.post('/submit', submitGrievance);

// router.get('/department', authenticateUser, getGrievancesByDepartment);
router.get('/department', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const departmentId = user.department;

    if (!departmentId) {
      return res.status(400).json({ message: 'No department assigned to user' });
    }

    const grievances = await Grievance.find({ department: departmentId }).sort({ dateSubmitted: -1 });
    res.status(200).json(grievances);
  } catch (err) {
    console.error("❌ Error fetching grievances:", err);
    res.status(500).json({ message: 'Error fetching grievances', error: err.message });
  }
});
module.exports = router;
