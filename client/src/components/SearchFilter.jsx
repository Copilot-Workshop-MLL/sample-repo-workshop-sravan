import React from 'react';

const styles = {
    wrap: { display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' },
    input: { padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem', minWidth: '160px', flex: 1 },
    btn: { padding: '8px 16px', background: '#f1f3f4', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' },
};

export default function SearchFilter({ filters, onChange, onClear }) {
    return (
        <div style={styles.wrap}>
            <input
                style={styles.input}
                placeholder="Filter by department"
                value={filters.department}
                onChange={(e) => onChange({ ...filters, department: e.target.value })}
            />
            <input
                style={styles.input}
                placeholder="Filter by role"
                value={filters.role}
                onChange={(e) => onChange({ ...filters, role: e.target.value })}
            />
            <button style={styles.btn} onClick={onClear}>Clear</button>
        </div>
    );
}
