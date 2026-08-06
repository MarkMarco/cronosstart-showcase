// Sistema de "render vetorial premium" da Nexora Tech — substitui o antigo
// ícone-em-círculo por ilustrações vetoriais específicas por tipo de
// dispositivo (silhueta reconhecível: smartphone, notebook, monitor, torre,
// headset, teclado, mouse, hub de casa inteligente, controle, cadeira
// gamer...), sem logos ou elementos de marcas reais. Usado como imagem
// principal apenas quando o produto não tem fotografia curada atribuída
// (ver `images` em CatalogProduct) — nesse caso a foto tem prioridade.
//
// Toda a marcação é gerada como string HTML autocontida (sem depender de
// classes CSS com escopo do Astro), para poder ser injetada tanto por
// componentes .astro (via set:html) quanto por scripts client-side (ex.: o
// modal de produto, que reconstrói o visual via innerHTML).

export type RenderVariant =
  | "smartphone"
  | "laptop"
  | "mini-pc"
  | "tower"
  | "monitor"
  | "headphones"
  | "earbuds"
  | "soundbar"
  | "keyboard"
  | "gamer-keyboard"
  | "mouse"
  | "charger"
  | "smart-hub"
  | "smart-camera"
  | "smart-plug"
  | "controller"
  | "chair";

export type RenderMood = "studio" | "gamer" | "ambient";

export function productRenderVariant(product: { category: string; subcategory?: string }): RenderVariant {
  const sub = (product.subcategory ?? "").toLowerCase();
  switch (product.category) {
    case "smartphones":
      return "smartphone";
    case "notebooks":
      return "laptop";
    case "computadores":
      return sub.includes("torre") || sub.includes("desktop") ? "tower" : "mini-pc";
    case "monitores":
      return "monitor";
    case "audio":
      if (sub.includes("earbud")) return "earbuds";
      if (sub.includes("soundbar")) return "soundbar";
      return "headphones";
    case "acessorios":
      if (sub.includes("teclado")) return "keyboard";
      if (sub.includes("mouse")) return "mouse";
      if (sub.includes("carregamento")) return "charger";
      return "keyboard";
    case "casa-inteligente":
      if (sub.includes("câmera") || sub.includes("camera")) return "smart-camera";
      if (sub.includes("tomada")) return "smart-plug";
      return "smart-hub";
    case "gamer":
      if (sub.includes("controle")) return "controller";
      if (sub.includes("cadeira")) return "chair";
      if (sub.includes("teclado")) return "gamer-keyboard";
      return "controller";
    default:
      return "smartphone";
  }
}

const categoryVariantMap: Record<string, RenderVariant> = {
  smartphones: "smartphone",
  notebooks: "laptop",
  computadores: "tower",
  monitores: "monitor",
  audio: "headphones",
  acessorios: "keyboard",
  "casa-inteligente": "smart-hub",
  gamer: "controller",
};

export function categoryRenderVariant(categorySlug: string): RenderVariant {
  return categoryVariantMap[categorySlug] ?? "smartphone";
}

export function moodForCategory(category: string): RenderMood {
  if (category === "gamer") return "gamer";
  if (category === "casa-inteligente") return "ambient";
  return "studio";
}

function hexToRgb(hex: string): string {
  const clean = hex.replace("#", "");
  const value = parseInt(clean, 16);
  return `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`;
}

let uidCounter = 0;

