// Mapa de nomes de cor (em português, usados no catálogo Maison Lume) para um
// valor hexadecimal aproximado — usado para renderizar swatches de cor sem
// depender de fotos reais por variação (que não existem neste catálogo demo).
export const colorSwatchMap: Record<string, string> = {
  Areia: "#e2cfae",
  "Off-white": "#f4efe6",
  Grafite: "#3f3a35",
  Terracota: "#b5673f",
  Bege: "#d9c7a8",
  Nogueira: "#6b4a30",
  Preto: "#1c1a18",
  "Cinza claro": "#d4d0c9",
  Natural: "#c9a875",
  Branco: "#ffffff",
  Cinza: "#8a8680",
  "Branco fosco": "#ece7df",
  Cru: "#ded2b8",
  // Cores adicionais usadas por catálogos técnicos (ex.: Nexora Tech) — não
  // afetam os nomes já usados pela Maison Lume acima.
  Prata: "#c7ccd1",
  "Azul titânio": "#3d4a6b",
  "Roxo meia-noite": "#39304f",
  "Preto espacial": "#15161a",
  "Verde noturno": "#243b34",
};

export function colorToHex(name: string): string {
  return colorSwatchMap[name] ?? "#cccccc";
}
