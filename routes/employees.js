const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { employeeRules, validate } = require('../middleware/validate');
const {
    listEmployees,
    getStats,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} = require('../controllers/employeeController');

const router = express.Router();

// All routes require a valid JWT
router.use(verifyToken);

router.get('/stats', getStats);
router.get('/', listEmployees);
router.get('/:id', getEmployee);
router.post('/', employeeRules, validate, createEmployee);
router.put('/:id', employeeRules, validate, updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
