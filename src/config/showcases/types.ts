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
  | "layers"
  | "car"
  | "home"
  | "heart"
  | "plane"
  | "tool"
  | "compare"
  | "refresh"
  | "bed"
  | "maximize"
  | "search"
  | "flame"
  | "leaf"
  | "wine"
  | "camera"
  | "gauge"
  | "fuel"
  | "calendar"
  | "key"
  | "settings"
  | "sliders"
  | "tooth"
  | "sparkle"
  | "sofa"
  | "lamp"
  | "ruler"
  | "tag"
  | "grid"
  | "palette"
  | "cart"
  | "minus"
  | "plus"
  | "share";

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

export interface HeroChip {
  label: string;
  icon: IconName;
}

export interface HeroContent {
  variant: "split" | "centered";
  eyebrow?: string;
  headline: string;
  highlight?: string;
  subheadline: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel?: string;
  /** Tags rápidas e apenas demonstrativas (ex.: categorias em destaque) */
  chips?: HeroChip[];
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
  rating?: number;
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
  /** Imagem editorial opcional (ex.: detalhe de material) — não altera modelos que não a definem. */
  image?: string;
  imageAlt?: string;
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

export interface ProtectionOption {
  label: string;
  icon: IconName;
}

export interface ProtectionPickerContent {
  eyebrow?: string;
  title: string;
  description?: string;
  options: ProtectionOption[];
  responseText: string;
}

export interface HumanSupportContent {
  eyebrow?: string;
  title: string;
  description: string;
  points: string[];
}

export interface QuoteFormContent {
  insuranceTypes: string[];
}

export interface PropertyItem {
  title: string;
  location: string;
  price: string;
  operation: "Venda" | "Aluguel";
  image: string;
  imageAlt: string;
  bedrooms?: number;
  area?: string;
  parking?: number;
  note?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
  avatarAlt?: string;
  credential?: string;
  bio?: string;
}

export interface ExploreContent {
  eyebrow?: string;
  title: string;
  description?: string;
  types: string[];
  regions: string[];
}

export interface PropertySearchContent {
  operationOptions: string[];
  regions: string[];
  propertyTypes: string[];
}

export interface PropertyLeadFormContent {
  operationOptions: string[];
  propertyTypes: string[];
  regions: string[];
}

export interface DishItem {
  name: string;
  description: string;
  price: string;
  image: string;
  imageAlt: string;
  tag?: string;
}

export interface MenuCategory {
  name: string;
  items: { name: string; description?: string; price: string }[];
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface LocationContent {
  addressLine: string;
  mapNote?: string;
  hoursLines: { day: string; hours: string }[];
}

/**
 * Tipos genéricos de catálogo — pensados para qualquer modelo demonstrativo
 * baseado em produtos/preços/ofertas (móveis, eletrônicos, ótica, pet shop,
 * supermercado etc.), não apenas o primeiro a usá-los. Evitar acoplar nomes
 * a um segmento específico aqui.
 */
export interface CatalogCategory {
  slug: string;
  name: string;
  description?: string;
  icon: IconName;
  order: number;
  active: boolean;
}

/** Posição percentual (0-100) de um hotspot de produto sobre a foto de um ambiente. */
export interface CatalogHotspot {
  productSlug: string;
  x: number;
  y: number;
}

export interface CatalogCollection {
  slug: string;
  name: string;
  description: string;
  tone: CatalogTone;
  order: number;
  active: boolean;
  featured?: boolean;
  /** Foto real representativa da coleção. */
  image?: string;
}

export interface CatalogAmbiente {
  slug: string;
  name: string;
  description: string;
  tone: CatalogTone;
  order: number;
  active: boolean;
  /** Habilita a experiência "Compre o ambiente" para este ambiente. */
  shoppable?: boolean;
  /** Foto real do ambiente montado. */
  image?: string;
  /** Posições dos hotspots de produto sobre `image`, usadas em "Compre o ambiente". */
  hotspots?: CatalogHotspot[];
}

/** Paleta fixa usada pelo componente de visual placeholder (sem fotos reais). */
export type CatalogTone = "sand" | "linen" | "walnut" | "graphite" | "stone" | "clay" | "sage";

export interface CatalogProduct {
  id: string;
  slug: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  collection?: string;
  ambiente?: string;
  price: number;
  previousPrice?: number;
  offerActive?: boolean;
  offerEndsAt?: string;
  materials: string[];
  dimensions: string;
  colors: string[];
  tone: CatalogTone;
  icon: IconName;
  available: boolean;
  featured: boolean;
  isNew?: boolean;
  badge?: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  /** Foto real principal do produto. */
  image?: string;
  /** Segunda foto real, usada na troca ao passar o mouse e na galeria do produto. */
  secondaryImage?: string;
}

export interface AmbianceContent {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
}

export interface VehicleSpec {
  year: number;
  mileageKm: number;
  transmission: string;
  fuel: string;
}

export interface VehicleItem {
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  spec: VehicleSpec;
  image: string;
  imageAlt: string;
  gallery?: GalleryImage[];
  tag?: string;
  featured?: boolean;
  description?: string;
  highlights?: string[];
}

export interface DealerHighlight {
  title: string;
  description: string;
  icon: IconName;
}

export interface TradeInContent {
  eyebrow?: string;
  title: string;
  description: string;
  steps: string[];
  ctaLabel: string;
}

export interface FinancingPlan {
  label: string;
  description: string;
}

export interface FinancingContent {
  eyebrow?: string;
  title: string;
  description: string;
  bullets: string[];
  plans?: FinancingPlan[];
  ctaLabel: string;
}

export interface VehicleSearchContent {
  categories: string[];
  priceRanges: string[];
  brands: string[];
}

export interface SpecialtyItem {
  title: string;
  description: string;
  icon: IconName;
}

export interface BeforeAfterItem {
  label: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
}

export interface ScheduleFormContent {
  specialties: string[];
  periods: string[];
}

export interface SectionsEnabled {
  about?: boolean;
  process?: boolean;
  testimonials?: boolean;
  faq?: boolean;
  highlightBand?: boolean;
  protectionPicker?: boolean;
  humanSupport?: boolean;
  partners?: boolean;
  team?: boolean;
  explore?: boolean;
  dishes?: boolean;
  menu?: boolean;
  ambiance?: boolean;
  gallery?: boolean;
  reviews?: boolean;
  instagram?: boolean;
  location?: boolean;
  vehicleSearch?: boolean;
  featuredVehicles?: boolean;
  dealerHighlights?: boolean;
  tradeIn?: boolean;
  financing?: boolean;
  specialties?: boolean;
  beforeAfter?: boolean;
  scheduleForm?: boolean;
}

export interface ShowcaseConfig {
  slug: string;
  /** Âncora para onde o CTA do cabeçalho aponta (padrão: "#contato") */
  primaryCtaHref?: string;
  company: ShowcaseCompany;
  theme: ShowcaseTheme;
  nav: NavItem[];
  seo: { title: string; description: string; ogImage?: string; ogImageAlt?: string };
  hero: HeroContent;
  services?: ServiceItem[];
  benefits?: BenefitItem[];
  highlightBand?: HighlightBandContent;
  about?: AboutContent;
  process?: ProcessStep[];
  testimonials?: Testimonial[];
  faq?: FaqItem[];
  contactCta: CtaBand;
  contact: ShowcaseContact;
  sections: SectionsEnabled;
  protectionPicker?: ProtectionPickerContent;
  humanSupport?: HumanSupportContent;
  partners?: string[];
  quoteForm?: QuoteFormContent;
  properties?: PropertyItem[];
  team?: TeamMember[];
  explore?: ExploreContent;
  propertySearch?: PropertySearchContent;
  propertyLeadForm?: PropertyLeadFormContent;
  dishes?: DishItem[];
  menu?: MenuCategory[];
  ambianceContent?: AmbianceContent;
  ambianceImages?: GalleryImage[];
  gallery?: GalleryImage[];
  instagramHandle?: string;
  location?: LocationContent;
  /** Coluna extra opcional no rodapé (ex.: categorias de catálogo + link para solicitar projeto semelhante). */
  footerExtra?: { title: string; links: { label: string; href: string }[] };
  /** Exibe contact.hours no rodapé. Opcional — não altera modelos existentes. */
  footerShowHours?: boolean;
  /** Variante do botão flutuante de WhatsApp. Padrão "green" (comportamento atual de todos os modelos). */
  whatsappButtonVariant?: "green" | "neutral";
  vehicles?: VehicleItem[];
  vehicleSearch?: VehicleSearchContent;
  dealerHighlights?: DealerHighlight[];
  tradeIn?: TradeInContent;
  financing?: FinancingContent;
  specialties?: SpecialtyItem[];
  beforeAfter?: BeforeAfterItem[];
  scheduleForm?: ScheduleFormContent;
}
