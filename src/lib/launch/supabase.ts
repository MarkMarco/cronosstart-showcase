import { createServerClient } from "@supabase/ssr";
import type { AstroCookies } from "astro";

export function isSupabaseConfigured() {
  return Boolean(
    import.meta.env.PUBLIC_SUPABASE_URL &&
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function supabaseServer(cookies: AstroCookies) {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase ainda não configurado.");
  return createServerClient(url, key, {
    cookies: {
      get: (name: string) => cookies.get(name)?.value,
      set: (name: string, value: string, options: Record<string, any>) =>
        cookies.set(name, value, { ...options, path: options?.path ?? "/" }),
      remove: (name: string, options: Record<string, any>) =>
        cookies.delete(name, { ...options, path: options?.path ?? "/" }),
    },
  });
}
