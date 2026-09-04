export type SiteStatus = "draft" | "published" | "suspended";
export type SiteLanguage = "pt-BR" | "es-VE";
export type SitePlan = "free" | "pro" | "custom";
export type SectionType = "hero" | "about" | "services" | "differences" | "gallery" | "testimonials" | "faq" | "contact";
export type LaunchTheme = "modern" | "elegant" | "minimal" | "vibrant";
export type LaunchTypography = "theme" | "sans" | "serif" | "display";
export type LaunchButtonStyle = "pill" | "rounded" | "square";
export type HeroVariant = "centered" | "image-right" | "image-left" | "background";

export interface SiteSection {
  id?: string;
  site_id?: string;
  type: SectionType;
  variant: string;
  position: number;
  visible: boolean;
  content: Record<string, unknown>;
  settings: Record<string, unknown>;
}

export interface LaunchSite {
  id: string;
  owner_id?: string;
  name: string;
  slug: string;
  status: SiteStatus;
  plan: SitePlan;
  language: SiteLanguage;
  template_id: string;
  settings: Record<string, any>;
  published_at?: string | null;
  site_sections?: SiteSection[];
}
