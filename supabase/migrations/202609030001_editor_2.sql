drop index if exists public.one_free_site_per_owner;

create unique index one_published_free_site_per_owner
  on public.sites(owner_id)
  where plan = 'free' and status = 'published';

create or replace function public.enforce_free_site_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  current_count integer;
begin
  if new.plan <> 'free' then
    return new;
  end if;

  select count(*)
    into current_count
    from public.sites
   where owner_id = new.owner_id
     and plan = 'free'
     and id <> new.id;

  if current_count >= 3 then
    raise exception 'free_site_limit_reached' using errcode = '23514';
  end if;

  return new;
end
$$;

revoke all on function public.enforce_free_site_limit() from public;

drop trigger if exists enforce_free_site_limit on public.sites;
create trigger enforce_free_site_limit
before insert or update of owner_id, plan on public.sites
for each row execute function public.enforce_free_site_limit();

create table public.site_snapshots (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  reason text not null check (reason in ('template_change')),
  snapshot jsonb not null,
  created_at timestamptz not null default now()
);

create index site_snapshots_site_created_idx
  on public.site_snapshots(site_id, created_at desc);

alter table public.site_snapshots enable row level security;

create policy "owners manage site snapshots"
on public.site_snapshots for all
using (
  owner_id = auth.uid()
  and exists (
    select 1 from public.sites s
    where s.id = site_id and s.owner_id = auth.uid()
  )
)
with check (
  owner_id = auth.uid()
  and exists (
    select 1 from public.sites s
    where s.id = site_id and s.owner_id = auth.uid()
  )
);

create or replace function public.publish_site(target_site uuid)
returns void
language plpgsql
security invoker
as $$
declare
  payload jsonb;
  target_owner uuid;
  target_plan text;
begin
  select owner_id, plan,
         to_jsonb(s) || jsonb_build_object(
           'site_sections', coalesce((
             select jsonb_agg(to_jsonb(ss) order by ss.position)
             from public.site_sections ss
             where ss.site_id = s.id
           ), '[]'::jsonb)
         )
    into target_owner, target_plan, payload
    from public.sites s
   where s.id = target_site
     and s.owner_id = auth.uid();

  if payload is null then
    raise exception 'site_not_found';
  end if;

  if target_plan = 'free' and exists (
    select 1 from public.sites
     where owner_id = target_owner
       and plan = 'free'
       and status = 'published'
       and id <> target_site
  ) then
    raise exception 'free_published_site_limit';
  end if;

  insert into public.site_publications(site_id, slug, snapshot, published_at)
  select id, slug, payload, now()
    from public.sites
   where id = target_site
  on conflict(site_id) do update
    set slug = excluded.slug,
        snapshot = excluded.snapshot,
        published_at = now();

  begin
    update public.sites
       set status = 'published',
           published_at = now(),
           published_revision = draft_revision
     where id = target_site
       and owner_id = auth.uid();
  exception when unique_violation then
    raise exception 'free_published_site_limit';
  end;
end
$$;

create or replace function public.restore_site_snapshot(
  target_site uuid,
  target_snapshot uuid
)
returns void
language plpgsql
security invoker
as $$
declare
  payload jsonb;
  section jsonb;
begin
  select ss.snapshot
    into payload
    from public.site_snapshots ss
   where ss.id = target_snapshot
     and ss.site_id = target_site
     and ss.owner_id = auth.uid();

  if payload is null then
    raise exception 'snapshot_not_found';
  end if;

  update public.sites
     set template_id = payload->>'template_id',
         settings = coalesce(payload->'settings', '{}'::jsonb),
         draft_revision = draft_revision + 1,
         updated_at = now()
   where id = target_site
     and owner_id = auth.uid();

  if not found then
    raise exception 'site_not_found';
  end if;

  delete from public.site_sections where site_id = target_site;

  for section in
    select value from jsonb_array_elements(
      coalesce(payload->'site_sections', '[]'::jsonb)
    )
  loop
    insert into public.site_sections(
      id, site_id, type, variant, position, visible, content, settings
    ) values (
      coalesce((section->>'id')::uuid, gen_random_uuid()),
      target_site,
      section->>'type',
      section->>'variant',
      (section->>'position')::integer,
      coalesce((section->>'visible')::boolean, true),
      coalesce(section->'content', '{}'::jsonb),
      coalesce(section->'settings', '{}'::jsonb)
    );
  end loop;
end
$$;

revoke all on function public.restore_site_snapshot(uuid, uuid) from public;
grant execute on function public.restore_site_snapshot(uuid, uuid) to authenticated;

create or replace function public.switch_site_template(
  target_site uuid,
  target_template text,
  target_sections jsonb
)
returns uuid
language plpgsql
security invoker
as $$
declare
  payload jsonb;
  snapshot_id uuid;
  section jsonb;
begin
  if target_template not in ('services', 'legal', 'beauty') then
    raise exception 'invalid_template';
  end if;

  if jsonb_typeof(target_sections) <> 'array'
     or jsonb_array_length(target_sections) < 1
     or jsonb_array_length(target_sections) > 20 then
    raise exception 'invalid_sections';
  end if;

  select to_jsonb(s) || jsonb_build_object(
           'site_sections', coalesce((
             select jsonb_agg(to_jsonb(ss) order by ss.position)
             from public.site_sections ss
             where ss.site_id = s.id
           ), '[]'::jsonb)
         )
    into payload
    from public.sites s
   where s.id = target_site
     and s.owner_id = auth.uid();

  if payload is null then
    raise exception 'site_not_found';
  end if;

  insert into public.site_snapshots(site_id, owner_id, reason, snapshot)
  values (target_site, auth.uid(), 'template_change', payload)
  returning id into snapshot_id;

  delete from public.site_sections where site_id = target_site;

  for section in select value from jsonb_array_elements(target_sections)
  loop
    insert into public.site_sections(
      id, site_id, type, variant, position, visible, content, settings
    ) values (
      coalesce((section->>'id')::uuid, gen_random_uuid()),
      target_site,
      section->>'type',
      section->>'variant',
      (section->>'position')::integer,
      coalesce((section->>'visible')::boolean, true),
      coalesce(section->'content', '{}'::jsonb),
      coalesce(section->'settings', '{}'::jsonb)
    );
  end loop;

  update public.sites
     set template_id = target_template,
         draft_revision = draft_revision + 1,
         updated_at = now()
   where id = target_site
     and owner_id = auth.uid();

  return snapshot_id;
end
$$;

revoke all on function public.switch_site_template(uuid, text, jsonb) from public;
grant execute on function public.switch_site_template(uuid, text, jsonb) to authenticated;
