import type {
  ShowcaseCompany,
  ShowcaseTheme,
  NavItem,
  ShowcaseContact,
  CatalogCategory,
  CatalogCollection,
  CatalogAmbiente,
  CatalogProduct,
  FaqItem,
  ShowcaseConfig,
} from "./types";

/**
 * Maison Lume — loja fictícia de móveis, decoração e interiores. Modelo
 * demonstrativo da CronosStart; não representa uma empresa real.
 *
 * Tipos de catálogo (CatalogCategory/CatalogCollection/CatalogAmbiente/
 * CatalogProduct) são genéricos por design — reaproveitáveis pelos próximos
 * modelos baseados em produto/preço/oferta (Nexora Tech, Prisma Ótica, Pata
 * Nobre, Mercado Vitta), que ainda não foram iniciados.
 */

export const maisonLumeCompany: ShowcaseCompany = {
  name: "Maison Lume",
  shortName: "Lume",
  segment: "Móveis, decoração e interiores",
  slogan: "Ambientes com identidade, luz e conforto.",
  description:
    "Loja fictícia de móveis e decoração, criada como modelo demonstrativo da CronosStart. Curadoria de peças autorais para projetar ambientes com identidade própria.",
};

export const maisonLumeTheme: ShowcaseTheme = {
  surface: "#faf7f2",
  surfaceAlt: "#f1ebe0",
  ink: "#2b2621",
  inkMuted: "#7a7168",
  primary: "#2b2621",
  primaryInk: "#faf7f2",
  accent: "#a9784f",
  border: "#e2d8c7",
  fontHeading: "'Fraunces Variable', Georgia, serif",
  fontBody: "'Inter Variable', system-ui, sans-serif",
  radiusCard: "0.5rem",
};

export const maisonLumeNav: NavItem[] = [
  { label: "Início", href: "/modelos/moveis-decoracao" },
  { label: "Catálogo", href: "/modelos/moveis-decoracao#catalogo" },
  { label: "Coleções", href: "/modelos/moveis-decoracao#colecoes" },
  { label: "Ambientes", href: "/modelos/moveis-decoracao#ambientes" },
  { label: "Ofertas", href: "/modelos/moveis-decoracao#ofertas" },
  { label: "Sobre", href: "/modelos/moveis-decoracao#sobre" },
];

export const maisonLumeContact: ShowcaseContact = {
  whatsappNumber: "5511955550000",
  whatsappMessage: "Olá! Vi o catálogo da Maison Lume e gostaria de solicitar um orçamento.",
  email: "contato@maisonlume-demo.com.br",
  phone: "(11) 4000-5100",
  city: "São Paulo",
  state: "SP",
  hours: "Segunda a sábado, 10h às 19h",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
};

export const maisonLumeSeo = {
  title: "Maison Lume — Móveis, decoração e interiores (modelo demonstrativo)",
  description:
    "Modelo demonstrativo de loja de móveis e decoração, com catálogo por categorias, coleções, ambientes, ofertas e painel administrativo. Projeto fictício da CronosStart.",
  ogImage: "/images/showcases/moveis-decoracao/screenshot.png",
  ogImageAlt: "Maison Lume — modelo demonstrativo CronosStart",
};

export const categories: CatalogCategory[] = [
  { slug: "sala", name: "Sala", description: "Sofás, poltronas e composições para o coração da casa.", icon: "sofa", order: 1, active: true },
  { slug: "quarto", name: "Quarto", description: "Camas, criados-mudos e guarda-roupas para descansar bem.", icon: "bed", order: 2, active: true },
  { slug: "cozinha", name: "Cozinha", description: "Mesas, cadeiras e buffets para refeições em família.", icon: "layers", order: 3, active: true },
  { slug: "escritorio", name: "Escritório", description: "Mesas e cadeiras pensadas para dias produtivos.", icon: "briefcase", order: 4, active: true },
  { slug: "iluminacao", name: "Iluminação", description: "Luminárias e pendentes que definem o clima do ambiente.", icon: "lamp", order: 5, active: true },
  { slug: "decoracao", name: "Decoração", description: "Espelhos, tapetes e objetos que fecham a composição.", icon: "palette", order: 6, active: true },
  { slug: "area-externa", name: "Área externa", description: "Conjuntos para varandas, jardins e áreas de convívio.", icon: "leaf", order: 7, active: true },
];

