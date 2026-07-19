import { createClient } from "@supabase/supabase-js";

/**
 * Anon-key client for the dashboard's read-only queries.
 * Relies on the "anon can read readings" RLS policy in supabase/schema.sql.
 */
export function supabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}
