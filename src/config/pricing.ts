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
    name: "Site Essencial",
    description: "Para apresentar sua empresa, seus serviços e facilitar o contato com seus clientes.",
    features: [
      "Site institucional",
      "Estrutura enxuta e objetiva",
      "Layout responsivo",
      "Integração com WhatsApp",
      "Configuração de domínio",
      "Configuração de hospedagem",
      "Certificado SSL",
      "Suporte no período de implantação",
    ],
  },
  {
    slug: "profissional",
    name: "Site Profissional",
    description: "Para empresas que precisam de mais conteúdo, personalização e recursos de conversão.",
    features: [
      "Tudo do plano Site Essencial",
      "Mais páginas e seções",
      "Personalização ampliada de layout e conteúdo",
      "Formulários adicionais",
      "Apresentação de equipe",
      "Catálogo simples de produtos ou serviços",
      "Recursos de conversão (CTAs, WhatsApp em destaque)",
      "Acompanhamento no período contratado",
    ],
    highlighted: true,
  },
  {
    slug: "sob-medida",
    name: "Projeto Sob Medida",
    description: "Para catálogos, painéis administrativos, agendamentos, integrações e necessidades específicas.",
    features: [
      "Catálogo administrável (produtos, imóveis, cardápio ou similar)",
      "Painel administrativo",
      "Agendamento online",
      "Integrações com sistemas externos",
      "Funcionalidades personalizadas conforme escopo",
    ],
  },
];
