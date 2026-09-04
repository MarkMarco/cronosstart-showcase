import { defineMiddleware } from "astro:middleware";
import { tenantFromHostname } from "./lib/launch/slug";
import { studioSpanish } from "./lib/launch/i18n";

async function translateStudioResponse(response: Response) {
  const type = response.headers.get("content-type") ?? "";
  if (!type.includes("text/html")) return response;
  let html = await response.text();
  for (const [pt, es] of Object.entries(studioSpanish))
    html = html.replaceAll(`>${pt}<`, `>${es}<`);
  html = html.replaceAll('href="/studio', 'href="/es/studio');
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export const onRequest = defineMiddleware(async (context, next) => {
  const requestedUrl = new URL(context.request.url);
  const pathname = requestedUrl.pathname;
  const spanishVisiblePath =
    pathname === "/es/studio" || pathname.startsWith("/es/studio/");
  const spanishInternalPath =
    (pathname === "/studio" || pathname.startsWith("/studio/")) &&
    requestedUrl.searchParams.get("lang") === "es";
  const onboardingAlias =
    pathname === "/studio/onboarding" || pathname === "/es/studio/onboarding";

  if (spanishVisiblePath) {
    const internalPath = onboardingAlias
      ? "/studio/novo"
      : pathname.replace(/^\/es/, "");
    const target = new URL(internalPath, requestedUrl);
    for (const [key, value] of requestedUrl.searchParams) target.searchParams.append(key, value);
    target.searchParams.set("lang", "es");
    return translateStudioResponse(await context.rewrite(target));
  }
  if (spanishInternalPath) {
    return translateStudioResponse(await next());
  }
  if (onboardingAlias) {
    return context.rewrite("/studio/novo");
  }
  const slug = tenantFromHostname(context.url.hostname);
  if (slug && !context.url.pathname.startsWith("/tenant-site/")) {
    return context.rewrite(`/tenant-site/${slug}${context.url.pathname === "/" ? "" : context.url.pathname}`);
  }
  return next();
});
