import { createClient } from "@supabase/supabase-js";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const previewUrl = process.env.PREVIEW_URL?.replace(/\/$/, "");
const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const anonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!previewUrl || !bypass || !supabaseUrl || !anonKey || !serviceRoleKey) {
  throw new Error("Defina PREVIEW_URL, VERCEL_AUTOMATION_BYPASS_SECRET e as credenciais efêmeras do Supabase staging.");
}

const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const stamp = Date.now();
const email = `preview-editor-${stamp}@example.test`;
const password = "Launch-Preview-2026!";
const cookieJar = new Map();
let userId;
let bypassReady = false;

const updateCookies = (response) => {
  const setCookies = response.headers.getSetCookie?.() ?? [];
  for (const cookie of setCookies) {
    const pair = cookie.split(";", 1)[0];
    const separator = pair.indexOf("=");
    if (separator > 0) cookieJar.set(pair.slice(0, separator), pair.slice(separator + 1));
  }
};

const request = async (path, options = {}) => {
  if (!bypassReady) {
    const bootstrap = new URL("/", previewUrl);
    bootstrap.searchParams.set("x-vercel-protection-bypass", bypass);
    const bootstrapResponse = await fetch(bootstrap, {
      redirect: "manual",
      headers: {
        "x-vercel-protection-bypass": bypass,
        "x-vercel-set-bypass-cookie": "true",
      },
    });
    updateCookies(bootstrapResponse);
    bypassReady = true;
  }
  const headers = new Headers(options.headers);
  headers.set("x-vercel-protection-bypass", bypass);
  if (options.method && !["GET", "HEAD"].includes(options.method)) {
    headers.set("origin", previewUrl);
    if (!headers.has("referer")) headers.set("referer", `${previewUrl}/es/studio`);
  }
  if (cookieJar.size) headers.set("cookie", [...cookieJar].map(([key, value]) => `${key}=${value}`).join("; "));
  const response = await fetch(new URL(path, previewUrl), { redirect: "manual", ...options, headers });
  updateCookies(response);
  return response;
};

const form = (values) => {
  const body = new FormData();
  for (const [key, value] of Object.entries(values)) body.append(key, String(value));
  return body;
};

const redirectLocation = (response) => response.headers.get("location") ?? "";
const expectRedirect = (response, pattern) => {
  assert.ok([302, 303, 307, 308].includes(response.status), `Redirecionamento esperado; recebido ${response.status}`);
  assert.match(redirectLocation(response), pattern);
};

