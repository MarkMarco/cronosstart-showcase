import type { ShowcaseConfig } from "./types";

export const segurosConfig: ShowcaseConfig = {
  slug: "seguros",
  primaryCtaHref: "#cotacao",
  company: {
    name: "Horizonte Seguros",
    shortName: "Horizonte",
    segment: "Corretora de Seguros",
    slogan: "Proteção certa, explicada por gente de verdade.",
    description:
      "Corretora de seguros fictícia, criada como modelo demonstrativo. Comparação de coberturas e acompanhamento consultivo, da cotação ao sinistro.",
  },
  theme: {
    surface: "#ffffff",
    surfaceAlt: "#eef3fb",
    ink: "#132540",
    inkMuted: "#5b6b85",
    primary: "#1e4dbb",
    primaryInk: "#ffffff",
    accent: "#e2734f",
    border: "#dce6f5",
    fontHeading: "'Sora Variable', system-ui, sans-serif",
    fontBody: "'Inter Variable', system-ui, sans-serif",
    radiusCard: "1rem",
  },
  nav: [
    { label: "Início", href: "/modelos/seguros" },
    { label: "Seguros", href: "#seguros" },
    { label: "Por que escolher", href: "#por-que-escolher" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Sobre", href: "#sobre" },
    { label: "Cotação", href: "#cotacao" },
  ],
  seo: {
    title: "Horizonte Seguros — Proteção consultiva para você e sua empresa (modelo demonstrativo)",
    description:
      "Modelo demonstrativo de site para corretoras de seguros, com comparação de coberturas, cotação rápida e acompanhamento humano. Projeto fictício da CronosStart.",
    ogImage: "/images/og/seguros.png",
    ogImageAlt: "Horizonte Seguros — modelo demonstrativo CronosStart",
  },
  hero: {
    variant: "split",
    eyebrow: "Corretora consultiva",
    headline: "Proteção certa para cada fase da sua vida e",
    highlight: "do seu negócio.",
    subheadline:
      "A Horizonte compara opções, explica cada cobertura e acompanha você da contratação ao momento em que mais precisar.",
    ctaPrimaryLabel: "Solicitar cotação",
    ctaSecondaryLabel: "Conhecer os seguros",
    chips: [
      { label: "Automóvel", icon: "car" },
      { label: "Residencial", icon: "home" },
      { label: "Empresarial", icon: "briefcase" },
      { label: "Vida", icon: "heart" },
    ],
  },
  services: [
    {
      title: "Seguro automóvel",
      description: "Cobertura para colisão, roubo e terceiros, com franquia adequada ao seu perfil.",
      icon: "car",
    },
    {
      title: "Seguro residencial",
      description: "Proteção para incêndio, roubo e danos elétricos, pensada para a sua casa.",
      icon: "home",
    },
    {
      title: "Seguro empresarial",
      description: "Cobertura para patrimônio, equipamentos e responsabilidade civil do negócio.",
      icon: "briefcase",
    },
    {
      title: "Seguro de vida",
      description: "Proteção financeira para a sua família nos momentos que mais importam.",
      icon: "heart",
    },
    {
      title: "Seguro viagem",
      description: "Assistência médica e cobertura de bagagem para viagens no Brasil e no exterior.",
      icon: "plane",
    },
    {
      title: "Equipamentos e responsabilidade profissional",
      description: "Cobertura para equipamentos de trabalho e erros e omissões profissionais.",
      icon: "tool",
    },
  ],
  benefits: [
    {
      title: "Comparação entre opções",
      description: "Analisamos coberturas de diferentes seguradoras antes de indicar a melhor opção.",
      icon: "compare",
    },
    {
      title: "Explicação sem termos complicados",
      description: "Cada cláusula e cobertura explicada em linguagem simples, sem juridiquês.",
      icon: "message-circle",
    },
    {
      title: "Atendimento durante a contratação",
      description: "Acompanhamento passo a passo até a emissão da apólice.",
      icon: "check",
    },
    {
      title: "Acompanhamento em caso de sinistro",
      description: "Suporte direto com a seguradora para agilizar o seu atendimento.",
      icon: "shield-check",
    },
    {
      title: "Revisão periódica das coberturas",
      description: "Revisamos suas apólices antes da renovação, para evitar pagar por coberturas desnecessárias.",
      icon: "refresh",
    },
  ],
  protectionPicker: {
    eyebrow: "Diferencial Horizonte",
    title: "O que você deseja proteger?",
    description: "Escolha uma opção e veja como preparamos uma cotação sob medida — sem compromisso.",
    options: [
      { label: "Meu veículo", icon: "car" },
      { label: "Minha casa", icon: "home" },
      { label: "Minha empresa", icon: "briefcase" },
      { label: "Minha família", icon: "heart" },
      { label: "Minha viagem", icon: "plane" },
    ],
    responseText: "Vamos preparar uma cotação adequada ao seu perfil.",
  },
  process: [
    {
      title: "Entendemos o que precisa ser protegido",
      description: "Ouvimos sua rotina, seu patrimônio e suas prioridades antes de qualquer indicação.",
    },
    {
      title: "Comparamos coberturas e condições",
      description: "Avaliamos opções de diferentes seguradoras parceiras para o seu perfil.",
    },
    {
      title: "Apresentamos as opções com clareza",
      description: "Você entende exatamente o que cada cobertura inclui, sem letras miúdas.",
    },
    {
      title: "Acompanhamos você após a contratação",
      description: "Alterações, renovações e sinistros com suporte direto da Horizonte.",
    },
  ],
  humanSupport: {
    eyebrow: "Atendimento contínuo",
    title: "Seguro não termina na assinatura da proposta.",
    description:
      "A Horizonte acompanha alterações de apólice, renovações, dúvidas do dia a dia e eventuais sinistros — sempre com uma pessoa de referência, não um formulário automático.",
    points: [
      "Alterações de apólice sem burocracia",
      "Aviso e revisão antes da renovação",
      "Suporte direto em caso de sinistro",
      "Dúvidas respondidas por uma pessoa",
    ],
  },
  partners: ["Seguradora Alfa", "Seguradora Vitta", "Seguradora Prime", "Seguradora Nexus", "Seguradora Boreal"],
  testimonials: [
    {
      quote:
        "Eu não fazia ideia do que a minha apólice antiga cobria. A Horizonte comparou tudo e me explicou sem enrolação.",
      author: "Patrícia Almeida",
      role: "Cliente Horizonte",
      segment: "Seguro residencial",
      result: "Cobertura correta, sem surpresas",
    },
    {
      quote: "Tive um sinistro com o carro e fui acompanhada em cada etapa, do boletim ao reparo.",
      author: "Rafael Nogueira",
      role: "Cliente Horizonte",
      segment: "Seguro automóvel",
      result: "Sinistro resolvido rápido",
    },
    {
      quote: "Revisaram minha apólice empresarial antes da renovação e encontraram uma cobertura que eu pagava à toa.",
      author: "Juliana Freitas",
      role: "Cliente Horizonte",
      segment: "Seguro empresarial",
      result: "Redução de custo na renovação",
    },
  ],
  faq: [
    {
      question: "Como é feita a cotação?",
      answer:
        "Você conta o que deseja proteger e um consultor prepara opções comparando coberturas de diferentes seguradoras parceiras, sem compromisso.",
    },
    {
      question: "Vocês comparam diferentes opções?",
      answer:
        "Sim. Comparamos condições, coberturas e franquias de diversas seguradoras parceiras antes de indicar a melhor opção para o seu perfil.",
    },
    {
      question: "O que influencia o valor do seguro?",
      answer:
        "Fatores como perfil do segurado, valor do bem, região, histórico e coberturas escolhidas influenciam o valor final — explicamos cada um deles na cotação.",
    },
    {
      question: "Como funciona em caso de sinistro?",
      answer:
        "Você aciona a Horizonte, e acompanhamos o processo junto à seguradora até a resolução, orientando cada etapa.",
    },
    {
      question: "Posso revisar meu seguro antes da renovação?",
      answer: "Sim. Revisamos sua apólice antes de cada renovação para checar se as coberturas ainda fazem sentido.",
    },
    {
      question: "O atendimento é digital ou presencial?",
      answer:
        "O atendimento do dia a dia é digital, por WhatsApp e videochamada. Encontros presenciais podem ser agendados quando fizer sentido.",
    },
  ],
  contactCta: {
    title: "Pronto para proteger o que importa?",
    description: "Preencha os dados abaixo e receba uma cotação adequada ao seu perfil, sem compromisso.",
    buttonLabel: "Quero receber uma cotação",
  },
  contact: {
    whatsappNumber: "5511988880000",
    whatsappMessage: "Olá! Gostaria de receber uma cotação de seguro.",
    email: "contato@horizonteseguros-demo.com.br",
    phone: "(11) 4000-1200",
    city: "São Paulo",
    state: "SP",
    hours: "Seg. a sex., 8h30 às 19h",
  },
  quoteForm: {
    insuranceTypes: [
      "Seguro automóvel",
      "Seguro residencial",
      "Seguro empresarial",
      "Seguro de vida",
      "Seguro viagem",
      "Equipamentos / responsabilidade profissional",
    ],
  },
  sections: {
    process: true,
    testimonials: true,
    faq: true,
    protectionPicker: true,
    humanSupport: true,
    partners: true,
  },
};
