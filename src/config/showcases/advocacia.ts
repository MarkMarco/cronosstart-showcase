import type {
  ShowcaseConfig,
  PracticeArea,
  LegalProfessional,
  LegalArticle,
  InstitutionalPillar,
} from "./types";

const img = (name: string) => `/images/showcases/advocacia/${name}`;

export const practiceAreas: PracticeArea[] = [
  {
    slug: "direito-empresarial",
    title: "Direito Empresarial",
    shortDescription: "Estruturação societária, contratos e operações.",
    description:
      "Apoio consultivo a empresas em constituição societária, governança, contratos comerciais e operações de fusão e aquisição, com foco em prevenção de riscos antes que eles se tornem disputas.",
    icon: "briefcase",
    featured: true,
    relatedProfessionalSlugs: ["mariana-vallesi"],
    relatedArticleSlugs: ["due-diligence-fusoes-aquisicoes", "verificacoes-antes-de-comprar-imovel-comercial"],
    order: 1,
    active: true,
  },
  {
    slug: "direito-civil",
    title: "Direito Civil",
    shortDescription: "Contratos, responsabilidade civil e obrigações.",
    description:
      "Atuação em questões cíveis diversas — obrigações, responsabilidade civil e relações contratuais — sempre com uma leitura preventiva antes de qualquer discussão se instalar.",
    icon: "scale",
    relatedProfessionalSlugs: ["eduardo-castrillon"],
    order: 2,
    active: true,
  },
  {
    slug: "direito-trabalhista",
    title: "Direito Trabalhista",
    shortDescription: "Consultoria preventiva e relações de trabalho.",
    description:
      "Orientação a empresas na estruturação de políticas internas, contratos de trabalho e prevenção de passivos trabalhistas, com acompanhamento próximo do dia a dia da operação.",
    icon: "users",
    relatedProfessionalSlugs: ["rafael-monteagudo"],
    relatedArticleSlugs: ["demissao-sem-justa-causa-pontos-de-atencao"],
    order: 3,
    active: true,
  },
  {
    slug: "direito-tributario",
    title: "Direito Tributário",
    shortDescription: "Planejamento tributário e conformidade fiscal.",
    description:
      "Análise de estrutura tributária e conformidade fiscal, buscando clareza sobre obrigações e oportunidades de organização dentro da legislação vigente.",
    icon: "trending-up",
    relatedProfessionalSlugs: ["rafael-monteagudo"],
    order: 4,
    active: true,
  },
  {
    slug: "contratos",
    title: "Contratos",
    shortDescription: "Elaboração, revisão e negociação contratual.",
    description:
      "Elaboração e revisão de contratos com linguagem clara e cláusulas equilibradas, reduzindo ambiguidades que costumam originar conflitos futuros.",
    icon: "file-check",
    relatedProfessionalSlugs: ["mariana-vallesi"],
    relatedArticleSlugs: ["clausulas-essenciais-contratos-prestacao-servico"],
    order: 5,
    active: true,
  },
  {
    slug: "familia-sucessoes",
    title: "Família e Sucessões",
    shortDescription: "Planejamento sucessório e questões de família.",
    description:
      "Acompanhamento de questões familiares e sucessórias com sensibilidade e discrição, incluindo planejamento patrimonial e organização de inventários.",
    icon: "heart",
    relatedProfessionalSlugs: ["isadora-quintela"],
    relatedArticleSlugs: ["inventario-extrajudicial-quando-e-possivel", "planejamento-patrimonial-guia-inicial"],
    order: 6,
    active: true,
  },
  {
    slug: "protecao-dados-compliance",
    title: "Proteção de Dados e Compliance",
    shortDescription: "Adequação à LGPD e programas de compliance.",
    description:
      "Apoio na adequação de empresas à legislação de proteção de dados e na estruturação de programas de compliance proporcionais ao porte e ao risco de cada operação.",
    icon: "shield-check",
    relatedProfessionalSlugs: ["rafael-monteagudo"],
    relatedArticleSlugs: ["lgpd-para-pequenas-empresas"],
    order: 7,
    active: true,
  },
  {
    slug: "direito-imobiliario",
    title: "Direito Imobiliário",
    shortDescription: "Contratos, due diligence e regularização.",
    description:
      "Assessoria em transações imobiliárias, due diligence documental e regularização de imóveis, para empresas e famílias que buscam segurança antes de fechar negócio.",
    icon: "home",
    relatedProfessionalSlugs: ["eduardo-castrillon"],
    relatedArticleSlugs: ["verificacoes-antes-de-comprar-imovel-comercial"],
    order: 8,
    active: true,
  },
];

