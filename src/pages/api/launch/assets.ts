import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/launch/supabase";

export const prerender = false;
const allowed = new Map([
  ["image/jpeg", [0xff, 0xd8, 0xff]],
  ["image/png", [0x89, 0x50, 0x4e, 0x47]],
  ["image/webp", [0x52, 0x49, 0x46, 0x46]],
]);
const assetPrefix = "/storage/v1/object/public/site-assets/";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const db = supabaseServer(cookies);
  const { data: { user } } = await db.auth.getUser();
  if (!user) return new Response("Não autorizado", { status: 401 });

  const referer = request.headers.get("referer");
  let back = "/studio";
  if (referer) {
    try {
      const url = new URL(referer);
      if (url.origin === new URL(request.url).origin) back = url.pathname;
    } catch { /* fallback seguro */ }
  }

  const form = await request.formData();
  const siteId = String(form.get("site_id") ?? "");
  const sectionId = String(form.get("section_id") ?? "");
  const itemIndex = Number(form.get("item_index") ?? -1);
  const intent = String(form.get("intent") ?? "upload");
  const fail = (code: string) => redirect(`${back}?error=${encodeURIComponent(code)}`, 303);

  const { data: site } = await db.from("sites").select("id").eq("id", siteId).single();
  if (!site) return fail("site_not_found");
  const { data: section } = await db.from("site_sections").select("id,content").eq("id", sectionId).eq("site_id", site.id).single();
  if (!section) return fail("section_not_found");

  const content = { ...(section.content as Record<string, any>) };
  const currentImage = itemIndex >= 0 && Array.isArray(content.items)
    ? String(content.items[itemIndex]?.image ?? "")
    : String(content.image ?? "");

  const removeOwnedAsset = async (publicUrl: string) => {
    const marker = publicUrl.indexOf(assetPrefix);
    if (marker < 0) return;
    const path = decodeURIComponent(publicUrl.slice(marker + assetPrefix.length));
    const { data: asset } = await db.from("site_assets").select("id,path").eq("site_id", site.id).eq("owner_id", user.id).eq("path", path).maybeSingle();
    if (!asset) return;
    await db.storage.from("site-assets").remove([asset.path]);
    await db.from("site_assets").delete().eq("id", asset.id);
  };

  const setImage = (image: string) => {
    if (itemIndex >= 0 && Array.isArray(content.items) && content.items[itemIndex]) {
      content.items = content.items.map((item: Record<string, unknown>, index: number) => index === itemIndex ? { ...item, image } : item);
    } else content.image = image;
  };

  if (intent === "remove") {
    setImage("");
    const { error } = await db.from("site_sections").update({ content }).eq("id", section.id);
    if (error) return fail("image_remove_failed");
    await removeOwnedAsset(currentImage);
    await db.rpc("bump_site_draft", { target_site: site.id });
    return redirect(back, 303);
  }

  const file = form.get("image");
  if (!(file instanceof File) || file.size < 1 || file.size > 5 * 1024 * 1024 || !allowed.has(file.type)) return fail("invalid_image");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const signature = allowed.get(file.type)!;
  if (!signature.every((byte, index) => bytes[index] === byte) || (file.type === "image/webp" && String.fromCharCode(...bytes.slice(8, 12)) !== "WEBP")) return fail("invalid_image_content");

  const ext = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
  const path = `${user.id}/${site.id}/${crypto.randomUUID()}.${ext}`;
  const { error: uploadError } = await db.storage.from("site-assets").upload(path, bytes, { contentType: file.type });
  if (uploadError) return fail("image_upload_failed");
  const { error: metadataError } = await db.from("site_assets").insert({ site_id: site.id, owner_id: user.id, path, mime_type: file.type, size: file.size });
  if (metadataError) {
    await db.storage.from("site-assets").remove([path]);
    return fail("image_upload_failed");
  }

  const publicUrl = db.storage.from("site-assets").getPublicUrl(path).data.publicUrl;
  setImage(publicUrl);
  const { error: updateError } = await db.from("site_sections").update({ content }).eq("id", section.id);
  if (updateError) {
    await db.storage.from("site-assets").remove([path]);
    await db.from("site_assets").delete().eq("path", path);
    return fail("image_attach_failed");
  }
  await removeOwnedAsset(currentImage);
  await db.rpc("bump_site_draft", { target_site: site.id });
  return redirect(back, 303);
};
