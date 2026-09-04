import type { APIRoute } from "astro";
import { authLocale, safeStudioReturnTo, withQuery } from "../../../../lib/launch/auth";
import { normalizeBrandColor, validButtonStyle, validHeroFocalPoint, validHeroVariant, validTheme, validTypography } from "../../../../lib/launch/design";
import { studioPath } from "../../../../lib/launch/i18n";
import { validateSlug } from "../../../../lib/launch/slug";
import { supabaseServer } from "../../../../lib/launch/supabase";
import { applyTemplateToSections, contentForNewSection, isLaunchTemplate } from "../../../../lib/launch/templates";
import type { SectionType, SiteLanguage } from "../../../../lib/launch/types";

export const prerender = false;

const allowedTypes = new Set<SectionType>(["hero", "about", "services", "differences", "gallery", "testimonials", "faq", "contact"]);
const itemTypes = new Set<SectionType>(["services", "differences", "gallery", "testimonials", "faq"]);

const replaceDeep = (value: unknown, replacements: Map<string, string>): unknown => {
  if (typeof value === "string") return replacements.get(value) ?? value;
  if (Array.isArray(value)) return value.map((item) => replaceDeep(item, replacements));
  if (value && typeof value === "object")
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, replaceDeep(item, replacements)]));
  return value;
};

