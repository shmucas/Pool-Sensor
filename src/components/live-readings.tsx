import {
  SENSORS,
  formatValue,
  statusColor,
  type ConnectionStatus,
  type DisplayReading,
  type Sensor,
} from "@/lib/telemetry";
import { Sparkline } from "./sparkline";

type Props = {
  readings: DisplayReading[];
  status: ConnectionStatus;
  error: string | null;
};

export function LiveReadings({ readings, status, error }: Props) {
  const latest = readings[0];
  // series run oldest -> newest for the sparklines
  const chronological = [...readings].reverse();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">Live readings</h2>
          <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
            MVP scope: monitor only. Verified against manual readings.
          </p>
        </div>
        <StatusPill status={status} />
      </div>

      {error && (
        <div
          className="glass p-4 text-sm"
          style={{ borderColor: "var(--critical)", background: "var(--critical-soft)", color: "var(--critical)" }}
        >
          {error}. Confirm the Supabase environment variables are set and the readings table
          exists (see supabase/schema.sql).
        </div>
      )}

      {!error && !latest ? (
        <WaitingState />
      ) : (
        latest && (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SENSORS.map((sensor) => (
              <TelemetryCard
                key={sensor.key}
                sensor={sensor}
                value={latest[sensor.key]}
                series={chronological.map((r) => r[sensor.key])}
              />
            ))}
          </section>
        )
      )}

      {readings.length > 0 && <HistoryTable readings={readings} />}
    </div>
  );
}

function StatusPill({ status }: { status: ConnectionStatus }) {
  const color = statusColor(status.level);
  return (
    <div
      className="glass flex items-center gap-3 rounded-full px-4 py-2"
      style={{ borderRadius: 999 }}
    >
      <span
        className={`status-dot ${status.level !== "offline" ? "live" : ""}`}
        style={{ ["--dot" as string]: color }}
        aria-hidden="true"
      />
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-medium" style={{ color }}>
          {status.label}
        </span>
        <span className="text-[11px]" style={{ color: "var(--ink-soft)" }}>
          {status.detail}
        </span>
      </div>
    </div>
  );
}

function TelemetryCard({
  sensor,
  value,
  series,
}: {
  sensor: Sensor;
  value: number | null;
  series: (number | null)[];
}) {
  return (
    <div className="glass relative overflow-hidden p-5 flex flex-col gap-4">
      <span className="card-rail" style={{ ["--rail" as string]: sensor.rail }} aria-hidden="true" />
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-0.5">
          <span
            className="text-[11px] uppercase tracking-[0.14em]"
            style={{ color: "var(--ink-soft)" }}
          >
            {sensor.label}
          </span>
          <span className="text-[11px]" style={{ color: "var(--ink-soft)", opacity: 0.75 }}>
            {sensor.location}
          </span>
        </div>
      </div>
      <div className="tnum text-4xl font-semibold leading-none">
        {formatSplit(value, sensor)}
      </div>
      <Sparkline
        values={series}
        color={sensor.rail}
        domain={sensor.domain}
        width={240}
        height={44}
      />
    </div>
  );
}

// Render the number bold and the unit small + muted next to it.
function formatSplit(value: number | null, sensor: Sensor) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return <span style={{ color: "var(--ink-soft)" }}>—</span>;
  }
  return (
    <span>
      {value.toFixed(sensor.digits)}
      {sensor.unit && (
        <span className="text-lg font-normal ml-1.5" style={{ color: "var(--ink-soft)" }}>
          {sensor.unit}
        </span>
      )}
    </span>
  );
}

function WaitingState() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="glass relative overflow-hidden p-6 flex flex-col items-center justify-center text-center gap-3 sm:col-span-2 lg:col-span-2">
        <span
          className="status-dot live breathe"
          style={{ ["--dot" as string]: "var(--accent)", width: 12, height: 12 }}
          aria-hidden="true"
        />
        <h3 className="text-base font-medium">Waiting for Pi connection</h3>
        <p className="text-sm max-w-xs" style={{ color: "var(--ink-soft)" }}>
          Once the Pi starts posting to <code className="tnum" style={{ color: "var(--accent)" }}>/api/readings</code>,
          live telemetry will stream here.
        </p>
      </div>
      {SENSORS.slice(0, 2).map((sensor) => (
        <div key={sensor.key} className="glass relative overflow-hidden p-5 flex flex-col gap-4">
          <span className="card-rail breathe" style={{ ["--rail" as string]: sensor.rail }} aria-hidden="true" />
          <span className="text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--ink-soft)" }}>
            {sensor.label}
          </span>
          <div className="skeleton h-9 w-24" />
          <div className="skeleton h-11 w-full" />
        </div>
      ))}
    </section>
  );
}

function HistoryTable({ readings }: { readings: DisplayReading[] }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--ink-soft)" }}>
        History · last {readings.length}
      </h3>
      <div className="glass overflow-x-auto p-1">
        <table className="w-full text-sm tnum">
          <thead>
            <tr style={{ color: "var(--ink-soft)" }}>
              <th className="text-left px-4 py-3 font-normal text-[11px] uppercase tracking-wide">Time</th>
              <th className="text-right px-4 py-3 font-normal text-[11px] uppercase tracking-wide">Temp</th>
              <th className="text-right px-4 py-3 font-normal text-[11px] uppercase tracking-wide">Pressure</th>
              <th className="text-right px-4 py-3 font-normal text-[11px] uppercase tracking-wide">pH</th>
              <th className="text-right px-4 py-3 font-normal text-[11px] uppercase tracking-wide">ORP</th>
            </tr>
          </thead>
          <tbody>
            {readings.map((r) => (
              <tr key={r.id} style={{ borderTop: "1px solid var(--line)" }}>
                <td className="px-4 py-2.5" style={{ color: "var(--ink-soft)", fontFamily: "var(--font-sans)" }}>
                  {r.time}
                </td>
                <td className="text-right px-4 py-2.5">{formatValue(r.temp_f, "°F")}</td>
                <td className="text-right px-4 py-2.5">{formatValue(r.pressure_psi, "psi")}</td>
                <td className="text-right px-4 py-2.5">{formatValue(r.ph, "", 2)}</td>
                <td className="text-right px-4 py-2.5">{formatValue(r.orp_mv, "mV", 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
