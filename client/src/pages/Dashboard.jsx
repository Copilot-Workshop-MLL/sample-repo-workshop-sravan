import React, { useEffect, useState } from 'react';
import { getStats } from '../api/employees';
import CircularProgress from '../components/CircularProgress';

const styles = {
    page: { padding: '32px 24px', maxWidth: '960px', margin: '0 auto' },
    heading: { fontSize: '1.4rem', fontWeight: 700, marginBottom: '28px', color: '#1a73e8' },
    cards: { display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '36px' },
    card: {
        flex: '1 1 160px',
        background: '#fff',
        borderRadius: '8px',
        padding: '24px 20px',
        boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
    },
    cardLabel: { marginTop: '4px', fontSize: '0.88rem', color: '#666' },
    section: { background: '#fff', borderRadius: '8px', padding: '20px 24px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)' },
    sectionTitle: { fontWeight: 600, marginBottom: '14px' },
    row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f3f4', fontSize: '0.92rem' },
    error: { color: '#ea4335' },
};

// Thresholds for mapping real data to 0-100 % for visual indicators
const MAX_EMPLOYEES   = 50;
const MAX_DEPARTMENTS = 10;
const MAX_SALARY      = 100_000;

/** Clamps a value to [0, 100] for use in CircularProgress. */
function clamp(v) { return Math.min(100, Math.max(0, v)); }

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        getStats()
            .then((res) => setStats(res.data))
            .catch(() => setError('Failed to load statistics.'));
    }, []);

    // Derive progress values for visual indicators.
    // These are illustrative ratios that map real data to a 0-100 scale.
    const totalProgress   = stats ? clamp((stats.total / MAX_EMPLOYEES) * 100)           : 0;
    const deptProgress    = stats ? clamp((stats.byDepartment.length / MAX_DEPARTMENTS) * 100) : 0;
    const salaryProgress  = stats ? clamp((stats.averageSalary / MAX_SALARY) * 100)           : 0;

    return (
        <div style={styles.page}>
            <h1 style={styles.heading}>Dashboard</h1>
            {error && <p style={styles.error}>{error}</p>}
            {stats && (
                <>
                    <div style={styles.cards}>
                        {/* Total Employees card */}
                        <div className="ems-fadeIn" style={styles.card}>
                            <CircularProgress
                                value={totalProgress}
                                size={90}
                                strokeWidth={9}
                                showColor
                            />
                            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1a73e8' }}>
                                {stats.total}
                            </div>
                            <div style={styles.cardLabel}>Total Employees</div>
                        </div>

                        {/* Departments card */}
                        <div className="ems-fadeIn" style={styles.card}>
                            <CircularProgress
                                value={deptProgress}
                                size={90}
                                strokeWidth={9}
                                showColor
                            />
                            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1a73e8' }}>
                                {stats.byDepartment.length}
                            </div>
                            <div style={styles.cardLabel}>Departments</div>
                        </div>

                        {/* Average Salary card */}
                        <div className="ems-fadeIn" style={styles.card}>
                            <CircularProgress
                                value={salaryProgress}
                                size={90}
                                strokeWidth={9}
                                showColor
                            />
                            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1a73e8' }}>
                                ${stats.averageSalary.toLocaleString()}
                            </div>
                            <div style={styles.cardLabel}>Avg. Salary</div>
                        </div>
                    </div>

                    <div style={styles.section}>
                        <div style={styles.sectionTitle}>Employees by Department</div>
                        {stats.byDepartment.map((d) => {
                            const pct = stats.total > 0 ? clamp((d.count / stats.total) * 100) : 0;
                            return (
                                <div key={d._id} style={styles.row}>
                                    <span>{d._id}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <CircularProgress value={pct} size={36} strokeWidth={4} showColor />
                                        <strong>{d.count}</strong>
                                    </div>
                                </div>
                            );
                        })}
                        {!stats.byDepartment.length && (
                            <p style={{ color: '#888', fontSize: '0.9rem' }}>No data yet.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

