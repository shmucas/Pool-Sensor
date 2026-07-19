// Shared telemetry shapes and sensor config used by the dashboard.

export type Reading = {
  id: number;
  recorded_at: string;
  temp_f: number | null;
  pressure_psi: number | null;
  ph: number | null;
  orp_mv: number | null;
  heater_out_f: number | null;
  heater_on: boolean | null;
};

// A reading with its timestamp pre-formatted on the server, so the client
// never re-derives a Date (avoids locale/timezone hydration mismatches).
export type DisplayReading = Reading & {
  time: string;
};

export type SensorKey = "temp_f" | "pressure_psi" | "ph" | "orp_mv";

export type Sensor = {
  key: SensorKey;
  label: string;
  unit: string;
  digits: number;
  location: string;
  // rail color for the card's top hairline
  rail: string;
  // typical operating window, used only to place the sparkline nicely
  domain: [number, number];
};

export const SENSORS: Sensor[] = [
  {
    key: "temp_f",
    label: "Temperature",
    unit: "°F",
    digits: 1,
    location: "Pump return line",
    rail: "var(--accent)",
    domain: [50, 95],
  },
  {
    key: "pressure_psi",
    label: "Pressure",
    unit: "psi",
    digits: 1,
    location: "Filter gauge port",
    rail: "var(--accent-2)",
    domain: [0, 40],
  },
  {
    key: "ph",
    label: "pH",
    unit: "",
    digits: 2,
    location: "Flow cell",
    rail: "var(--accent)",
    domain: [6.8, 8.2],
  },
  {
    key: "orp_mv",
    label: "ORP",
    unit: "mV",
    digits: 0,
    location: "Flow cell",
    rail: "var(--accent-2)",
    domain: [400, 800],
  },
];

export type StatusLevel = "optimal" | "delayed" | "offline";

export type ConnectionStatus = {
  level: StatusLevel;
  label: string;
  detail: string;
};

const STATUS_COLOR: Record<StatusLevel, string> = {
  optimal: "var(--ok)",
  delayed: "var(--warn)",
  offline: "var(--critical)",
};

export function statusColor(level: StatusLevel): string {
  return STATUS_COLOR[level];
}

// Derived on the server from the most recent reading's age.
export function connectionStatus(latest: Reading | undefined, now: number): ConnectionStatus {
  if (!latest) {
    return {
      level: "offline",
      label: "Offline",
      detail: "No readings received yet",
    };
  }

  const ageMs = now - new Date(latest.recorded_at).getTime();
  const ageMin = Math.max(0, Math.round(ageMs / 60000));

  if (ageMin <= 15) {
    return { level: "optimal", label: "Connected", detail: agoText(ageMin) };
  }
  if (ageMin <= 60) {
    return { level: "delayed", label: "Delayed", detail: agoText(ageMin) };
  }
  return { level: "offline", label: "Offline", detail: agoText(ageMin) };
}

function agoText(ageMin: number): string {
  if (ageMin < 1) return "Updated just now";
  if (ageMin === 1) return "Updated 1 min ago";
  if (ageMin < 60) return `Updated ${ageMin} min ago`;
  const hrs = Math.round(ageMin / 60);
  return hrs === 1 ? "Updated 1 hr ago" : `Updated ${hrs} hrs ago`;
}

export function formatValue(value: number | null, unit: string, digits = 1): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  const num = value.toFixed(digits);
  return unit ? `${num} ${unit}` : num;
}
