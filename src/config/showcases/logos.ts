import AtlasLogo from "../../components/logos/AtlasLogo.astro";
import HorizonteLogo from "../../components/logos/HorizonteLogo.astro";
import VerticeLogo from "../../components/logos/VerticeLogo.astro";
import EssenzaLogo from "../../components/logos/EssenzaLogo.astro";
import AurumLogo from "../../components/logos/AurumLogo.astro";
import OrionLogo from "../../components/logos/OrionLogo.astro";

export const logoBySlug = {
  contabilidade: AtlasLogo,
  seguros: HorizonteLogo,
  imobiliaria: VerticeLogo,
  restaurante: EssenzaLogo,
  "aurum-motors": AurumLogo,
  "orion-odontologia": OrionLogo,
} as const;
