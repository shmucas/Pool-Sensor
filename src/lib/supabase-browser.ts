import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser client for Client Components. Persists the auth session in cookies
 * so the server clients (proxy, Server Components) can read the same session.
 */
export function supabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createBrowserClient(url, anonKey);
}