function deviceShape(variant: RenderVariant, accent: string, uid: string): string {
  const body = `url(#nxBody-${uid})`;
  const screen = `url(#nxScreen-${uid})`;

  switch (variant) {
    case "smartphone":
      return `
        <rect x="90" y="26" width="60" height="188" rx="16" fill="${body}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>
        <rect x="96" y="36" width="48" height="168" rx="8" fill="${screen}"/>
        <circle cx="120" cy="46" r="2.5" fill="#0a0e16"/>
        <rect x="104" y="190" width="32" height="4" rx="2" fill="rgba(255,255,255,0.35)"/>`;

    case "laptop":
      return `
        <path d="M62 176 h116 l10 18 h-136 z" fill="${body}" stroke="${accent}" stroke-opacity="0.4" stroke-width="1"/>
        <rect x="55" y="46" width="130" height="98" rx="8" fill="${body}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>
        <rect x="63" y="54" width="114" height="82" rx="4" fill="${screen}"/>
        <circle cx="120" cy="50" r="1.8" fill="#0a0e16"/>
        <g opacity="0.5">
          <rect x="80" y="182" width="10" height="4" rx="1" fill="rgba(255,255,255,0.25)"/>
          <rect x="96" y="182" width="10" height="4" rx="1" fill="rgba(255,255,255,0.25)"/>
          <rect x="112" y="182" width="10" height="4" rx="1" fill="rgba(255,255,255,0.25)"/>
          <rect x="128" y="182" width="10" height="4" rx="1" fill="rgba(255,255,255,0.25)"/>
          <rect x="144" y="182" width="10" height="4" rx="1" fill="rgba(255,255,255,0.25)"/>
        </g>`;

    case "mini-pc":
      return `
        <rect x="70" y="118" width="100" height="52" rx="12" fill="${body}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>
        <rect x="70" y="118" width="100" height="10" rx="5" fill="rgba(255,255,255,0.08)"/>
        <circle cx="160" cy="144" r="3" fill="${accent}"/>
        <g opacity="0.5">
          <rect x="82" y="132" width="3" height="24" fill="rgba(255,255,255,0.2)"/>
          <rect x="90" y="132" width="3" height="24" fill="rgba(255,255,255,0.2)"/>
          <rect x="98" y="132" width="3" height="24" fill="rgba(255,255,255,0.2)"/>
        </g>`;

    case "tower":
      return `
        <rect x="82" y="24" width="76" height="188" rx="10" fill="${body}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>
        <rect x="88" y="30" width="8" height="176" rx="4" fill="${accent}" opacity="0.55"/>
        <g opacity="0.55">
          <rect x="104" y="34" width="46" height="3" fill="rgba(255,255,255,0.2)"/>
          <rect x="104" y="42" width="46" height="3" fill="rgba(255,255,255,0.2)"/>
          <rect x="104" y="50" width="46" height="3" fill="rgba(255,255,255,0.2)"/>
        </g>
        <circle cx="128" cy="70" r="4" fill="${accent}"/>
        <circle cx="120" cy="150" r="7" fill="none" stroke="${accent}" stroke-opacity="0.7" stroke-width="1.5"/>
        <circle cx="120" cy="150" r="2" fill="${accent}"/>
        <circle cx="120" cy="178" r="7" fill="none" stroke="${accent}" stroke-opacity="0.4" stroke-width="1.5"/>`;

    case "monitor":
      return `
        <rect x="45" y="34" width="150" height="98" rx="8" fill="${body}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>
        <rect x="53" y="42" width="134" height="82" rx="4" fill="${screen}"/>
        <g opacity="0.5">
          <rect x="66" y="60" width="58" height="6" rx="3" fill="rgba(255,255,255,0.3)"/>
          <rect x="66" y="74" width="90" height="6" rx="3" fill="rgba(255,255,255,0.18)"/>
          <rect x="66" y="88" width="70" height="6" rx="3" fill="rgba(255,255,255,0.18)"/>
        </g>
        <rect x="112" y="132" width="16" height="26" fill="${body}"/>
        <rect x="85" y="158" width="70" height="8" rx="4" fill="${body}" stroke="${accent}" stroke-opacity="0.3" stroke-width="1"/>`;

    case "headphones":
      return `
        <path d="M58 118 a62 62 0 0 1 124 0" fill="none" stroke="${accent}" stroke-opacity="0.5" stroke-width="10" stroke-linecap="round"/>
        <rect x="46" y="112" width="30" height="56" rx="15" fill="${body}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>
        <rect x="164" y="112" width="30" height="56" rx="15" fill="${body}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>
        <circle cx="61" cy="140" r="7" fill="${screen}"/>
        <circle cx="179" cy="140" r="7" fill="${screen}"/>`;

    case "earbuds":
      return `
        <rect x="90" y="70" width="60" height="78" rx="20" fill="${body}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>
        <path d="M90 108 h60" stroke="${accent}" stroke-opacity="0.3" stroke-width="1"/>
        <circle cx="120" cy="90" r="2.5" fill="${accent}"/>
        <rect x="100" y="160" width="10" height="26" rx="5" fill="${body}" stroke="${accent}" stroke-opacity="0.4" stroke-width="1"/>
        <rect x="130" y="160" width="10" height="26" rx="5" fill="${body}" stroke="${accent}" stroke-opacity="0.4" stroke-width="1"/>
        <circle cx="105" cy="160" r="7" fill="${screen}"/>
        <circle cx="135" cy="160" r="7" fill="${screen}"/>`;

    case "soundbar": {
      const dots = Array.from({ length: 10 }, (_, i) => `<circle cx="${52 + i * 14}" cy="125" r="3" fill="rgba(255,255,255,0.25)"/>`).join("");
      return `
        <rect x="35" y="110" width="170" height="30" rx="15" fill="${body}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>
        ${dots}
        <rect x="35" y="146" width="170" height="6" rx="3" fill="${accent}" opacity="0.35"/>`;
    }

    case "keyboard":
    case "gamer-keyboard": {
      let keys = "";
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 10; c++) {
          keys += `<rect x="${50 + c * 15}" y="${106 + r * 14}" width="12" height="10" rx="2" fill="rgba(255,255,255,0.12)" stroke="${accent}" stroke-opacity="0.15" stroke-width="0.5"/>`;
        }
      }
      const glow =
        variant === "gamer-keyboard"
          ? `<rect x="40" y="98" width="160" height="70" rx="10" fill="none" stroke="url(#nxRgb-${uid})" stroke-width="2" opacity="0.85"/>`
          : "";
      return `
        <rect x="40" y="98" width="160" height="70" rx="10" fill="${body}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>
        ${keys}
        ${glow}`;
    }

    case "mouse":
      return `
        <path d="M100 70 q20 -14 40 0 q22 20 18 70 q-4 46 -38 46 q-34 0 -38 -46 q-4 -50 18 -70 z" fill="${body}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>
        <line x1="120" y1="70" x2="120" y2="120" stroke="${accent}" stroke-opacity="0.35" stroke-width="1"/>
        <rect x="116" y="78" width="8" height="16" rx="4" fill="rgba(255,255,255,0.3)"/>`;

    case "charger":
      return `
        <circle cx="120" cy="130" r="55" fill="${body}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>
        <circle cx="120" cy="130" r="38" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="1.5"/>
        <circle cx="120" cy="130" r="6" fill="${accent}"/>
        <path d="M165 165 q30 20 10 45" fill="none" stroke="${body}" stroke-width="6" stroke-linecap="round"/>`;

    case "smart-hub":
      return `
        <ellipse cx="120" cy="196" rx="46" ry="10" fill="${body}" opacity="0.5"/>
        <path d="M74 196 a46 30 0 1 0 92 0 v-60 a46 30 0 1 0 -92 0 z" fill="${body}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>
        <ellipse cx="120" cy="136" rx="46" ry="16" fill="rgba(255,255,255,0.06)"/>
        <circle cx="120" cy="136" r="6" fill="${accent}"/>
        <path d="M100 120 a24 12 0 0 1 40 0" fill="none" stroke="${accent}" stroke-opacity="0.4" stroke-width="1.5"/>
        <path d="M92 112 a34 18 0 0 1 56 0" fill="none" stroke="${accent}" stroke-opacity="0.22" stroke-width="1.5"/>`;

    case "smart-camera":
      return `
        <rect x="86" y="80" width="68" height="56" rx="16" fill="${body}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>
        <circle cx="120" cy="108" r="20" fill="#05070c" stroke="${accent}" stroke-opacity="0.5" stroke-width="1.5"/>
        <circle cx="120" cy="108" r="9" fill="${screen}"/>
        <circle cx="126" cy="102" r="2.5" fill="rgba(255,255,255,0.6)"/>
        <rect x="112" y="136" width="16" height="20" fill="${body}"/>
        <rect x="96" y="156" width="48" height="8" rx="4" fill="${body}" stroke="${accent}" stroke-opacity="0.3" stroke-width="1"/>`;

    case "smart-plug":
      return `
        <rect x="80" y="70" width="80" height="90" rx="14" fill="${body}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>
        <rect x="102" y="96" width="8" height="20" rx="3" fill="rgba(255,255,255,0.3)"/>
        <rect x="130" y="96" width="8" height="20" rx="3" fill="rgba(255,255,255,0.3)"/>
        <circle cx="120" cy="136" r="4" fill="${accent}"/>`;

    case "controller":
      return `
        <path d="M60 120 q0 -30 30 -30 h60 q30 0 30 30 q10 30 -6 55 q-14 22 -32 4 q-10 -10 -22 -10 q-12 0 -22 10 q-18 18 -32 -4 q-16 -25 -6 -55 z" fill="${body}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>
        <g stroke="rgba(255,255,255,0.4)" stroke-width="3" stroke-linecap="round">
          <line x1="86" y1="118" x2="86" y2="134"/>
          <line x1="78" y1="126" x2="94" y2="126"/>
        </g>
        <circle cx="150" cy="118" r="5" fill="${accent}" opacity="0.8"/>
        <circle cx="164" cy="128" r="5" fill="rgba(255,255,255,0.35)"/>
        <circle cx="150" cy="138" r="5" fill="rgba(255,255,255,0.35)"/>
        <circle cx="136" cy="128" r="5" fill="rgba(255,255,255,0.35)"/>`;

    case "chair":
      return `
        <rect x="94" y="30" width="52" height="90" rx="14" fill="${body}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.5"/>
        <rect x="116" y="34" width="8" height="82" fill="${accent}" opacity="0.5"/>
        <rect x="88" y="122" width="64" height="34" rx="10" fill="${body}" stroke="${accent}" stroke-opacity="0.4" stroke-width="1.5"/>
        <rect x="70" y="126" width="16" height="8" rx="4" fill="${body}"/>
        <rect x="154" y="126" width="16" height="8" rx="4" fill="${body}"/>
        <g stroke="rgba(255,255,255,0.25)" stroke-width="2">
          <line x1="120" y1="156" x2="120" y2="176"/>
          <line x1="120" y1="176" x2="96" y2="196"/>
          <line x1="120" y1="176" x2="144" y2="196"/>
          <line x1="120" y1="176" x2="120" y2="200"/>
        </g>
        <circle cx="96" cy="198" r="4" fill="${accent}" opacity="0.5"/>
        <circle cx="144" cy="198" r="4" fill="${accent}" opacity="0.5"/>
        <circle cx="120" cy="202" r="4" fill="${accent}" opacity="0.5"/>`;

    default:
      return "";
  }
}

