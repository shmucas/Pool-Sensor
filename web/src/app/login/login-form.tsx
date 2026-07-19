"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseBrowserClient } from "@/lib/supabase-browser";

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62Z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.95 10.7a5.4 5.4 0 0 1 0-3.4V4.97H.95a9 9 0 0 0 0 8.06l3-2.33Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.99 11.42.09 9 .09a9 9 0 0 0-8.05 4.88l3 2.33C4.66 5.17 6.65 3.58 9 3.58Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function LoginForm() {
  const [pending, setPending] = useState(false);
  const searchParams = useSearchParams();
  const notAllowed = searchParams.get("error") === "not_allowed";

  async function signInWithGoogle() {
    setPending(true);
    const supabase = supabaseBrowserClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div className="w-full flex flex-col gap-3">
      {notAllowed && (
        <div
          className="w-full rounded-md border p-3 text-sm text-left"
          style={{ borderColor: "var(--critical)", background: "var(--critical-soft)", color: "var(--critical)" }}
        >
          That Google account isn&apos;t authorized for this dashboard.
        </div>
      )}
      <button
        onClick={signInWithGoogle}
        disabled={pending}
        className="w-full flex items-center justify-center gap-3 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 hover:bg-[var(--accent-soft)]"
        style={{ borderColor: "var(--line)", background: "var(--panel)", color: "var(--ink)" }}
      >
        <GoogleMark />
        {pending ? "Redirecting…" : "Continue with Google"}
      </button>
    </div>
  );
}
