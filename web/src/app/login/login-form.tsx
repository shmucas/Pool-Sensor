"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseBrowserClient } from "@/lib/supabase-browser";

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
    <>
      {notAllowed && (
        <div
          className="w-full rounded-md border p-3 text-sm"
          style={{ borderColor: "var(--critical)", background: "var(--critical-soft)", color: "var(--critical)" }}
        >
          That Google account isn&apos;t authorized for this dashboard.
        </div>
      )}
      <button
        onClick={signInWithGoogle}
        disabled={pending}
        className="w-full rounded-md border px-4 py-2 text-sm font-medium disabled:opacity-50"
        style={{ borderColor: "var(--line)", fontFamily: "ui-monospace, monospace" }}
      >
        {pending ? "Redirecting..." : "Sign in with Google"}
      </button>
    </>
  );
}