/** Gera a marcação completa (fundo + render vetorial do dispositivo) como string HTML autocontida. */
export function renderVisualHTML(opts: { variant: RenderVariant; accent: string; mood?: RenderMood }): string {
  const { variant, accent } = opts;
  const mood = opts.mood ?? "studio";
  const uid = `u${(uidCounter++).toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  const rgb = hexToRgb(accent);

  const bgLayer =
    mood === "ambient"
      ? "background: linear-gradient(165deg, #241c26 0%, #171827 45%, #0c1020 100%);"
      : mood === "gamer"
        ? "background: linear-gradient(155deg, #181227 0%, #0d0a1a 55%, #080611 100%);"
        : "background: linear-gradient(150deg, #1c2540 0%, #121b30 55%, #0b1220 100%);";

  const ambientFloor =
    mood === "ambient"
      ? `<div class="absolute inset-x-0 bottom-0 h-[30%]" style="background:linear-gradient(0deg, rgba(255,187,110,0.14), transparent);"></div>`
      : "";

  const rgbDefs =
    mood === "gamer"
      ? `<linearGradient id="nxRgb-${uid}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#ff4d6d"/><stop offset="25%" stop-color="#ffb84d"/>
          <stop offset="50%" stop-color="#4dff9e"/><stop offset="75%" stop-color="#4dc6ff"/>
          <stop offset="100%" stop-color="#c14dff"/>
        </linearGradient>`
      : "";

  const rgbStrip =
    mood === "gamer"
      ? `<div class="absolute inset-x-6 bottom-3 h-[3px] rounded-full opacity-70" style="background:linear-gradient(90deg,#ff4d6d,#ffb84d,#4dff9e,#4dc6ff,#c14dff);"></div>`
      : "";

  return `
    <div class="absolute inset-0" style="${bgLayer}"></div>
    <div class="absolute inset-0" style="opacity:0.15;background-image:linear-gradient(rgba(${rgb},0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(${rgb},0.5) 1px, transparent 1px);background-size:28px 28px;mask-image:radial-gradient(75% 75% at 50% 40%, black 0%, transparent 100%);-webkit-mask-image:radial-gradient(75% 75% at 50% 40%, black 0%, transparent 100%);"></div>
    <div class="absolute rounded-full" style="left:15%;top:8%;height:60%;width:60%;background:radial-gradient(circle, rgba(${rgb},0.4) 0%, transparent 70%);filter:blur(20px);"></div>
    ${ambientFloor}
    <svg viewBox="0 0 240 240" class="relative h-[72%] w-[72%]" style="filter:drop-shadow(0 18px 22px rgba(0,0,0,0.45));">
      <defs>
        <linearGradient id="nxBody-${uid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#3a4560"/><stop offset="55%" stop-color="#1c2436"/><stop offset="100%" stop-color="#0d121c"/>
        </linearGradient>
        <linearGradient id="nxScreen-${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.35"/><stop offset="100%" stop-color="${accent}" stop-opacity="0.05"/>
        </linearGradient>
        ${rgbDefs}
      </defs>
      <ellipse cx="120" cy="222" rx="52" ry="9" fill="#000" opacity="0.35"/>
      ${deviceShape(variant, accent, uid)}
    </svg>
    ${rgbStrip}
    <div class="absolute inset-x-0 top-0 h-px" style="background:linear-gradient(90deg,transparent,rgba(${rgb},0.7),transparent);opacity:0.6;"></div>
  `;
}
