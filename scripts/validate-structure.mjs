import { promises as fs } from "node:fs";
import path from "node:path";

const distRoot = path.resolve("dist");
const esRoot = path.join(distRoot, "es");

async function listHtml(dir) {
  const files = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await listHtml(full));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function bodyStructure(html) {
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  return body
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .match(/<\/?(?:section|header|nav|main|footer|article|aside|form|button|a|img|picture|svg|path|ul|ol|li|div|h[1-6])\b[^>]*>/gi)
    ?.map((tag) => tag.match(/^<\/?([\w-]+)/)?.[0].toLowerCase())
    .join("|") ?? "";
}

const failures = [];
const esFiles = await listHtml(esRoot);
for (const esFile of esFiles) {
  const relative = path.relative(esRoot, esFile);
  const ptFile = path.join(distRoot, relative);
  try {
    const [ptHtml, esHtml] = await Promise.all([
      fs.readFile(ptFile, "utf8"),
      fs.readFile(esFile, "utf8"),
    ]);
    const ptStructure = bodyStructure(ptHtml);
    const esStructure = bodyStructure(esHtml);
    if (ptStructure !== esStructure) {
      const ptTags = ptStructure.split("|");
      const esTags = esStructure.split("|");
      const firstDifference = ptTags.findIndex((tag, index) => tag !== esTags[index]);
      failures.push(`${relative} (PT ${ptTags.length} tags, ES ${esTags.length} tags, primeira diferença ${firstDifference}: ${ptTags[firstDifference]} / ${esTags[firstDifference]})`);
    }
  } catch {
    failures.push(`${relative} (rota PT equivalente ausente)`);
  }
}

if (failures.length) {
  throw new Error(`Paridade estrutural PT/ES reprovada:\n${failures.join("\n")}`);
}

console.log(`Paridade estrutural validada em ${esFiles.length} pares PT/ES.`);
