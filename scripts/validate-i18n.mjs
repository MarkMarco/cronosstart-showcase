import { promises as fs } from "node:fs";
import path from "node:path";

const esRoot = path.resolve("dist/es");
async function list(dir) {
  const result = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await list(full));
    else if (entry.name.endsWith(".html")) result.push(full);
  }
  return result;
}

const failures = [];
for (const file of await list(esRoot)) {
  const html = await fs.readFile(file, "utf8");
  const visibleText = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[^;]+;/g, " ")
    .replace(/\s+/g, " ");
  const checks = [
    [/CRONOS_I18N_|_I18N_/i, "token interno"],
    [/<html[^>]+lang="pt-BR"/i, "lang PT"],
    [/(?:src|href)="\/es\/_astro\//i, "asset /es/_astro"],
    [/rel="canonical" href="https:\/\/cronosstart\.com\.br\/(?!es(?:\/|"))/i, "canonical PT"],
    [/\b(?:Solicitar orçamento|Como funciona|Falar sobre meu projeto|Sites profissionais|Atendimento em)\b/i, "texto PT conhecido"],
  ];
  for (const [pattern, label] of checks) if (pattern.test(html)) failures.push(`${path.relative(esRoot, file)}: ${label}`);
  if (/\b(?:não|você|vocês|orçamento|criação|conteúdo|demonstração|direitos reservados|imóveis disponíveis|atendimento presencial e online)\b/i.test(visibleText)) {
    failures.push(`${path.relative(esRoot, file)}: possível texto visível em PT`);
  }
  if (!/hreflang="pt-BR"/i.test(html) || !/hreflang="es"/i.test(html) || !/hreflang="x-default"/i.test(html)) {
    failures.push(`${path.relative(esRoot, file)}: hreflang incompleto`);
  }
}
if (failures.length) throw new Error(`Validação i18n reprovada:\n${failures.join("\n")}`);
console.log(`i18n validado: ${(await list(esRoot)).length} páginas ES sem tokens ou corrupção conhecida.`);