try {
  const { data: created, error: userError } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  assert.ifError(userError);
  userId = created.user?.id;
  assert.ok(userId);

  const anonymousStudio = await request("/es/studio");
  expectRedirect(anonymousStudio, /\/es\/studio\/login/);

  const login = await request("/api/launch/auth", {
    method: "POST",
    body: form({ intent: "login", email, password, locale: "es", return_to: "/es/studio" }),
  });
  expectRedirect(login, /\/es\/studio$/);
  assert.ok(cookieJar.size, "Login não retornou cookies de sessão");

  const dashboard = await request("/es/studio");
  assert.equal(dashboard.status, 200);
  assert.match(await dashboard.text(), new RegExp(email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));

  const slug = `preview-editor-${stamp}`;
  const create = await request("/api/launch/sites", {
    method: "POST",
    body: form({
      locale: "es",
      name: "Estudio Preview",
      slug,
      segment: "Servicios profesionales",
      description: "Sitio temporal para validar el Editor 2.0 en Preview.",
      template_id: "legal",
      theme: "elegant",
      phone: "+584121234567",
    }),
  });
  expectRedirect(create, /\/es\/studio\/sites\/[0-9a-f-]+\/editar$/);
  const siteId = redirectLocation(create).match(/sites\/([0-9a-f-]+)\/editar/)?.[1];
  assert.ok(siteId);

  const { data: site, error: siteError } = await admin.from("sites").select("*,site_sections(*)").eq("id", siteId).single();
  assert.ifError(siteError);
  assert.equal(site.settings.whatsapp.countryCode, "58");
  assert.equal(site.settings.whatsapp.phone, "4121234567", "Código do país foi duplicado no telefone");

  for (const path of [
    `/es/studio/sites/${siteId}/editar`,
    `/es/studio/sites/${siteId}/preview`,
    `/es/studio/sites/${siteId}/modelo?template=beauty`,
    `/es/studio/sites/${siteId}/leads`,
  ]) {
    const page = await request(path);
    assert.equal(page.status, 200, `${path} não respondeu 200`);
    const html = await page.text();
    assert.doesNotMatch(html, /<title>404|Internal Server Error/i);
    if (path.endsWith("/editar")) assert.match(html, /Abogacía/);
  }

  const hero = site.site_sections.find((section) => section.type === "hero");
  assert.ok(hero?.id);
  const imageBytes = await readFile(new URL("../public/images/showcases/orion-odontologia/screenshot.webp", import.meta.url));
  const uploadBody = new FormData();
  uploadBody.append("site_id", siteId);
  uploadBody.append("section_id", hero.id);
  uploadBody.append("intent", "upload");
  uploadBody.append("image", new File([imageBytes], "preview.webp", { type: "image/webp" }));
  const upload = await request("/api/launch/assets", {
    method: "POST",
    headers: { referer: `${previewUrl}/es/studio/sites/${siteId}/editar` },
    body: uploadBody,
  });
  expectRedirect(upload, new RegExp(`/es/studio/sites/${siteId}/editar$`));
  const { data: originalAssets } = await admin.from("site_assets").select("path").eq("site_id", siteId);
  assert.equal(originalAssets?.length, 1, "Upload não criou metadata do asset");

  const duplicate = await request(`/api/launch/sites/${siteId}`, {
    method: "POST",
    body: form({ intent: "duplicate", locale: "es", return_to: `/es/studio/sites/${siteId}/editar` }),
  });
  expectRedirect(duplicate, /\/es\/studio\?notice=duplicated$/);
  const { data: sites } = await admin.from("sites").select("id,name,status").eq("owner_id", userId).order("created_at");
  assert.equal(sites?.length, 2);
  const copiedSite = sites.find((item) => item.id !== siteId);
  assert.ok(copiedSite);
  const { data: copiedAssets } = await admin.from("site_assets").select("path").eq("site_id", copiedSite.id);
  assert.equal(copiedAssets?.length, 1, "Duplicação não copiou o asset");
  assert.notEqual(copiedAssets[0].path, originalAssets[0].path, "Duplicação reutilizou o asset do site original");

  const switchTemplate = await request(`/api/launch/sites/${siteId}`, {
    method: "POST",
    body: form({ intent: "switch_template", template_id: "beauty", locale: "es", return_to: `/es/studio/sites/${siteId}/editar` }),
  });
  expectRedirect(switchTemplate, /notice=template_changed/);
  const { data: snapshots } = await admin.from("site_snapshots").select("id").eq("site_id", siteId);
  assert.equal(snapshots?.length, 1);
  const restore = await request(`/api/launch/sites/${siteId}`, {
    method: "POST",
    body: form({ intent: "restore_snapshot", snapshot_id: snapshots[0].id, locale: "es", return_to: `/es/studio/sites/${siteId}/editar` }),
  });
  expectRedirect(restore, /notice=snapshot_restored/);

  const publish = await request(`/api/launch/sites/${siteId}`, {
    method: "POST",
    body: form({ intent: "publish", locale: "es", return_to: `/es/studio/sites/${siteId}/editar` }),
  });
  expectRedirect(publish, /notice=published/);
  const publishCopy = await request(`/api/launch/sites/${copiedSite.id}`, {
    method: "POST",
    body: form({ intent: "publish", locale: "es", return_to: `/es/studio/sites/${copiedSite.id}/editar` }),
  });
  expectRedirect(publishCopy, /error=published_limit/);

  const lead = await request("/api/launch/leads", {
    method: "POST",
    headers: { referer: `${previewUrl}/tenant-site/${slug}` },
    body: form({ site_id: siteId, name: "Lead Preview", email: "lead@example.test", phone: "", message: "Mensaje temporal de homologación.", company: "" }),
  });
  expectRedirect(lead, /lead=sent/);
  const leadsPage = await request(`/es/studio/sites/${siteId}/leads`);
  assert.equal(leadsPage.status, 200);
  assert.match(await leadsPage.text(), /lead@example\.test/);

  for (const item of [copiedSite, { id: siteId, name: "Estudio Preview" }]) {
    const remove = await request(`/api/launch/sites/${item.id}`, {
      method: "POST",
      body: form({ intent: "delete", confirm_name: item.name, locale: "es", return_to: "/es/studio" }),
    });
    expectRedirect(remove, /\/es\/studio\?notice=deleted$/);
  }
  assert.equal((await admin.from("sites").select("id", { count: "exact", head: true }).eq("owner_id", userId)).count, 0);
  assert.equal((await admin.from("site_assets").select("id", { count: "exact", head: true }).eq("owner_id", userId)).count, 0);
  for (const path of [originalAssets[0].path, copiedAssets[0].path]) {
    assert.ok((await admin.storage.from("site-assets").download(path)).error, "Asset permaneceu após exclusão do site");
  }

  const logout = await request("/api/launch/auth", {
    method: "POST",
    body: form({ intent: "logout", locale: "es", return_to: "/es/studio/login" }),
  });
  expectRedirect(logout, /\/es\/studio\/login$/);
  const afterLogout = await request("/es/studio");
  expectRedirect(afterLogout, /\/es\/studio\/login/);

  console.log("Preview aprovado: login, rotas PT/ES, criação, telefone, upload, duplicação, template/snapshot, publicação única, lead, exclusão e logout.");
} finally {
  if (userId) {
    const { data: assets } = await admin.from("site_assets").select("path").eq("owner_id", userId);
    if (assets?.length) await admin.storage.from("site-assets").remove(assets.map((asset) => asset.path));
    await admin.auth.admin.deleteUser(userId);
  }
}
