import React, { useEffect, useState } from 'react';
import { getStats } from '../api/employees';

const styles = {
    page: { padding: '32px 24px', maxWidth: '960px', margin: '0 auto' },
    heading: { fontSize: '1.4rem', fontWeight: 700, marginBottom: '28px', color: '#1a73e8' },
    cards: { display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '36px' },
    card: { flex: '1 1 160px', background: '#fff', borderRadius: '8px', padding: '24px 20px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)', textAlign: 'center' },
    cardValue: { fontSize: '2rem', fontWeight: 700, color: '#1a73e8' },
    cardLabel: { marginTop: '6px', fontSize: '0.88rem', color: '#666' },
    section: { background: '#fff', borderRadius: '8px', padding: '20px 24px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)' },
    sectionTitle: { fontWeight: 600, marginBottom: '14px' },
    row: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f3f4', fontSize: '0.92rem' },
    error: { color: '#ea4335' },
};

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        getStats()
            .then((res) => setStats(res.data))
            .catch(() => setError('Failed to load statistics.'));
    }, []);

    return (
        <div style={styles.page}>
            <h1 style={styles.heading}>Dashboard</h1>
            {error && <p style={styles.error}>{error}</p>}
            {stats && (
                <>
                    <div style={styles.cards}>
                        <div style={styles.card}>
                            <div style={styles.cardValue}>{stats.total}</div>
                            <div style={styles.cardLabel}>Total Employees</div>
                        </div>
                        <div style={styles.card}>
                            <div style={styles.cardValue}>{stats.byDepartment.length}</div>
                            <div style={styles.cardLabel}>Departments</div>
                        </div>
                        <div style={styles.card}>
                            <div style={styles.cardValue}>${stats.averageSalary.toLocaleString()}</div>
                            <div style={styles.cardLabel}>Avg. Salary</div>
                        </div>
                    </div>

                    <div style={styles.section}>
                        <div style={styles.sectionTitle}>Employees by Department</div>
                        {stats.byDepartment.map((d) => (
                            <div key={d._id} style={styles.row}>
                                <span>{d._id}</span>
                                <strong>{d.count}</strong>
                            </div>
                        ))}
                        {!stats.byDepartment.length && <p style={{ color: '#888', fontSize: '0.9rem' }}>No data yet.</p>}
                    </div>
                </>
            )}
        </div>
    );
}
