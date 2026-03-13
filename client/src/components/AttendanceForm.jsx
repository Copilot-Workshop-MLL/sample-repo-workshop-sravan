import React, { useState } from 'react';

const EMPTY = { employee: '', date: '', status: '' };
const statuses = ['Present', 'Absent', 'Leave'];

const styles = {
    overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' },
    modal: { background: '#fff', borderRadius: '8px', padding: '28px 24px', width: '100%', maxWidth: '420px', boxShadow: '0 4px 24px rgba(0,0,0,0.18)' },
    title: { fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px' },
    label: { display: 'block', marginBottom: '14px', fontSize: '0.88rem', color: '#555' },
    input: { display: 'block', width: '100%', marginTop: '4px', padding: '8px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.95rem' },
    error: { color: '#ea4335', fontSize: '0.82rem', marginTop: '4px' },
    footer: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' },
    cancelBtn: { padding: '8px 18px', cursor: 'pointer', background: '#f1f3f4', border: 'none', borderRadius: '4px' },
    saveBtn: { padding: '8px 18px', cursor: 'pointer', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '4px' },
};

export default function AttendanceForm({ employees, onSave, onClose }) {
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    function validate() {
        const e = {};
        if (!form.employee) e.employee = 'Employee is required';
        if (!form.date) e.date = 'Date is required';
        if (!form.status) e.status = 'Status is required';
        return e;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const e2 = validate();
        if (Object.keys(e2).length) { setErrors(e2); return; }
        setSaving(true);
        try {
            await onSave(form);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <form style={styles.modal} onSubmit={handleSubmit}>
                <div style={styles.title}>Mark Attendance</div>
                <label style={styles.label}>
                    Employee
                    <select
                        style={styles.input}
                        value={form.employee}
                        onChange={e => setForm(f => ({ ...f, employee: e.target.value }))}
                    >
                        <option value="">Select employee</option>
                        {employees.map(emp => (
                            <option key={emp._id} value={emp._id}>{emp.name}</option>
                        ))}
                    </select>
                    {errors.employee && <span style={styles.error}>{errors.employee}</span>}
                </label>
                <label style={styles.label}>
                    Date
                    <input
                        style={styles.input}
                        type="date"
                        value={form.date}
                        onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                    />
                    {errors.date && <span style={styles.error}>{errors.date}</span>}
                </label>
                <label style={styles.label}>
                    Status
                    <select
                        style={styles.input}
                        value={form.status}
                        onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    >
                        <option value="">Select status</option>
                        {statuses.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    {errors.status && <span style={styles.error}>{errors.status}</span>}
                </label>
                <div style={styles.footer}>
                    <button type="button" style={styles.cancelBtn} onClick={onClose}>Cancel</button>
                    <button type="submit" style={styles.saveBtn} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
                </div>
            </form>
        </div>
    );
}
