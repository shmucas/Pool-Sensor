import { WIRING_SVG, CASE_SVG } from "@/lib/diagrams";

type Stage = {
  id: string;
  title: string;
  verify?: string;
  body: string;
  state: "done" | "next" | "todo" | "deferred";
};

const STAGES: Stage[] = [
  {
    id: "00",
    title: "Foundations",
    body: "Order hardware. Flash Raspberry Pi OS, set up SSH + WiFi, enable I²C and 1-Wire. Confirm the Pi stays connected from inside the pump enclosure.",
    state: "todo",
  },
  {
    id: "01",
    title: "Temperature only",
    verify: "verify vs. thermometer",
    body: "Wire just the DS18B20 and read it locally — validates mounting and the read loop with the simplest sensor first.",
    state: "todo",
  },
  {
    id: "02",
    title: "Add pressure",
    verify: "verify vs. filter gauge",
    body: "Wire the ADS1115 + transducer into the filter's gauge port. Compare Pi-reported PSI against the analog gauge already on the filter.",
    state: "todo",
  },
  {
    id: "03",
    title: "Add pH",
    verify: "verify vs. test strips",
    body: "Build the flow-cell tap, wire the pH probe, calibrate with buffer solutions, cross-check over a few days.",
    state: "todo",
  },
  {
    id: "04",
    title: "Add ORP",
    verify: "verify vs. chlorine test",
    body: "Same pattern as pH — wire, calibrate against a reference solution, cross-check against a manual test.",
    state: "todo",
  },
  {
    id: "05",
    title: "Ship to the dashboard",
    verify: "verify end-to-end",
    body: "Next.js API route + Supabase table; Pi POSTs all four readings on an interval; this dashboard shows live + historical values.",
    state: "todo",
  },
  {
    id: "—",
    title: "Equipment sensing, alerts, automation",
    body: "Current clamps for pump on/off state, alerting, and control — intentionally out of scope until the sensor data above is proven accurate.",
    state: "deferred",
  },
];

const PIPELINE = [
  { title: "Sensors", zone: "pad", desc: "DS18B20 temp probe on 1-Wire, plus pressure, pH and ORP through an ADS1115 ADC on I²C." },
  { title: "Raspberry Pi 4B", zone: "pad", desc: "Python loop reads all four sensors on an interval, timestamps, and POSTs JSON over WiFi. The only network-facing device." },
  { title: "Next.js API route", zone: "cloud", desc: "Vercel-hosted. Validates the payload and writes one row per poll." },
  { title: "Supabase Postgres", zone: "cloud", desc: "Time-series readings table, one row per poll." },
  { title: "Dashboard", zone: "cloud", desc: "Live values plus history, for manual accuracy checks." },
];

type Tap = { text: string; tone: "power" | "mount" | "ph" | "orp" | "deferred" | "none" };