const collectionImage = (slug: string) => `/images/showcases/moveis-decoracao/collections/${slug}.jpg`;
const ambienteImage = (slug: string) => `/images/showcases/moveis-decoracao/ambientes/${slug}.jpg`;

export const collections: CatalogCollection[] = [
  { slug: "essencial", name: "Essencial", description: "Peças enxutas e atemporais, para começar um ambiente com clareza.", tone: "linen", order: 1, active: true, image: collectionImage("essencial") },
  { slug: "aurora", name: "Aurora", description: "Tons claros e formas suaves, inspirados na luz da manhã.", tone: "sand", order: 2, active: true, featured: true, image: collectionImage("aurora") },
  { slug: "nordica", name: "Nórdica", description: "Linhas minimalistas e madeira clara, com conforto funcional.", tone: "stone", order: 3, active: true, image: collectionImage("nordica") },
  { slug: "terra", name: "Terra", description: "Tons quentes e materiais naturais, para ambientes acolhedores.", tone: "clay", order: 4, active: true, featured: true, image: collectionImage("terra") },
  { slug: "contemporanea", name: "Contemporânea", description: "Volumes marcantes e acabamentos escuros, com presença editorial.", tone: "graphite", order: 5, active: true, image: collectionImage("contemporanea") },
];

export const ambientes: CatalogAmbiente[] = [
  {
    slug: "sala-contemporanea", name: "Sala contemporânea", description: "Composição aberta, com peças de destaque e iluminação em camadas.", tone: "sand", order: 1, active: true, shoppable: true,
    image: ambienteImage("sala-contemporanea"),
    hotspots: [
      { productSlug: "sofa-modular-aurora", x: 34, y: 62 },
      { productSlug: "mesa-de-centro-nordica", x: 52, y: 82 },
      { productSlug: "luminaria-de-piso-aurora", x: 78, y: 40 },
      { productSlug: "tapete-aurora-grande", x: 48, y: 92 },
    ],
  },
  { slug: "quarto-minimalista", name: "Quarto minimalista", description: "Essencial, silencioso e funcional — o básico bem resolvido.", tone: "linen", order: 2, active: true, image: ambienteImage("quarto-minimalista") },
  { slug: "escritorio-elegante", name: "Escritório elegante", description: "Um espaço de trabalho com presença, sem perder o conforto.", tone: "graphite", order: 3, active: true, image: ambienteImage("escritorio-elegante") },
  { slug: "varanda-acolhedora", name: "Varanda acolhedora", description: "Conforto para os dias mais longos, com verde e tecidos naturais.", tone: "sage", order: 4, active: true, image: ambienteImage("varanda-acolhedora") },
  { slug: "sala-de-jantar", name: "Sala de jantar", description: "Mesas e cadeiras pensadas para reunir e receber bem.", tone: "walnut", order: 5, active: true, image: ambienteImage("sala-de-jantar") },
  {
    slug: "ambiente-integrado", name: "Ambiente integrado", description: "Sala, jantar e estar conversando em uma só composição.", tone: "clay", order: 6, active: true, shoppable: true,
    image: ambienteImage("ambiente-integrado"),
    hotspots: [
      { productSlug: "estante-modular-terra", x: 22, y: 45 },
      { productSlug: "buffet-essencial", x: 62, y: 55 },
    ],
  },
];

const productImage = (slug: string) => `/images/showcases/moveis-decoracao/products/${slug}.jpg`;

