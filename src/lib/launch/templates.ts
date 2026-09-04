import type { SectionType, SiteLanguage, SiteSection } from "./types";

export const launchTemplates = [
  { id: "services", name: "Empresa & Serviços", segment: "Serviços", image: "/images/showcases/contabilidade/screenshot.webp" },
  { id: "legal", name: "Advocacia", segment: "Jurídico", image: "/images/showcases/advocacia/screenshot.webp" },
  { id: "beauty", name: "Beleza & Barbearia", segment: "Beleza", image: "/images/showcases/orion-odontologia/screenshot.webp" },
] as const;

export type LaunchTemplateId = typeof launchTemplates[number]["id"];

export const isLaunchTemplate = (value: unknown): value is LaunchTemplateId =>
  launchTemplates.some((template) => template.id === value);

const copy = (language: SiteLanguage) => language === "es-VE" ? {
  welcome: "Bienvenido",
  contact: "Hablemos",
  about: "Acerca de",
  aboutText: "Cuenta aquí la historia de tu empresa.",
  services: "Nuestros servicios",
  quality: "Calidad, claridad y atención en cada detalle.",
  legalServices: ["Asesoría jurídica", "Derecho empresarial", "Atención preventiva"],
  beautyServices: ["Corte y estilo", "Barba", "Tratamientos"],
  generalServices: ["Soluciones a medida", "Atención cercana", "Soporte continuo"],
  contactTitle: "¿Conversamos?",
  contactText: "Envía tu mensaje y te responderemos pronto.",
} : {
  welcome: "Bem-vindo",
  contact: "Fale conosco",
  about: "Sobre",
  aboutText: "Conte aqui a história da sua empresa.",
  services: "Nossos serviços",
  quality: "Qualidade, clareza e atenção em cada detalhe.",
  legalServices: ["Consultoria jurídica", "Direito empresarial", "Atendimento preventivo"],
  beautyServices: ["Corte & estilo", "Barba", "Tratamentos"],
  generalServices: ["Soluções sob medida", "Atendimento próximo", "Suporte contínuo"],
  contactTitle: "Vamos conversar?",
  contactText: "Envie sua mensagem e retornaremos em breve.",
};

export function sectionsForTemplate(
  templateId: LaunchTemplateId,
  business: string,
  description: string,
  language: SiteLanguage = "pt-BR",
): SiteSection[] {
  const text = copy(language);
  const services = templateId === "legal"
    ? text.legalServices
    : templateId === "beauty"
      ? text.beautyServices
      : text.generalServices;
  const heroVariant = templateId === "legal"
    ? "image-right"
    : templateId === "beauty"
      ? "background"
      : "centered";

  return [
    {
      type: "hero",
      variant: heroVariant,
      position: 1,
      visible: true,
      content: {
        eyebrow: text.welcome,
        title: business,
        description,
        buttonLabel: text.contact,
      },
      settings: {},
    },
    {
      type: "about",
      variant: `${templateId}-about`,
      position: 2,
      visible: true,
      content: { title: `${text.about} ${business}`, text: description || text.aboutText },
      settings: {},
    },
    {
      type: "services",
      variant: `${templateId}-services`,
      position: 3,
      visible: true,
      content: {
        title: text.services,
        items: services.map((title) => ({ title, description: text.quality })),
      },
      settings: {},
    },
    {
      type: "contact",
      variant: `${templateId}-contact`,
      position: 4,
      visible: true,
      content: { title: text.contactTitle, description: text.contactText },
      settings: {},
    },
  ];
}

export function applyTemplateToSections(
  current: SiteSection[],
  templateId: LaunchTemplateId,
  business: string,
  description: string,
  language: SiteLanguage,
) {
  const defaults = sectionsForTemplate(templateId, business, description, language);
  const defaultByType = new Map(defaults.map((section) => [section.type, section]));
  const existingTypes = new Set(current.map((section) => section.type));
  const updated = current.map((section) => {
    const preset = defaultByType.get(section.type);
    return preset
      ? { ...section, variant: preset.variant, content: { ...section.content }, settings: { ...section.settings } }
      : { ...section, content: { ...section.content }, settings: { ...section.settings } };
  });
  let position = Math.max(0, ...updated.map((section) => section.position));
  for (const section of defaults) {
    if (!existingTypes.has(section.type)) updated.push({ ...section, position: ++position });
  }
  return updated.sort((a, b) => a.position - b.position);
}

export function contentForNewSection(type: SectionType, language: SiteLanguage): Record<string, unknown> {
  const spanish = language === "es-VE";
  const defaults: Record<SectionType, Record<string, unknown>> = {
    hero: {
      eyebrow: spanish ? "Bienvenido" : "Bem-vindo",
      title: spanish ? "Tu negocio" : "Seu negócio",
      description: spanish ? "Una presentación clara de tu negocio." : "Uma apresentação clara do seu negócio.",
      buttonLabel: spanish ? "Hablemos" : "Fale conosco",
    },
    about: { title: spanish ? "Acerca de nosotros" : "Sobre nós", text: spanish ? "Cuenta aquí la historia de tu empresa." : "Conte aqui a história da sua empresa." },
    services: { title: spanish ? "Nuestros servicios" : "Nossos serviços", items: [] },
    differences: { title: spanish ? "Por qué elegirnos" : "Por que escolher a gente", items: [] },
    gallery: { title: spanish ? "Galería" : "Galeria", items: [] },
    testimonials: { title: spanish ? "Lo que dicen nuestros clientes" : "O que dizem nossos clientes", items: [] },
    faq: { title: spanish ? "Preguntas frecuentes" : "Perguntas frequentes", items: [] },
    contact: { title: spanish ? "¿Conversamos?" : "Vamos conversar?", description: spanish ? "Envíanos tu mensaje." : "Envie sua mensagem." },
  };
  return defaults[type];
}
