const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        department: {
            type: String,
            required: [true, 'Department is required'],
            trim: true,
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            trim: true,
        },
        hireDate: {
            type: Date,
            required: [true, 'Hire date is required'],
        },
        salary: {
            type: Number,
            required: [true, 'Salary is required'],
            min: [0, 'Salary cannot be negative'],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);
