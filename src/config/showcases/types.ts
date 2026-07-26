export type IconName =
  | "menu"
  | "close"
  | "chevron-down"
  | "arrow-right"
  | "check"
  | "whatsapp"
  | "phone"
  | "mail"
  | "map-pin"
  | "instagram"
  | "facebook"
  | "linkedin"
  | "clock"
  | "star"
  | "quote"
  | "briefcase"
  | "file-check"
  | "trending-up"
  | "users"
  | "message-circle"
  | "shield-check"
  | "layers";

export interface ShowcaseTheme {
  /** Cor de fundo principal (claro ou escuro, depende do segmento) */
  surface: string;
  /** Fundo alternativo, para seções em zebra sutil */
  surfaceAlt: string;
  /** Cor de texto principal */
  ink: string;
  /** Cor de texto secundário/legendas */
  inkMuted: string;
  /** Cor de marca principal (botões primários, links ativos) */
  primary: string;
  /** Cor de texto sobre `primary` */
  primaryInk: string;
  /** Cor de destaque secundária (badges, ícones, detalhes) */
  accent: string;
  /** Cor de bordas/divisores */
  border: string;
  /** Fonte de títulos (deve ser importada pela página do segmento) */
  fontHeading: string;
  /** Fonte de texto corrido */
  fontBody: string;
  /** Raio de borda dos cards, em rem (ex.: "1rem") */
  radiusCard: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ShowcaseCompany {
  name: string;
  shortName: string;
  segment: string;
  slogan: string;
  description: string;
}

export interface ShowcaseContact {
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  hours?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}

export interface HeroContent {
  variant: "split" | "centered";
  eyebrow?: string;
  headline: string;
  highlight?: string;
  subheadline: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: IconName;
}

export interface BenefitItem {
  title: string;
  description: string;
  icon: IconName;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  segment: string;
  result: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AboutContent {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  stats: { label: string; value: string }[];
  statsNote?: string;
}

export interface HighlightBandContent {
  eyebrow?: string;
  title: string;
  description: string;
  badgeLabel: string;
  badgeText: string;
}

export interface CtaBand {
  title: string;
  description: string;
  buttonLabel: string;
}

export interface SectionsEnabled {
  about: boolean;
  process: boolean;
  testimonials: boolean;
  faq: boolean;
  highlightBand: boolean;
}

export interface ShowcaseConfig {
  slug: string;
  company: ShowcaseCompany;
  theme: ShowcaseTheme;
  nav: NavItem[];
  seo: { title: string; description: string };
  hero: HeroContent;
  services: ServiceItem[];
  benefits: BenefitItem[];
  highlightBand: HighlightBandContent;
  about: AboutContent;
  process: ProcessStep[];
  testimonials: Testimonial[];
  faq: FaqItem[];
  contactCta: CtaBand;
  contact: ShowcaseContact;
  sections: SectionsEnabled;
}
