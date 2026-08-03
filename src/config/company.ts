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

export const SITE_URL = "https://cronosstart.com.br/";
/** @id estável da entidade CronosStart — reutilizar ao referenciar a Organization em outras páginas. */
export const ORGANIZATION_ID = `${SITE_URL}#organization`;

/**
 * Dados estruturados (schema.org) da homepage, como um único @graph com IDs estáveis.
 * Organization e ProfessionalService representam a mesma entidade CronosStart (mesmo @id,
 * @type combinado) — não duplicar como nós separados. WebSite referencia essa entidade
 * como publisher. Não usa LocalBusiness nem inventa endereço além do já existente.
 */
const cronosStartEntity = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE_URL}#organization`,
  name: company.name,
  url: SITE_URL,
  email: company.email,
  telephone: `+${company.whatsappNumber}`,
  brand: {
    "@type": "Brand",
    name: "CronosSec",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Água Verde",
    addressLocality: "Blumenau",
    addressRegion: "SC",
    postalCode: company.cep,
    addressCountry: "BR",
  },
  areaServed: [
    { "@type": "Country", name: "Brasil" },
    { "@type": "Place", name: "América Latina" },
  ],
  serviceType: [
    "Criação de sites profissionais",
    "Desenvolvimento de sites personalizados",
    "Domínio e hospedagem",
    "Integração com WhatsApp",
    "Catálogos digitais",
    "Painéis administrativos",
    "Suporte e manutenção",
  ],
};

const websiteEntity = {
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: company.name,
  inLanguage: "pt-BR",
  publisher: { "@id": `${SITE_URL}#organization` },
};

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [cronosStartEntity, websiteEntity],
};
