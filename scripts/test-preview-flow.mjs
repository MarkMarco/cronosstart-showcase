import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const deployment = process.env.DEPLOYMENT_URL?.replace(/\/$/, "");
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!deployment || !supabaseUrl || !serviceRole)
  throw new Error("Defina DEPLOYMENT_URL, PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.");

const admin = createClient(supabaseUrl, serviceRole, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const stamp = Date.now();
const email = `preview-flow-${stamp}@example.test`;
const password = `Launch-Preview-${stamp}!`;
const cookieJar = path.join(tmpdir(), `cronosstart-preview-${stamp}.cookies`);
const npxCli = path.join(path.dirname(process.execPath), "node_modules", "npm", "bin", "npx-cli.js");
let userId;

function request(route, args = []) {
  return execFileSync(process.execPath, [npxCli, "vercel", "curl", `${deployment}${route}`, "--", "--silent", "--show-error", "--header", `Origin: ${deployment}`, ...args], {
    cwd: process.cwd(),
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
    stdio: ["ignore", "pipe", "inherit"],
  });
}
const location = (headers) => headers.match(/^location:\s*(.+)$/im)?.[1]?.trim() ?? "";
const hasStatus = (headers, status) => new RegExp(`^HTTP/\\S+ ${status}\\b`, "im").test(headers);
const statusOf = (headers) => headers.match(/^HTTP\/\S+ (\d{3})\b/im)?.[1] ?? "unknown";
const authenticated = ["--cookie", cookieJar, "--cookie-jar", cookieJar];

try {
  const { data: created, error: createUserError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  assert.ifError(createUserError);
  userId = created.user?.id;
  assert.ok(userId);

  const login = request("/api/launch/auth", [
    "--dump-header", "-", "--output", "NUL", "--cookie-jar", cookieJar,
    "--data-urlencode", "intent=login", "--data-urlencode", `email=${email}`,
    "--data-urlencode", `password=${password}`, "--data-urlencode", "locale=es",
    "--data-urlencode", "return_to=/es/studio",
  ]);
  assert.equal(location(login), "/es/studio", `Login HTTP ${statusOf(login)}`);

  const authenticatedLogin = request("/es/studio/login", ["--dump-header", "-", "--output", "NUL", "--max-redirs", "0", ...authenticated]);
  assert.equal(location(authenticatedLogin), "/es/studio");

  const recoveryRequest = request("/api/launch/auth", [
    "--dump-header", "-", "--output", "NUL", ...authenticated,
    "--data-urlencode", "intent=request_recovery", "--data-urlencode", `email=${email}`,
    "--data-urlencode", "locale=es", "--data-urlencode", "return_to=/es/studio",
  ]);
  assert.match(location(recoveryRequest), /^\/es\/studio\/recuperar-senha\?sent=1&/);

  const onboarding = request("/es/studio/onboarding?template=legal", authenticated);
  assert.match(onboarding, /Cuéntanos un poco sobre tu negocio/);
  assert.match(onboarding, /value="legal" checked/);

  const slug = `preview-${stamp}`;
  const create = request("/api/launch/sites", [
    "--dump-header", "-", "--output", "NUL", ...authenticated,
    "--data-urlencode", "name=Empresa Preview", "--data-urlencode", `slug=${slug}`,
    "--data-urlencode", "segment=Consultoria",
    "--data-urlencode", "description=Descrição controlada para validar o fluxo remoto.",
    "--data-urlencode", "phone=5547999999999", "--data-urlencode", "template_id=legal",
    "--data-urlencode", "locale=es",
  ]);
  const createLocation = location(create);
  const siteId = createLocation.match(/^\/es\/studio\/sites\/([^/]+)\/editar$/)?.[1];
  assert.ok(siteId, `Redirect de criação fora do Studio ES: ${createLocation}`);
  const editorPath = `/es/studio/sites/${siteId}/editar`;

  const editor = request(editorPath, authenticated);
  assert.match(editor, /Empresa Preview/);
  assert.match(editor, /Sitio principal/);
  const leadsHeaders = request(`/es/studio/sites/${siteId}/leads`, ["--dump-header", "-", "--output", "NUL", ...authenticated]);
  assert.ok(hasStatus(leadsHeaders, 200));

  const { data: sections, error: sectionsError } = await admin.from("site_sections").select("id,type").eq("site_id", siteId);
  assert.ifError(sectionsError);
  const sectionId = sections?.find((section) => section.type === "services")?.id ?? sections?.[0]?.id;
  assert.ok(sectionId);

  const addCard = request(`/api/launch/sites/${siteId}`, [
    "--dump-header", "-", "--output", "NUL", ...authenticated,
    "--data-urlencode", "intent=add_item", "--data-urlencode", `section_id=${sectionId}`,
    "--data-urlencode", `return_to=${editorPath}`,
  ]);
  assert.ok(hasStatus(addCard, 303));

  const upload = request("/api/launch/assets", [
    "--dump-header", "-", "--output", "NUL", ...authenticated,
    "--header", `Referer: ${deployment}${editorPath}`, "--form", "intent=upload",
    "--form", `site_id=${siteId}`, "--form", `section_id=${sectionId}`,
    "--form", "item_index=0", "--form", `image=@${path.resolve("public/favicon-32x32.png")};type=image/png`,
  ]);
  assert.ok(hasStatus(upload, 303));

  const publish = request(`/api/launch/sites/${siteId}`, [
    "--dump-header", "-", "--output", "NUL", ...authenticated,
    "--data-urlencode", "intent=publish", "--data-urlencode", `return_to=${editorPath}`,
  ]);
  assert.ok(hasStatus(publish, 303));

  const lead = request("/api/launch/leads", [
    "--dump-header", "-", "--output", "NUL", "--header", `Referer: ${deployment}/`,
    "--data-urlencode", `site_id=${siteId}`, "--data-urlencode", "name=Lead Preview",
    "--data-urlencode", "email=lead@example.test", "--data-urlencode", "phone=5547999999999",
    "--data-urlencode", "message=Mensagem de validação remota.", "--data-urlencode", "company=",
  ]);
  assert.equal(location(lead), "/?lead=sent#contato");

  request(`/api/launch/sites/${siteId}`, [
    "--dump-header", "-", "--output", "NUL", ...authenticated,
    "--data-urlencode", "intent=add_item", "--data-urlencode", `section_id=${sectionId}`,
    "--data-urlencode", `return_to=${editorPath}`,
  ]);
  assert.match(request(editorPath, authenticated), /Cambios sin publicar/);
  assert.match(request(`/es/studio/sites/${siteId}/leads`, authenticated), /Lead Preview/);

  const removeUpload = request("/api/launch/assets", [
    "--dump-header", "-", "--output", "NUL", ...authenticated,
    "--header", `Referer: ${deployment}${editorPath}`, "--form", "intent=remove",
    "--form", `site_id=${siteId}`, "--form", `section_id=${sectionId}`, "--form", "item_index=0",
  ]);
  assert.ok(hasStatus(removeUpload, 303));

  const unpublish = request(`/api/launch/sites/${siteId}`, [
    "--dump-header", "-", "--output", "NUL", ...authenticated,
    "--data-urlencode", "intent=unpublish", "--data-urlencode", `return_to=${editorPath}`,
  ]);
  assert.ok(hasStatus(unpublish, 303));

  const secondSite = request("/api/launch/sites", [
    "--dump-header", "-", "--output", "NUL", ...authenticated,
    "--data-urlencode", "name=Segundo Site", "--data-urlencode", `slug=second-${slug}`,
    "--data-urlencode", "segment=Consultoria",
    "--data-urlencode", "description=Descrição para testar o limite do plano gratuito.",
    "--data-urlencode", "phone=", "--data-urlencode", "template_id=services",
    "--data-urlencode", "locale=es",
  ]);
  assert.ok(hasStatus(secondSite, 409));

  const logout = request("/api/launch/auth", [
    "--dump-header", "-", "--output", "NUL", ...authenticated,
    "--data-urlencode", "intent=logout", "--data-urlencode", "locale=es",
    "--data-urlencode", "return_to=/es/studio/login",
  ]);
  assert.ok(hasStatus(logout, 303));
  const afterLogout = request(editorPath, ["--dump-header", "-", "--output", "NUL", "--max-redirs", "0", ...authenticated]);
  assert.match(location(afterLogout), /^\/es\/studio\/login\?/);

  console.log("Preview remoto aprovado: login/logout, sessão, Studio ES, onboarding/template, site Free, editor, card, upload/remoção, draft, publicação/despublicação e leads.");
} finally {
  if (userId) {
    const { error } = await admin.auth.admin.deleteUser(userId);
    assert.ifError(error);
  }
  if (existsSync(cookieJar)) unlinkSync(cookieJar);
}
