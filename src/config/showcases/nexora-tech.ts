import type {
  ShowcaseCompany,
  ShowcaseTheme,
  NavItem,
  ShowcaseContact,
  CatalogCategory,
  CatalogBrand,
  CatalogProduct,
  CatalogKit,
  FaqItem,
  ShowcaseConfig,
} from "./types";

/**
 * Nexora Tech — loja fictícia de eletrônicos e tecnologia. Modelo
 * demonstrativo da CronosStart; não representa uma empresa real.
 *
 * Estratégia de imagens de produto (revisada): o sourcing de fotos de
 * estoque para esta categoria (smartphones, notebooks, PCs) expôs marcas
 * reais de forma consistente (Apple, Samsung, Motorola, Canon,
 * Hasselblad/OnePlus, AMD, Gigabyte, Logitech) na maioria das imagens
 * testadas, então NÃO usamos fotografia de estoque para os produtos em si.
 * Cada produto tem um campo opcional `images` (main/clean/angle2/detail/
 * context, ver types.ts) — quando ausente, o card/hero/modal recorre ao
 * render vetorial premium por tipo de dispositivo (ver
 * src/utils/nexoraProductRender.ts), nunca a um ícone genérico em círculo.
 * O painel administrativo permite preencher qualquer um desses campos a
 * qualquer momento para substituir o render vetorial por uma foto real.
 *
 * Fotografia real: o cliente forneceu 26 renders próprios em dois lotes
 * (pasta `_photo-inbox/nexora-tech/`, fora do controle de versão, removida
 * após uso), muitos já rotulados "NEXORA" ou com um monograma fictício
 * neutro — cada imagem foi inspecionada individualmente antes do uso, sem
 * logos/silhuetas de marcas reais. **Os 24 produtos do catálogo têm foto
 * real** (`images.main`, com `angle2` extra em nexora-vision-x1); o render
 * vetorial (src/utils/nexoraProductRender.ts) permanece como sistema de
 * apoio (categorias, filtros, badges, estados vazios, decoração) e como
 * fallback automático para qualquer produto futuro sem foto cadastrada.
 * Pequenas inconsistências de marca fictícia nas fotos são conhecidas
 * (algumas mostram "NEXORA" ou um monograma "M" em produtos catalogados sob
 * Draventa/Orbex/Velstra/Kaion) — cosmético, não afeta a navegação.
 */

export const nexoraTechCompany: ShowcaseCompany = {
  name: "Nexora Tech",
  shortName: "Nexora",
  segment: "Eletrônicos e tecnologia",
  slogan: "Tecnologia com propósito, escolhida com clareza.",
  description:
    "Loja fictícia de eletrônicos e tecnologia, criada como modelo demonstrativo da CronosStart. Catálogo com comparador de produtos, kits e painel administrativo completo.",
};

export const nexoraTechTheme: ShowcaseTheme = {
  surface: "#0a0e16",
  surfaceAlt: "#101625",
  ink: "#eef2fa",
  inkMuted: "rgba(238,242,250,0.64)",
  primary: "#3b6bff",
  primaryInk: "#ffffff",
  accent: "#22d3ee",
  border: "rgba(255,255,255,0.09)",
  fontHeading: "'Plus Jakarta Sans Variable', system-ui, sans-serif",
  fontBody: "'Inter Variable', system-ui, sans-serif",
  radiusCard: "0.85rem",
};

export const nexoraTechNav: NavItem[] = [
  { label: "Início", href: "/modelos/eletronicos" },
  { label: "Catálogo", href: "/modelos/eletronicos#catalogo" },
  { label: "Lançamentos", href: "/modelos/eletronicos#lancamentos" },
  { label: "Ofertas", href: "/modelos/eletronicos#ofertas" },
  { label: "Comparar", href: "/modelos/eletronicos#comparador" },
  { label: "Kits", href: "/modelos/eletronicos#kits" },
];

export const nexoraTechContact: ShowcaseContact = {
  whatsappNumber: "5511977778888",
  whatsappMessage: "Olá! Vi o catálogo da Nexora Tech e gostaria de mais informações.",
  email: "contato@nexoratech-demo.com.br",
  phone: "(11) 4500-9200",
  city: "São Paulo",
  state: "SP",
  hours: "Segunda a sábado, 9h às 20h",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
};

export const nexoraTechSeo = {
  title: "Nexora Tech — Loja de eletrônicos e tecnologia (modelo demonstrativo)",
  description:
    "Modelo demonstrativo da CronosStart para lojas de eletrônicos: catálogo com comparador de produtos, kits, ofertas e painel administrativo completo. Dados e preços fictícios.",
  ogImageAlt: "Nexora Tech — modelo demonstrativo de loja de eletrônicos",
};

