-- Pool sensor readings table
create table if not exists readings (
  id bigint generated always as identity primary key,
  recorded_at timestamptz not null default now(),
  temp_f double precision,
  pressure_psi double precision,
  ph double precision,
  orp_mv double precision
);

create index if not exists readings_recorded_at_idx on readings (recorded_at desc);

-- Row Level Security: table is written only via the service-role key from the
-- Next.js API route, and read only via the anon key for the dashboard.
alter table readings enable row level security;

create policy "anon can read readings"
  on readings for select
  to anon
  using (true);

-- No insert/update/delete policy for anon or authenticated: writes only via
-- the service-role key, which bypasses RLS by design.
