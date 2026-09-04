import type { APIRoute } from "astro";
import { isSupabaseConfigured, supabaseServer } from "../../../lib/launch/supabase";

export const prerender = false;
export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const es = url.searchParams.get("locale") === "es";
  const base = es ? "/es/studio" : "/studio";
  const template = String(url.searchParams.get("template") ?? "");
  const source = String(url.searchParams.get("source") ?? "launch");
  const onboarding = `${base}/novo${template ? `?template=${encodeURIComponent(template)}&source=${encodeURIComponent(source)}` : ""}`;
  if (!isSupabaseConfigured()) return redirect(`${base}/login?return_to=${encodeURIComponent(onboarding)}`);
  const db = supabaseServer(cookies);
  const { data: { user } } = await db.auth.getUser();
  if (!user) return redirect(`${base}/login?return_to=${encodeURIComponent(onboarding)}`);
  const { count } = await db.from("sites").select("id", { count: "exact", head: true });
  return redirect((count ?? 0) > 0 ? base : onboarding);
};
