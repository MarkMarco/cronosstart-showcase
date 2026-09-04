import type { APIRoute } from "astro";
import {
  isSupabaseConfigured,
  supabaseServer,
} from "../../../lib/launch/supabase";
import { authLocale, safeStudioReturnTo, withQuery } from "../../../lib/launch/auth";
import { studioPath } from "../../../lib/launch/i18n";
export const prerender = false;
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  if (!isSupabaseConfigured())
    return new Response("Configure o Supabase para continuar.", {
      status: 503,
    });
  const form = await request.formData();
  const intent = String(form.get("intent") ?? "");
  const requestedReturn = String(form.get("return_to") ?? "");
  const locale = authLocale(requestedReturn.startsWith("/es/studio") ? requestedReturn : String(form.get("locale") ?? ""));
  const returnTo = safeStudioReturnTo(requestedReturn, locale);
  const loginPage = studioPath(locale, "/studio/login");
  const recoveryPage = studioPath(locale, "/studio/recuperar-senha");
  const db = supabaseServer(cookies);
  if (intent === "logout") {
    await db.auth.signOut();
    return redirect(returnTo, 303);
  }
  const email = String(form.get("email") ?? "").trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (intent === "request_recovery") {
    if (!validEmail)
      return redirect(withQuery(recoveryPage, { error: "invalid_email", return_to: returnTo }), 303);
    const callback = new URL(studioPath(locale, "/studio/auth/callback"), request.url);
    callback.searchParams.set("flow", "recovery");
    callback.searchParams.set("return_to", returnTo);
    const { error } = await db.auth.resetPasswordForEmail(email, { redirectTo: callback.toString() });
    if (error) console.error("Supabase password recovery request failed:", error.code ?? error.message);
    return redirect(withQuery(recoveryPage, { sent: "1", return_to: returnTo }), 303);
  }

  if (intent === "update_password") {
    const password = String(form.get("password") ?? "");
    const confirmation = String(form.get("password_confirmation") ?? "");
    if (password.length < 8 || password !== confirmation)
      return redirect(withQuery(studioPath(locale, "/studio/nova-senha"), {
        error: password !== confirmation ? "password_mismatch" : "invalid_password",
        return_to: returnTo,
      }), 303);
    const { data: { user } } = await db.auth.getUser();
    if (!user)
      return redirect(withQuery(studioPath(locale, "/studio/nova-senha"), { error: "invalid_token", return_to: returnTo }), 303);
    const { error } = await db.auth.updateUser({ password });
    if (error)
      return redirect(withQuery(studioPath(locale, "/studio/nova-senha"), { error: "update_failed", return_to: returnTo }), 303);
    await db.auth.signOut();
    return redirect(withQuery(loginPage, { notice: "password_updated", return_to: returnTo }), 303);
  }

  const password = String(form.get("password") ?? "");
  if (!validEmail || password.length < 8)
    return redirect(withQuery(loginPage, { error: "invalid_credentials", return_to: returnTo }), 303);

  if (intent === "signup") {
    const callback = new URL(studioPath(locale, "/studio/auth/callback"), request.url);
    callback.searchParams.set("flow", "signup");
    callback.searchParams.set("return_to", returnTo);
    const result = await db.auth.signUp({ email, password, options: { emailRedirectTo: callback.toString() } });
    if (result.error)
      return redirect(withQuery(loginPage, { error: "auth_failed", return_to: returnTo }), 303);
    if (!result.data.session)
      return redirect(withQuery(loginPage, { notice: "check_email", return_to: returnTo }), 303);
    return redirect(returnTo, 303);
  }

  if (intent !== "login")
    return redirect(withQuery(loginPage, { error: "auth_failed", return_to: returnTo }), 303);
  const result = await db.auth.signInWithPassword({ email, password });
  if (result.error)
    return redirect(withQuery(loginPage, { error: "auth_failed", return_to: returnTo }), 303);
  return redirect(returnTo, 303);
};
