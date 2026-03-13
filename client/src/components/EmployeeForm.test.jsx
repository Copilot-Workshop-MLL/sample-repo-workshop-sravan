import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeForm from './EmployeeForm';

const mockOnSave = jest.fn();
const mockOnClose = jest.fn();

describe('EmployeeForm', () => {
  it('shows validation errors for empty fields', async () => {
    render(<EmployeeForm initial={null} onSave={mockOnSave} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('Save'));
    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Valid email is required')).toBeInTheDocument();
    expect(screen.getByText('Department is required')).toBeInTheDocument();
    expect(screen.getByText('Role is required')).toBeInTheDocument();
    expect(screen.getByText('Hire date is required')).toBeInTheDocument();
    expect(screen.getByText('Salary must be a non-negative number')).toBeInTheDocument();
  });

  it('calls onSave with valid data', async () => {
    render(<EmployeeForm initial={null} onSave={mockOnSave} onClose={mockOnClose} />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Department'), { target: { value: 'HR' } });
    fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'Manager' } });
    fireEvent.change(screen.getByLabelText('Hire Date'), { target: { value: '2023-01-01' } });
    fireEvent.change(screen.getByLabelText('Salary'), { target: { value: '50000' } });
    fireEvent.click(screen.getByText('Save'));
    expect(mockOnSave).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      department: 'HR',
      role: 'Manager',
      hireDate: '2023-01-01',
      salary: 50000,
    });
  });
});
