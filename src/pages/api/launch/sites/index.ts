import type { APIRoute } from "astro";
import { z } from "zod";
import { validTheme } from "../../../../lib/launch/design";
import { studioPath } from "../../../../lib/launch/i18n";
import { validateSlug } from "../../../../lib/launch/slug";
import { supabaseServer } from "../../../../lib/launch/supabase";
import { isLaunchTemplate, sectionsForTemplate } from "../../../../lib/launch/templates";

export const prerender = false;

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  slug: z.string().min(3).max(80),
  segment: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(500),
  template_id: z.string(),
  theme: z.string(),
  phone: z.string().max(30),
});

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const db = supabaseServer(cookies);
  const { data: { user } } = await db.auth.getUser();
  if (!user) return new Response("Não autorizado", { status: 401 });

  const raw = Object.fromEntries(await request.formData());
  const locale = raw.locale === "es" ? "es-VE" : "pt-BR";
  const base = studioPath(locale, "/studio");
  const parsed = schema.safeParse(raw);
  if (!parsed.success || !isLaunchTemplate(parsed.data?.template_id))
    return redirect(`${base}/novo?error=invalid_data`, 303);

  let slug: string;
  try {
    slug = validateSlug(parsed.data.slug);
  } catch {
    return redirect(`${base}/novo?error=invalid_slug`, 303);
  }

  const { count } = await db.from("sites").select("id", { count: "exact", head: true }).eq("plan", "free");
  if ((count ?? 0) >= 3) return redirect(`${base}?error=site_limit`, 303);

  const templateId = parsed.data.template_id;
  const countryCode = locale === "es-VE" ? "58" : "55";
  const phoneDigits = parsed.data.phone.replace(/\D/g, "");
  const localPhone = phoneDigits.startsWith(countryCode)
    ? phoneDigits.slice(countryCode.length)
    : phoneDigits;
  const { data: site, error } = await db.from("sites").insert({
    owner_id: user.id,
    name: parsed.data.name,
    slug,
    status: "draft",
    plan: "free",
    language: locale,
    template_id: templateId,
    settings: {
      style: validTheme(parsed.data.theme),
      brandColor: "#315BE8",
      typography: "theme",
      buttonStyle: "pill",
      segment: parsed.data.segment,
      whatsapp: {
        enabled: Boolean(parsed.data.phone),
        countryCode,
        phone: localPhone,
        defaultMessage: locale === "es-VE"
          ? `¡Hola! Vi el sitio de ${parsed.data.name}.`
          : `Olá! Vi o site de ${parsed.data.name}.`,
      },
      seo: { title: parsed.data.name, description: parsed.data.description },
    },
  }).select("id").single();

  if (error || !site) {
    const code = error?.message.includes("free_site_limit_reached") ? "site_limit" : "create_failed";
    return redirect(`${base}?error=${code}`, 303);
  }

  const sections = sectionsForTemplate(templateId, parsed.data.name, parsed.data.description, locale)
    .map((section) => ({ ...section, site_id: site.id }));
  const { error: sectionError } = await db.from("site_sections").insert(sections);
  if (sectionError) {
    await db.from("sites").delete().eq("id", site.id);
    return redirect(`${base}?error=create_failed`, 303);
  }

  return redirect(`${base}/sites/${site.id}/editar`, 303);
};
