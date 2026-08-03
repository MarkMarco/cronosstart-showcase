/**
 * Wrapper único para eventos do Google Analytics 4. Usado por todos os componentes
 * que precisam registrar uma conversão — nunca chamar window.gtag diretamente.
 *
 * Funciona como no-op silencioso quando PUBLIC_GA_MEASUREMENT_ID não está configurado
 * (window.gtag não existe) ou quando o script é bloqueado por um bloqueador de anúncios —
 * nunca lança erro nem bloqueia a navegação.
 *
 * Nunca passar dados pessoais (nome, telefone, e-mail, mensagem) em `params`.
 */
export type AnalyticsEventName =
  | "whatsapp_click"
  | "contact_form_open"
  | "contact_form_submit"
  | "proposal_click"
  | "demo_view"
  | "model_interest_click";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: AnalyticsEventName, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const cleanParams: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") cleanParams[key] = value;
  }

  try {
    window.gtag("event", eventName, cleanParams);
  } catch {
    // Nunca deixar uma falha de analytics interromper a navegação do usuário.
  }
}