const EQUIPMENT: { img: string; alt: string; name: string; desc: string; taps: Tap[] }[] = [
  {
    img: "/equipment/pump-pad.jpg",
    alt: "Overall view of the pump pad enclosure",
    name: "Pump pad — overview",
    desc: "Sand filter, pump, IntelliChlor, and breaker box in the fenced pump area. The GFCI outlet the Pi plugs into is the grey box at right.",
    taps: [
      { text: "Pi power", tone: "power" },
      { text: "Pi enclosure mount", tone: "mount" },
    ],
  },
  {
    img: "/equipment/pump-motor.jpg",
    alt: "Hayward pump motor electrical label",
    name: "Hayward pump motor",
    desc: "1.1HP dual-voltage motor (115V/230V), 3450 RPM. Not wired to the Pi — current-clamp sensing on this motor is deferred post-MVP.",
    taps: [{ text: "Deferred: current clamp", tone: "deferred" }],
  },
  {
    img: "/equipment/intellichlor.jpg",
    alt: "Pentair IntelliChlor IC40 salt chlorine generator",
    name: "Pentair IntelliChlor IC40",
    desc: "Salt chlorine generator, inline after the filter. The pH/ORP flow-cell tee taps the return line near here so both probes sit in circulating water.",
    taps: [
      { text: "pH probe tap", tone: "ph" },
      { text: "ORP probe tap", tone: "orp" },
    ],
  },
  {
    img: "/equipment/timer.jpg",
    alt: "Mechanical pool timer",
    name: "Mechanical timer",
    desc: "Controls the pump's run schedule. Read-only for the MVP — the Pi only observes downstream effects (pressure, temp) of when the pump runs.",
    taps: [{ text: "Not wired", tone: "none" }],
  },
  {
    img: "/equipment/breaker.jpg",
    alt: "Breaker panel with four switches",
    name: "Breaker panel",
    desc: "4 switches: 1–2 motor, 3 outlets, 4 light. Switch 3 feeds the GFCI outlet the Pi plugs into. No panel wiring required.",
    taps: [{ text: "Feeds Pi outlet (sw. 3)", tone: "power" }],
  },
  {
    img: "/equipment/heater.jpg",
    alt: "Jandy JXI400NK pool and spa heater label",
    name: "Jandy JXI400NK heater",
    desc: "Located outside the pump enclosure — out of scope for this build. Not sensed or wired in the MVP.",
    taps: [{ text: "Out of scope", tone: "none" }],
  },
];

const TAP_TONE: Record<Tap["tone"], { bg: string; fg: string }> = {
  power: { bg: "var(--warn-soft)", fg: "var(--warn)" },
  mount: { bg: "var(--accent-soft)", fg: "var(--accent-2)" },
  ph: { bg: "var(--accent-soft)", fg: "var(--accent)" },
  orp: { bg: "rgba(78,168,222,0.14)", fg: "var(--accent-2)" },
  deferred: { bg: "var(--critical-soft)", fg: "var(--critical)" },
  none: { bg: "rgba(157,176,212,0.1)", fg: "var(--ink-soft)" },
};

const SHOPPING = [
  { item: "Raspberry Pi 4 Model B (2-4GB)", forWhat: "Compute", stage: "00", price: "$55-65" },
  { item: "MicroSD card, 32GB", forWhat: "OS storage", stage: "00", price: "~$10" },
  { item: "Official USB-C power supply (5V/3A)", forWhat: "Pi power", stage: "00", price: "~$10" },
  { item: "IP65/66 enclosure + cable glands", forWhat: "Housing", stage: "00", price: "$25-40" },
  { item: "DS18B20 waterproof probe (+4.7kΩ resistor)", forWhat: "Temperature", stage: "01", price: "$8-10" },
  { item: "ADS1115 16-bit I²C ADC breakout", forWhat: "Pressure / pH / ORP", stage: "02", price: "$10-15" },
  { item: "0-100psi pressure transducer, 0.5-4.5V", forWhat: "Filter pressure", stage: "02", price: "$25-35" },
  { item: "DFRobot Gravity pH Sensor Kit (SEN0161-V2)", forWhat: "pH", stage: "03", price: "$60-70" },
  { item: "DFRobot Gravity ORP Sensor Kit (SEN0165)", forWhat: "ORP", stage: "04", price: "$55-90" },
  { item: "Flow-cell fittings, glands, jumpers, calibration solutions", forWhat: "Assembly & calibration", stage: "—", price: "$30-40" },
];