export const products: CatalogProduct[] = [
  {
    id: "prod-01", slug: "sofa-modular-aurora", sku: "ML-SL-001", name: "Sofá Modular Aurora",
    description: "Sofá modular de três módulos, estofado em linho claro, pensado para reconfigurar a sala conforme a ocasião.",
    category: "sala", collection: "aurora", ambiente: "sala-contemporanea",
    price: 7290, materials: ["Linho", "Madeira maciça", "Espuma D33"], dimensions: "280 x 95 x 80 cm",
    colors: ["Areia", "Off-white", "Grafite"], tone: "sand", icon: "sofa",
    available: true, featured: true, displayOrder: 1, createdAt: "2026-03-02", updatedAt: "2026-06-18",
    image: productImage("sofa-modular-aurora"),
  },
  {
    id: "prod-02", slug: "poltrona-terra", sku: "ML-SL-002", name: "Poltrona Terra",
    description: "Poltrona de braço largo com base em madeira torneada, ideal para um canto de leitura.",
    category: "sala", collection: "terra", ambiente: "sala-contemporanea",
    price: 2690, materials: ["Veludo", "Madeira de reflorestamento"], dimensions: "82 x 90 x 95 cm",
    colors: ["Terracota", "Bege"], tone: "clay", icon: "sofa", badge: "Mais procurado",
    available: true, featured: false, displayOrder: 2, createdAt: "2026-03-02", updatedAt: "2026-05-30",
    image: productImage("poltrona-terra"),
  },
  {
    id: "prod-03", slug: "mesa-de-centro-nordica", sku: "ML-SL-003", name: "Mesa de Centro Nórdica",
    description: "Mesa de centro em madeira clara com tampo levemente ovalado e pés palito.",
    category: "sala", collection: "nordica", ambiente: "sala-contemporanea",
    price: 1690, previousPrice: 1990, offerActive: true, offerEndsAt: "2026-09-15",
    materials: ["Madeira clara"], dimensions: "110 x 55 x 38 cm", colors: ["Natural"],
    tone: "walnut", icon: "layers", available: true, featured: false, displayOrder: 3,
    createdAt: "2026-02-10", updatedAt: "2026-07-01",
    image: productImage("mesa-de-centro-nordica"),
  },
  {
    id: "prod-04", slug: "estante-modular-terra", sku: "ML-SL-004", name: "Estante Modular Terra",
    description: "Estante modular vazada, combina exibição de objetos com espaço fechado para guardar.",
    category: "sala", collection: "terra", ambiente: "ambiente-integrado",
    price: 3450, materials: ["MDF", "Madeira maciça"], dimensions: "220 x 180 x 35 cm",
    colors: ["Nogueira", "Preto"], tone: "walnut", icon: "layers",
    available: true, featured: false, displayOrder: 4, createdAt: "2026-01-20", updatedAt: "2026-06-02",
    image: productImage("estante-modular-terra"),
  },
  {
    id: "prod-05", slug: "cama-casal-nordica", sku: "ML-QT-001", name: "Cama Casal Nórdica",
    description: "Cabeceira estofada baixa e estrutura em madeira clara, para um quarto sereno.",
    category: "quarto", collection: "nordica", ambiente: "quarto-minimalista",
    price: 4290, materials: ["Linho", "Madeira clara"], dimensions: "158 x 203 x 100 cm",
    colors: ["Off-white", "Cinza claro"], tone: "linen", icon: "bed",
    available: true, featured: true, displayOrder: 5, createdAt: "2026-03-15", updatedAt: "2026-06-20",
    image: productImage("cama-casal-nordica"),
  },
  {
    id: "prod-06", slug: "criado-mudo-essencial", sku: "ML-QT-002", name: "Criado-mudo Essencial",
    description: "Criado-mudo compacto com uma gaveta e nicho aberto, em madeira clara.",
    category: "quarto", collection: "essencial", ambiente: "quarto-minimalista",
    price: 890, materials: ["Madeira clara", "MDF"], dimensions: "45 x 50 x 35 cm", colors: ["Natural", "Branco"],
    tone: "sand", icon: "layers", available: true, featured: false, displayOrder: 6,
    createdAt: "2026-01-05", updatedAt: "2026-04-11",
    image: productImage("criado-mudo-essencial"),
  },
  {
    id: "prod-07", slug: "guarda-roupa-contemporaneo", sku: "ML-QT-003", name: "Guarda-roupa Contemporâneo",
    description: "Guarda-roupa 6 portas com puxadores discretos e acabamento fosco.",
    category: "quarto", collection: "contemporanea", ambiente: "quarto-minimalista",
    price: 5890, materials: ["MDF", "Ferragens de fechamento suave"], dimensions: "260 x 220 x 60 cm",
    colors: ["Grafite", "Off-white"], tone: "graphite", icon: "home", isNew: true, badge: "Novo",
    available: true, featured: true, displayOrder: 7, createdAt: "2026-06-28", updatedAt: "2026-07-05",
    image: productImage("guarda-roupa-contemporaneo"),
  },
  {
    id: "prod-08", slug: "mesa-de-jantar-terra-6-lugares", sku: "ML-CZ-001", name: "Mesa de Jantar Terra 6 Lugares",
    description: "Mesa de jantar em madeira maciça com tampo tratado, para 6 lugares.",
    category: "cozinha", collection: "terra", ambiente: "sala-de-jantar",
    price: 4190, materials: ["Madeira maciça"], dimensions: "180 x 90 x 76 cm", colors: ["Nogueira"],
    tone: "walnut", icon: "layers", available: true, featured: true, displayOrder: 8,
    createdAt: "2026-02-18", updatedAt: "2026-05-22",
    image: productImage("mesa-de-jantar-terra-6-lugares"),
  },
  {
    id: "prod-09", slug: "cadeira-nordica", sku: "ML-CZ-002", name: "Cadeira Nórdica (unidade)",
    description: "Cadeira em madeira clara com assento estofado, vendida por unidade.",
    category: "cozinha", collection: "nordica", ambiente: "sala-de-jantar",
    price: 690, previousPrice: 790, offerActive: true, offerEndsAt: "2026-09-01",
    materials: ["Madeira clara", "Tecido"], dimensions: "45 x 82 x 52 cm", colors: ["Natural", "Cinza"],
    tone: "linen", icon: "sofa", badge: "Kit disponível", available: true, featured: false, displayOrder: 9,
    createdAt: "2026-02-18", updatedAt: "2026-07-08",
    image: productImage("cadeira-nordica"),
  },
  {
    id: "prod-10", slug: "buffet-essencial", sku: "ML-CZ-003", name: "Buffet Essencial",
    description: "Buffet baixo com portas de correr, para louças e itens de mesa.",
    category: "cozinha", collection: "essencial", ambiente: "ambiente-integrado",
    price: 2290, materials: ["MDF", "Madeira clara"], dimensions: "160 x 75 x 40 cm", colors: ["Natural"],
    tone: "sand", icon: "layers", available: false, featured: false, displayOrder: 10,
    createdAt: "2026-01-12", updatedAt: "2026-04-30",
    image: productImage("buffet-essencial"),
  },
  {
    id: "prod-11", slug: "mesa-escritorio-contemporanea", sku: "ML-ES-001", name: "Mesa Escritório Contemporânea",
    description: "Mesa de trabalho com tampo em madeira escura e estrutura metálica fina.",
    category: "escritorio", collection: "contemporanea", ambiente: "escritorio-elegante",
    price: 2190, materials: ["Madeira", "Aço pintado"], dimensions: "140 x 75 x 65 cm", colors: ["Grafite"],
    tone: "graphite", icon: "layers", available: true, featured: false, displayOrder: 11,
    createdAt: "2026-03-25", updatedAt: "2026-06-14",
    image: productImage("mesa-escritorio-contemporanea"),
  },
  {
    id: "prod-12", slug: "cadeira-ergonomica-essencial", sku: "ML-ES-002", name: "Cadeira Ergonômica Essencial",
    description: "Cadeira de escritório com apoio lombar ajustável e revestimento respirável.",
    category: "escritorio", collection: "essencial", ambiente: "escritorio-elegante",
    price: 1390, previousPrice: 1590, offerActive: true, offerEndsAt: "2026-08-31",
    materials: ["Tela respirável", "Estrutura em aço"], dimensions: "60 x 110 x 60 cm", colors: ["Preto", "Cinza"],
    tone: "stone", icon: "sofa", available: true, featured: false, displayOrder: 12,
    createdAt: "2026-02-02", updatedAt: "2026-07-10",
    image: productImage("cadeira-ergonomica-essencial"),
  },
  {
    id: "prod-13", slug: "luminaria-de-piso-aurora", sku: "ML-IL-001", name: "Luminária de Piso Aurora",
    description: "Luminária de piso com cúpula em tecido e base em madeira clara.",
    category: "iluminacao", collection: "aurora", ambiente: "sala-contemporanea",
    price: 990, materials: ["Tecido", "Madeira clara"], dimensions: "40 x 160 cm (Ø x altura)", colors: ["Areia"],
    tone: "sand", icon: "lamp", isNew: true, badge: "Novo", available: true, featured: false, displayOrder: 13,
    createdAt: "2026-06-30", updatedAt: "2026-07-04",
    image: productImage("luminaria-de-piso-aurora"),
  },
  {
    id: "prod-14", slug: "pendente-nordico-trio", sku: "ML-IL-002", name: "Pendente Nórdico Trio",
    description: "Conjunto de três pendentes em vidro fosco, para compor sobre a mesa de jantar.",
    category: "iluminacao", collection: "nordica", ambiente: "sala-de-jantar",
    price: 1190, materials: ["Vidro fosco", "Metal"], dimensions: "3x 18 cm Ø, cabo ajustável", colors: ["Branco fosco"],
    tone: "linen", icon: "lamp", available: true, featured: true, displayOrder: 14,
    createdAt: "2026-03-08", updatedAt: "2026-05-18",
    image: productImage("pendente-nordico-trio"),
  },
  {
    id: "prod-15", slug: "espelho-decorativo-terra", sku: "ML-DC-001", name: "Espelho Decorativo Terra",
    description: "Espelho redondo com moldura em madeira, para compor paredes com leveza.",
    category: "decoracao", collection: "terra", ambiente: "quarto-minimalista",
    price: 690, previousPrice: 850, offerActive: true, offerEndsAt: "2026-08-25",
    materials: ["Madeira", "Vidro espelhado"], dimensions: "70 cm Ø", colors: ["Natural"],
    tone: "clay", icon: "palette", available: true, featured: false, displayOrder: 15,
    createdAt: "2026-01-28", updatedAt: "2026-07-06",
    image: productImage("espelho-decorativo-terra"),
  },
  {
    id: "prod-16", slug: "tapete-aurora-grande", sku: "ML-DC-002", name: "Tapete Aurora Grande",
    description: "Tapete de fibra natural em tom claro, para delimitar o ambiente da sala.",
    category: "decoracao", collection: "aurora", ambiente: "sala-contemporanea",
    price: 1290, materials: ["Fibra natural"], dimensions: "250 x 300 cm", colors: ["Areia", "Cru"],
    tone: "sand", icon: "palette", available: true, featured: false, displayOrder: 16,
    createdAt: "2026-02-22", updatedAt: "2026-05-02",
    image: productImage("tapete-aurora-grande"),
  },
  {
    id: "prod-17", slug: "conjunto-area-externa-terra", sku: "ML-AE-001", name: "Conjunto Área Externa Terra",
    description: "Conjunto com poltrona, mesa lateral e almofadas para varandas e áreas externas cobertas.",
    category: "area-externa", collection: "terra", ambiente: "varanda-acolhedora",
    price: 3990, materials: ["Fibra sintética", "Alumínio", "Tecido impermeável"], dimensions: "Poltrona 75 x 80 x 85 cm",
    colors: ["Terracota", "Bege"], tone: "clay", icon: "sofa", available: true, featured: true, displayOrder: 17,
    createdAt: "2026-03-30", updatedAt: "2026-06-25",
    image: productImage("conjunto-area-externa-terra"),
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Como solicitar um orçamento?",
    answer: "Basta preencher o formulário de orçamento com o produto ou ambiente de interesse, ou falar diretamente pelo WhatsApp — em ambos os casos, um consultor retorna com os detalhes.",
  },
  {
    question: "Os móveis podem ser personalizados?",
    answer: "Muitos itens aceitam ajustes de cor, tecido ou medidas, conforme a peça e a disponibilidade — isso é avaliado junto com um consultor no orçamento.",
  },
  {
    question: "Como funciona a entrega?",
    answer: "O prazo e as condições de entrega variam por região e pelo volume do pedido, sendo confirmados durante o atendimento — nesta demonstração, o processo é apenas ilustrativo.",
  },
  {
    question: "É possível montar um ambiente completo?",
    answer: "Sim — a seção \"Compre o ambiente\" apresenta composições completas, e um consultor pode ajudar a adaptar os itens ao seu espaço.",
  },
  {
    question: "Os preços apresentados são definitivos?",
    answer: "Os preços exibidos são demonstrativos, usados apenas para ilustrar como o catálogo funciona. Em um projeto real, os valores são definidos e mantidos atualizados pela loja através do painel administrativo.",
  },
  {
    question: "Como falar com um consultor?",
    answer: "Pelo botão de WhatsApp em qualquer página, ou pelo formulário de orçamento — a Maison Lume é um modelo demonstrativo, então o contato aqui é apenas ilustrativo.",
  },
];

