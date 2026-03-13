const { body, validationResult } = require('express-validator');

const employeeRules = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('department').trim().notEmpty().withMessage('Department is required'),
    body('role').trim().notEmpty().withMessage('Role is required'),
    body('hireDate').isISO8601().withMessage('Hire date must be a valid date (YYYY-MM-DD)'),
    body('salary').isFloat({ min: 0 }).withMessage('Salary must be a non-negative number'),
];

function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = { employeeRules, validate };
