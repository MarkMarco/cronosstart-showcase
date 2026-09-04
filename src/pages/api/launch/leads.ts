import type { APIRoute } from "astro";
import { z } from "zod";
import { supabaseServer } from "../../../lib/launch/supabase";

export const prerender = false;
const schema = z.object({
  site_id: z.string().uuid(),
  name: z.string().trim().min(2).max(100),
  email: z.union([z.string().email().max(160), z.literal("")]),
  phone: z.string().max(30),
  message: z.string().trim().min(5).max(2000),
  company: z.string().max(0),
});

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const referer = request.headers.get("referer");
  let back = "/";
  if (referer) {
    try {
      const url = new URL(referer);
      if (url.origin === new URL(request.url).origin) back = url.pathname;
    } catch { /* fallback seguro */ }
  }
  const result = (status: "sent" | "error") => redirect(`${back}?lead=${status}#contato`, 303);
  const parsed = schema.safeParse(Object.fromEntries(await request.formData()));
  if (!parsed.success) return result("error");
  const db = supabaseServer(cookies);
  const { error } = await db.rpc("submit_site_lead", {
    target_site: parsed.data.site_id,
    lead_name: parsed.data.name,
    lead_email: parsed.data.email,
    lead_phone: parsed.data.phone,
    lead_message: parsed.data.message,
  });
  return result(error ? "error" : "sent");
};
