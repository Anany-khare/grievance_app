const express = require('express');
const router = express.Router();
const {
  submitGrievance,
  updateGrievanceStatus,
  searchGrievanceByTicket,
  getAllGrievances
} = require('../controllers/grievanceController');

router.post('/submit', submitGrievance);
router.put('/:id/status', updateGrievanceStatus);
router.get('/search/:ticketNo', searchGrievanceByTicket);
router.get('/', getAllGrievances);

module.exports = router;
