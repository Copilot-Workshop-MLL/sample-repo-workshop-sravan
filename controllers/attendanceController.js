const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

// Mark attendance
async function markAttendance(req, res) {
    try {
        const { employee, date, status } = req.body;
        if (!employee || !date || !status) return res.status(400).json({ message: 'All fields required.' });
        const att = await Attendance.create({ employee, date, status });
        res.status(201).json(att);
    } catch (err) {
        res.status(500).json({ message: 'Failed to mark attendance', error: err.message });
    }
}

// Get attendance for employee
async function getAttendance(req, res) {
    try {
        const { employeeId } = req.params;
        const records = await Attendance.find({ employee: employeeId }).populate('employee');
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch attendance', error: err.message });
    }
}

// Update attendance
async function updateAttendance(req, res) {
    try {
        const { id } = req.params;
        const att = await Attendance.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!att) return res.status(404).json({ message: 'Attendance not found' });
        res.json(att);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update attendance', error: err.message });
    }
}

// Delete attendance
async function deleteAttendance(req, res) {
    try {
        const { id } = req.params;
        const att = await Attendance.findByIdAndDelete(id);
        if (!att) return res.status(404).json({ message: 'Attendance not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete attendance', error: err.message });
    }
}

module.exports = { markAttendance, getAttendance, updateAttendance, deleteAttendance };