export const legalProfessionals: LegalProfessional[] = [
  {
    slug: "mariana-vallesi",
    name: "Dra. Mariana Vallesi",
    role: "Sócia — Empresarial e Contratos",
    mainArea: "direito-empresarial",
    summary:
      "Atua com estruturação societária e contratos comerciais, com atenção especial à prevenção de riscos em operações de fusão e aquisição.",
    languages: ["Português", "Inglês"],
    education: ["Bacharelado em Direito — Faculdade Horizonte Sul (fictícia)", "Pós-graduação em Direito Societário — Instituto Meridiano (fictício)"],
    registrationNote: "Registro profissional demonstrativo",
    photo: img("profissional-1.jpg"),
    photoAlt: "Retrato profissional demonstrativo — Dra. Mariana Vallesi",
    active: true,
    order: 1,
  },
  {
    slug: "rafael-monteagudo",
    name: "Dr. Rafael Monteagudo",
    role: "Sócio — Tributário e Compliance",
    mainArea: "direito-tributario",
    summary:
      "Conduz projetos de conformidade fiscal e programas de compliance, com foco em clareza sobre obrigações e riscos regulatórios.",
    languages: ["Português", "Espanhol"],
    education: ["Bacharelado em Direito — Faculdade Vale do Arco (fictícia)", "Especialização em Direito Tributário — Instituto Meridiano (fictício)"],
    registrationNote: "Registro profissional demonstrativo",
    photo: img("profissional-2.jpg"),
    photoAlt: "Retrato profissional demonstrativo — Dr. Rafael Monteagudo",
    active: true,
    order: 2,
  },
  {
    slug: "isadora-quintela",
    name: "Dra. Isadora Quintela",
    role: "Advogada — Família e Sucessões",
    mainArea: "familia-sucessoes",
    summary:
      "Acompanha famílias em processos sucessórios e planejamento patrimonial, com uma condução discreta e próxima em cada etapa.",
    languages: ["Português", "Inglês"],
    education: ["Bacharelado em Direito — Faculdade Horizonte Sul (fictícia)", "Pós-graduação em Direito de Família — Instituto Cardeal (fictício)"],
    registrationNote: "Registro profissional demonstrativo",
    photo: img("profissional-3.jpg"),
    photoAlt: "Retrato profissional demonstrativo — Dra. Isadora Quintela",
    active: true,
    order: 3,
  },
  {
    slug: "eduardo-castrillon",
    name: "Dr. Eduardo Castrillón",
    role: "Advogado — Imobiliário e Civil",
    mainArea: "direito-imobiliario",
    summary:
      "Especializado em due diligence imobiliária e questões cíveis contratuais, sempre priorizando a verificação documental antes do fechamento de um negócio.",
    languages: ["Português", "Inglês"],
    education: ["Bacharelado em Direito — Faculdade Vale do Arco (fictícia)", "Especialização em Direito Imobiliário — Instituto Cardeal (fictício)"],
    registrationNote: "Registro profissional demonstrativo",
    photo: img("profissional-4.jpg"),
    photoAlt: "Retrato profissional demonstrativo — Dr. Eduardo Castrillón",
    active: true,
    order: 4,
  },
];

