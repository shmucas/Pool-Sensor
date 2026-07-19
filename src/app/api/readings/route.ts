import { NextRequest, NextResponse } from "next/server";
import { supabaseServiceClient } from "@/lib/supabase-server";

type ReadingPayload = {
  temp_f?: number;
  pressure_psi?: number;
  ph?: number;
  orp_mv?: number;
};

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export async function POST(request: NextRequest) {
  const deviceSecret = request.headers.get("x-device-secret");
  if (!deviceSecret || deviceSecret !== process.env.DEVICE_INGEST_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: ReadingPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  const { temp_f, pressure_psi, ph, orp_mv } = body;
  const fields = { temp_f, pressure_psi, ph, orp_mv };

  const hasAtLeastOneReading = Object.values(fields).some((v) => v !== undefined);
  if (!hasAtLeastOneReading) {
    return NextResponse.json({ error: "no readings provided" }, { status: 400 });
  }

  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && !isFiniteNumber(value)) {
      return NextResponse.json({ error: `${key} must be a finite number` }, { status: 400 });
    }
  }

  const supabase = supabaseServiceClient();
  const { error } = await supabase.from("readings").insert({
    temp_f: temp_f ?? null,
    pressure_psi: pressure_psi ?? null,
    ph: ph ?? null,
    orp_mv: orp_mv ?? null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
