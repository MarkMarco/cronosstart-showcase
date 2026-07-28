export interface PricingTier {
  slug: string;
  name: string;
  description: string;
  features: string[];
  /** Preço comercial — deixar undefined até a estrutura de valores ser definida. */
  price?: string;
  highlighted?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    slug: "essencial",
    name: "Essencial",
    description: "Indicado para empresas que precisam apresentar sua marca, serviços e contatos.",
    features: [
      "Site institucional",
      "Estrutura enxuta",
      "Layout responsivo",
      "Integração com WhatsApp",
      "Configuração de domínio",
      "Configuração de hospedagem",
      "SSL",
      "Suporte inicial",
    ],
  },
  {
    slug: "profissional",
    name: "Profissional",
    description: "Indicado para empresas que precisam de mais conteúdo, personalização e recursos comerciais.",
    features: [
      "Tudo do plano Essencial",
      "Mais páginas e seções",
      "Personalização ampliada",
      "Formulários",
      "Apresentação de equipe",
      "Catálogo simples",
      "Recursos de conversão",
      "Acompanhamento e suporte",
    ],
    highlighted: true,
  },
  {
    slug: "sob-medida",
    name: "Sob medida",
    description: "Indicado para projetos com necessidades específicas.",
    features: [
      "Catálogo administrável",
      "Painel administrativo",
      "Agendamento",
      "Imóveis",
      "Cardápio",
      "Produtos",
      "Integrações",
      "Funcionalidades personalizadas",
    ],
  },
];
