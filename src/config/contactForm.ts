export const contactSegments = [
  "Restaurante",
  "Loja",
  "Imobiliária",
  "Odontologia",
  "Contabilidade",
  "Corretora de seguros",
  "Prestação de serviços",
  "Outro",
] as const;

export const contactFormLimits = {
  nameMin: 2,
  nameMax: 80,
  whatsappDigitsMin: 8,
  whatsappDigitsMax: 13,
  descriptionMin: 10,
  descriptionMax: 500,
};

/** Código do país padrão (Brasil) primeiro; demais países da América Latina, mais Portugal e Espanha. */
export const countryCodes = [
  { dial: "+55", code: "BR", name: "Brasil" },
  { dial: "+54", code: "AR", name: "Argentina" },
  { dial: "+591", code: "BO", name: "Bolívia" },
  { dial: "+56", code: "CL", name: "Chile" },
  { dial: "+57", code: "CO", name: "Colômbia" },
  { dial: "+506", code: "CR", name: "Costa Rica" },
  { dial: "+53", code: "CU", name: "Cuba" },
  { dial: "+1", code: "DO", name: "República Dominicana" },
  { dial: "+593", code: "EC", name: "Equador" },
  { dial: "+503", code: "SV", name: "El Salvador" },
  { dial: "+502", code: "GT", name: "Guatemala" },
  { dial: "+509", code: "HT", name: "Haiti" },
  { dial: "+504", code: "HN", name: "Honduras" },
  { dial: "+52", code: "MX", name: "México" },
  { dial: "+505", code: "NI", name: "Nicarágua" },
  { dial: "+507", code: "PA", name: "Panamá" },
  { dial: "+595", code: "PY", name: "Paraguai" },
  { dial: "+51", code: "PE", name: "Peru" },
  { dial: "+598", code: "UY", name: "Uruguai" },
  { dial: "+58", code: "VE", name: "Venezuela" },
  { dial: "+351", code: "PT", name: "Portugal" },
  { dial: "+34", code: "ES", name: "Espanha" },
] as const;
