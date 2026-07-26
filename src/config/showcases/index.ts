export interface ShowcaseSummary {
  slug: string;
  segment: string;
  companyName: string;
  shortDescription: string;
  available: boolean;
  accent: string;
  accentSoft: string;
  ink: string;
}

export const showcaseRegistry: ShowcaseSummary[] = [
  {
    slug: "contabilidade",
    segment: "Contabilidade",
    companyName: "Atlas Contabilidade",
    shortDescription:
      "Site institucional para escritórios contábeis, com foco em clareza, confiança e atendimento consultivo.",
    available: true,
    accent: "#14213d",
    accentSoft: "#eef1f6",
    ink: "#14171f",
  },
  {
    slug: "seguros",
    segment: "Corretora de Seguros",
    companyName: "Horizonte Seguros",
    shortDescription:
      "Modelo voltado a cotação rápida e proximidade, apresentando os principais tipos de seguro.",
    available: true,
    accent: "#1e4dbb",
    accentSoft: "#eef3fb",
    ink: "#132540",
  },
  {
    slug: "imobiliaria",
    segment: "Imobiliária",
    companyName: "Vértice Imóveis",
    shortDescription:
      "Modelo comercial e elegante, com busca demonstrativa de imóveis e destaque para conversão.",
    available: true,
    accent: "#b8873e",
    accentSoft: "#f0e9dc",
    ink: "#211d18",
  },
  {
    slug: "restaurante",
    segment: "Restaurante",
    companyName: "Essenza Restaurante",
    shortDescription:
      "Modelo acolhedor e sofisticado, valorizando cardápio, ambiente e reservas.",
    available: false,
    accent: "#7c2d3a",
    accentSoft: "#faf1ec",
    ink: "#241a15",
  },
];
