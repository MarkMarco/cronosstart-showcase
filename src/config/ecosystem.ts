export type EcosystemItem = {
  slug: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  name: string;
  description: string;
  /** null enquanto o domínio/página dedicada ainda não está disponível — não renderizar como link nesse caso. */
  href: string | null;
};

export const ecosystemItems: EcosystemItem[] = [
  {
    slug: "cronossec",
    logo: "/images/ecosystem/cronossec.png",
    logoWidth: 240,
    logoHeight: 231,
    name: "CronosSec",
    description: "Segurança e proteção digital",
    href: null,
  },
  {
    slug: "cronoscheck",
    logo: "/images/ecosystem/cronoscheck.png",
    logoWidth: 240,
    logoHeight: 222,
    name: "CronosCheck",
    description: "Diagnóstico e avaliação de riscos",
    href: null,
  },
  {
    slug: "cronostech-care",
    logo: "/images/ecosystem/cronostech-care.png",
    logoWidth: 240,
    logoHeight: 219,
    name: "CronosTech Care",
    description: "Suporte e organização tecnológica",
    href: null,
  },
  {
    slug: "cronosbrand",
    logo: "/images/ecosystem/protecao-da-marca.png",
    logoWidth: 240,
    logoHeight: 226,
    name: "CronosBrand",
    description: "Proteção da identidade e da marca digital",
    href: null,
  },
];