export const POST: APIRoute = async ({ request, cookies, params, redirect }) => {
  const db = supabaseServer(cookies);
  const { data: { user } } = await db.auth.getUser();
  if (!user) return new Response("Não autorizado", { status: 401 });

  const form = await request.formData();
  const locale = authLocale(String(form.get("locale") ?? ""));
  const fallback = `${studioPath(locale, "/studio")}/sites/${params.id}/editar`;
  const back = safeStudioReturnTo(String(form.get("return_to") ?? ""), locale, fallback);
  const fail = (code: string) => redirect(withQuery(back, { error: code }), 303);
  const done = (code?: string) => redirect(code ? withQuery(back, { notice: code }) : back, 303);
  const intent = String(form.getAll("intent").at(-1) ?? "update");

  const { data: site } = await db.from("sites").select("*,site_sections(*)").eq("id", params.id).single();
  if (!site) return fail("site_not_found");
  const sections = [...(site.site_sections ?? [])].sort((first, second) => first.position - second.position);
  const language = site.language as SiteLanguage;

  if (intent === "publish") {
    const { error } = await db.rpc("publish_site", { target_site: site.id });
    if (error) return fail(error.message.includes("free_published_site_limit") ? "published_limit" : "publish_failed");
    return done("published");
  }

  if (intent === "unpublish") {
    const { error } = await db.from("sites").update({ status: "draft", published_at: null }).eq("id", site.id);
    return error ? fail("unpublish_failed") : done("unpublished");
  }

  if (intent === "rename") {
    const name = String(form.get("site_name") ?? "").trim().slice(0, 100);
    if (name.length < 2) return fail("invalid_name");
    const { error } = await db.from("sites").update({ name, draft_revision: site.draft_revision + 1, updated_at: new Date().toISOString() }).eq("id", site.id);
    return error ? fail("rename_failed") : done("renamed");
  }

  if (intent === "delete") {
    if (String(form.get("confirm_name") ?? "").trim() !== site.name) return fail("delete_confirmation");
    const { data: assets, error: assetReadError } = await db.from("site_assets").select("path").eq("site_id", site.id);
    if (assetReadError) return fail("delete_assets_failed");
    const paths = (assets ?? []).map((asset) => asset.path);
    if (paths.length) {
      const { error: storageError } = await db.storage.from("site-assets").remove(paths);
      if (storageError) return fail("delete_assets_failed");
    }
    const { error } = await db.from("sites").delete().eq("id", site.id);
    if (error) return fail("delete_failed");
    return redirect(withQuery(studioPath(locale, "/studio"), { notice: "deleted" }), 303);
  }

  if (intent === "duplicate") {
    const { count } = await db.from("sites").select("id", { count: "exact", head: true }).eq("plan", "free");
    if ((count ?? 0) >= 3) return fail("site_limit");
    const suffix = crypto.randomUUID().slice(0, 6);
    const duplicateName = `${site.name}${language === "es-VE" ? " — Copia" : " — Cópia"}`.slice(0, 100);
    const duplicateSlug = `${site.slug.slice(0, 34).replace(/-+$/, "")}-copy-${suffix}`;
    const { data: duplicate, error: duplicateError } = await db.from("sites").insert({
      owner_id: user.id,
      name: duplicateName,
      slug: duplicateSlug,
      status: "draft",
      plan: site.plan,
      language: site.language,
      template_id: site.template_id,
      settings: site.settings,
    }).select("id").single();
    if (duplicateError || !duplicate) return fail(duplicateError?.message.includes("free_site_limit_reached") ? "site_limit" : "duplicate_failed");

    const uploadedPaths: string[] = [];
    try {
      const replacements = new Map<string, string>();
      const { data: assets, error: assetsError } = await db.from("site_assets").select("path,mime_type,size").eq("site_id", site.id);
      if (assetsError) throw assetsError;
      for (const asset of assets ?? []) {
        const { data: blob, error: downloadError } = await db.storage.from("site-assets").download(asset.path);
        if (downloadError || !blob) throw downloadError ?? new Error("asset_download_failed");
        const extension = asset.path.split(".").pop() ?? "bin";
        const newPath = `${user.id}/${duplicate.id}/${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await db.storage.from("site-assets").upload(newPath, await blob.arrayBuffer(), { contentType: asset.mime_type });
        if (uploadError) throw uploadError;
        uploadedPaths.push(newPath);
        const { error: metadataError } = await db.from("site_assets").insert({ site_id: duplicate.id, owner_id: user.id, path: newPath, mime_type: asset.mime_type, size: asset.size });
        if (metadataError) throw metadataError;
        const oldUrl = db.storage.from("site-assets").getPublicUrl(asset.path).data.publicUrl;
        const newUrl = db.storage.from("site-assets").getPublicUrl(newPath).data.publicUrl;
        replacements.set(oldUrl, newUrl);
      }
      const duplicatedSections = sections.map((section) => ({
        site_id: duplicate.id,
        type: section.type,
        variant: section.variant,
        position: section.position,
        visible: section.visible,
        content: replaceDeep(section.content, replacements),
        settings: replaceDeep(section.settings, replacements),
      }));
      const { error: sectionsError } = await db.from("site_sections").insert(duplicatedSections);
      if (sectionsError) throw sectionsError;
    } catch {
      if (uploadedPaths.length) await db.storage.from("site-assets").remove(uploadedPaths);
      await db.from("sites").delete().eq("id", duplicate.id);
      return fail("duplicate_failed");
    }
    return redirect(withQuery(studioPath(locale, "/studio"), { notice: "duplicated" }), 303);
  }

  if (intent === "switch_template") {
    const template = String(form.get("template_id") ?? "");
    if (!isLaunchTemplate(template)) return fail("invalid_template");
    const description = String(site.settings?.seo?.description ?? "");
    const nextSections = applyTemplateToSections(sections, template, site.name, description, language);
    const { error } = await db.rpc("switch_site_template", {
      target_site: site.id,
      target_template: template,
      target_sections: nextSections,
    });
    return error ? fail("template_failed") : done("template_changed");
  }

  if (intent === "restore_snapshot") {
    const { error } = await db.rpc("restore_site_snapshot", {
      target_site: site.id,
      target_snapshot: String(form.get("snapshot_id") ?? ""),
    });
    return error ? fail("snapshot_failed") : done("snapshot_restored");
  }

  if (intent === "move") {
    const { error } = await db.rpc("move_site_section", {
      target_site: site.id,
      target_section: String(form.get("section_id")),
      direction: String(form.get("direction")),
    });
    return error ? fail("move_failed") : done();
  }

  if (intent === "add_section") {
    const type = String(form.get("section_type")) as SectionType;
    if (!allowedTypes.has(type) || sections.length >= 12) return fail("section_limit");
    const position = sections.length ? Math.max(...sections.map((section) => section.position)) + 1 : 1;
    const { error } = await db.from("site_sections").insert({
      site_id: site.id,
      type,
      variant: type === "hero" ? "centered" : `${site.template_id}-${type}`,
      position,
      visible: true,
      content: contentForNewSection(type, language),
      settings: {},
    });
    if (error) return fail("section_failed");
    await db.rpc("bump_site_draft", { target_site: site.id });
    return done();
  }

  const sectionId = String(form.get("section_id") ?? "");
  const target = sections.find((section) => section.id === sectionId);
  if (intent === "delete_section" && target) {
    const { error } = await db.from("site_sections").delete().eq("id", target.id);
    if (error) return fail("section_failed");
    await db.rpc("bump_site_draft", { target_site: site.id });
    return done();
  }

  if (["add_item", "delete_item", "move_item"].includes(intent) && target && itemTypes.has(target.type)) {
    const items = Array.isArray(target.content?.items) ? [...target.content.items] : [];
    if (intent === "add_item" && items.length < 12) {
      const spanish = language === "es-VE";
      items.push(target.type === "faq"
        ? { title: spanish ? "Nueva pregunta" : "Nova pergunta", description: spanish ? "Escribe la respuesta." : "Escreva a resposta." }
        : target.type === "testimonials"
          ? { title: spanish ? "Cliente" : "Cliente", description: spanish ? "Testimonio del cliente." : "Depoimento do cliente." }
          : target.type === "gallery"
            ? { title: spanish ? "Nueva imagen" : "Nova imagem", description: "", image: "" }
            : { title: spanish ? "Nuevo elemento" : "Novo item", description: spanish ? "Describe este elemento." : "Descreva este item." });
    }
    if (intent === "delete_item") items.splice(Number(form.get("item_index")), 1);
    if (intent === "move_item") {
      const index = Number(form.get("item_index"));
      const destination = String(form.get("direction")) === "up" ? index - 1 : index + 1;
      if (index >= 0 && index < items.length && destination >= 0 && destination < items.length)
        [items[index], items[destination]] = [items[destination], items[index]];
    }
    const { error } = await db.from("site_sections").update({ content: { ...target.content, items } }).eq("id", target.id);
    if (error) return fail("item_failed");
    await db.rpc("bump_site_draft", { target_site: site.id });
    return done();
  }

  for (const section of sections) {
    const title = String(form.get(`title_${section.id}`) ?? section.content.title ?? "").slice(0, 160);
    const body = String(form.get(`text_${section.id}`) ?? section.content.description ?? section.content.text ?? "").slice(0, 1200);
    const content: Record<string, unknown> = {
      ...section.content,
      title,
      ...(section.type === "about" ? { text: body } : { description: body }),
    };
    let variant = section.variant;
    if (section.type === "hero") {
      content.eyebrow = String(form.get(`eyebrow_${section.id}`) ?? section.content.eyebrow ?? "").slice(0, 80);
      content.buttonLabel = String(form.get(`button_${section.id}`) ?? section.content.buttonLabel ?? "").slice(0, 60);
      content.focalPoint = validHeroFocalPoint(form.get(`focal_${section.id}`));
      variant = validHeroVariant(form.get(`variant_${section.id}`));
    }
    if (itemTypes.has(section.type)) {
      const titles = form.getAll(`item_title_${section.id}`).map(String);
      const descriptions = form.getAll(`item_description_${section.id}`).map(String);
      const images = form.getAll(`item_image_${section.id}`).map(String);
      content.items = titles.slice(0, 12).map((itemTitle, index) => ({
        title: itemTitle.slice(0, 120),
        description: (descriptions[index] ?? "").slice(0, 600),
        image: (images[index] ?? "").slice(0, 500),
      }));
    }
    const { error } = await db.from("site_sections").update({
      visible: form.has(`visible_${section.id}`),
      variant,
      content,
    }).eq("id", section.id);
    if (error) return fail("update_failed");
  }

  const siteName = String(form.get("site_name") ?? site.name).trim().slice(0, 100);
  if (siteName.length < 2) return fail("invalid_name");
  let slug: string;
  try {
    slug = validateSlug(String(form.get("slug") ?? site.slug));
  } catch {
    return fail("invalid_slug");
  }
  const countryCode = String(form.get("country_code") ?? "").replace(/\D/g, "").slice(0, 4);
  const phoneDigits = String(form.get("phone") ?? "").replace(/\D/g, "").slice(0, 20);
  const localPhone = countryCode && phoneDigits.startsWith(countryCode)
    ? phoneDigits.slice(countryCode.length)
    : phoneDigits;
  const settings = {
    ...site.settings,
    style: validTheme(form.get("style")),
    brandColor: normalizeBrandColor(form.get("brand_color")),
    typography: validTypography(form.get("typography")),
    buttonStyle: validButtonStyle(form.get("button_style")),
    whatsapp: {
      ...site.settings?.whatsapp,
      enabled: form.has("whatsapp_enabled"),
      countryCode,
      phone: localPhone,
    },
    seo: {
      ...site.settings?.seo,
      title: String(form.get("seo_title") ?? site.name).slice(0, 160),
      description: String(form.get("seo_description") ?? "").slice(0, 300),
    },
  };
  const { error } = await db.from("sites").update({
    name: siteName,
    slug,
    settings,
    draft_revision: site.draft_revision + 1,
    updated_at: new Date().toISOString(),
  }).eq("id", site.id);
  return error ? fail(error.code === "23505" ? "slug_taken" : "update_failed") : redirect(withQuery(back, { saved: "1" }), 303);
};
