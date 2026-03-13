import React from 'react';

/**
 * Returns an urgency-aware color:
 *   low progress  (< 34 %) → blue   (#1a73e8) – calm / on track
 *   mid progress  (34–66 %) → yellow (#fbbc05) – approaching deadline
 *   high progress (> 66 %) → red    (#ea4335) – urgent / running out of time
 */
export function getUrgencyColor(value) {
  if (value < 34) return '#1a73e8';
  if (value < 67) return '#fbbc05';
  return '#ea4335';
}

/**
 * SVG-based circular progress indicator.
 *
 * Props:
 *   value       {number}  0–100, how much of the ring is filled  (default 0)
 *   size        {number}  outer diameter in px                   (default 80)
 *   strokeWidth {number}  ring thickness in px                   (default 8)
 *   label       {string}  optional text rendered below the ring
 *   showColor   {boolean} apply urgency-based colour (default true)
 *   color       {string}  override colour (ignores showColor when provided)
 */
export default function CircularProgress({
  value = 0,
  size = 80,
  strokeWidth = 8,
  label,
  showColor = true,
  color,
}) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedValue / 100) * circumference;

  const arcColor = color ?? (showColor ? getUrgencyColor(clampedValue) : '#1a73e8');

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      {/* Wrapper keeps the SVG and the centred label stacked */}
      <div style={{ position: 'relative', width: size, height: size }}>
        {/* rotate -90° so progress starts at the 12-o'clock position */}
        <svg
          width={size}
          height={size}
          role="img"
          aria-label={label ? `${label}: ${Math.round(clampedValue)}%` : `${Math.round(clampedValue)}%`}
          style={{ transform: 'rotate(-90deg)', display: 'block' }}
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e8eaed"
            strokeWidth={strokeWidth}
          />
          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={arcColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="ems-progress-arc"
            style={{
              transition: 'stroke-dashoffset 0.6s ease, stroke 0.6s ease',
            }}
          />
        </svg>

        {/* Percentage label centred inside the ring */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: `${size * 0.18}px`,
              fontWeight: 700,
              color: arcColor,
              transition: 'color 0.6s ease',
              lineHeight: 1,
            }}
          >
            {Math.round(clampedValue)}%
          </span>
        </div>
      </div>

      {label && (
        <span
          style={{
            fontSize: '0.82rem',
            color: '#666',
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
