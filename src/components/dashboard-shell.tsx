"use client";

import { useState } from "react";
import { SignOutButton } from "@/components/sign-out-button";
import { LiveReadings } from "@/components/live-readings";
import { RoadmapView } from "@/components/roadmap-view";
import type { ConnectionStatus, DisplayReading } from "@/lib/telemetry";

type Tab = "live" | "roadmap";

type Props = {
  readings: DisplayReading[];
  status: ConnectionStatus;
  error: string | null;
};

export function DashboardShell({ readings, status, error }: Props) {
  const [tab, setTab] = useState<Tab>("live");

  return (
    <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 py-6 flex flex-col gap-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="text-sm font-semibold tracking-[0.16em] uppercase">Pool Sensor</span>
        </div>

        <div className="flex items-center gap-3">
          <TabSwitch tab={tab} onChange={setTab} />
          <SignOutButton />
        </div>
      </header>

      <main>{tab === "live" ? <LiveReadings readings={readings} status={status} error={error} /> : <RoadmapView />}</main>
    </div>
  );
}

function TabSwitch({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  return (
    <div
      role="tablist"
      aria-label="Views"
      className="glass relative flex p-1 rounded-full"
      style={{ borderRadius: 999 }}
    >
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 rounded-full transition-transform duration-300 ease-out"
        style={{
          width: "calc(50% - 4px)",
          left: 4,
          transform: tab === "roadmap" ? "translateX(100%)" : "translateX(0)",
          background: "var(--accent-soft)",
          border: "1px solid var(--line)",
        }}
      />
      {(["live", "roadmap"] as const).map((t) => (
        <button
          key={t}
          role="tab"
          aria-selected={tab === t}
          onClick={() => onChange(t)}
          className="relative z-10 text-xs font-medium tracking-wide px-4 py-1.5 rounded-full transition-colors"
          style={{ color: tab === t ? "var(--accent)" : "var(--ink-soft)" }}
        >
          {t === "live" ? "Live readings" : "Roadmap"}
        </button>
      ))}
    </div>
  );
}

function Logo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="6" stroke="var(--accent)" strokeWidth="1.4" opacity="0.5" />
      <path
        d="M4 14c2.2 0 2.2-2.4 4.4-2.4S10.6 14 12.8 14s2.2-2.4 4.4-2.4S19.4 14 20 14"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4 18c2.2 0 2.2-2.4 4.4-2.4S10.6 18 12.8 18s2.2-2.4 4.4-2.4S19.4 18 20 18"
        stroke="var(--accent-2)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
