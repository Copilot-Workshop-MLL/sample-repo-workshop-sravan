import React from 'react';

const styles = {
    wrap: { overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' },
    th: { background: '#1a73e8', color: '#fff', padding: '10px 14px', textAlign: 'left', whiteSpace: 'nowrap' },
    td: { padding: '10px 14px', borderBottom: '1px solid #e8eaed', whiteSpace: 'nowrap' },
    trHover: { background: '#f8f9fa' },
    editBtn: { marginRight: '8px', padding: '4px 10px', cursor: 'pointer', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.82rem' },
    delBtn: { padding: '4px 10px', cursor: 'pointer', background: '#ea4335', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.82rem' },
    empty: { textAlign: 'center', padding: '32px', color: '#888' },
};

export default function EmployeeTable({ employees, onEdit, onDelete }) {
    if (!employees.length) return <p style={styles.empty}>No employees found.</p>;

    return (
        <div style={styles.wrap}>
            <table style={styles.table}>
                <thead>
                    <tr>
                        {['Name', 'Email', 'Department', 'Role', 'Hire Date', 'Salary', 'Actions'].map((h) => (
                            <th key={h} style={styles.th}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp._id} style={styles.trHover}>
                            <td style={styles.td}>{emp.name}</td>
                            <td style={styles.td}>{emp.email}</td>
                            <td style={styles.td}>{emp.department}</td>
                            <td style={styles.td}>{emp.role}</td>
                            <td style={styles.td}>{new Date(emp.hireDate).toLocaleDateString()}</td>
                            <td style={styles.td}>${emp.salary.toLocaleString()}</td>
                            <td style={styles.td}>
                                <button style={styles.editBtn} onClick={() => onEdit(emp)}>Edit</button>
                                <button style={styles.delBtn} onClick={() => onDelete(emp._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
