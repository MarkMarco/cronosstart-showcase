import { studioPath, type StudioLocale } from "./i18n";

export function authLocale(value: string): StudioLocale {
  return value.startsWith("/es/studio") || value === "es" ? "es-VE" : "pt-BR";
}

export function safeStudioReturnTo(
  value: string | null | undefined,
  locale: StudioLocale,
  fallback = studioPath(locale, "/studio"),
) {
  if (!value?.startsWith("/") || value.startsWith("//")) return fallback;
  try {
    const parsed = new URL(value, "https://local.cronosstart.invalid");
    const validPath =
      parsed.pathname === "/studio" ||
      parsed.pathname.startsWith("/studio/") ||
      parsed.pathname === "/es/studio" ||
      parsed.pathname.startsWith("/es/studio/");
    if (!validPath || parsed.origin !== "https://local.cronosstart.invalid") return fallback;
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}

export function withQuery(pathname: string, values: Record<string, string>) {
  const parsed = new URL(pathname, "https://local.cronosstart.invalid");
  for (const [key, value] of Object.entries(values)) parsed.searchParams.set(key, value);
  return `${parsed.pathname}${parsed.search}${parsed.hash}`;
}
