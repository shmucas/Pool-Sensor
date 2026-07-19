import { Suspense } from "react";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="min-h-full flex items-center justify-center px-6">
      <div
        className="w-full max-w-sm rounded-md border p-8 flex flex-col gap-6 items-center text-center"
        style={{ borderColor: "var(--line)", background: "var(--panel)" }}
      >
        <div className="flex flex-col gap-1">
          <div
            className="text-xs uppercase tracking-widest"
            style={{ color: "var(--accent)", fontFamily: "ui-monospace, monospace" }}
          >
            Pool Sensor
          </div>
          <h1 className="text-xl font-semibold" style={{ fontFamily: "ui-monospace, monospace" }}>
            Sign in
          </h1>
          <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
            This dashboard is private. Sign in with the authorized Google account to continue.
          </p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
