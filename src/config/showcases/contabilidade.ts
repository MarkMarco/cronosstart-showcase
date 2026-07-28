import type { ShowcaseConfig } from "./types";

export const contabilidadeConfig: ShowcaseConfig = {
  slug: "contabilidade",
  company: {
    name: "Atlas Contabilidade",
    shortName: "Atlas",
    segment: "Contabilidade",
    slogan: "Clareza contábil para decisões seguras.",
    description:
      "Escritório de contabilidade fictício, criado como modelo demonstrativo. Atendimento consultivo para empresas que querem clareza fiscal, tributária e financeira.",
  },
  theme: {
    surface: "#ffffff",
    surfaceAlt: "#f3f6f9",
    ink: "#161b22",
    inkMuted: "#5b6472",
    primary: "#14213d",
    primaryInk: "#ffffff",
    accent: "#2f6f4f",
    border: "#e3e7ee",
    fontHeading: "'Space Grotesk Variable', system-ui, sans-serif",
    fontBody: "'Inter Variable', system-ui, sans-serif",
    radiusCard: "1rem",
  },
  nav: [
    { label: "Início", href: "#" },
    { label: "Serviços", href: "#servicos" },
    { label: "Soluções", href: "#solucoes" },
    { label: "Sobre", href: "#sobre" },
    { label: "Dúvidas", href: "#duvidas" },
    { label: "Contato", href: "#contato" },
  ],
  seo: {
    title: "Atlas Contabilidade — Contabilidade consultiva para empresas (modelo demonstrativo)",
    description:
      "Modelo demonstrativo de site para escritórios de contabilidade, com serviços, planejamento tributário e atendimento consultivo. Projeto fictício da CronosStart.",
    ogImage: "/images/og/contabilidade.png",
    ogImageAlt: "Atlas Contabilidade — modelo demonstrativo CronosStart",
  },
  hero: {
    variant: "split",
    eyebrow: "Contabilidade consultiva",
    headline: "Decisões financeiras mais seguras começam com uma contabilidade",
    highlight: "clara e presente.",
    subheadline:
      "A Atlas cuida da escrituração, dos impostos e da folha de pagamento da sua empresa — e participa das suas decisões, com relatórios simples e orientação direta.",
    ctaPrimaryLabel: "Solicitar análise contábil",
    ctaSecondaryLabel: "Conhecer os serviços",
  },
  services: [
    {
      title: "Contabilidade geral",
      description: "Escrituração contábil e fiscal completa, com obrigações acessórias sempre em dia.",
      icon: "file-check",
    },
    {
      title: "Abertura e regularização de empresas",
      description: "Abertura de CNPJ, alterações contratuais e regularização de pendências fiscais.",
      icon: "briefcase",
    },
    {
      title: "Planejamento tributário",
      description: "Enquadramento e regime tributário adequados, com redução legal da carga de impostos.",
      icon: "trending-up",
    },
    {
      title: "Folha de pagamento",
      description: "Admissões, rescisões, encargos e obrigações trabalhistas processadas sem atrasos.",
      icon: "users",
    },
    {
      title: "Atendimento consultivo",
      description: "Um contador de referência acompanhando as decisões financeiras da sua empresa.",
      icon: "message-circle",
    },
    {
      title: "Relatórios gerenciais",
      description: "Indicadores mensais organizados, para embasar decisões com mais segurança.",
      icon: "layers",
    },
  ],
  benefits: [
    {
      title: "Abertura sem complicação",
      description: "Processo de abertura e regularização conduzido de ponta a ponta pela equipe.",
      icon: "shield-check",
    },
    {
      title: "Tributação otimizada",
      description: "Revisão periódica do enquadramento para evitar pagar impostos além do necessário.",
      icon: "trending-up",
    },
    {
      title: "Equipe especializada",
      description: "Profissionais dedicados por área: fiscal, trabalhista e societário.",
      icon: "users",
    },
    {
      title: "Suporte direto",
      description: "Canal direto com o contador responsável, sem filas de atendimento genérico.",
      icon: "message-circle",
    },
  ],
  highlightBand: {
    eyebrow: "Segurança nas decisões",
    title: "Clareza contábil não é um relatório a mais. É a base para decidir com segurança.",
    description:
      "Cada obrigação cumprida em dia e cada número organizado existem para um propósito: dar à sua empresa a tranquilidade de decidir com informação confiável.",
    badgeLabel: "Conformidade contínua",
    badgeText: "Obrigações fiscais e trabalhistas acompanhadas mês a mês, sem surpresas de última hora.",
  },
  about: {
    eyebrow: "Sobre a Atlas",
    title: "Uma contabilidade que participa das decisões da sua empresa",
    paragraphs: [
      "A Atlas Contabilidade nasceu para atender empresas que precisam de mais do que guias de impostos em dia — precisam de um parceiro que entenda o negócio e ajude a decidir.",
      "Combinamos rotina contábil rigorosa com atendimento consultivo, para que cada relatório vire uma decisão mais segura para o seu negócio.",
    ],
    stats: [
      { value: "500+", label: "empresas atendidas" },
      { value: "12 anos", label: "de atuação" },
      { value: "98%", label: "de clientes satisfeitos" },
      { value: "24h", label: "tempo médio de resposta" },
    ],
    statsNote: "Números ilustrativos, usados apenas para compor esta demonstração.",
  },
  process: [
    {
      title: "Diagnóstico inicial",
      description: "Entendemos o momento fiscal, tributário e societário da sua empresa.",
    },
    {
      title: "Plano contábil e tributário",
      description: "Definimos o enquadramento e a rotina contábil ideal para o seu porte.",
    },
    {
      title: "Execução mensal",
      description: "Escrituração, folha de pagamento e obrigações acessórias em dia, todo mês.",
    },
    {
      title: "Acompanhamento contínuo",
      description: "Relatórios periódicos e orientação consultiva para as próximas decisões.",
    },
  ],
  testimonials: [
    {
      quote:
        "A Atlas trouxe clareza que a gente não tinha. Hoje entendemos os números da empresa sem precisar traduzir nada.",
      author: "Marina Duarte",
      role: "Sócia, Duarte Arquitetura",
      segment: "Arquitetura",
      result: "Clareza total nos números",
    },
    {
      quote:
        "O reenquadramento tributário sugerido pela equipe reduziu nossos custos fixos já no primeiro trimestre.",
      author: "Eduardo Lins",
      role: "Diretor, Lins Distribuidora",
      segment: "Distribuição",
      result: "Custos fixos reduzidos",
    },
    {
      quote: "Ter um contador que responde direto, sem burocracia, mudou como tomamos decisões no dia a dia.",
      author: "Camila Rocha",
      role: "Fundadora, Rocha Estúdio Criativo",
      segment: "Design",
      result: "Decisões mais ágeis",
    },
  ],
  faq: [
    {
      question: "A Atlas atende empresas de qualquer porte?",
      answer:
        "Atendemos desde MEIs e pequenas empresas até negócios de médio porte, com rotinas contábeis adaptadas a cada fase.",
    },
    {
      question: "Como funciona a troca de contador?",
      answer:
        "Cuidamos de toda a transição: solicitação de arquivos ao contador anterior, conferência dos dados e regularização de pendências, sem que sua empresa precise se preocupar com o processo.",
    },
    {
      question: "O atendimento é presencial ou digital?",
      answer:
        "O acompanhamento do dia a dia é 100% digital, com documentos e relatórios organizados online. Reuniões presenciais ou por vídeo são agendadas quando fazem sentido.",
    },
    {
      question: "Qual o prazo médio de resposta?",
      answer: "Solicitações são respondidas em até 24 horas úteis pelo contador responsável pela sua empresa.",
    },
    {
      question: "Vocês ajudam no planejamento tributário, não só na escrituração?",
      answer:
        "Sim. Revisamos periodicamente o enquadramento e o regime tributário da empresa para identificar oportunidades legais de redução de carga fiscal.",
    },
  ],
  contactCta: {
    title: "Pronto para uma contabilidade que participa do seu negócio?",
    description:
      "Solicite uma análise contábil inicial e entenda como a Atlas pode organizar a rotina fiscal, tributária e de pessoal da sua empresa.",
    buttonLabel: "Solicitar análise contábil",
  },
  contact: {
    whatsappNumber: "5511999990000",
    whatsappMessage: "Olá! Gostaria de solicitar uma análise contábil.",
    email: "contato@atlascontabilidade-demo.com.br",
    phone: "(11) 4000-0000",
    city: "São Paulo",
    state: "SP",
    hours: "Seg. a sex., 9h às 18h",
    instagram: "#",
    facebook: "#",
    linkedin: "#",
  },
  sections: {
    about: true,
    process: true,
    testimonials: true,
    faq: true,
    highlightBand: true,
  },
};
