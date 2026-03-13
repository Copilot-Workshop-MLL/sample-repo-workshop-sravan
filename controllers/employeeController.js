const Employee = require('../models/Employee');

// GET /api/employees?department=&role=
async function listEmployees(req, res) {
    try {
        const filter = {};
        if (req.query.department) filter.department = req.query.department;
        if (req.query.role) filter.role = req.query.role;

        const employees = await Employee.find(filter).sort({ createdAt: -1 });
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch employees', error: err.message });
    }
}

// GET /api/employees/stats
async function getStats(req, res) {
    try {
        const total = await Employee.countDocuments();

        const byDepartment = await Employee.aggregate([
            { $group: { _id: '$department', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        const avgSalaryResult = await Employee.aggregate([
            { $group: { _id: null, averageSalary: { $avg: '$salary' } } },
        ]);
        const averageSalary = avgSalaryResult[0]?.averageSalary ?? 0;

        res.json({ total, byDepartment, averageSalary: Math.round(averageSalary) });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch stats', error: err.message });
    }
}

// GET /api/employees/:id
async function getEmployee(req, res) {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch employee', error: err.message });
    }
}

// POST /api/employees
async function createEmployee(req, res) {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        res.status(500).json({ message: 'Failed to create employee', error: err.message });
    }
}

// PUT /api/employees/:id
async function updateEmployee(req, res) {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        res.status(500).json({ message: 'Failed to update employee', error: err.message });
    }
}

// DELETE /api/employees/:id
async function deleteEmployee(req, res) {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete employee', error: err.message });
    }
}

module.exports = { listEmployees, getStats, getEmployee, createEmployee, updateEmployee, deleteEmployee };
