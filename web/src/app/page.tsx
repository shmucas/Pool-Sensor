import { supabaseServerClient } from "@/lib/supabase-server";
import { SignOutButton } from "@/components/sign-out-button";

export const dynamic = "force-dynamic";

type Reading = {
  id: number;
  recorded_at: string;
  temp_f: number | null;
  pressure_psi: number | null;
  ph: number | null;
  orp_mv: number | null;
};

async function getReadings(): Promise<Reading[]> {
  const supabase = await supabaseServerClient();
  const { data, error } = await supabase
    .from("readings")
    .select("*")
    .order("recorded_at", { ascending: false })
    .limit(50);

  if (error) {
    throw new Error(`Failed to load readings: ${error.message}`);
  }
  return data ?? [];
}

function formatValue(value: number | null, unit: string, digits = 1) {
  if (value === null) return "—";
  return `${value.toFixed(digits)}${unit}`;
}

function StatTile({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div
      className="rounded-md border p-5 flex flex-col gap-1"
      style={{ borderColor: "var(--line)", background: "var(--panel)" }}
    >
      <div
        className="text-xs uppercase tracking-wide"
        style={{ color: "var(--ink-soft)", fontFamily: "ui-monospace, monospace" }}
      >
        {label}
      </div>
      <div
        className="text-3xl font-semibold"
        style={{ fontFamily: "ui-monospace, monospace", fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </div>
      <div className="text-xs" style={{ color: "var(--ink-soft)" }}>
        {sub}
      </div>
    </div>
  );
}

export default async function Home() {
  let readings: Reading[] = [];
  let loadError: string | null = null;

  try {
    readings = await getReadings();
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Unknown error";
  }

  const latest = readings[0];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-10">
      <header className="flex flex-col gap-2 border-b pb-6" style={{ borderColor: "var(--line)" }}>
        <div
          className="text-xs uppercase tracking-widest flex items-center gap-2"
          style={{ color: "var(--accent)", fontFamily: "ui-monospace, monospace" }}
        >
          <span
            style={{ width: 8, height: 8, background: "var(--accent)", display: "inline-block", borderRadius: 1 }}
          />
          Pool Sensor
        </div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold" style={{ fontFamily: "ui-monospace, monospace" }}>
            Live readings
          </h1>
          <SignOutButton />
        </div>
        <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
          MVP scope: monitor only. These numbers exist to be checked against manual readings,
          not acted on automatically.
        </p>
      </header>

      {loadError && (
        <div
          className="rounded-md border p-4 text-sm"
          style={{ borderColor: "var(--critical)", background: "var(--critical-soft)", color: "var(--critical)" }}
        >
          {loadError}. Confirm NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are set and the
          readings table exists (see supabase/schema.sql).
        </div>
      )}

      {!loadError && readings.length === 0 && (
        <div
          className="rounded-md border p-4 text-sm"
          style={{ borderColor: "var(--line)", background: "var(--panel)", color: "var(--ink-soft)" }}
        >
          No readings yet. Once the Pi starts posting to /api/readings, they&apos;ll show up here.
        </div>
      )}

      {latest && (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatTile label="Temperature" value={formatValue(latest.temp_f, "°F")} sub="pump return line" />
          <StatTile label="Pressure" value={formatValue(latest.pressure_psi, " psi")} sub="filter gauge port" />
          <StatTile label="pH" value={formatValue(latest.ph, "", 2)} sub="flow cell" />
          <StatTile label="ORP" value={formatValue(latest.orp_mv, " mV", 0)} sub="flow cell" />
        </section>
      )}

      {readings.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm uppercase tracking-wide" style={{ color: "var(--ink-soft)", fontFamily: "ui-monospace, monospace" }}>
            History (last {readings.length})
          </h2>
          <div className="overflow-x-auto rounded-md border" style={{ borderColor: "var(--line)" }}>
            <table className="w-full text-sm" style={{ fontVariantNumeric: "tabular-nums" }}>
              <thead>
                <tr style={{ background: "var(--accent-soft)" }}>
                  <th className="text-left px-4 py-2 font-normal" style={{ color: "var(--ink-soft)" }}>Time</th>
                  <th className="text-right px-4 py-2 font-normal" style={{ color: "var(--ink-soft)" }}>Temp</th>
                  <th className="text-right px-4 py-2 font-normal" style={{ color: "var(--ink-soft)" }}>Pressure</th>
                  <th className="text-right px-4 py-2 font-normal" style={{ color: "var(--ink-soft)" }}>pH</th>
                  <th className="text-right px-4 py-2 font-normal" style={{ color: "var(--ink-soft)" }}>ORP</th>
                </tr>
              </thead>
              <tbody>
                {readings.map((r) => (
                  <tr key={r.id} style={{ borderTop: "1px solid var(--line)" }}>
                    <td className="px-4 py-2" style={{ color: "var(--ink-soft)" }}>
                      {new Date(r.recorded_at).toLocaleString()}
                    </td>
                    <td className="text-right px-4 py-2">{formatValue(r.temp_f, "°F")}</td>
                    <td className="text-right px-4 py-2">{formatValue(r.pressure_psi, " psi")}</td>
                    <td className="text-right px-4 py-2">{formatValue(r.ph, "", 2)}</td>
                    <td className="text-right px-4 py-2">{formatValue(r.orp_mv, " mV", 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
