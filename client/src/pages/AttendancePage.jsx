import React, { useState, useEffect } from 'react';
import AttendanceForm from '../components/AttendanceForm';
import { getEmployees } from '../api/employees';
import api from '../api/axiosInstance';

const statusColors = {
  Present: '#34a853',
  Absent: '#ea4335',
  Leave: '#fbbc05',
};

export default function AttendancePage() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    getEmployees().then(res => setEmployees(res.data));
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      api.get(`/attendance/${selectedEmployee}`).then(res => setAttendance(res.data));
    } else {
      setAttendance([]);
    }
  }, [selectedEmployee]);

  async function handleAttendanceSave(data) {
    await api.post('/attendance', data);
    setShowForm(false);
    api.get(`/attendance/${data.employee}`).then(res => setAttendance(res.data));
  }

  return (
    <div style={{ padding: '32px 24px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '28px 24px', marginBottom: '32px' }}>
        <h2 style={{ color: '#1a73e8', fontWeight: 700, marginBottom: '18px' }}>Attendance Management</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
          <label style={{ fontSize: '1rem', color: '#555' }}>
            Employee:{' '}
            <select style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }} value={selectedEmployee} onChange={e => setSelectedEmployee(e.target.value)}>
              <option value="">-- Select --</option>
              {employees.map(emp => (
                <option key={emp._id} value={emp._id}>{emp.name}</option>
              ))}
            </select>
          </label>
          <button style={{ padding: '10px 22px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }} onClick={() => setShowForm(true)} disabled={!selectedEmployee}>Mark Attendance</button>
        </div>
      </div>
      {showForm && (
        <AttendanceForm
          employees={employees}
          onSave={handleAttendanceSave}
          onClose={() => setShowForm(false)}
        />
      )}
      <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '24px 20px' }}>
        <h3 style={{ color: '#1a73e8', fontWeight: 600, marginBottom: '16px' }}>Attendance Records</h3>
        {attendance.length === 0 ? (
          <p style={{ color: '#888' }}>No attendance records found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.98rem' }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: '2px solid #e8eaed', padding: '10px 14px', textAlign: 'left', background: '#f5f7fa', color: '#333' }}>Date</th>
                  <th style={{ borderBottom: '2px solid #e8eaed', padding: '10px 14px', textAlign: 'left', background: '#f5f7fa', color: '#333' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map(record => (
                  <tr key={record._id}>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #e8eaed' }}>{new Date(record.date).toLocaleDateString()}</td>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #e8eaed' }}>
                      <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '16px', background: statusColors[record.status] || '#ccc', color: '#fff', fontWeight: 600 }}>{record.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