export const legalArticles: LegalArticle[] = [
  {
    slug: "due-diligence-fusoes-aquisicoes",
    title: "O papel da due diligence em fusões e aquisições",
    summary: "Por que a etapa de verificação documental costuma decidir o sucesso de uma operação societária.",
    category: "Empresas",
    author: "Dra. Mariana Vallesi",
    date: "2026-05-12",
    image: img("artigo-1.jpg"),
    imageAlt: "Estante de madeira com livros, ambiente demonstrativo",
    readTimeMinutes: 6,
    status: "published",
    featured: true,
    relatedSlugs: ["clausulas-essenciais-contratos-prestacao-servico", "verificacoes-antes-de-comprar-imovel-comercial"],
    content: [
      "Antes de qualquer assinatura, uma operação de fusão ou aquisição costuma passar por uma etapa de verificação documental — a chamada due diligence. É nela que se organizam informações societárias, contratuais, fiscais e trabalhistas relevantes para a decisão.",
      "De forma geral, essa verificação busca reduzir surpresas depois do fechamento do negócio: contratos com cláusulas desfavoráveis, passivos não declarados ou pendências regulatórias tendem a aparecer justamente nessa fase.",
      "Cada operação tem seu próprio nível de complexidade, e o escopo da verificação varia conforme o porte das empresas envolvidas e o setor de atuação.",
      "Este texto tem caráter informativo e geral — decisões concretas sobre uma operação específica dependem de análise individualizada.",
    ],
  },
  {
    slug: "clausulas-essenciais-contratos-prestacao-servico",
    title: "Cláusulas essenciais em contratos de prestação de serviço",
    summary: "Pontos que costumam ser deixados de lado na hora de redigir um contrato de serviço.",
    category: "Contratos",
    author: "Dra. Mariana Vallesi",
    date: "2026-04-28",
    image: img("artigo-2.jpg"),
    imageAlt: "Mão escrevendo sobre um documento em uma mesa, ambiente demonstrativo",
    readTimeMinutes: 5,
    status: "published",
    relatedSlugs: ["due-diligence-fusoes-aquisicoes"],
    content: [
      "Contratos de prestação de serviço bem redigidos costumam evitar boa parte dos desentendimentos entre as partes — não pela extensão do texto, mas pela clareza de pontos específicos.",
      "Entre os elementos que merecem atenção estão: escopo detalhado do serviço, critérios objetivos de aceite, prazos de entrega, condições de reajuste e regras claras de rescisão.",
      "Cláusulas genéricas, copiadas de modelos prontos sem adaptação, são uma das causas mais comuns de divergência de interpretação mais adiante.",
      "Conteúdo demonstrativo e informativo — cada contrato deve ser avaliado conforme o contexto específico da relação entre as partes.",
    ],
  },
  {
    slug: "demissao-sem-justa-causa-pontos-de-atencao",
    title: "Demissão sem justa causa: pontos de atenção para empresas",
    summary: "O que costuma ser revisado antes de formalizar um desligamento sem justa causa.",
    category: "Trabalho",
    author: "Dr. Rafael Monteagudo",
    date: "2026-04-10",
    image: img("artigo-3.jpg"),
    imageAlt: "Estante de madeira com livros, ambiente demonstrativo",
    readTimeMinutes: 5,
    status: "published",
    content: [
      "Um desligamento sem justa causa, embora comum, envolve uma série de verificações documentais e financeiras que costumam ser subestimadas.",
      "Entre os pontos frequentemente revisados estão: cálculo de verbas rescisórias, cumprimento de prazos legais para pagamento e eventuais cláusulas contratuais específicas do vínculo.",
      "Empresas que mantêm políticas internas organizadas tendem a reduzir o tempo e o risco envolvidos nesse processo.",
      "Este conteúdo é geral e não substitui a análise de um caso concreto, que depende de detalhes próprios de cada relação de trabalho.",
    ],
  },
  {
    slug: "planejamento-patrimonial-guia-inicial",
    title: "Planejamento patrimonial: um guia inicial",
    summary: "Primeiros conceitos para quem está começando a organizar a sucessão do patrimônio familiar.",
    category: "Patrimônio",
    author: "Dra. Isadora Quintela",
    date: "2026-03-22",
    image: img("artigo-4.jpg"),
    imageAlt: "Janela emoldurada em madeira, ambiente demonstrativo",
    readTimeMinutes: 7,
    status: "published",
    relatedSlugs: ["inventario-extrajudicial-quando-e-possivel"],
    content: [
      "Planejamento patrimonial é o conjunto de decisões tomadas em vida para organizar como um patrimônio será administrado e, eventualmente, transmitido às próximas gerações.",
      "Entre os instrumentos mais conhecidos estão o testamento, a doação em vida com reserva de usufruto e a holding familiar — cada um com implicações jurídicas e tributárias distintas.",
      "Não existe um modelo único: a escolha do instrumento depende da composição familiar, da natureza dos bens e dos objetivos de quem planeja.",
      "Texto de caráter geral e informativo — decisões de planejamento patrimonial devem ser avaliadas caso a caso.",
    ],
  },
  {
    slug: "inventario-extrajudicial-quando-e-possivel",
    title: "Inventário extrajudicial: quando é possível utilizá-lo",
    summary: "As condições básicas que costumam permitir um inventário mais simples, feito em cartório.",
    category: "Família",
    author: "Dra. Isadora Quintela",
    date: "2026-03-05",
    image: img("artigo-5.jpg"),
    imageAlt: "Estante de madeira com livros, ambiente demonstrativo",
    readTimeMinutes: 5,
    status: "published",
    relatedSlugs: ["planejamento-patrimonial-guia-inicial"],
    content: [
      "O inventário extrajudicial é uma alternativa mais rápida ao processo judicial, realizada diretamente em cartório, mas depende de algumas condições básicas.",
      "De forma geral, ele costuma ser possível quando não há testamento, todos os herdeiros são maiores e capazes, e existe consenso entre as partes sobre a partilha dos bens.",
      "Quando alguma dessas condições não está presente, o caminho costuma ser o inventário judicial, com trâmite mais longo.",
      "Este conteúdo é informativo e geral — a viabilidade de um inventário extrajudicial depende da análise do caso concreto.",
    ],
  },
  {
    slug: "lgpd-para-pequenas-empresas",
    title: "LGPD para pequenas empresas: primeiros passos",
    summary: "Por onde costuma começar a adequação de uma empresa menor à Lei Geral de Proteção de Dados.",
    category: "Proteção de Dados",
    author: "Dr. Rafael Monteagudo",
    date: "2026-02-18",
    image: img("artigo-6.jpg"),
    imageAlt: "Corredor escuro com iluminação suave, ambiente demonstrativo",
    readTimeMinutes: 6,
    status: "published",
    content: [
      "Muitas pequenas empresas adiam a adequação à LGPD por acreditarem que a lei se aplica apenas a grandes corporações — o que não é o caso.",
      "Um primeiro passo costuma ser o mapeamento de quais dados pessoais a empresa coleta, armazena e compartilha, e com qual finalidade.",
      "A partir desse mapeamento, é possível avaliar ajustes em políticas internas, contratos com fornecedores e páginas de coleta de dados, como formulários de contato.",
      "Conteúdo demonstrativo e informativo — a adequação de uma empresa específica depende de um diagnóstico próprio.",
    ],
  },
  {
    slug: "verificacoes-antes-de-comprar-imovel-comercial",
    title: "O que verificar antes de comprar um imóvel comercial",
    summary: "Uma lista inicial de pontos documentais frequentemente revisados em transações imobiliárias comerciais.",
    category: "Patrimônio",
    author: "Dr. Eduardo Castrillón",
    date: "2026-06-02",
    image: img("artigo-7.jpg"),
    imageAlt: "Estante antiga com livros em uma biblioteca, ambiente demonstrativo",
    readTimeMinutes: 6,
    status: "draft",
    relatedSlugs: ["due-diligence-fusoes-aquisicoes"],
    content: [
      "A compra de um imóvel comercial costuma envolver uma verificação documental mais ampla do que a de um imóvel residencial, dado o uso pretendido.",
      "Entre os pontos frequentemente revisados estão a matrícula atualizada do imóvel, certidões negativas, situação de eventuais ônus e conformidade com o uso do solo previsto para a região.",
      "Rascunho em preparação — este artigo ainda não foi publicado no site público.",
    ],
  },
];

