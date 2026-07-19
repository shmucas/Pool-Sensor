// Tiny inline trend line drawn straight to SVG — no charting dependency.
// `values` runs oldest -> newest; nulls are skipped.

type Props = {
  values: (number | null)[];
  color?: string;
  domain?: [number, number];
  width?: number;
  height?: number;
};

export function Sparkline({
  values,
  color = "var(--accent)",
  domain,
  width = 140,
  height = 40,
}: Props) {
  const points = values
    .map((v, i) => ({ v, i }))
    .filter((p): p is { v: number; i: number } => p.v !== null && !Number.isNaN(p.v));

  if (points.length < 2) {
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
        <line
          x1="0"
          y1={height - 4}
          x2={width}
          y2={height - 4}
          stroke="var(--line)"
          strokeDasharray="3 4"
        />
      </svg>
    );
  }

  const nums = points.map((p) => p.v);
  const lo = domain ? domain[0] : Math.min(...nums);
  const hi = domain ? domain[1] : Math.max(...nums);
  const span = hi - lo || 1;
  const pad = 4;
  const n = values.length - 1 || 1;

  const coords = points.map((p) => {
    const x = pad + (p.i / n) * (width - pad * 2);
    const t = (p.v - lo) / span;
    const y = height - pad - Math.min(1, Math.max(0, t)) * (height - pad * 2);
    return [x, y] as const;
  });

  const line = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area =
    `M${coords[0][0].toFixed(1)},${height - pad} ` +
    coords.map(([x, y]) => `L${x.toFixed(1)},${y.toFixed(1)}`).join(" ") +
    ` L${coords[coords.length - 1][0].toFixed(1)},${height - pad} Z`;
  const gid = `spark-${Math.abs(hashString(line))}`;
  const last = coords[coords.length - 1];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.22" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="2.4" fill={color} />
    </svg>
  );
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return h;
}
