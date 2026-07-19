"use client";

import { useRouter } from "next/navigation";
import { supabaseBrowserClient } from "@/lib/supabase-browser";

export function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    const supabase = supabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={signOut}
      className="text-xs uppercase tracking-wide rounded-md border px-3 py-1.5"
      style={{ borderColor: "var(--line)", color: "var(--ink-soft)", fontFamily: "ui-monospace, monospace" }}
    >
      Sign out
    </button>
  );
}
