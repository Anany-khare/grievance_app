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
const auth = require("../middleware/auth.js")
const User = require("../models/userModel.js")

router.get('/', getAllGrievances);
router.get('/search/:ticketNo', searchGrievanceByTicket);
router.put('/:id/status', updateGrievanceStatus);
router.delete('/:id', deleteGrievance);
router.post('/submit', submitGrievance);

router.get('/department',auth(), getGrievancesByDepartment)
module.exports = router;
