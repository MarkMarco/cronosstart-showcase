/**
 * Dados públicos da CronosStart exibidos no site. Centralizados aqui para evitar
 * duplicação — qualquer alteração de contato/endereço deve ser feita apenas neste arquivo.
 */
export const company = {
  name: "CronosStart",
  legalNote: "uma iniciativa CronosSec",
  email: "contato@cronossec.com.br",
  website: "https://www.cronossec.com.br",
  websiteDisplay: "www.cronossec.com.br",
  city: "Blumenau — SC",
  address: "Água Verde, Blumenau - SC",
  cep: "89037-215",
  cnpj: "67.070.829/0001-31",
  /** Apenas dígitos, com código do país — formato exigido pelo wa.me. */
  whatsappNumber: "5547988454356",
  whatsappDisplay: "+55 (47) 98845-4356",
};

export function buildWhatsappLink(message: string): string {
  return `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Dados estruturados (schema.org) para a home — ajuda buscadores a exibir endereço/telefone/área de atendimento. */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: company.name,
  description: "Criação e gestão de sites profissionais para pequenas empresas, com domínio, hospedagem e suporte.",
  url: "https://cronosstart.com.br",
  email: company.email,
  telephone: `+${company.whatsappNumber}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Água Verde",
    addressLocality: "Blumenau",
    addressRegion: "SC",
    postalCode: company.cep,
    addressCountry: "BR",
  },
  areaServed: ["Blumenau", "Brasil", "América Latina"],
};
