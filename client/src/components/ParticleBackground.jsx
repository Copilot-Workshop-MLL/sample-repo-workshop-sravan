import React, { useMemo } from 'react';

/**
 * Renders subtle floating-particle and ripple animations behind the page
 * content. Set `active` to true to make the particles visible.
 *
 * All animations are CSS-class-based so the global `prefers-reduced-motion`
 * rule in index.html disables them automatically.
 *
 * Props:
 *   active {boolean}  show / hide particles   (default false)
 *   count  {number}   number of particles     (default 14)
 */
export default function ParticleBackground({ active = false, count = 14 }) {
  // Build stable particle definitions once (positions/sizes don't need to
  // change on every render).
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: 6 + (i % 5) * 4,                          // 6 – 22 px
        left: `${(i * 7.3 + 3) % 100}%`,
        top: `${(i * 6.7 + 5) % 100}%`,
        delay: `${(i * 0.35).toFixed(2)}s`,
        duration: `${3 + (i % 4)}s`,
        opacity: 0.07 + (i % 3) * 0.04,                 // 0.07 – 0.15
      })),
    [count],
  );

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
        opacity: active ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="ems-particle"
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: `rgba(26, 115, 232, ${p.opacity})`,
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