export const maisonLumeConfig: ShowcaseConfig = {
  slug: "moveis-decoracao",
  primaryCtaHref: "#catalogo",
  company: maisonLumeCompany,
  theme: maisonLumeTheme,
  nav: maisonLumeNav,
  seo: maisonLumeSeo,
  hero: {
    variant: "split",
    eyebrow: "Modelo demonstrativo — móveis e decoração",
    headline: "Ambientes com identidade,",
    highlight: "luz e conforto.",
    subheadline:
      "Uma curadoria de peças autorais para montar espaços que contam uma história — da sala à área externa.",
    ctaPrimaryLabel: "Ver catálogo completo",
    ctaSecondaryLabel: "Explorar ambientes",
    chips: categories.slice(0, 6).map((c) => ({ label: c.name, icon: c.icon })),
  },
  contactCta: {
    title: "Vamos montar o seu ambiente?",
    description: "Conte o que você procura e um consultor Maison Lume retorna com sugestões e valores.",
    buttonLabel: "Solicitar orçamento",
  },
  contact: maisonLumeContact,
  faq: faqItems,
  sections: { faq: true, about: true },
  whatsappButtonVariant: "neutral",
  footerShowHours: true,
  footerExtra: {
    title: "Categorias",
    links: [
      ...categories.map((c) => ({ label: c.name, href: `#catalogo?categoria=${c.slug}` })),
      { label: "Quero um projeto assim", href: "/" },
      { label: "Acesso administrativo (demonstrativo)", href: "/modelos/moveis-decoracao/admin" },
    ],
  },
  about: {
    eyebrow: "Sobre este modelo",
    title: "Um modelo pensado para lojas de produtos e catálogo",
    paragraphs: [
      "A Maison Lume é uma marca fictícia, criada exclusivamente como modelo demonstrativo do portfólio da CronosStart — não representa uma loja real, física ou online.",
      "O catálogo, os preços, as coleções e os ambientes apresentados aqui têm fins apenas ilustrativos, para mostrar como uma loja de móveis e decoração pode funcionar com um site profissional: catálogo navegável, ofertas, e um painel administrativo completo por trás de tudo.",
      "Se você tem um negócio de móveis, decoração ou qualquer outro segmento baseado em produtos e catálogo, a CronosStart pode desenvolver um projeto com a mesma qualidade — adaptado à sua marca e ao seu público.",
    ],
    stats: [
      { label: "Produtos no catálogo", value: "17" },
      { label: "Categorias", value: "7" },
      { label: "Coleções", value: "5" },
      { label: "Ambientes inspiracionais", value: "6" },
    ],
    statsNote: "Números referentes apenas ao catálogo demonstrativo deste modelo.",
    image: "/images/showcases/moveis-decoracao/hero-detail.jpg",
    imageAlt: "Detalhe de material e textura em madeira",
  },
};
