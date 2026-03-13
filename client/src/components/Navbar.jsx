import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const styles = {
    nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: '56px', background: '#1a73e8', color: '#fff' },
    brand: { fontWeight: 700, fontSize: '1.1rem', color: '#fff', textDecoration: 'none' },
    links: { display: 'flex', gap: '24px', listStyle: 'none' },
    link: { color: '#fff', textDecoration: 'none', fontSize: '0.95rem' },
    btn: { background: 'transparent', border: '1px solid #fff', color: '#fff', borderRadius: '4px', padding: '6px 14px', cursor: 'pointer', fontSize: '0.9rem' },
};

export default function Navbar() {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <nav style={styles.nav}>
            <Link to="/dashboard" style={styles.brand}>EMS</Link>
            <ul style={styles.links}>
                <li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
                <li><Link to="/employees" style={styles.link}>Employees</Link></li>
                <li><Link to="/attendance" style={styles.link}>Attendance</Link></li>
            </ul>
            <button onClick={logout} style={styles.btn}>Logout</button>
        </nav>
    );
}