export const nexoraTechFaq: FaqItem[] = [
  {
    question: "Como escolher a configuração ideal?",
    answer:
      "Use o assistente \"Não sabe qual configuração escolher?\" na página: selecione seu perfil de uso (trabalho, estudo, jogos, criação ou casa inteligente) e veja sugestões demonstrativas com uma breve explicação do porquê.",
  },
  {
    question: "Os produtos estão disponíveis?",
    answer:
      "Este é um catálogo demonstrativo. A disponibilidade e o estoque mostrados são ilustrativos e devem ser confirmados diretamente com um consultor antes de qualquer decisão.",
  },
  {
    question: "Posso comparar produtos?",
    answer:
      "Sim. Use o botão de comparação nos cards para adicionar até 4 produtos da mesma categoria (ex.: notebook com notebook) e veja uma tabela lado a lado com as principais especificações.",
  },
  {
    question: "Como funciona a garantia?",
    answer: "Cada produto exibe um prazo de garantia demonstrativo. Os termos reais variam por fabricante e loja.",
  },
  {
    question: "É possível montar um kit?",
    answer:
      "Sim, a seção de kits reúne combinações sugeridas (ex.: notebook + monitor + mouse) com uma economia demonstrativa em relação à compra avulsa.",
  },
  {
    question: "Existe pagamento online?",
    answer:
      "Não. Este é um modelo demonstrativo — não há checkout ou processamento de pagamento real. O carrinho apenas organiza uma lista para envio via WhatsApp.",
  },
  {
    question: "Como solicitar orçamento?",
    answer:
      "Pelo botão \"Solicitar orçamento\", pelo WhatsApp flutuante, ou preenchendo o formulário de atendimento com o produto, kit ou comparação de interesse.",
  },
  {
    question: "Os preços são reais?",
    answer:
      "Não. Todos os preços, marcas, produtos e disponibilidades apresentados são fictícios e servem apenas para demonstrar a experiência de navegação e o painel administrativo.",
  },
];

export const nexoraTechConfig: ShowcaseConfig = {
  slug: "eletronicos",
  primaryCtaHref: "#catalogo",
  company: nexoraTechCompany,
  theme: nexoraTechTheme,
  nav: nexoraTechNav,
  seo: nexoraTechSeo,
  hero: {
    variant: "split",
    eyebrow: "Lançamento Nexora",
    headline: "Nexora Vision X1",
    highlight: "clareza para decidir",
    subheadline:
      "Tecnologia com propósito: especificações claras, comparação lado a lado e um painel administrativo completo por trás de cada categoria.",
    ctaPrimaryLabel: "Ver detalhes",
    ctaSecondaryLabel: "Explorar lançamentos",
  },
  faq: nexoraTechFaq,
  contactCta: {
    title: "Vamos montar sua configuração ideal?",
    description: "Conte o que você procura e um consultor demonstrativo retorna com sugestões e valores.",
    buttonLabel: "Solicitar orçamento",
  },
  contact: nexoraTechContact,
  sections: {},
  whatsappButtonVariant: "neutral",
};

/** Cor de destaque por categoria — usada no visual técnico dos cards e nas seções de categoria. */
export const categoryAccents: Record<string, string> = {
  smartphones: "#3b82f6",
  notebooks: "#22d3ee",
  computadores: "#8b5cf6",
  monitores: "#38bdf8",
  audio: "#a78bfa",
  acessorios: "#06b6d4",
  "casa-inteligente": "#6366f1",
  gamer: "#d946ef",
  ofertas: "#f59e0b",
};

export const categories: CatalogCategory[] = [
  { slug: "smartphones", name: "Smartphones", description: "Linhas Vision e Prisma, do essencial ao topo de linha.", icon: "smartphone", order: 1, active: true },
  { slug: "notebooks", name: "Notebooks", description: "Para trabalho, estudo, criação e jogos.", icon: "laptop", order: 2, active: true },
  { slug: "computadores", name: "Computadores", description: "Desktops compactos e torres de alta performance.", icon: "cpu", order: 3, active: true },
  { slug: "monitores", name: "Monitores", description: "De telas de produtividade a painéis para jogos.", icon: "monitor", order: 4, active: true },
  { slug: "audio", name: "Áudio", description: "Fones, earbuds e soundbars com som Nexora Pulse.", icon: "headphones", order: 5, active: true },
  { slug: "acessorios", name: "Acessórios", description: "Teclados, mouses e carregadores compatíveis.", icon: "package", order: 6, active: true },
  { slug: "casa-inteligente", name: "Casa inteligente", description: "Hubs, câmeras e tomadas conectadas.", icon: "wifi", order: 7, active: true },
  { slug: "gamer", name: "Gamer", description: "Controles, cadeiras e periféricos de alta resposta.", icon: "gamepad", order: 8, active: true },
  { slug: "ofertas", name: "Ofertas", description: "Economia demonstrativa em produtos selecionados.", icon: "zap", order: 9, active: true },
];

