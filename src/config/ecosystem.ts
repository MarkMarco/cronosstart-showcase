export type EcosystemItem = {
  slug: string;
  logo: string;
  name: string;
  description: string;
  /** null enquanto o domínio/página dedicada ainda não está disponível — não renderizar como link nesse caso. */
  href: string | null;
};

export const ecosystemItems: EcosystemItem[] = [
  {
    slug: "cronossec",
    logo: "/images/ecosystem/cronossec.png",
    name: "CronosSec",
    description: "Segurança e proteção digital",
    href: null,
  },
  {
    slug: "cronoscheck",
    logo: "/images/ecosystem/cronoscheck.png",
    name: "CronosCheck",
    description: "Diagnóstico e avaliação de riscos",
    href: null,
  },
  {
    slug: "cronostech-care",
    logo: "/images/ecosystem/cronostech-care.png",
    name: "CronosTech Care",
    description: "Suporte e organização tecnológica",
    href: null,
  },
  {
    slug: "cronosbrand",
    logo: "/images/ecosystem/protecao-da-marca.png",
    name: "CronosBrand",
    description: "Proteção da identidade e da marca digital",
    href: null,
  },
];
