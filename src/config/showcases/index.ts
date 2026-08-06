import type { IconName } from "./types";

export interface ShowcaseSummary {
  slug: string;
  segment: string;
  companyName: string;
  shortDescription: string;
  available: boolean;
  /** Cor primária real do tema do modelo (usada para escopar o logo real do card) */
  primary: string;
  /** Cor de destaque real do tema do modelo (usada para escopar o logo real do card) */
  accent: string;
  icon: IconName;
  premium?: boolean;
}

export const showcaseRegistry: ShowcaseSummary[] = [
  {
    slug: "contabilidade",
    segment: "Contabilidade",
    companyName: "Atlas Contabilidade",
    shortDescription:
      "Site institucional para escritórios contábeis, com foco em clareza, confiança e atendimento consultivo.",
    available: true,
    primary: "#14213d",
    accent: "#2f6f4f",
    icon: "file-check",
  },
  {
    slug: "seguros",
    segment: "Corretora de Seguros",
    companyName: "Horizonte Seguros",
    shortDescription:
      "Modelo voltado a cotação rápida e proximidade, apresentando os principais tipos de seguro.",
    available: true,
    primary: "#1e4dbb",
    accent: "#e2734f",
    icon: "shield-check",
  },
  {
    slug: "imobiliaria",
    segment: "Imobiliária",
    companyName: "Vértice Imóveis",
    shortDescription:
      "Modelo comercial e elegante, com busca demonstrativa de imóveis e destaque para conversão.",
    available: true,
    primary: "#221e19",
    accent: "#b8873e",
    icon: "home",
  },
  {
    slug: "restaurante",
    segment: "Restaurante",
    companyName: "Essenza Restaurante",
    shortDescription:
      "Modelo acolhedor e sofisticado, valorizando cardápio, ambiente e reservas.",
    available: true,
    primary: "#7a2331",
    accent: "#cf8a4e",
    icon: "wine",
  },
  {
    slug: "aurum-motors",
    segment: "Concessionária premium",
    companyName: "Aurum Motors",
    shortDescription:
      "Modelo premium para lojas de seminovos selecionados, com estoque, financiamento e painel administrativo demonstrativo.",
    available: true,
    primary: "#b3843c",
    accent: "#d9b26a",
    icon: "car",
    premium: true,
  },
  {
    slug: "orion-odontologia",
    segment: "Clínica odontológica premium",
    companyName: "Orion Odontologia",
    shortDescription:
      "Modelo premium para clínicas odontológicas, com especialidades, equipe, antes e depois e agendamento.",
    available: true,
    primary: "#2f6b5c",
    accent: "#c48a6f",
    icon: "sparkle",
    premium: true,
  },
  {
    slug: "moveis-decoracao",
    segment: "Loja de móveis e decoração premium",
    companyName: "Maison Lume",
    shortDescription:
      "Modelo premium de catálogo com categorias, coleções, ofertas, \"compre o ambiente\" e painel administrativo completo.",
    available: true,
    primary: "#2b2621",
    accent: "#a9784f",
    icon: "sofa",
    premium: true,
  },
];
