import { Suspense } from "react";
import { LockDial } from "@/components/lock-dial";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-16 overflow-hidden">
      <div className="login-glow" />
      <div
        className="glass relative w-full max-w-[400px] p-9 flex flex-col items-center gap-7 text-center"
        style={{ borderRadius: 20 }}
      >
        <LockDial />

        <div className="flex flex-col gap-2">
          <div
            className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.3em]"
            style={{ color: "var(--accent)", fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
          >
            <span
              style={{ width: 6, height: 6, background: "var(--accent)", display: "inline-block", borderRadius: 1 }}
            />
            Ferreira Pool Sensor
          </div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-geist-sans), ui-sans-serif" }}>
            This panel is private
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            Sign in with an authorized Google account to view live temperature,
            pressure, pH, and ORP readings.
          </p>
        </div>

        <Suspense>
          <LoginForm />
        </Suspense>

        <p
          className="text-[11px] uppercase tracking-[0.2em]"
          style={{ color: "var(--ink-soft)", fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
        >
          Access limited to verified owners
        </p>
      </div>
    </div>
  );
}
