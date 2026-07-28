import type { ShowcaseConfig } from "./types";

const img = (name: string) => `/images/showcases/orion-odontologia/${name}`;

export const orionOdontologiaConfig: ShowcaseConfig = {
  slug: "orion-odontologia",
  primaryCtaHref: "/modelos/orion-odontologia/agendamento",
  company: {
    name: "Orion Odontologia",
    shortName: "Orion",
    segment: "Clínica odontológica premium",
    slogan: "Precisão que se sente em cada sorriso.",
    description:
      "Clínica odontológica fictícia, criada como modelo demonstrativo. Foco em estética, reabilitação e implantes, com atendimento consultivo e ambiente pensado para reduzir a ansiedade do paciente.",
  },
  theme: {
    surface: "#faf7f2",
    surfaceAlt: "#eef1ec",
    ink: "#23282a",
    inkMuted: "#6b7570",
    primary: "#2f6b5c",
    primaryInk: "#ffffff",
    accent: "#c48a6f",
    border: "#dde3dc",
    fontHeading: "'Newsreader Variable', Georgia, serif",
    fontBody: "'Inter Variable', system-ui, sans-serif",
    radiusCard: "1rem",
  },
  nav: [
    { label: "Início", href: "/modelos/orion-odontologia" },
    { label: "Especialidades", href: "/modelos/orion-odontologia/especialidades" },
    { label: "Equipe", href: "/modelos/orion-odontologia/equipe" },
    { label: "Diferenciais", href: "/modelos/orion-odontologia/#diferenciais" },
    { label: "Agendamento", href: "/modelos/orion-odontologia/agendamento" },
  ],
  seo: {
    title: "Orion Odontologia — Odontologia premium com precisão e cuidado (modelo demonstrativo)",
    description:
      "Modelo demonstrativo de clínica odontológica premium, com especialidades, equipe, antes e depois e agendamento. Projeto fictício da CronosStart.",
    ogImage: "/images/og/orion-odontologia.png",
    ogImageAlt: "Orion Odontologia — modelo demonstrativo CronosStart",
  },
  hero: {
    variant: "centered",
    eyebrow: "Odontologia de precisão",
    headline: "Cuidado odontológico que une",
    highlight: "ciência, estética e sensibilidade.",
    subheadline:
      "Na Orion, cada tratamento começa com diagnóstico detalhado e uma conversa honesta — para que você entenda cada etapa antes de decidir.",
    ctaPrimaryLabel: "Agendar avaliação",
    ctaSecondaryLabel: "Conhecer especialidades",
  },
  about: {
    eyebrow: "A clínica",
    title: "Consultório pensado para reduzir a ansiedade, não só tratar o dente",
    paragraphs: [
      "A Orion nasceu da ideia de que uma boa experiência odontológica começa muito antes da cadeira: começa na clareza do diagnóstico, no tempo dedicado a cada explicação e no cuidado com os detalhes do ambiente.",
      "Nossa equipe reúne especialistas em diferentes áreas para que o paciente não precise ser encaminhado para vários lugares — o planejamento do tratamento é único, do início ao fim.",
    ],
    stats: [
      { label: "Anos de atuação", value: "14" },
      { label: "Especialidades", value: "6" },
      { label: "Satisfação declarada", value: "97%" },
    ],
    statsNote: "Números ilustrativos, apenas para fins de demonstração deste modelo.",
  },
  specialties: [
    {
      title: "Implantodontia",
      description: "Planejamento guiado por imagem e reabilitação com implantes de alta precisão.",
      icon: "tooth",
    },
    {
      title: "Odontologia estética",
      description: "Clareamento, lentes e facetas para um sorriso natural e equilibrado.",
      icon: "sparkle",
    },
    {
      title: "Ortodontia",
      description: "Alinhadores e aparelhos com acompanhamento digital da movimentação dentária.",
      icon: "refresh",
    },
    {
      title: "Reabilitação oral",
      description: "Recuperação funcional e estética completa para casos mais complexos.",
      icon: "tool",
    },
    {
      title: "Odontopediatria",
      description: "Atendimento acolhedor para os pacientes mais jovens, com foco em prevenção.",
      icon: "heart",
    },
    {
      title: "Prevenção e limpeza",
      description: "Check-ups periódicos e profilaxia para manter a saúde bucal em dia.",
      icon: "shield-check",
    },
  ],
  team: [
    {
      name: "Dra. Beatriz Amaral",
      role: "Implantodontia",
      credential: "CRO-SP 58.213 · 12 anos de atuação",
      bio: "Especialista em reabilitação com implantes guiados por imagem, com foco em planejamento minucioso antes de qualquer procedimento.",
      avatar: img("equipe-beatriz.jpg"),
      avatarAlt: "Retrato profissional da Dra. Beatriz Amaral",
    },
    {
      name: "Dr. Rafael Nogueira",
      role: "Ortodontia",
      credential: "CRO-SP 61.047 · 9 anos de atuação",
      bio: "Conduz tratamentos ortodônticos com acompanhamento digital, priorizando previsibilidade e conforto ao longo do processo.",
      avatar: img("equipe-rafael.jpg"),
      avatarAlt: "Retrato profissional do Dr. Rafael Nogueira",
    },
    {
      name: "Dra. Camila Ferraz",
      role: "Odontologia Estética",
      credential: "CRO-SP 59.882 · 10 anos de atuação",
      bio: "Trabalha a estética do sorriso com foco em naturalidade, unindo técnica apurada e olhar sensível para cada rosto.",
      avatar: img("equipe-camila.jpg"),
      avatarAlt: "Retrato profissional da Dra. Camila Ferraz",
    },
  ],
  beforeAfter: [
    {
      label: "Clareamento dental",
      beforeImage: img("sorriso-1.jpg"),
      afterImage: img("sorriso-1.jpg"),
      beforeAlt: "Sorriso ilustrativo, versão em preto e branco representando o antes",
      afterAlt: "Sorriso ilustrativo, versão colorida representando o depois",
    },
    {
      label: "Harmonização com facetas",
      beforeImage: img("sorriso-2.jpg"),
      afterImage: img("sorriso-2.jpg"),
      beforeAlt: "Sorriso ilustrativo, versão em preto e branco representando o antes",
      afterAlt: "Sorriso ilustrativo, versão colorida representando o depois",
    },
  ],
  ambianceContent: {
    eyebrow: "O ambiente Orion",
    title: "Um consultório que não parece consultório",
    paragraphs: [
      "Luz natural, materiais quentes e salas privativas — cada detalhe do espaço foi pensado para reduzir a tensão de uma visita ao dentista.",
      "Da recepção às salas de atendimento, buscamos um ambiente que transmita calma sem abrir mão da tecnologia clínica de ponta.",
    ],
  },
  ambianceImages: [
    { src: img("ambiente-1.jpg"), alt: "Recepção clara e acolhedora da clínica" },
    { src: img("ambiente-2.jpg"), alt: "Sala de atendimento com equipamento moderno" },
  ],
  benefits: [
    {
      title: "Diagnóstico por imagem",
      description: "Tomografia e escaneamento digital para planejamento preciso antes de qualquer procedimento.",
      icon: "sparkle",
    },
    {
      title: "Planejamento transparente",
      description: "Orçamento detalhado e explicação de cada etapa antes de iniciar o tratamento.",
      icon: "file-check",
    },
    {
      title: "Equipe multiespecialista",
      description: "Especialistas de diferentes áreas em um único plano de tratamento coordenado.",
      icon: "users",
    },
    {
      title: "Conforto e biossegurança",
      description: "Protocolos rígidos de esterilização e salas privativas para cada atendimento.",
      icon: "shield-check",
    },
  ],
  process: [
    { title: "Avaliação inicial", description: "Consulta de diagnóstico com exame clínico e de imagem." },
    { title: "Plano de tratamento", description: "Apresentação detalhada das etapas, prazos e valores." },
    { title: "Tratamento acompanhado", description: "Execução com acompanhamento próximo em cada sessão." },
    { title: "Manutenção", description: "Consultas periódicas para preservar o resultado a longo prazo." },
  ],
  testimonials: [
    {
      quote:
        "Fiz implante em outra clínica antes e a diferença de cuidado na explicação de cada etapa aqui foi enorme.",
      author: "Juliana Prado",
      role: "Paciente Orion",
      segment: "Implantodontia",
      result: "Tratamento concluído em 4 meses",
      rating: 5,
    },
    {
      quote: "Levei meu filho pela primeira vez com medo de dentista e a equipe foi incrivelmente paciente.",
      author: "Marcos Vilela",
      role: "Paciente Orion",
      segment: "Odontopediatria",
      result: "Consulta sem choro, segundo o pai",
      rating: 5,
    },
    {
      quote: "O orçamento foi claro desde o início, sem surpresas. Isso pesou muito na decisão.",
      author: "Renata Souza",
      role: "Paciente Orion",
      segment: "Odontologia estética",
      result: "Aprovação do plano em 1 consulta",
      rating: 4,
    },
  ],
  faq: [
    {
      question: "Preciso de encaminhamento para ver um especialista?",
      answer:
        "Não. O primeiro atendimento é sempre uma avaliação geral, e a equipe organiza o encaminhamento interno conforme a necessidade do seu caso.",
    },
    {
      question: "A clínica atende convênios?",
      answer: "Este é um modelo demonstrativo — condições de convênio e particular seriam detalhadas aqui.",
    },
    {
      question: "Quanto tempo dura um tratamento de implante?",
      answer:
        "Varia por caso, mas o planejamento inicial já apresenta uma estimativa de prazo antes de você decidir seguir.",
    },
    {
      question: "Vocês atendem emergências?",
      answer: "Sim, com horários reservados para atendimentos de urgência durante a semana.",
    },
  ],
  scheduleForm: {
    specialties: [
      "Avaliação geral",
      "Implantodontia",
      "Odontologia estética",
      "Ortodontia",
      "Reabilitação oral",
      "Odontopediatria",
      "Prevenção e limpeza",
    ],
    periods: ["Manhã", "Tarde", "Noite"],
  },
  location: {
    addressLine: "Rua Oscar Freire, 1200 — Jardins, São Paulo/SP",
    mapNote: "Mapa ilustrativo",
    hoursLines: [
      { day: "Segunda a sexta", hours: "8h–19h" },
      { day: "Sábado", hours: "9h–13h" },
      { day: "Domingo", hours: "Fechado" },
    ],
  },
  contactCta: {
    title: "Vamos agendar sua avaliação?",
    description: "Conte um pouco sobre o que você procura — respondemos com um horário disponível.",
    buttonLabel: "Agendar avaliação",
  },
  contact: {
    whatsappNumber: "5511988880000",
    whatsappMessage: "Olá! Gostaria de agendar uma avaliação na Orion Odontologia.",
    email: "contato@orion-odonto-demo.com.br",
    phone: "(11) 4000-8800",
    city: "São Paulo",
    state: "SP",
    hours: "Segunda a sábado",
    instagram: "#",
    facebook: "#",
  },
  sections: {
    about: true,
    specialties: true,
    team: true,
    beforeAfter: true,
    ambiance: true,
    process: true,
    testimonials: true,
    faq: true,
    scheduleForm: true,
    location: true,
  },
};
