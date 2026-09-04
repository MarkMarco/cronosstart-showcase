-- RPCs privadas do Studio: acesso somente autenticado e search_path imutável.
alter function public.publish_site(uuid) set search_path = public, pg_temp;
alter function public.restore_site_snapshot(uuid, uuid) set search_path = public, pg_temp;
alter function public.switch_site_template(uuid, text, jsonb) set search_path = public, pg_temp;
alter function public.bump_site_draft(uuid) set search_path = public, pg_temp;
alter function public.move_site_section(uuid, uuid, text) set search_path = public, pg_temp;

revoke execute on function public.publish_site(uuid) from public, anon;
revoke execute on function public.restore_site_snapshot(uuid, uuid) from public, anon;
revoke execute on function public.switch_site_template(uuid, text, jsonb) from public, anon;
revoke execute on function public.bump_site_draft(uuid) from public, anon;
revoke execute on function public.move_site_section(uuid, uuid, text) from public, anon;

grant execute on function public.publish_site(uuid) to authenticated;
grant execute on function public.restore_site_snapshot(uuid, uuid) to authenticated;
grant execute on function public.switch_site_template(uuid, text, jsonb) to authenticated;
grant execute on function public.bump_site_draft(uuid) to authenticated;
grant execute on function public.move_site_section(uuid, uuid, text) to authenticated;

-- A função de trigger nunca deve ser invocável pela Data API.
alter function public.enforce_free_site_limit() set search_path = public, pg_temp;
revoke execute on function public.enforce_free_site_limit() from public, anon, authenticated;

-- Evita reavaliar auth.uid() para cada linha na policy criada pelo Editor 2.0.
drop policy if exists "owners manage site snapshots" on public.site_snapshots;
create policy "owners manage site snapshots"
on public.site_snapshots for all
to authenticated
using (
  owner_id = (select auth.uid())
  and exists (
    select 1 from public.sites s
    where s.id = site_id and s.owner_id = (select auth.uid())
  )
)
with check (
  owner_id = (select auth.uid())
  and exists (
    select 1 from public.sites s
    where s.id = site_id and s.owner_id = (select auth.uid())
  )
);
