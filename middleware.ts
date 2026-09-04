import { next, rewrite } from "@vercel/functions";
import { tenantFromHostname } from "./src/lib/launch/slug.js";

export default function tenantRouting(request: Request) {
  const url = new URL(request.url);
  const slug = tenantFromHostname(url.hostname);
  if (!slug) return next();

  const target = new URL(request.url);
  target.pathname = `/tenant-site/${slug}`;
  return rewrite(target);
}

export const config = { matcher: "/", runtime: "nodejs" };
