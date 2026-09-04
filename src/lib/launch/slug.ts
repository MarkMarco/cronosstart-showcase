export const RESERVED_SLUGS = new Set([
  "www", "admin", "api", "studio", "mail", "support", "suporte", "login", "auth",
  "account", "billing", "sites", "app", "academy", "status", "cronosstart", "help",
  "ajuda", "security", "seguranca", "root", "system", "dashboard", "preview",
]);

export function normalizeSlug(input: string): string {
  return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}

export function validateSlug(input: string): string {
  const slug = normalizeSlug(input);
  if (slug.length < 3) throw new Error("O endereço deve ter pelo menos 3 caracteres.");
  if (RESERVED_SLUGS.has(slug)) throw new Error("Este endereço é reservado pela CronosStart.");
  return slug;
}

export function tenantFromHostname(hostname: string): string | null {
  const host = hostname.split(":")[0].toLowerCase();
  const match = host.match(/^([a-z0-9-]+)\.sites\.cronosstart\.com\.br$/);
  if (match) return match[1];
  const local = host.match(/^([a-z0-9-]+)\.(?:sites\.)?localhost$/);
  return local?.[1] ?? null;
}

