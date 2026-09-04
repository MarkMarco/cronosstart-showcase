import type {
  HeroVariant,
  HeroFocalPoint,
  LaunchButtonStyle,
  LaunchTheme,
  LaunchTypography,
} from "./types";

export const launchThemes: LaunchTheme[] = ["modern", "elegant", "minimal", "vibrant"];

export const brandPalettes = [
  { id: "ocean", color: "#315BE8" },
  { id: "forest", color: "#176B52" },
  { id: "wine", color: "#8A2846" },
  { id: "violet", color: "#6D3FD1" },
  { id: "terracotta", color: "#B4492E" },
  { id: "graphite", color: "#273244" },
] as const;

export const heroVariants: HeroVariant[] = ["centered", "image-right", "image-left", "background"];

export const heroFocalPoints: Array<{ id: HeroFocalPoint; position: string }> = [
  { id: "top-left", position: "0% 0%" },
  { id: "top", position: "50% 0%" },
  { id: "top-right", position: "100% 0%" },
  { id: "left", position: "0% 50%" },
  { id: "center", position: "50% 50%" },
  { id: "right", position: "100% 50%" },
  { id: "bottom-left", position: "0% 100%" },
  { id: "bottom", position: "50% 100%" },
  { id: "bottom-right", position: "100% 100%" },
];

export const typographyOptions: LaunchTypography[] = ["theme", "sans", "serif", "display"];

export const buttonOptions: LaunchButtonStyle[] = ["pill", "rounded", "square"];

const HEX = /^#[0-9a-f]{6}$/i;

export function normalizeBrandColor(value: unknown, fallback = "#315BE8") {
  const candidate = String(value ?? "").trim();
  return HEX.test(candidate) ? candidate.toUpperCase() : fallback;
}

function channels(hex: string) {
  return [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
}

function toHex(values: number[]) {
  return `#${values.map((value) => Math.round(value).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

function mix(color: string, target: string, amount: number) {
  const source = channels(color);
  const destination = channels(target);
  return toHex(source.map((value, index) => value + (destination[index] - value) * amount));
}

function relativeLuminance(color: string) {
  const values = channels(color).map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
}

function contrastRatio(first: string, second: string) {
  const high = Math.max(relativeLuminance(first), relativeLuminance(second));
  const low = Math.min(relativeLuminance(first), relativeLuminance(second));
  return (high + 0.05) / (low + 0.05);
}

export function brandTokens(value: unknown) {
  const primary = normalizeBrandColor(value);
  const whiteContrast = contrastRatio(primary, "#FFFFFF");
  const blackContrast = contrastRatio(primary, "#111827");
  const contrast = whiteContrast >= blackContrast ? "#FFFFFF" : "#111827";
  const hover = contrast === "#FFFFFF" ? mix(primary, "#000000", 0.18) : mix(primary, "#FFFFFF", 0.18);
  return {
    primary,
    hover,
    soft: mix(primary, "#FFFFFF", 0.86),
    background: mix(primary, "#FFFFFF", 0.95),
    border: mix(primary, "#FFFFFF", 0.68),
    contrast,
  };
}

export function brandTokenStyle(value: unknown) {
  const tokens = brandTokens(value);
  return [
    `--ls-primary:${tokens.primary}`,
    `--ls-primary-hover:${tokens.hover}`,
    `--ls-primary-soft:${tokens.soft}`,
    `--ls-primary-bg:${tokens.background}`,
    `--ls-primary-border:${tokens.border}`,
    `--ls-primary-contrast:${tokens.contrast}`,
  ].join(";");
}

export function validTheme(value: unknown): LaunchTheme {
  return launchThemes.includes(value as LaunchTheme) ? value as LaunchTheme : "modern";
}

export function validTypography(value: unknown): LaunchTypography {
  return typographyOptions.includes(value as LaunchTypography) ? value as LaunchTypography : "theme";
}

export function validButtonStyle(value: unknown): LaunchButtonStyle {
  return buttonOptions.includes(value as LaunchButtonStyle) ? value as LaunchButtonStyle : "pill";
}

export function validHeroVariant(value: unknown): HeroVariant {
  return heroVariants.includes(value as HeroVariant) ? value as HeroVariant : "centered";
}

export function validHeroFocalPoint(value: unknown): HeroFocalPoint {
  return heroFocalPoints.some((point) => point.id === value) ? value as HeroFocalPoint : "center";
}

export function heroObjectPosition(value: unknown) {
  const focalPoint = validHeroFocalPoint(value);
  return heroFocalPoints.find((point) => point.id === focalPoint)?.position ?? "50% 50%";
}
