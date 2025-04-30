const express = require('express');
const router = express.Router();
const {
  getAllGrievances,
  searchGrievanceByTicket,
  updateGrievanceStatus,
  deleteGrievance, 
} = require('../controllers/grievanceController');

router.get('/', getAllGrievances);
router.get('/search/:ticketNo', searchGrievanceByTicket);
router.put('/:id/status', updateGrievanceStatus);
router.delete('/:id', deleteGrievance);

module.exports = router;
