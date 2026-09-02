import { promises as fs } from "node:fs";
import path from "node:path";

const root = path.resolve("dist");
async function listHtml(dir) {
  const files = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await listHtml(full));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

const missing = new Set();
for (const file of await listHtml(root)) {
  const html = await fs.readFile(file, "utf8");
  for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]+\.(?:css|js|png|jpe?g|webp|svg|ico|woff2?))[^\"]*"/gi)) {
    const asset = decodeURIComponent(match[1]);
    try {
      await fs.access(path.join(root, asset.replace(/^\//, "")));
    } catch {
      missing.add(asset);
    }
  }
}

if (missing.size) throw new Error(`Assets locais ausentes:\n${[...missing].join("\n")}`);
console.log("Assets locais referenciados: todos presentes.");
