begin;

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null check (char_length(trim(customer_name)) between 1 and 200),
  phone text not null check (char_length(trim(phone)) between 7 and 32),
  service_type text not null check (char_length(trim(service_type)) between 1 and 100),
  -- Human-readable size, e.g. '0.5 acres' or 'small yard'.
  plot_size text check (char_length(plot_size) <= 200),
  -- USD estimate supplied by the form; not a confirmed price.
  estimated_cost numeric(12, 2) check (estimated_cost >= 0),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'scheduled', 'priority_dispatch', 'completed', 'cancelled'))
);

create index leads_status_created_at_idx on public.leads (status, created_at desc);
alter table public.leads enable row level security;

-- Explicit privileges also work when automatic Data API grants are disabled.
revoke all on public.leads from anon, authenticated;
grant usage on schema public to anon, authenticated;
grant insert (id, customer_name, phone, service_type, plot_size, estimated_cost)
  on public.leads to anon, authenticated;
grant all on public.leads to service_role;

create policy "Visitors can submit new leads"
  on public.leads for insert to anon, authenticated
  with check (status = 'new');

-- Audit the initial status and every subsequent transition. Only trusted
-- backend code / the Dashboard can read logs or change a lead's status.
create table public.lead_status_logs (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  created_at timestamptz not null default now(),
  previous_status text,
  status text not null
);
create index lead_status_logs_lead_created_at_idx
  on public.lead_status_logs (lead_id, created_at desc);
alter table public.lead_status_logs enable row level security;
revoke all on public.lead_status_logs from anon, authenticated;
grant all on public.lead_status_logs to service_role;

create schema if not exists private;
revoke all on schema private from public;

-- Intentional elevation: the insert-only browser role cannot write audit rows.
-- Keep the function outside exposed schemas and callable only by its trigger.
create function private.log_lead_status()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if TG_OP = 'INSERT' then
    insert into public.lead_status_logs (lead_id, previous_status, status)
    values (new.id, null, new.status);
  elsif old.status is distinct from new.status then
    insert into public.lead_status_logs (lead_id, previous_status, status)
    values (new.id, old.status, new.status);
  end if;
  return new;
end;
$$;
revoke all on function private.log_lead_status() from public, anon, authenticated;

create trigger leads_log_status
  after insert or update of status on public.leads
  for each row execute function private.log_lead_status();

-- Photos are private. Visitors may upload new objects, but cannot list, read,
-- replace, or delete them. Use unique <lead-id>/<random-uuid>.<extension> paths.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'lead-photos', 'lead-photos', false, 10485760,
  array['image/jpeg', 'image/png', 'image/webp']
);

create policy "Visitors can upload lead photos"
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'lead-photos');

commit;
