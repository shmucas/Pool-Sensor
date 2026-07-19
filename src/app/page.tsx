import { supabaseServerClient } from "@/lib/supabase-server";
import { DashboardShell } from "@/components/dashboard-shell";
import {
  connectionStatus,
  type ConnectionStatus,
  type DisplayReading,
  type Reading,
} from "@/lib/telemetry";

export const dynamic = "force-dynamic";

async function getReadings(): Promise<{ readings: Reading[]; fetchedAt: number }> {
  const supabase = await supabaseServerClient();
  const { data, error } = await supabase
    .from("readings")
    .select("*")
    .order("recorded_at", { ascending: false })
    .limit(50);

  if (error) {
    throw new Error(`Failed to load readings: ${error.message}`);
  }
  // Capture "now" alongside the fetch so render stays pure.
  return { readings: data ?? [], fetchedAt: Date.now() };
}

export default async function Home() {
  let readings: Reading[] = [];
  let fetchedAt = 0;
  let error: string | null = null;

  try {
    const result = await getReadings();
    readings = result.readings;
    fetchedAt = result.fetchedAt;
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error";
  }

  const status: ConnectionStatus = connectionStatus(readings[0], fetchedAt);

  // Format timestamps on the server so the client never re-derives a Date.
  const display: DisplayReading[] = readings.map((r) => ({
    ...r,
    time: new Date(r.recorded_at).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }),
  }));

  return <DashboardShell readings={display} status={status} error={error} />;
}
