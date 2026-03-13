import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

const styles = {
    page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fa' },
    card: { background: '#fff', borderRadius: '8px', padding: '40px 36px', width: '100%', maxWidth: '380px', boxShadow: '0 2px 16px rgba(0,0,0,0.1)' },
    title: { fontSize: '1.4rem', fontWeight: 700, marginBottom: '24px', textAlign: 'center', color: '#1a73e8' },
    label: { display: 'block', marginBottom: '16px', fontSize: '0.88rem', color: '#555' },
    input: { display: 'block', width: '100%', marginTop: '4px', padding: '10px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.95rem' },
    btn: { width: '100%', padding: '11px', marginTop: '8px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer', fontWeight: 600 },
    error: { color: '#ea4335', fontSize: '0.85rem', marginBottom: '12px', textAlign: 'center' },
};

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await login(form.username, form.password);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={styles.page}>
            <form style={styles.card} onSubmit={handleSubmit}>
                <div style={styles.title}>Employee Management System</div>
                {error && <div style={styles.error}>{error}</div>}
                <label style={styles.label}>
                    Username
                    <input style={styles.input} type="text" required value={form.username}
                        onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))} />
                </label>
                <label style={styles.label}>
                    Password
                    <input style={styles.input} type="password" required value={form.password}
                        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
                </label>
                <button type="submit" style={styles.btn} disabled={loading}>
                    {loading ? 'Signing in…' : 'Sign In'}
                </button>
            </form>
        </div>
    );
}