export function RoadmapView() {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">Build roadmap</h2>
        <p className="text-sm max-w-2xl" style={{ color: "var(--ink-soft)" }}>
          A dad-and-son project, built one sensor at a time. Each stage is checked against an
          independent manual reading before moving to the next — no automation until the numbers
          are proven.
        </p>
      </div>

      <SectionLadder />
      <SectionArchitecture />
      <SectionDiagram
        eyebrow="Wiring"
        title="Sensors to the GPIO header"
        sub="All four sensors share two buses off the 40-pin header — a single GPIO for 1-Wire, and I²C for the ADS1115, which fans out to three analog channels."
        svg={WIRING_SVG}
        legend={[
          { c: "var(--copper)", t: "1-Wire digital (temp)" },
          { c: "var(--accent)", t: "I²C bus (Pi ↔ ADC)" },
          { c: "var(--amber)", t: "Analog (ADC ↔ probes)" },
          { c: "var(--ink-soft)", t: "Shared power / ground" },
        ]}
        note={{
          title: "Flow cell note",
          body: "The pH and ORP probes both need moving water. Tap a small PVC tee off the return line near the IntelliChlor so both electrode tips stay wetted, and keep the BNC connectors inside the enclosure.",
        }}
      />
      <SectionDiagram
        eyebrow="Enclosure"
        title="Case assembly — mockup render"
        sub="An isometric mockup of the open IP65 enclosure — illustrative only, drawn to plan gland positions and clearance before drilling."
        svg={CASE_SVG}
        legend={[
          { c: "var(--copper)", t: "1-Wire lead to gland" },
          { c: "var(--accent)", t: "I²C bus (Pi ↔ ADC)" },
          { c: "var(--amber)", t: "Analog leads to glands" },
          { c: "var(--ink-soft)", t: "Power in" },
        ]}
        note={{
          title: "This is a mockup, not a photo",
          body: "There's no physical case yet, so this render is for planning gland positions and clearance. Swap it for a real photo once the case is built.",
        }}
      />
      <SectionEquipment />
      <SectionShopping />
    </div>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>
        {eyebrow}
      </span>
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      {sub && (
        <p className="text-sm max-w-2xl" style={{ color: "var(--ink-soft)" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function SectionLadder() {
  return (
    <section className="flex flex-col gap-6">
      <SectionHead eyebrow="The plan" title="Build ladder" sub="One sensor at a time, easiest first. Numbers here are the actual build order." />
      <ol className="relative flex flex-col gap-3 pl-0">
        {STAGES.map((stage) => (
          <li
            key={stage.id}
            className="glass relative p-5 flex flex-col sm:flex-row sm:items-center gap-4"
            style={stage.state === "deferred" ? { opacity: 0.72 } : undefined}
          >
            <div
              className="tnum shrink-0 grid place-items-center rounded-xl text-lg font-semibold"
              style={{
                width: 52,
                height: 52,
                color: stage.state === "deferred" ? "var(--ink-soft)" : "var(--accent)",
                background: stage.state === "deferred" ? "rgba(157,176,212,0.08)" : "var(--accent-soft)",
                border: "1px solid var(--line)",
              }}
            >
              {stage.id}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-medium">{stage.title}</span>
                {stage.verify && (
                  <span
                    className="text-[11px] rounded px-2 py-0.5"
                    style={{ background: "var(--ok-soft)", color: "var(--ok)" }}
                  >
                    {stage.verify}
                  </span>
                )}
              </div>
              <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                {stage.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function SectionArchitecture() {
  return (
    <section className="flex flex-col gap-6">
      <SectionHead
        eyebrow="Architecture"
        title="From the pump pad to the cloud"
        sub="Everything on the pump pad stays local. The Pi is the only device that reaches the internet — outbound over WiFi to post readings, nothing inbound."
      />
      <div className="glass p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-stretch gap-3">
          {PIPELINE.map((node, i) => (
            <div key={node.title} className="flex flex-col md:flex-row md:items-center gap-3 md:flex-1">
              <div
                className="rounded-xl p-4 flex-1 h-full flex flex-col gap-1.5"
                style={{
                  border: "1px solid var(--line)",
                  background: node.zone === "pad" ? "var(--accent-soft)" : "rgba(78,168,222,0.07)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] uppercase tracking-wider rounded px-1.5 py-0.5"
                    style={{
                      color: node.zone === "pad" ? "var(--accent)" : "var(--accent-2)",
                      border: "1px solid var(--line)",
                    }}
                  >
                    {node.zone === "pad" ? "Pump pad" : "Cloud"}
                  </span>
                </div>
                <span className="text-sm font-medium">{node.title}</span>
                <span className="text-xs" style={{ color: "var(--ink-soft)" }}>
                  {node.desc}
                </span>
              </div>
              {i < PIPELINE.length - 1 && (
                <span
                  className="hidden md:block text-center shrink-0"
                  style={{ color: "var(--ink-soft)" }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionDiagram({
  eyebrow,
  title,
  sub,
  svg,
  legend,
  note,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  svg: string;
  legend: { c: string; t: string }[];
  note: { title: string; body: string };
}) {
  return (
    <section className="flex flex-col gap-6">
      <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
      <div className="glass p-4 sm:p-6">
        <div className="schematic-wrap" dangerouslySetInnerHTML={{ __html: svg }} />
        <div className="legend">
          {legend.map((l) => (
            <div key={l.t} className="legend-item">
              <span className="legend-swatch" style={{ background: l.c }} />
              {l.t}
            </div>
          ))}
        </div>
        <div className="notebox">
          <b>{note.title}</b>
          {note.body}
        </div>
      </div>
    </section>
  );
}

function SectionEquipment() {
  return (
    <section className="flex flex-col gap-6">
      <SectionHead
        eyebrow="On the pump pad"
        title="What's actually there today"
        sub="The real equipment this build wraps around, tagged with where each sensor taps in."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {EQUIPMENT.map((e) => (
          <figure key={e.name} className="glass overflow-hidden flex flex-col">
            <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3", background: "var(--bg-2)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={e.img}
                alt={e.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <figcaption className="p-4 flex flex-col gap-2">
              <span className="text-sm font-medium">{e.name}</span>
              <span className="text-xs leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                {e.desc}
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {e.taps.map((tap) => (
                  <span
                    key={tap.text}
                    className="text-[11px] rounded-full px-2.5 py-0.5"
                    style={{ background: TAP_TONE[tap.tone].bg, color: TAP_TONE[tap.tone].fg }}
                  >
                    {tap.text}
                  </span>
                ))}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function SectionShopping() {
  return (
    <section className="flex flex-col gap-6">
      <SectionHead
        eyebrow="Bill of materials"
        title="Shopping list"
        sub="Grouped by build stage so you can order in phases instead of all at once."
      />
      <div className="glass overflow-x-auto p-1">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ color: "var(--ink-soft)" }}>
              <th className="text-left px-4 py-3 font-normal text-[11px] uppercase tracking-wide">Item</th>
              <th className="text-left px-4 py-3 font-normal text-[11px] uppercase tracking-wide">For</th>
              <th className="text-left px-4 py-3 font-normal text-[11px] uppercase tracking-wide">Stage</th>
              <th className="text-right px-4 py-3 font-normal text-[11px] uppercase tracking-wide">Est.</th>
            </tr>
          </thead>
          <tbody>
            {SHOPPING.map((row) => (
              <tr key={row.item} style={{ borderTop: "1px solid var(--line)" }}>
                <td className="px-4 py-2.5">{row.item}</td>
                <td className="px-4 py-2.5" style={{ color: "var(--ink-soft)" }}>{row.forWhat}</td>
                <td className="px-4 py-2.5 tnum" style={{ color: "var(--accent)" }}>{row.stage}</td>
                <td className="px-4 py-2.5 text-right tnum">{row.price}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: "1px solid var(--line)" }}>
              <td className="px-4 py-3 font-medium" colSpan={3}>
                Total — MVP, all four sensors
              </td>
              <td className="px-4 py-3 text-right font-semibold tnum" style={{ color: "var(--accent)" }}>
                ~$280-385
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
