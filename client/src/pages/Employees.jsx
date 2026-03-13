import React, { useEffect, useState, useCallback } from 'react';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api/employees';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeForm from '../components/EmployeeForm';
import SearchFilter from '../components/SearchFilter';

const styles = {
    page: { padding: '32px 24px', maxWidth: '1100px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' },
    heading: { fontSize: '1.4rem', fontWeight: 700, color: '#1a73e8' },
    addBtn: { padding: '9px 20px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 },
    error: { color: '#ea4335', marginBottom: '12px' },
};

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [filters, setFilters] = useState({ department: '', role: '' });
    const [showForm, setShowForm] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [error, setError] = useState('');

    const load = useCallback(() => {
        const params = {};
        if (filters.department) params.department = filters.department;
        if (filters.role) params.role = filters.role;
        getEmployees(params)
            .then((res) => setEmployees(res.data))
            .catch(() => setError('Failed to load employees.'));
    }, [filters]);

    useEffect(() => { load(); }, [load]);

    async function handleSave(data) {
        try {
            if (editTarget) {
                await updateEmployee(editTarget._id, data);
            } else {
                await createEmployee(data);
            }
            setShowForm(false);
            setEditTarget(null);
            load();
        } catch (err) {
            setError(err.response?.data?.message || 'Save failed.');
        }
    }

    async function handleDelete(id) {
        if (!window.confirm('Delete this employee?')) return;
        try {
            await deleteEmployee(id);
            load();
        } catch {
            setError('Delete failed.');
        }
    }

    function openEdit(emp) {
        setEditTarget(emp);
        setShowForm(true);
    }

    function openAdd() {
        setEditTarget(null);
        setShowForm(true);
    }

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.heading}>Employees</h1>
                <button style={styles.addBtn} onClick={openAdd}>+ Add Employee</button>
            </div>
            {error && <p style={styles.error}>{error}</p>}
            <SearchFilter filters={filters} onChange={setFilters} onClear={() => setFilters({ department: '', role: '' })} />
            <EmployeeTable employees={employees} onEdit={openEdit} onDelete={handleDelete} />
            {showForm && (
                <EmployeeForm
                    initial={editTarget}
                    onSave={handleSave}
                    onClose={() => { setShowForm(false); setEditTarget(null); }}
                />
            )}
        </div>
    );
}
