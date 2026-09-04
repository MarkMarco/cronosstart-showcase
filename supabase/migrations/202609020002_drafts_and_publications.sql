alter table public.sites add column draft_revision integer not null default 1;
alter table public.sites add column published_revision integer not null default 0;

create table public.site_publications (
  site_id uuid primary key references public.sites(id) on delete cascade,
  slug text not null unique,
  snapshot jsonb not null,
  published_at timestamptz not null default now()
);
alter table public.site_publications enable row level security;
create policy "published snapshots public" on public.site_publications for select using (
  exists(select 1 from public.sites s where s.id=site_id and s.status='published')
);
create policy "owners manage snapshots" on public.site_publications for all using (
  exists(select 1 from public.sites s where s.id=site_id and s.owner_id=auth.uid())
) with check (
  exists(select 1 from public.sites s where s.id=site_id and s.owner_id=auth.uid())
);

drop policy if exists "published sites public" on public.sites;
drop policy if exists "published sections public" on public.site_sections;

create or replace function public.publish_site(target_site uuid) returns void
language plpgsql security invoker as $$
declare payload jsonb;
begin
  select to_jsonb(s) || jsonb_build_object('site_sections', coalesce((
    select jsonb_agg(to_jsonb(ss) order by ss.position) from public.site_sections ss where ss.site_id=s.id
  ), '[]'::jsonb)) into payload from public.sites s where s.id=target_site and s.owner_id=auth.uid();
  if payload is null then raise exception 'site_not_found'; end if;
  insert into public.site_publications(site_id,slug,snapshot,published_at)
  select id,slug,payload,now() from public.sites where id=target_site
  on conflict(site_id) do update set slug=excluded.slug,snapshot=excluded.snapshot,published_at=now();
  update public.sites set status='published',published_at=now(),published_revision=draft_revision where id=target_site and owner_id=auth.uid();
end $$;

create or replace function public.get_public_site(target_slug text) returns jsonb
language sql stable security definer set search_path=public as $$
  select p.snapshot || jsonb_build_object('published_at',p.published_at)
  from public.site_publications p join public.sites s on s.id=p.site_id
  where p.slug=target_slug and s.status='published'
$$;
revoke all on function public.get_public_site(text) from public;
grant execute on function public.get_public_site(text) to anon, authenticated;

drop policy if exists "public submits published leads" on public.site_leads;
create or replace function public.submit_site_lead(target_site uuid,lead_name text,lead_email text,lead_phone text,lead_message text) returns uuid
language plpgsql security definer set search_path=public as $$
declare new_id uuid;
begin
  if not exists(select 1 from public.sites where id=target_site and status='published') then raise exception 'site_unavailable'; end if;
  insert into public.site_leads(site_id,name,email,phone,message) values(target_site,left(trim(lead_name),100),nullif(left(trim(lead_email),160),''),nullif(left(trim(lead_phone),30),''),left(trim(lead_message),2000)) returning id into new_id;
  return new_id;
end $$;
revoke all on function public.submit_site_lead(uuid,text,text,text,text) from public;
grant execute on function public.submit_site_lead(uuid,text,text,text,text) to anon, authenticated;

create or replace function public.bump_site_draft(target_site uuid) returns void
language sql security invoker as $$ update public.sites set draft_revision=draft_revision+1,updated_at=now() where id=target_site and owner_id=auth.uid() $$;

create or replace function public.move_site_section(target_site uuid,target_section uuid,direction text) returns void language plpgsql security invoker as $$
declare current_position integer; other_position integer;
begin
  if not exists(select 1 from public.sites where id=target_site and owner_id=auth.uid()) then raise exception 'not_allowed'; end if;
  select position into current_position from public.site_sections where id=target_section and site_id=target_site;
  other_position:=case when direction='up' then current_position-1 else current_position+1 end;
  update public.site_sections set position=case when id=target_section then other_position when position=other_position then current_position else position end where site_id=target_site and (id=target_section or position=other_position);
  perform public.bump_site_draft(target_site);
end $$;