export const institutionalPillars: InstitutionalPillar[] = [
  {
    title: "Estratégia",
    description: "Cada caso é lido antes de tudo como uma decisão de negócio ou de vida — não apenas como uma questão técnica isolada.",
    icon: "trending-up",
  },
  {
    title: "Segurança",
    description: "Preferimos prevenir uma disputa a vencê-la depois — o trabalho consultivo é priorizado sempre que possível.",
    icon: "shield-check",
  },
  {
    title: "Proximidade",
    description: "Comunicação direta, em linguagem clara, com atualizações regulares sobre cada etapa do caso.",
    icon: "heart",
  },
];

export const valloraAdvocaciaConfig: ShowcaseConfig = {
  slug: "advocacia",
  primaryCtaHref: "/modelos/advocacia#contato",
  company: {
    name: "Vallora Advocacia",
    shortName: "Vallora",
    segment: "Sociedade de advogados premium",
    slogan: "Estratégia jurídica para decisões que constroem o futuro.",
    description:
      "Escritório de advocacia fictício, criado como modelo demonstrativo do portfólio CronosStart. Atuação consultiva voltada a empresas, famílias e profissionais. Nomes, casos, profissionais e conteúdos são inteiramente fictícios.",
  },
  theme: {
    surface: "#F5F0E8",
    surfaceAlt: "#EFE3D0",
    ink: "#211C1D",
    inkMuted: "#6b5f57",
    primary: "#4A0F1D",
    primaryInk: "#F5F0E8",
    accent: "#C7A35A",
    border: "#E1D5C0",
    fontHeading: "'Newsreader Variable', Georgia, serif",
    fontBody: "'Inter Variable', system-ui, sans-serif",
    radiusCard: "1.1rem",
  },
  nav: [
    { label: "Início", href: "/modelos/advocacia" },
    { label: "Escritório", href: "/modelos/advocacia#escritorio" },
    { label: "Áreas de atuação", href: "/modelos/advocacia#areas" },
    { label: "Profissionais", href: "/modelos/advocacia#profissionais" },
    { label: "Conteúdos", href: "/modelos/advocacia#conteudos" },
    { label: "Perguntas frequentes", href: "/modelos/advocacia#faq" },
    { label: "Contato", href: "/modelos/advocacia#contato" },
  ],
  seo: {
    title: "Vallora Advocacia — modelo de site para escritório de advocacia (demonstrativo)",
    description:
      "Modelo demonstrativo de site jurídico premium, com áreas de atuação, profissionais, conteúdos e painel administrativo. Escritório fictício do portfólio CronosStart.",
  },
  hero: {
    variant: "split",
    eyebrow: "Vallora Advocacia",
    headline: "Estratégia jurídica para decisões que constroem o futuro",
    subheadline:
      "Atuação consultiva e personalizada para empresas, famílias e profissionais que buscam segurança, clareza e acompanhamento próximo.",
    ctaPrimaryLabel: "Solicitar atendimento",
    ctaSecondaryLabel: "Conhecer áreas de atuação",
  },
  institutionalPillars,
  process: [
    { title: "Primeiro contato", description: "Você descreve brevemente sua necessidade pelo formulário ou WhatsApp demonstrativo." },
    { title: "Análise inicial", description: "Entendimento do contexto e triagem da área de atuação mais adequada ao caso." },
    { title: "Definição da estratégia", description: "Apresentação do caminho sugerido, com etapas e expectativas alinhadas." },
    { title: "Acompanhamento", description: "Condução do caso com pontos de contato regulares ao longo do processo." },
    { title: "Atualizações e próximos passos", description: "Comunicação clara sobre o andamento e o que vem a seguir." },
  ],
  practiceAreas,
  legalProfessionals,
  legalArticles,
  faq: [
    {
      question: "Como funciona a primeira consulta?",
      answer:
        "Neste modelo demonstrativo, a primeira consulta seria uma conversa inicial para entender o caso e indicar o profissional mais adequado — sem custo nesta etapa de triagem.",
    },
    {
      question: "Quais áreas são atendidas?",
      answer:
        "O escritório fictício apresenta oito áreas de atuação demonstrativas, de Direito Empresarial a Direito Imobiliário, listadas na seção 'Áreas de atuação'.",
    },
    {
      question: "O atendimento pode ser online?",
      answer: "Sim — em um projeto real, o escritório poderia oferecer atendimento presencial e por videochamada, conforme a preferência do cliente.",
    },
    {
      question: "Quais documentos devo reunir?",
      answer:
        "Varia conforme o caso. Em um atendimento real, a lista de documentos necessários seria informada após a análise inicial da situação.",
    },
    {
      question: "Como são definidos os honorários?",
      answer:
        "Neste modelo demonstrativo não há valores reais. Em um escritório real, os honorários costumam ser definidos após entender a complexidade e o escopo do caso.",
    },
    {
      question: "O envio do formulário cria algum vínculo profissional?",
      answer:
        "Não. O formulário deste site é demonstrativo — nenhum dado é enviado de verdade e nenhum vínculo advogado-cliente é criado ao preenchê-lo.",
    },
    {
      question: "Os profissionais e as informações deste site são reais?",
      answer:
        "Não. Vallora Advocacia é um escritório fictício, criado exclusivamente como modelo de portfólio. Nomes, fotos, formações e conteúdos são inteiramente demonstrativos.",
    },
    {
      question: "Como solicito um site parecido com este para o meu negócio?",
      answer:
        "Use o link 'Quero um site como este', no rodapé, para falar com a equipe da CronosStart sobre um projeto personalizado para o seu escritório ou empresa.",
    },
  ],
  legalContactForm: {
    areaOptions: practiceAreas.map((a) => a.title),
    personTypes: ["Pessoa física", "Pessoa jurídica"],
    contactPreferences: ["WhatsApp", "E-mail", "Telefone"],
  },
  demonstrativeDisclaimer: "Conteúdo demonstrativo e informativo. Não substitui orientação jurídica individualizada.",
  contactCta: {
    title: "Vamos entender o seu caso?",
    description: "Preencha o formulário demonstrativo ou fale pelo WhatsApp fictício — respondemos com os próximos passos.",
    buttonLabel: "Solicitar atendimento",
  },
  contact: {
    whatsappNumber: "5511977776000",
    whatsappMessage: "Olá! Gostaria de solicitar atendimento com a Vallora Advocacia (site demonstrativo).",
    email: "contato@vallora-advocacia-demo.com.br",
    phone: "(11) 4000-2200",
    city: "São Paulo",
    state: "SP",
    hours: "Segunda a sexta, 9h às 18h",
  },
  sections: {},
};
