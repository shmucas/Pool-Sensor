const TICKS: Array<[number, number, number, number]> = [
  [30.3, 89.7, 24.6, 95.4],
  [19.4, 70.9, 11.7, 72.9],
  [19.4, 49.1, 11.7, 47.1],
  [30.3, 30.3, 24.6, 24.6],
  [49.1, 19.4, 47.1, 11.7],
  [70.9, 19.4, 72.9, 11.7],
  [89.7, 30.3, 95.4, 24.6],
  [100.6, 49.1, 108.3, 47.1],
  [100.6, 70.9, 108.3, 72.9],
  [89.7, 89.7, 95.4, 95.4],
];

/**
 * A gauge dial at rest, needle parked on the first (highlighted) tick.
 * Echoes the pressure/temp gauges on the dashboard: this system is
 * instrumented, and right now it reads "locked".
 */
export function LockDial() {
  return (
    <div className="relative flex flex-col items-center gap-2" aria-hidden="true">
      <div className="dial-glow absolute inset-0 -z-10" />
      <svg viewBox="0 0 120 120" width="88" height="88">
        <circle cx="60" cy="60" r="52" fill="none" stroke="var(--line)" strokeWidth="1.5" />
        {TICKS.map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={i === 0 ? "var(--critical)" : "var(--line)"}
            strokeWidth={i === 0 ? 2.5 : 1.5}
            strokeLinecap="round"
          />
        ))}
        <line
          x1="60"
          y1="60"
          x2="36"
          y2="84"
          stroke="var(--ink)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="60" cy="60" r="4" fill="var(--ink)" />
      </svg>
      <span
        className="text-[10px] font-medium tracking-[0.25em]"
        style={{ color: "var(--critical)", fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
      >
        LOCKED
      </span>
    </div>
  );
}
