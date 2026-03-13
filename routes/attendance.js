const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { markAttendance, getAttendance, updateAttendance, deleteAttendance } = require('../controllers/attendanceController');

const router = express.Router();
router.use(verifyToken);

router.post('/', markAttendance);
router.get('/:employeeId', getAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

module.exports = router;
