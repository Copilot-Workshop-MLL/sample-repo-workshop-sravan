import React, { useState, useEffect } from 'react';

const EMPTY = { name: '', email: '', department: '', role: '', hireDate: '', salary: '' };

const styles = {
    overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' },
    modal: { background: '#fff', borderRadius: '8px', padding: '28px 24px', width: '100%', maxWidth: '480px', boxShadow: '0 4px 24px rgba(0,0,0,0.18)' },
    title: { fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px' },
    label: { display: 'block', marginBottom: '14px', fontSize: '0.88rem', color: '#555' },
    input: { display: 'block', width: '100%', marginTop: '4px', padding: '8px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.95rem' },
    error: { color: '#ea4335', fontSize: '0.82rem', marginTop: '4px' },
    footer: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' },
    cancelBtn: { padding: '8px 18px', cursor: 'pointer', background: '#f1f3f4', border: 'none', borderRadius: '4px' },
    saveBtn: { padding: '8px 18px', cursor: 'pointer', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '4px' },
};

export default function EmployeeForm({ initial, onSave, onClose }) {
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (initial) {
            setForm({
                name: initial.name || '',
                email: initial.email || '',
                department: initial.department || '',
                role: initial.role || '',
                hireDate: initial.hireDate ? initial.hireDate.slice(0, 10) : '',
                salary: initial.salary ?? '',
            });
        }
    }, [initial]);

    function validate() {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
        if (!form.department.trim()) e.department = 'Department is required';
        if (!form.role.trim()) e.role = 'Role is required';
        if (!form.hireDate) e.hireDate = 'Hire date is required';
        if (form.salary === '' || Number(form.salary) < 0) e.salary = 'Salary must be a non-negative number';
        return e;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const e2 = validate();
        if (Object.keys(e2).length) { setErrors(e2); return; }
        setSaving(true);
        try {
            await onSave({ ...form, salary: Number(form.salary) });
        } finally {
            setSaving(false);
        }
    }

    function field(name, label, type = 'text') {
        return (
            <label style={styles.label}>
                {label}
                <input
                    style={styles.input}
                    type={type}
                    value={form[name]}
                    onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
                />
                {errors[name] && <span style={styles.error}>{errors[name]}</span>}
            </label>
        );
    }

    return (
        <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <form style={styles.modal} onSubmit={handleSubmit}>
                <div style={styles.title}>{initial ? 'Edit Employee' : 'Add Employee'}</div>
                {field('name', 'Name')}
                {field('email', 'Email', 'email')}
                {field('department', 'Department')}
                {field('role', 'Role')}
                {field('hireDate', 'Hire Date', 'date')}
                {field('salary', 'Salary', 'number')}
                <div style={styles.footer}>
                    <button type="button" style={styles.cancelBtn} onClick={onClose}>Cancel</button>
                    <button type="submit" style={styles.saveBtn} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
                </div>
            </form>
        </div>
    );
}