export const brands: CatalogBrand[] = [
  { slug: "nexora", name: "Nexora", description: "Marca própria — linhas Vision, Pulse, Core, Air, Studio e Home.", active: true },
  { slug: "kaion", name: "Kaion", description: "Eletrônicos de entrada com bom custo-benefício.", active: true },
  { slug: "velstra", name: "Velstra", description: "Monitores e telas de precisão para produtividade.", active: true },
  { slug: "orbex", name: "Orbex", description: "Áudio e acessórios de precisão.", active: true },
  { slug: "draventa", name: "Draventa", description: "Linha gamer de alta performance.", active: true },
];

const D = "2026-05-01T10:00:00.000Z";
const U = "2026-07-20T15:30:00.000Z";

export const products: CatalogProduct[] = [
  // ---------- Smartphones ----------
  {
    id: "p01", slug: "nexora-vision-x1", sku: "NX-VX1-256", name: "Nexora Vision X1",
    description: "Smartphone topo de linha da Nexora, com tela de 6,7\" e sistema de três câmeras para fotos em qualquer luz.",
    category: "smartphones", subcategory: "Topo de linha", brand: "nexora",
    price: 6499, previousPrice: undefined, offerActive: false,
    materials: ["Alumínio aeroespacial", "Vidro Gorilla"], dimensions: "161 × 75 × 7.9 mm, 192 g",
    colors: ["Azul titânio", "Roxo meia-noite", "Prata"], tone: "graphite", icon: "smartphone",
    available: true, featured: true, isNew: true, badge: "Lançamento", displayOrder: 1,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 34,
    specs: { tela: "6,7\" AMOLED 120Hz", processador: "Nexora N3 Octa-core", camera: "Tripla 50+12+8 MP", memoria: "12GB RAM", armazenamento: "256GB", bateria: "5000 mAh", conectividade: "5G, Wi-Fi 6E, NFC" },
    variationOptions: [{ label: "Armazenamento", values: ["256GB", "512GB"] }],
    relatedSlugs: ["nexora-pulse-buds", "nexora-air-charger"], compatibleAccessories: ["nexora-air-charger", "nexora-pulse-buds"],
    images: {
      main: "/images/showcases/eletronicos/products/nexora-vision-x1-main.jpg",
      angle2: "/images/showcases/eletronicos/products/nexora-vision-x1-angle2.jpg",
    },
  },
  {
    id: "p02", slug: "nexora-vision-lite", sku: "NX-VLT-128", name: "Nexora Vision Lite",
    description: "Versão equilibrada da linha Vision, com ótimo desempenho no dia a dia e bateria de longa duração.",
    category: "smartphones", subcategory: "Intermediário", brand: "nexora",
    price: 2799, previousPrice: 3199, offerActive: true, offerEndsAt: "2026-08-30T23:59:59.000Z",
    materials: ["Policarbonato", "Vidro"], dimensions: "159 × 74 × 8.2 mm, 186 g",
    colors: ["Prata", "Preto espacial"], tone: "stone", icon: "smartphone",
    available: true, featured: false, isNew: false, badge: "Oferta", displayOrder: 2,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 51,
    specs: { tela: "6,4\" AMOLED 90Hz", processador: "Nexora N2 Octa-core", camera: "Dupla 50+8 MP", memoria: "8GB RAM", armazenamento: "128GB", bateria: "5200 mAh", conectividade: "5G, Wi-Fi 6, NFC" },
    variationOptions: [{ label: "Armazenamento", values: ["128GB", "256GB"] }],
    relatedSlugs: ["nexora-pulse-buds"], compatibleAccessories: ["nexora-air-charger"],
    images: { main: "/images/showcases/eletronicos/products/nexora-vision-lite-main.jpg" },
  },
  {
    id: "p03", slug: "kaion-prisma-5", sku: "KA-PR5-128", name: "Kaion Prisma 5",
    description: "Smartphone de entrada da Kaion, com boa autonomia e câmera versátil para o uso diário.",
    category: "smartphones", subcategory: "Entrada", brand: "kaion",
    price: 1399, previousPrice: undefined, offerActive: false,
    materials: ["Policarbonato"], dimensions: "163 × 76 × 8.6 mm, 195 g",
    colors: ["Azul titânio", "Preto espacial"], tone: "stone", icon: "smartphone",
    available: true, featured: false, isNew: false, displayOrder: 3,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 40,
    specs: { tela: "6,5\" LCD 90Hz", processador: "Octa-core 2.0GHz", camera: "Dupla 48+2 MP", memoria: "6GB RAM", armazenamento: "128GB", bateria: "5000 mAh", conectividade: "4G, Wi-Fi 5" },
    relatedSlugs: [],
    images: { main: "/images/showcases/eletronicos/products/kaion-prisma-5-main.jpg" },
  },

  // ---------- Notebooks ----------
  {
    id: "p04", slug: "nexora-studio-14", sku: "NX-ST14-16512", name: "Nexora StudioBook 14",
    description: "Notebook para criação de conteúdo, com tela de cor precisa e desempenho consistente sob carga.",
    category: "notebooks", subcategory: "Criação de conteúdo", brand: "nexora",
    price: 8990, previousPrice: undefined, offerActive: false,
    materials: ["Alumínio unibody"], dimensions: "312 × 220 × 15.8 mm, 1.38 kg",
    colors: ["Prata", "Azul titânio"], tone: "graphite", icon: "laptop",
    available: true, featured: true, isNew: false, badge: "Destaque", displayOrder: 4,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 18,
    specs: { processador: "Nexora Core i7-class", memoria: "16GB RAM", armazenamento: "512GB SSD", tela: "14\" 2.8K 100% DCI-P3", placaGrafica: "Gráficos integrados de alta performance", bateria: "Até 14h", peso: "1.38 kg" },
    variationOptions: [{ label: "Memória", values: ["16GB", "32GB"] }],
    relatedSlugs: ["velstra-view-27q", "orbex-click-pro"], compatibleAccessories: ["orbex-click-pro", "orbex-key-mech"],
    images: { main: "/images/showcases/eletronicos/products/nexora-studiobook-14-main.jpg" },
  },
  {
    id: "p05", slug: "nexora-core-book", sku: "NX-CB-8256", name: "Nexora CoreBook 14",
    description: "Notebook leve para o dia a dia, estudo e trabalho remoto, com boa autonomia de bateria.",
    category: "notebooks", subcategory: "Uso geral", brand: "nexora",
    price: 3799, previousPrice: 4299, offerActive: true, offerEndsAt: "2026-08-25T23:59:59.000Z",
    materials: ["Alumínio", "Policarbonato"], dimensions: "323 × 214 × 17.9 mm, 1.6 kg",
    colors: ["Prata"], tone: "stone", icon: "laptop",
    available: true, featured: false, isNew: false, badge: "Oferta", displayOrder: 5,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 27,
    specs: { processador: "Nexora Core i5-class", memoria: "8GB RAM", armazenamento: "256GB SSD", tela: "14\" Full HD IPS", placaGrafica: "Gráficos integrados", bateria: "Até 10h", peso: "1.6 kg" },
    relatedSlugs: ["orbex-click-pro"],
    images: { main: "/images/showcases/eletronicos/products/nexora-core-book-main.jpg" },
  },
  {
    id: "p06", slug: "draventa-strike-16", sku: "DV-STK16-16512", name: "Draventa Strike 16",
    description: "Notebook gamer com placa gráfica dedicada e tela de alta taxa de atualização para partidas competitivas.",
    category: "notebooks", subcategory: "Gamer", brand: "draventa",
    price: 10490, previousPrice: undefined, offerActive: false,
    materials: ["Alumínio", "Compósito reforçado"], dimensions: "356 × 262 × 24 mm, 2.4 kg",
    colors: ["Preto espacial", "Roxo meia-noite"], tone: "graphite", icon: "laptop",
    available: true, featured: false, isNew: true, badge: "Lançamento", displayOrder: 6,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 12,
    specs: { processador: "Nexora Core i7-class", memoria: "16GB RAM", armazenamento: "512GB SSD", tela: "16\" QHD 165Hz", placaGrafica: "Dedicada 8GB", bateria: "Até 6h", peso: "2.4 kg" },
    relatedSlugs: ["draventa-strike-controller", "velstra-curve-34u"], compatibleAccessories: ["draventa-arena-keyboard"],
    images: { main: "/images/showcases/eletronicos/products/draventa-strike-16-main.jpg" },
  },

  // ---------- Computadores ----------
  {
    id: "p07", slug: "nexora-core-mini", sku: "NX-CM-8256", name: "Nexora Core Mini",
    description: "Mini PC compacto e silencioso, ideal para escritório, estudo e uso doméstico.",
    category: "computadores", subcategory: "Mini PC", brand: "nexora",
    price: 2999, previousPrice: undefined, offerActive: false,
    materials: ["Alumínio escovado"], dimensions: "117 × 112 × 34 mm, 0.6 kg",
    colors: ["Prata", "Preto espacial"], tone: "stone", icon: "cpu",
    available: true, featured: false, isNew: false, displayOrder: 7,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 22,
    specs: { processador: "Nexora Core i5-class", memoria: "8GB RAM", armazenamento: "256GB SSD", placaGrafica: "Gráficos integrados", conectividade: "Wi-Fi 6, Bluetooth 5.2, 4x USB" },
    relatedSlugs: ["velstra-view-27q"],
    images: { main: "/images/showcases/eletronicos/products/nexora-core-mini-main.jpg" },
  },
  {
    id: "p08", slug: "draventa-forge-tower", sku: "DV-FT-32-1TB", name: "Draventa Forge Tower",
    description: "Torre gamer de alta performance, preparada para jogos em alta resolução e streaming simultâneo.",
    category: "computadores", subcategory: "Desktop gamer", brand: "draventa",
    price: 13990, previousPrice: undefined, offerActive: false,
    materials: ["Aço", "Vidro temperado"], dimensions: "210 × 470 × 460 mm, 11 kg",
    colors: ["Preto espacial"], tone: "graphite", icon: "cpu",
    available: true, featured: true, isNew: false, badge: "Destaque", displayOrder: 8,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 9,
    specs: { processador: "Nexora Core i9-class", memoria: "32GB RAM", armazenamento: "1TB SSD", placaGrafica: "Dedicada 12GB", conectividade: "Wi-Fi 6E, 6x USB" },
    relatedSlugs: ["velstra-curve-34u", "draventa-strike-controller"], compatibleAccessories: ["draventa-arena-keyboard"],
    images: { main: "/images/showcases/eletronicos/products/draventa-forge-tower-main.jpg" },
  },
  {
    id: "p09", slug: "kaion-office-cube", sku: "KA-OC-8256", name: "Kaion Office Cube",
    description: "Computador de entrada para tarefas administrativas, navegação e produtividade básica.",
    category: "computadores", subcategory: "Escritório", brand: "kaion",
    price: 1899, previousPrice: 2199, offerActive: true, offerEndsAt: "2026-08-28T23:59:59.000Z",
    materials: ["Aço"], dimensions: "180 × 350 × 380 mm, 5.2 kg",
    colors: ["Preto espacial"], tone: "graphite", icon: "cpu",
    available: true, featured: false, isNew: false, badge: "Oferta", displayOrder: 9,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 30,
    specs: { processador: "Quad-core 3.0GHz", memoria: "8GB RAM", armazenamento: "256GB SSD", placaGrafica: "Gráficos integrados", conectividade: "Wi-Fi 5, 4x USB" },
    relatedSlugs: [],
    images: { main: "/images/showcases/eletronicos/products/kaion-office-cube-main.jpg" },
  },

  // ---------- Monitores ----------
  {
    id: "p10", slug: "velstra-view-27q", sku: "VL-V27Q", name: "Velstra View 27Q",
    description: "Monitor 27\" QHD para produtividade e criação, com cores precisas e ajuste de altura.",
    category: "monitores", subcategory: "Produtividade", brand: "velstra",
    price: 1699, previousPrice: undefined, offerActive: false,
    materials: ["Plástico ABS", "Vidro"], dimensions: "613 × 465 × 220 mm, 4.8 kg",
    colors: ["Preto espacial"], tone: "graphite", icon: "monitor",
    available: true, featured: true, isNew: false, badge: "Destaque", displayOrder: 10,
    createdAt: D, updatedAt: U, warranty: "24 meses", stockQty: 25,
    specs: { tamanho: "27\"", resolucao: "2560×1440 (QHD)", taxaAtualizacao: "75Hz", painel: "IPS", conectividade: "HDMI, DisplayPort, USB-C" },
    relatedSlugs: ["nexora-studio-14", "orbex-click-pro"],
    images: { main: "/images/showcases/eletronicos/products/velstra-view-27q-main.jpg" },
  },
  {
    id: "p11", slug: "velstra-curve-34u", sku: "VL-C34U", name: "Velstra Curve 34U",
    description: "Monitor ultrawide curvo, pensado para produtividade multitarefa e jogos imersivos.",
    category: "monitores", subcategory: "Ultrawide", brand: "velstra",
    price: 3299, previousPrice: undefined, offerActive: false,
    materials: ["Plástico ABS", "Vidro curvo"], dimensions: "816 × 380 × 300 mm, 7.9 kg",
    colors: ["Preto espacial"], tone: "graphite", icon: "monitor",
    available: true, featured: false, isNew: true, badge: "Lançamento", displayOrder: 11,
    createdAt: D, updatedAt: U, warranty: "24 meses", stockQty: 14,
    specs: { tamanho: "34\"", resolucao: "3440×1440 (UWQHD)", taxaAtualizacao: "144Hz", painel: "VA curvo 1500R", conectividade: "HDMI 2.1, DisplayPort, USB-C" },
    relatedSlugs: ["draventa-forge-tower", "draventa-strike-16"],
    images: { main: "/images/showcases/eletronicos/products/velstra-curve-34u-main.jpg" },
  },
  {
    id: "p12", slug: "kaion-display-24", sku: "KA-D24", name: "Kaion Display 24",
    description: "Monitor 24\" Full HD com boa relação custo-benefício para uso doméstico e escritório.",
    category: "monitores", subcategory: "Entrada", brand: "kaion",
    price: 799, previousPrice: 949, offerActive: true, offerEndsAt: "2026-08-22T23:59:59.000Z",
    materials: ["Plástico ABS"], dimensions: "540 × 400 × 190 mm, 3.4 kg",
    colors: ["Preto espacial"], tone: "graphite", icon: "monitor",
    available: true, featured: false, isNew: false, badge: "Oferta", displayOrder: 12,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 38,
    specs: { tamanho: "24\"", resolucao: "1920×1080 (Full HD)", taxaAtualizacao: "75Hz", painel: "VA", conectividade: "HDMI, VGA" },
    relatedSlugs: [],
    images: { main: "/images/showcases/eletronicos/products/kaion-display-24-main.jpg" },
  },

  // ---------- Áudio ----------
  {
    id: "p13", slug: "nexora-pulse-buds", sku: "NX-PB", name: "Nexora Pulse Buds",
    description: "Fones intra-auriculares sem fio, com cancelamento de ruído e estojo de carregamento compacto.",
    category: "audio", subcategory: "Earbuds", brand: "nexora",
    price: 899, previousPrice: undefined, offerActive: false,
    materials: ["Plástico ABS", "Silicone"], dimensions: "Estojo 5.4 × 6.2 × 2.7 cm, 42 g",
    colors: ["Branco", "Preto espacial"], tone: "stone", icon: "headphones",
    available: true, featured: true, isNew: false, badge: "Destaque", displayOrder: 13,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 60,
    specs: { tipo: "Intra-auricular sem fio", autonomia: "6h (24h com estojo)", conectividade: "Bluetooth 5.3", cancelamentoRuido: "Ativo (ANC)" },
    relatedSlugs: ["nexora-vision-x1"], compatibleAccessories: [],
    images: { main: "/images/showcases/eletronicos/products/nexora-pulse-buds-main.jpg" },
  },
  {
    id: "p14", slug: "nexora-pulse-max", sku: "NX-PM", name: "Nexora Pulse Max",
    description: "Fone over-ear para sessões longas, com espuma de memória e cancelamento de ruído adaptativo.",
    category: "audio", subcategory: "Over-ear", brand: "nexora",
    price: 1299, previousPrice: undefined, offerActive: false,
    materials: ["Couro sintético", "Alumínio"], dimensions: "18 × 20 × 8 cm, 260 g",
    colors: ["Preto espacial", "Prata"], tone: "graphite", icon: "headphones",
    available: true, featured: false, isNew: false, displayOrder: 14,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 33,
    specs: { tipo: "Over-ear sem fio", autonomia: "32h", conectividade: "Bluetooth 5.3, P2", cancelamentoRuido: "Ativo adaptativo" },
    relatedSlugs: [],
    images: { main: "/images/showcases/eletronicos/products/nexora-pulse-max-main.jpg" },
  },
  {
    id: "p15", slug: "orbex-soundbar-200", sku: "OB-SB200", name: "Orbex Sound Bar 200",
    description: "Barra de som compacta para TV e ambiente, com graves reforçados e conexão sem fio.",
    category: "audio", subcategory: "Soundbar", brand: "orbex",
    price: 1099, previousPrice: 1349, offerActive: true, offerEndsAt: "2026-08-24T23:59:59.000Z",
    materials: ["Alumínio", "Tecido acústico"], dimensions: "90 × 6 × 9 cm, 2.1 kg",
    colors: ["Preto espacial"], tone: "graphite", icon: "headphones",
    available: true, featured: false, isNew: false, badge: "Oferta", displayOrder: 15,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 20,
    specs: { tipo: "Soundbar 2.1", autonomia: "—", conectividade: "Bluetooth, HDMI ARC, óptico", cancelamentoRuido: "Não se aplica" },
    relatedSlugs: [],
    images: { main: "/images/showcases/eletronicos/products/orbex-soundbar-200-main.jpg" },
  },

  // ---------- Acessórios ----------
  {
    id: "p16", slug: "nexora-air-charger", sku: "NX-AC", name: "Nexora Air Charger",
    description: "Carregador sem fio de mesa, compatível com smartphones e fones com carregamento por indução.",
    category: "acessorios", subcategory: "Carregamento", brand: "nexora",
    price: 249, previousPrice: undefined, offerActive: false,
    materials: ["Alumínio", "Silicone"], dimensions: "10 × 10 × 1.2 cm, 120 g",
    colors: ["Prata", "Preto espacial"], tone: "stone", icon: "package",
    available: true, featured: false, isNew: false, displayOrder: 16,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 70,
    specs: { tipo: "Carregador por indução 15W", conectividade: "Qi wireless", compatibilidade: "Smartphones e earbuds com Qi" },
    relatedSlugs: ["nexora-vision-x1", "nexora-vision-lite"],
    images: { main: "/images/showcases/eletronicos/products/nexora-air-charger-main.jpg" },
  },
  {
    id: "p17", slug: "orbex-key-mech", sku: "OB-KM", name: "Orbex Key Mech",
    description: "Teclado mecânico compacto com switches táteis e iluminação de fundo ajustável.",
    category: "acessorios", subcategory: "Teclado", brand: "orbex",
    price: 599, previousPrice: undefined, offerActive: false,
    materials: ["Alumínio", "PBT"], dimensions: "36 × 13 × 3.5 cm, 780 g",
    colors: ["Preto espacial", "Branco"], tone: "stone", icon: "package",
    available: true, featured: true, isNew: false, badge: "Destaque", displayOrder: 17,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 44,
    specs: { tipo: "Mecânico switch tátil", conectividade: "USB-C, Bluetooth 5.1", compatibilidade: "Windows, notebooks e Mini PC" },
    relatedSlugs: ["nexora-studio-14", "nexora-core-book"],
    images: { main: "/images/showcases/eletronicos/products/orbex-key-mech-main.jpg" },
  },
  {
    id: "p18", slug: "orbex-click-pro", sku: "OB-CP", name: "Orbex Click Pro",
    description: "Mouse sem fio de precisão, com sensor de alta resolução e formato ergonômico.",
    category: "acessorios", subcategory: "Mouse", brand: "orbex",
    price: 279, previousPrice: undefined, offerActive: false,
    materials: ["Plástico ABS", "Borracha"], dimensions: "12.5 × 6.8 × 4 cm, 95 g",
    colors: ["Preto espacial", "Prata"], tone: "stone", icon: "package",
    available: true, featured: false, isNew: false, displayOrder: 18,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 55,
    specs: { tipo: "Óptico sem fio", conectividade: "USB-C, Bluetooth 5.1", compatibilidade: "Windows, notebooks e Mini PC" },
    relatedSlugs: ["nexora-studio-14", "velstra-view-27q"],
    images: { main: "/images/showcases/eletronicos/products/orbex-click-pro-main.jpg" },
  },

  // ---------- Casa inteligente ----------
  {
    id: "p19", slug: "nexora-home-hub", sku: "NX-HH", name: "Nexora Home Hub",
    description: "Central inteligente que conecta câmeras, tomadas e sensores da casa em um só app.",
    category: "casa-inteligente", subcategory: "Hub central", brand: "nexora",
    price: 649, previousPrice: undefined, offerActive: false,
    materials: ["Plástico ABS", "Tecido acústico"], dimensions: "10 × 10 × 9.5 cm, 340 g",
    colors: ["Branco", "Preto espacial"], tone: "stone", icon: "wifi",
    available: true, featured: true, isNew: true, badge: "Lançamento", displayOrder: 19,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 26,
    specs: { conectividade: "Wi-Fi, Zigbee, Bluetooth", compatibilidade: "Câmeras, tomadas e sensores Nexora/Orbex", alimentacao: "Bivolt, fonte inclusa" },
    relatedSlugs: ["nexora-home-cam", "nexora-home-plug-kit"],
    images: { main: "/images/showcases/eletronicos/products/nexora-home-hub-main.jpg" },
  },
  {
    id: "p20", slug: "nexora-home-plug-kit", sku: "NX-HPK3", name: "Nexora Home Plug Kit",
    description: "Kit com três tomadas inteligentes, controláveis por app e por comando de voz.",
    category: "casa-inteligente", subcategory: "Tomadas", brand: "nexora",
    price: 349, previousPrice: 429, offerActive: true, offerEndsAt: "2026-08-26T23:59:59.000Z",
    materials: ["Policarbonato"], dimensions: "6 × 6 × 7 cm cada, 95 g cada",
    colors: ["Branco"], tone: "stone", icon: "wifi",
    available: true, featured: false, isNew: false, badge: "Oferta", displayOrder: 20,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 48,
    specs: { conectividade: "Wi-Fi 2.4GHz", compatibilidade: "Nexora Home Hub e assistentes de voz", alimentacao: "Bivolt" },
    relatedSlugs: ["nexora-home-hub"],
    images: { main: "/images/showcases/eletronicos/products/nexora-home-plug-kit-main.jpg" },
  },
  {
    id: "p21", slug: "nexora-home-cam", sku: "NX-HC", name: "Nexora Home Cam",
    description: "Câmera de segurança para ambientes internos, com visão noturna e detecção de movimento.",
    category: "casa-inteligente", subcategory: "Câmera", brand: "nexora",
    price: 429, previousPrice: undefined, offerActive: false,
    materials: ["Plástico ABS"], dimensions: "6 × 6 × 9 cm, 180 g",
    colors: ["Branco"], tone: "stone", icon: "wifi",
    available: true, featured: false, isNew: false, displayOrder: 21,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 31,
    specs: { conectividade: "Wi-Fi 2.4GHz", compatibilidade: "Nexora Home Hub", alimentacao: "Bivolt, fonte inclusa" },
    relatedSlugs: ["nexora-home-hub"],
    images: { main: "/images/showcases/eletronicos/products/nexora-home-cam-main.jpg" },
  },

  // ---------- Gamer ----------
  {
    id: "p22", slug: "draventa-strike-controller", sku: "DV-SC", name: "Draventa Strike Controller",
    description: "Controle sem fio de resposta rápida, compatível com PC e Nexora Core Mini.",
    category: "gamer", subcategory: "Controle", brand: "draventa",
    price: 349, previousPrice: undefined, offerActive: false,
    materials: ["Plástico ABS", "Borracha texturizada"], dimensions: "15 × 10 × 6 cm, 230 g",
    colors: ["Preto espacial", "Roxo meia-noite"], tone: "graphite", icon: "gamepad",
    available: true, featured: true, isNew: false, badge: "Destaque", displayOrder: 22,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 37,
    specs: { tipo: "Controle sem fio", conectividade: "Bluetooth, USB-C", compatibilidade: "PC, Draventa Forge Tower" },
    relatedSlugs: ["draventa-forge-tower", "draventa-strike-16"],
    images: { main: "/images/showcases/eletronicos/products/draventa-strike-controller-main.jpg" },
  },
  {
    id: "p23", slug: "draventa-vortex-chair", sku: "DV-VC", name: "Draventa Vortex Chair",
    description: "Cadeira gamer ergonômica, com ajuste de altura, apoio lombar e reclínio de 165°.",
    category: "gamer", subcategory: "Cadeira", brand: "draventa",
    price: 1899, previousPrice: undefined, offerActive: false,
    materials: ["Couro sintético", "Aço"], dimensions: "70 × 70 × 130 cm, 22 kg",
    colors: ["Preto espacial", "Roxo meia-noite"], tone: "graphite", icon: "gamepad",
    available: true, featured: false, isNew: false, displayOrder: 23,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 15,
    specs: { tipo: "Cadeira ergonômica", conectividade: "Não se aplica", compatibilidade: "Uso geral em setups gamer" },
    relatedSlugs: [],
    images: { main: "/images/showcases/eletronicos/products/draventa-vortex-chair-main.jpg" },
  },
  {
    id: "p24", slug: "draventa-arena-keyboard", sku: "DV-AK", name: "Draventa Arena Keyboard",
    description: "Teclado mecânico gamer com anti-ghosting total e iluminação RGB por tecla.",
    category: "gamer", subcategory: "Teclado gamer", brand: "draventa",
    price: 549, previousPrice: 649, offerActive: true, offerEndsAt: "2026-08-27T23:59:59.000Z",
    materials: ["Alumínio", "PBT"], dimensions: "44 × 13 × 4 cm, 950 g",
    colors: ["Preto espacial"], tone: "graphite", icon: "gamepad",
    available: true, featured: false, isNew: false, badge: "Oferta", displayOrder: 24,
    createdAt: D, updatedAt: U, warranty: "12 meses", stockQty: 29,
    specs: { tipo: "Mecânico switch linear", conectividade: "USB-C", compatibilidade: "PC e notebooks gamer" },
    relatedSlugs: ["draventa-forge-tower", "draventa-strike-16"],
    images: { main: "/images/showcases/eletronicos/products/draventa-arena-keyboard-main.jpg" },
  },
];

