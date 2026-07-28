import type { ShowcaseConfig } from "./types";

const img = (name: string) => `/images/showcases/restaurante/${name}`;

export const restauranteConfig: ShowcaseConfig = {
  slug: "restaurante",
  primaryCtaHref: "#reservas",
  company: {
    name: "Essenza Restaurante",
    shortName: "Essenza",
    segment: "Restaurante",
    slogan: "Cozinha autoral, sem pressa.",
    description:
      "Restaurante fictício, criado como modelo demonstrativo. Cozinha autoral e ambiente acolhedor, pensados para uma experiência gastronômica completa.",
  },
  theme: {
    surface: "#1b1310",
    surfaceAlt: "#241a16",
    ink: "#f3e9df",
    inkMuted: "#c9b8ab",
    primary: "#7a2331",
    primaryInk: "#ffffff",
    accent: "#cf8a4e",
    border: "#3a2c26",
    fontHeading: "'Fraunces Variable', Georgia, serif",
    fontBody: "'Inter Variable', system-ui, sans-serif",
    radiusCard: "1rem",
  },
  nav: [
    { label: "Início", href: "#" },
    { label: "Experiência", href: "#experiencia" },
    { label: "Cardápio", href: "#cardapio" },
    { label: "Galeria", href: "#galeria" },
    { label: "Localização", href: "#localizacao" },
    { label: "Reservas", href: "#reservas" },
  ],
  seo: {
    title: "Essenza Restaurante — Cozinha autoral e reservas (modelo demonstrativo)",
    description:
      "Modelo demonstrativo de site para restaurantes, com pratos em destaque, cardápio, galeria e reservas. Projeto fictício da CronosStart.",
    ogImage: "/images/og/restaurante.png",
    ogImageAlt: "Essenza Restaurante — modelo demonstrativo CronosStart",
  },
  hero: {
    variant: "centered",
    eyebrow: "Cozinha autoral",
    headline: "Uma experiência gastronômica que começa",
    highlight: "muito antes do primeiro prato.",
    subheadline:
      "O Essenza reúne ingredientes selecionados, técnica autoral e um ambiente acolhedor para tornar cada visita memorável.",
    ctaPrimaryLabel: "Fazer uma reserva",
    ctaSecondaryLabel: "Ver cardápio",
  },
  dishes: [
    {
      name: "Risoto de frutos do mar",
      description: "Arbóreo cremoso, camarões, mexilhões e um toque de açafrão.",
      price: "R$ 89",
      image: img("prato-risoto.jpg"),
      imageAlt: "Risoto de frutos do mar com camarões e mexilhões em prato branco",
      tag: "Mais pedido",
    },
    {
      name: "Talharim ao molho de ervas",
      description: "Massa fresca, manteiga de ervas finas e lascas de parmesão.",
      price: "R$ 68",
      image: img("prato-massa.jpg"),
      imageAlt: "Talharim enrolado no garfo com molho de ervas",
    },
    {
      name: "Filé grelhado com molho de vinho",
      description: "Corte nobre grelhado no ponto, redução de vinho e legumes salteados.",
      price: "R$ 112",
      image: img("prato-carne.jpg"),
      imageAlt: "Filé grelhado fatiado sobre folhas verdes com molho",
      tag: "Chef",
    },
    {
      name: "Salada de folhas e parmesão",
      description: "Mix de folhas frescas, tomate, pepino e lascas de parmesão.",
      price: "R$ 46",
      image: img("prato-salada.jpg"),
      imageAlt: "Salada de folhas verdes com lascas de parmesão e tomate",
    },
    {
      name: "Sorbet de pistache com frutas vermelhas",
      description: "Sorvete de pistache, biscoito amanteigado e morangos frescos.",
      price: "R$ 38",
      image: img("prato-sobremesa.jpg"),
      imageAlt: "Sorvete de pistache com biscoito e morangos frescos",
    },
    {
      name: "Peixe grelhado com legumes assados",
      description: "Peixe do dia grelhado, tomates confitados e aspargos.",
      price: "R$ 98",
      image: img("prato-frutos-do-mar.jpg"),
      imageAlt: "Peixe grelhado com tomates confitados e aspargos",
    },
  ],
  menu: [
    {
      name: "Entradas",
      items: [
        { name: "Pão de fermentação natural", description: "Manteiga de ervas e azeite", price: "R$ 22" },
        { name: "Carpaccio de carne", description: "Alcaparras, rúcula e parmesão", price: "R$ 42" },
        { name: "Burrata com tomates", description: "Manjericão e azeite trufado", price: "R$ 48" },
      ],
    },
    {
      name: "Principais",
      items: [
        { name: "Risoto de frutos do mar", price: "R$ 89" },
        { name: "Filé grelhado com molho de vinho", price: "R$ 112" },
        { name: "Peixe grelhado com legumes assados", price: "R$ 98" },
        { name: "Talharim ao molho de ervas", price: "R$ 68" },
      ],
    },
    {
      name: "Sobremesas",
      items: [
        { name: "Sorbet de pistache", description: "Frutas vermelhas e biscoito", price: "R$ 38" },
        { name: "Petit gâteau", description: "Sorvete de creme e calda quente", price: "R$ 34" },
      ],
    },
    {
      name: "Bebidas",
      items: [
        { name: "Taça de vinho tinto ou branco", price: "R$ 32" },
        { name: "Água com gás ou sem gás", price: "R$ 9" },
        { name: "Café espresso", price: "R$ 12" },
      ],
    },
  ],
  ambianceContent: {
    eyebrow: "A experiência Essenza",
    title: "Mais do que um jantar, um momento para saborear com calma",
    paragraphs: [
      "O Essenza nasceu da vontade de criar pratos autorais com ingredientes selecionados, em um ambiente que convida a ficar — sem pressa, sem barulho excessivo, com atenção a cada detalhe.",
      "Da iluminação à disposição das mesas, cada escolha do salão foi pensada para tornar a refeição parte de uma experiência maior.",
    ],
  },
  ambianceImages: [
    { src: img("ambiente-1.jpg"), alt: "Cantinho aconchegante do salão com iluminação em tons quentes" },
    { src: img("ambiente-2.jpg"), alt: "Salão à noite com mesas de madeira e iluminação suave" },
  ],
  gallery: [
    { src: img("galeria-mesa.jpg"), alt: "Mesa posta com taças e velas acesas" },
    { src: img("galeria-bar.jpg"), alt: "Bar do restaurante com iluminação aconchegante" },
    { src: img("galeria-chef.jpg"), alt: "Chef finalizando um prato com folhas verdes" },
    { src: img("galeria-mesa-2.jpg"), alt: "Mesa posta próxima a uma janela com jardim ao fundo" },
    { src: img("prato-risoto.jpg"), alt: "Risoto de frutos do mar em close" },
    { src: img("prato-carne.jpg"), alt: "Filé grelhado fatiado em close" },
  ],
  instagramHandle: "@essenza.restaurante",
  testimonials: [
    {
      quote: "Ambiente acolhedor e o risoto de frutos do mar é surpreendente. Já é nosso lugar fixo para datas especiais.",
      author: "Renata Alves",
      role: "Cliente Essenza",
      segment: "Jantar romântico",
      result: "Voltou 3 vezes no mês",
      rating: 5,
    },
    {
      quote: "Atendimento atencioso do início ao fim, e o cardápio muda o suficiente para sempre ter algo novo para provar.",
      author: "Diego Ferreira",
      role: "Cliente Essenza",
      segment: "Jantar em grupo",
      result: "Recomendou para a equipe",
      rating: 5,
    },
    {
      quote: "Reservei pelo site em poucos minutos e fomos muito bem recebidos. O ambiente é ainda mais bonito pessoalmente.",
      author: "Camila Torres",
      role: "Cliente Essenza",
      segment: "Almoço de aniversário",
      result: "Reserva sem complicação",
      rating: 4,
    },
  ],
  location: {
    addressLine: "Rua das Palmeiras, 482 — Jardins, São Paulo/SP",
    mapNote: "Mapa ilustrativo",
    hoursLines: [
      { day: "Terça a sexta", hours: "12h–15h · 19h–23h" },
      { day: "Sábado", hours: "12h–23h" },
      { day: "Domingo", hours: "12h–17h" },
      { day: "Segunda", hours: "Fechado" },
    ],
  },
  contactCta: {
    title: "Vamos reservar sua mesa?",
    description: "Escolha data, horário e número de pessoas — confirmamos sua reserva rapidinho.",
    buttonLabel: "Fazer uma reserva",
  },
  contact: {
    whatsappNumber: "5511966660000",
    whatsappMessage: "Olá! Gostaria de fazer uma reserva no Essenza.",
    email: "contato@essenza-demo.com.br",
    phone: "(11) 4000-3400",
    city: "São Paulo",
    state: "SP",
    hours: "Terça a domingo, 12h às 23h",
    instagram: "#",
    facebook: "#",
  },
  sections: {
    testimonials: true,
    dishes: true,
    menu: true,
    ambiance: true,
    gallery: true,
    reviews: true,
    instagram: true,
    location: true,
  },
};
