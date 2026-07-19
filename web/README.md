# Pool Sensor — Web

Next.js app: a dashboard for pool sensor readings, backed by Supabase.

## Setup

1. Create a Supabase project, then run `supabase/schema.sql` in its SQL editor.
2. Copy `.env.local.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Project Settings → API
   - `SUPABASE_SERVICE_ROLE_KEY` — same page, service_role secret (server-only, never exposed to the browser)
   - `DEVICE_INGEST_SECRET` — a random string the Pi will send when posting readings (`openssl rand -hex 32`)
3. `npm install`
4. `npm run dev`

## API

`POST /api/readings` — the Pi posts one reading at a time here.

Headers: `x-device-secret: <DEVICE_INGEST_SECRET>`

Body (all fields optional, at least one required):

```json
{ "temp_f": 82.4, "pressure_psi": 18.2, "ph": 7.4, "orp_mv": 650 }
```

## Deploying to Vercel

Import this repo (root directory `web/`) into Vercel, and set the four env vars above in
Project Settings → Environment Variables. The dashboard reads the latest 50 rows from the
`readings` table on every request.
