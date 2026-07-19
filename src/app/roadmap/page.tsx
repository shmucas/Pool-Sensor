import Link from "next/link";

type Stage = {
  id: string;
  title: string;
  verify?: string;
  body: string;
  deferred?: boolean;
};

const stages: Stage[] = [
  {
    id: "Stage 0",
    title: "Foundations",
    body: "Order hardware. Flash Raspberry Pi OS, set up SSH + WiFi, enable I²C and 1-Wire. Confirm the Pi stays connected from inside the pump enclosure.",
  },
  {
    id: "Stage 1",
    title: "Temperature only",
    verify: "verify vs. thermometer",
    body: "Wire just the DS18B20 and read it locally — validates mounting and the read loop with the simplest sensor first.",
  },
  {
    id: "Stage 2",
    title: "Add pressure",
    verify: "verify vs. filter gauge",
    body: "Wire the ADS1115 + transducer into the filter's gauge port. Compare Pi-reported PSI against the analog gauge already on the filter.",
  },
  {
    id: "Stage 3",
    title: "Add pH",
    verify: "verify vs. test strips",
    body: "Build the flow-cell tap, wire the pH probe, calibrate with buffer solutions, cross-check over a few days.",
  },
  {
    id: "Stage 4",
    title: "Add ORP",
    verify: "verify vs. chlorine test",
    body: "Same pattern as pH — wire, calibrate against a reference solution, cross-check against a manual test.",
  },
  {
    id: "Stage 5",
    title: "Ship to the dashboard",
    verify: "verify end-to-end",
    body: "Next.js API route + Supabase table; Pi POSTs all four readings on an interval; dashboard shows live + historical values.",
  },
  {
    id: "Deferred",
    title: "Equipment sensing, alerts, automation",
    body: "SCT-013 current clamps for pump/motor on-off state, alerting, and control — intentionally out of scope until the sensor data above is proven accurate.",
    deferred: true,
  },
];

const shoppingList = [
  { item: "Raspberry Pi 4 Model B (2-4GB)", forWhat: "Compute", stage: "Stage 0", price: "$55-65" },
  { item: "MicroSD card, 32GB", forWhat: "OS storage", stage: "Stage 0", price: "~$10" },
  { item: "Official USB-C power supply (5V/3A)", forWhat: "Pi power", stage: "Stage 0", price: "~$10" },
  { item: "IP65/66 enclosure, ~200x150x75mm, cable glands", forWhat: "Housing", stage: "Stage 0", price: "$25-40" },
  { item: "DS18B20 waterproof probe (+4.7kΩ resistor)", forWhat: "Temperature", stage: "Stage 1", price: "$8-10" },
  { item: "ADS1115 16-bit I²C ADC breakout", forWhat: "Shared by pressure/pH/ORP", stage: "Stage 2", price: "$10-15" },
  { item: "0-100psi pressure transducer, 0.5-4.5V, 1/4\" NPT", forWhat: "Filter pressure", stage: "Stage 2", price: "$25-35" },
  { item: "DFRobot Gravity Analog pH Sensor Kit (SEN0161-V2)", forWhat: "pH", stage: "Stage 3", price: "$60-70" },
  { item: "DFRobot Gravity Analog ORP Sensor Kit (SEN0165/PRO)", forWhat: "ORP", stage: "Stage 4", price: "$55-90" },
  { item: "PVC tee/flow-cell fittings, glands, terminal blocks, jumpers, calibration solutions, sealant", forWhat: "Assembly & calibration", stage: "Various", price: "$30-40" },
];

const pipeline = [
  { title: "Sensors", desc: "DS18B20 (1-Wire), ADS1115 ADC fanning out to pressure, pH, and ORP probes (I²C + analog)" },
  { title: "Raspberry Pi 4B", desc: "Python poll loop reads all four sensors on an interval, timestamps, POSTs JSON over WiFi. Lives in the IP66 enclosure." },
  { title: "Next.js API route", desc: "Vercel-hosted, validates payload, writes a row" },
  { title: "Supabase Postgres", desc: "Time-series readings table, one row per poll" },
  { title: "Dashboard", desc: "Live values + history, for manual accuracy checks" },
];

