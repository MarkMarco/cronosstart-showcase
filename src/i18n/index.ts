import esCatalog from "./es.json";

export type Locale = "pt-BR" | "es";

const spanish = esCatalog as Record<string, string>;
const spanishOverrides: Record<string, string> = {
  "Como funciona": "Cómo funciona",
  "CronosStart | Criação de Sites Profissionais": "CronosStart | Diseño y desarrollo de sitios web profesionales",
  "CronosStart — Presença digital para pequenas empresas": "CronosStart — Presencia digital para empresas y emprendimientos",
  "Criação de sites profissionais": "Desarrollo de sitios web profesionales",
  "Desenvolvimento de sites personalizados": "Desarrollo de sitios web personalizados",
  "Painéis administrativos": "Paneles administrativos",
  "Suporte e manutenção": "Soporte y mantenimiento",
  "Falar sobre meu projeto": "Cuéntanos sobre tu proyecto",
  "Solicitar orçamento": "Solicitar cotización",
  "Sites profissionais": "Sitios web profesionales",
  "Sites Profissionais": "Sitios web profesionales",
  "Atendimento em": "Atención en",
  "Como funciona em caso de sinistro?": "¿Cómo funciona en caso de siniestro?",
  "Como funciona o desenvolvimento do painel": "Cómo funciona el desarrollo del panel",
  "Sites profissionais para imobiliárias e corretores": "Sitios web profesionales para inmobiliarias y asesores inmobiliarios",
  "Sites profissionais para pequenas empresas": "Sitios web profesionales para empresas y emprendimientos",
  "Sites profissionais para restaurantes, bares e delivery": "Sitios web profesionales para restaurantes, bares y servicios de entrega",
  "Este site tem caráter institucional e informativo. Ele apresenta o portfólio de modelos de sites desenvolvidos pela CronosStart e explica como funciona o nosso serviço de criação e gestão de presença digital para pequenas empresas.": "Este sitio tiene carácter institucional e informativo. Presenta los modelos demostrativos de CronosStart y explica nuestro servicio de desarrollo y gestión de presencia digital para empresas y emprendimientos.",
  "CronosStart — Criação de sites profissionais em Blumenau": "CronosStart — Desarrollo de sitios web profesionales en Blumenau",
  "Criamos sites profissionais para pequenas empresas, com domínio, hospedagem, WhatsApp, personalização, suporte e estrutura preparada para gerar contatos.": "Creamos sitios web profesionales para empresas y emprendimientos, con dominio, hosting, WhatsApp, personalización, soporte y una estructura preparada para generar oportunidades.",
  "CronosStart — Sites profissionais para pequenas empresas": "CronosStart — Sitios web profesionales para empresas y emprendimientos",
  "Empresa fictícia usada apenas como demonstração.": "Empresa ficticia utilizada únicamente como demostración.",
  "Número de WhatsApp fictício": "Número de WhatsApp ficticio",
  "apenas para demonstração.": "únicamente para demostración.",
  "Todos os direitos reservados.": "Todos los derechos reservados.",
  "uma iniciativa CronosSec": "una iniciativa de CronosSec",
  "Instagram e Facebook ajudam, mas o algoritmo decide quem vê — e o perfil não é um endereço que a empresa controla.": "Instagram y Facebook ayudan, pero el algoritmo decide quién ve el contenido y el perfil no es un espacio controlado por la empresa.",
  "4. Uso permitido do conteúdo": "4. Uso permitido del contenido",
  "6. O formulário de contato não representa contratação": "6. El formulario de contacto no implica una contratación",
  "8. Contrato de prestação de serviços": "8. Contrato de prestación de servicios",
  "conteúdo demonstrativo": "contenido demostrativo",
  "atendimento presencial e online": "atención presencial y en línea",
  "veículos selecionados. Use os filtros abaixo para encontrar o seu.": "vehículos seleccionados. Usa los filtros para encontrar el tuyo.",
  "Aviso fixo exibido junto ao conteúdo público:": "Aviso fijo que se muestra junto al contenido público:",
  "Captura de tela real da demonstração": "Captura real de la demostración",
  "Ver demonstração de": "Ver demostración de",
  "Falar no WhatsApp sobre o plano": "Hablar por WhatsApp sobre el plan",
};

export function getLocale(url: URL | string): Locale {
  const pathname = typeof url === "string" ? url : url.pathname;
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "pt-BR";
}

export function t(locale: Locale, portuguese: string): string {
  if (locale !== "es") return portuguese;
  const normalized = portuguese.replace(/\s+/g, " ").trim();
  const direct = spanishOverrides[portuguese] ?? spanishOverrides[normalized] ?? spanish[portuguese] ?? spanish[normalized];
  if (direct) return direct;

  // Some catalog entries originate from rendered blockquotes and therefore
  // include their decorative quotation marks. Source data does not.
  const quoted = spanish[`"${normalized}"`];
  return quoted?.replace(/^["“”]+|["“”]+$/g, "") ?? portuguese;
}

// Translation is forbidden for values that control rendering, behavior or assets.
// These fields keep exactly the same value in PT and ES; only their textual
// siblings (title, description, label, etc.) are translated.
const structuralKeys = /^(?:slug|href|url|src|srcset|image|images|photo|photos|logo|icon|class|className|style|id|ids|key|type|variant|layout|background|target|rel|method|action|status|state|value|name|companyName|personName|email|phone|whatsappNumber|instagramHandle|accent|primary|surface|surfaceAlt|ink|inkMuted|border|font|fontHeading|fontBody|radius|radiusCard|active|available|order|featured|premium|published|year|date|mileageKm|stockQty|width|height|viewBox|path|component|sections)$/i;
const structuralValue = /^(?:#|\/|https?:|mailto:|tel:|[\w.+-]+@[\w.-]+|\+?\d[\d\s()./-]*$)/;

export function localizeDeep<T>(value: T, locale: Locale, key = ""): T {
  if (locale !== "es" || value == null || structuralKeys.test(key)) return value;
  if (typeof value === "string") {
    if (structuralValue.test(value)) return value;
    return t(locale, value) as T;
  }
  if (Array.isArray(value)) return value.map((item) => localizeDeep(item, locale, key)) as T;
  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([entryKey, entryValue]) => [
        entryKey,
        localizeDeep(entryValue, locale, entryKey),
      ]),
    ) as T;
  }
  return value;
}

export function localizedPath(pathname: string, locale: Locale): string {
  if (!pathname.startsWith("/")) return pathname;
  const clean = pathname.replace(/\/$/, "").replace(/^\/es(?=\/|$)/, "") || "/";
  const namedRoute = clean === "/criar-site" || clean === "/crear-sitio";
  if (namedRoute) return locale === "es" ? "/es/crear-sitio" : "/criar-site";
  return locale === "es" ? `/es${clean === "/" ? "/" : clean}` : clean;
}

export function alternateLocalePath(pathname: string): string {
  const locale = getLocale(pathname);
  return localizedPath(pathname, locale === "es" ? "pt-BR" : "es");
}
