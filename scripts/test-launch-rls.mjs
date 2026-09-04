import { createClient } from "@supabase/supabase-js";
import assert from "node:assert/strict";

const url = process.env.PUBLIC_SUPABASE_URL;
const key = process.env.PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  throw new Error("Defina PUBLIC_SUPABASE_URL e PUBLIC_SUPABASE_ANON_KEY antes de executar o teste RLS.");
}
const stamp = Date.now();
const client = () => createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const a = client(), b = client(), anon = client();
const admin = serviceRoleKey
  ? createClient(url, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } })
  : null;
const createdUserIds = [];

const signup = async (db, label) => {
  const email = `${label}-${stamp}@example.test`;
  const password = "Launch-Test-2026!";
  if (admin) {
    const { data: created, error: createError } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
    assert.ifError(createError); assert.ok(created.user?.id); createdUserIds.push(created.user.id);
    const { error: loginError } = await db.auth.signInWithPassword({ email, password });
    assert.ifError(loginError); return created.user;
  }
  const { data, error } = await db.auth.signUp({ email, password });
  assert.ifError(error); assert.ok(data.user?.id); return data.user;
};
const userA = await signup(a, "tenant-a"); const userB = await signup(b, "tenant-b");
const createSite = async (db, user, label) => {
  const { data, error } = await db.from("sites").insert({ owner_id: user.id, name: `Empresa ${label}`, slug: `${label}-${stamp}`, template_id: "services", settings: {} }).select().single();
  assert.ifError(error); return data;
};
const siteA = await createSite(a, userA, "tenant-a");
const siteA2 = await createSite(a, userA, "tenant-a-2");
const siteA3 = await createSite(a, userA, "tenant-a-3");
const siteB = await createSite(b, userB, "tenant-b");
assert.ok(siteA2.id && siteA3.id, "Usuário Free não conseguiu criar três sites");
const fourthSiteAttempt = await a.from("sites").insert({ owner_id: userA.id, name: "Quarto site", slug: `tenant-a-extra-${stamp}`, template_id: "services", settings: {} });
assert.ok(fourthSiteAttempt.error, "Usuário Free conseguiu criar mais de três sites");
const section = (site_id, title) => ({ site_id, type: "hero", variant: "hero-01", position: 1, visible: true, content: { title }, settings: {} });
assert.ifError((await a.from("site_sections").insert(section(siteA.id, "A"))).error);
assert.ifError((await b.from("site_sections").insert(section(siteB.id, "B"))).error);

assert.equal((await a.from("sites").select("id").eq("id", siteB.id)).data.length, 0, "A leu site draft de B");
assert.equal((await a.from("site_sections").select("id").eq("site_id", siteB.id)).data.length, 0, "A leu seção de B");
assert.equal((await a.from("sites").update({ name: "INVASAO" }).eq("id", siteB.id).select()).data.length, 0, "A alterou site de B");
assert.equal((await a.from("site_sections").delete().eq("site_id", siteB.id).select()).data.length, 0, "A excluiu seção de B");

const bytes = new TextEncoder().encode("fake-image-test");
const pathB = `${userB.id}/${siteB.id}/rls-test.png`;
assert.ifError((await b.storage.from("site-assets").upload(pathB, bytes, { contentType: "image/png" })).error);
assert.ifError((await b.from("site_assets").insert({ site_id: siteB.id, owner_id: userB.id, path: pathB, mime_type: "image/png", size: bytes.length })).error);
assert.equal((await a.from("site_assets").select("id").eq("site_id", siteB.id)).data.length, 0, "A leu metadata de asset de B");
await a.storage.from("site-assets").remove([pathB]);
assert.ifError((await b.storage.from("site-assets").download(pathB)).error, "Asset de B desapareceu após tentativa de exclusão por A");

const switchedSections = [{ ...section(siteB.id, "B"), id: (await b.from("site_sections").select("id").eq("site_id", siteB.id).single()).data.id, variant: "background" }];
assert.ifError((await b.rpc("switch_site_template", { target_site: siteB.id, target_template: "beauty", target_sections: switchedSections })).error);
assert.equal((await b.from("sites").select("template_id").eq("id", siteB.id).single()).data.template_id, "beauty", "Troca de template não foi aplicada");
const snapshotsB = await b.from("site_snapshots").select("id").eq("site_id", siteB.id);
assert.equal(snapshotsB.data.length, 1, "Snapshot pré-troca não foi criado");
assert.equal((await a.from("site_snapshots").select("id").eq("site_id", siteB.id)).data.length, 0, "A leu snapshot de B");
assert.ok((await a.rpc("restore_site_snapshot", { target_site: siteB.id, target_snapshot: snapshotsB.data[0].id })).error, "A restaurou snapshot de B");
assert.ifError((await b.rpc("restore_site_snapshot", { target_site: siteB.id, target_snapshot: snapshotsB.data[0].id })).error);
assert.equal((await b.from("sites").select("template_id").eq("id", siteB.id).single()).data.template_id, "services", "Snapshot não restaurou template");
assert.equal((await b.from("site_sections").select("content").eq("site_id", siteB.id).single()).data.content.title, "B", "Snapshot não restaurou conteúdo");

assert.ifError((await b.rpc("publish_site", { target_site: siteB.id })).error);
assert.ifError((await a.rpc("publish_site", { target_site: siteA.id })).error);
assert.ok((await a.rpc("publish_site", { target_site: siteA2.id })).error, "Usuário Free publicou dois sites simultaneamente");
assert.equal((await anon.rpc("get_public_site", { target_slug: siteB.slug })).data.id, siteB.id, "Site publicado não ficou público");
const publishedBefore = (await anon.rpc("get_public_site", { target_slug: siteB.slug })).data.site_sections[0].content.title;
assert.ifError((await b.from("site_sections").update({ content: { title: "Draft novo" } }).eq("site_id", siteB.id)).error);
assert.equal((await anon.rpc("get_public_site", { target_slug: siteB.slug })).data.site_sections[0].content.title, publishedBefore, "Draft vazou para publicação");
assert.equal((await a.from("site_publications").update({ slug: "invadido" }).eq("site_id", siteB.id).select()).data.length, 0, "A alterou publicação de B");
assert.ifError((await anon.rpc("submit_site_lead", { target_site: siteB.id, lead_name: "Lead", lead_email: "lead@example.test", lead_phone: "", lead_message: "Mensagem de teste" })).error);
assert.equal((await a.from("site_leads").select("id").eq("site_id", siteB.id)).data.length, 0, "A leu lead de B");
assert.equal((await b.from("site_leads").select("id").eq("site_id", siteB.id)).data.length, 1, "B não leu seu lead");
assert.ifError((await b.from("sites").update({ status: "draft", published_at: null }).eq("id", siteB.id)).error);
assert.equal((await anon.rpc("get_public_site", { target_slug: siteB.slug })).data, null, "Site despublicado continuou público");
assert.ok((await anon.rpc("submit_site_lead", { target_site: siteB.id, lead_name: "Blocked", lead_email: "", lead_phone: "", lead_message: "Não deveria entrar" })).error, "Lead entrou em site despublicado");

console.log("RLS A×B aprovado: três projetos Free, um publicado, sites, sections, snapshots, assets, leads, publicação e despublicação.");
await b.storage.from("site-assets").remove([pathB]);
if (admin) {
  for (const userId of createdUserIds) {
    assert.ifError((await admin.auth.admin.deleteUser(userId)).error);
  }
  console.log("Dados temporários remotos removidos.");
}