function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 border-b pb-2" style={{ borderColor: "var(--line)" }}>
      <span
        className="text-xs"
        style={{ color: "var(--accent)", fontFamily: "ui-monospace, monospace" }}
      >
        {num}
      </span>
      <h2 className="text-xl font-semibold" style={{ fontFamily: "ui-monospace, monospace" }}>
        {title}
      </h2>
    </div>
  );
}

export default function Roadmap() {
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
            Build reference & roadmap
          </h1>
          <Link
            href="/"
            className="text-sm underline"
            style={{ color: "var(--accent)" }}
          >
            Back to dashboard
          </Link>
        </div>
        <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
          Four physical sensors feed one Pi over two buses. The Pi is the only thing that talks to
          the internet — everything on the pump pad stays local.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <SectionHead num="01" title="System architecture" />
        <div
          className="rounded-md border p-5 grid gap-3 md:grid-cols-5"
          style={{ borderColor: "var(--line)", background: "var(--panel)" }}
        >
          {pipeline.map((node, i) => (
            <div key={node.title} className="flex items-center gap-3 md:contents">
              <div
                className="rounded-md border p-3 flex-1"
                style={{ borderColor: "var(--line)" }}
              >
                <div className="text-sm font-semibold">{node.title}</div>
                <div className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>
                  {node.desc}
                </div>
              </div>
              {i < pipeline.length - 1 && (
                <div
                  className="hidden md:flex items-center justify-center text-lg"
                  style={{ color: "var(--ink-soft)" }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHead num="02" title="Roadmap" />
        <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
          One sensor at a time, each checked against an independent manual reading before moving on.
        </p>
        <div className="flex flex-col gap-3">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className="rounded-md border p-4"
              style={{
                borderColor: "var(--line)",
                background: stage.deferred ? "var(--bg)" : "var(--panel)",
                opacity: stage.deferred ? 0.75 : 1,
              }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="text-xs px-2 py-0.5 rounded"
                  style={{ background: "var(--accent-soft)", color: "var(--accent)", fontFamily: "ui-monospace, monospace" }}
                >
                  {stage.id}
                </span>
                <span className="font-semibold">{stage.title}</span>
                {stage.verify && (
                  <span className="text-xs" style={{ color: "var(--ink-soft)" }}>
                    {stage.verify}
                  </span>
                )}
              </div>
              <p className="text-sm mt-2" style={{ color: "var(--ink-soft)" }}>
                {stage.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHead num="03" title="Shopping list" />
        <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
          Grouped by build stage so you can order in phases instead of all at once.
        </p>
        <div className="overflow-x-auto rounded-md border" style={{ borderColor: "var(--line)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--accent-soft)" }}>
                <th className="text-left px-4 py-2 font-normal" style={{ color: "var(--ink-soft)" }}>Item</th>
                <th className="text-left px-4 py-2 font-normal" style={{ color: "var(--ink-soft)" }}>For</th>
                <th className="text-left px-4 py-2 font-normal" style={{ color: "var(--ink-soft)" }}>Stage</th>
                <th className="text-right px-4 py-2 font-normal" style={{ color: "var(--ink-soft)" }}>Est. price</th>
              </tr>
            </thead>
            <tbody>
              {shoppingList.map((row) => (
                <tr key={row.item} style={{ borderTop: "1px solid var(--line)" }}>
                  <td className="px-4 py-2">{row.item}</td>
                  <td className="px-4 py-2" style={{ color: "var(--ink-soft)" }}>{row.forWhat}</td>
                  <td className="px-4 py-2" style={{ color: "var(--ink-soft)" }}>{row.stage}</td>
                  <td className="text-right px-4 py-2" style={{ fontVariantNumeric: "tabular-nums" }}>{row.price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: "1px solid var(--line)" }}>
                <td className="px-4 py-2 font-semibold" colSpan={3}>Total — MVP, all four sensors</td>
                <td className="text-right px-4 py-2 font-semibold" style={{ fontVariantNumeric: "tabular-nums" }}>~$280-385</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  );
}