export const kits: CatalogKit[] = [
  {
    slug: "kit-criador-conteudo", name: "Kit Criador de Conteúdo",
    description: "Notebook Studio + monitor de cor precisa + mouse de precisão para quem edita e produz.",
    productSlugs: ["nexora-studio-14", "velstra-view-27q", "orbex-click-pro"],
    savingsLabel: "Economia demonstrativa de R$ 450 em relação à compra avulsa.",
    active: true, order: 1, featured: true,
  },
  {
    slug: "kit-setup-gamer", name: "Kit Setup Gamer",
    description: "Torre Forge + monitor ultrawide curvo + teclado mecânico gamer para partidas competitivas.",
    productSlugs: ["draventa-forge-tower", "velstra-curve-34u", "draventa-arena-keyboard"],
    savingsLabel: "Economia demonstrativa de R$ 780 em relação à compra avulsa.",
    active: true, order: 2, featured: true,
  },
  {
    slug: "kit-mobilidade", name: "Kit Mobilidade",
    description: "Smartphone Vision X1 + fones Pulse Buds + carregador sem fio Air Charger.",
    productSlugs: ["nexora-vision-x1", "nexora-pulse-buds", "nexora-air-charger"],
    savingsLabel: "Economia demonstrativa de R$ 300 em relação à compra avulsa.",
    active: true, order: 3, featured: false,
  },
  {
    slug: "kit-casa-conectada", name: "Kit Casa Conectada",
    description: "Hub central + câmera interna + kit de 3 tomadas inteligentes.",
    productSlugs: ["nexora-home-hub", "nexora-home-cam", "nexora-home-plug-kit"],
    savingsLabel: "Economia demonstrativa de R$ 220 em relação à compra avulsa.",
    active: true, order: 4, featured: false,
  },
];
