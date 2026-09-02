// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://cronosstart.com.br',
  compressHTML: true,

  redirects: {
    '/modelos': '/#modelos',
  },

  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4400,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      // Exclui /modelos (agora um redirect) e os 6 modelos demonstrativos (noindex) —
      // só a home, as páginas legais e as landing pages comerciais são públicas,
      // canônicas e indexáveis.
      filter: (page) => {
        const path = new URL(page).pathname;
        return (
          path === '/' ||
          path === '/politica-de-privacidade/' ||
          path === '/termos-de-uso/' ||
          path === '/criacao-de-sites-blumenau/' ||
          path === '/sites-para-pequenas-empresas/' ||
          path === '/sites-com-painel-administrativo/' ||
          path === '/sites-para-imobiliarias/' ||
          path === '/sites-para-restaurantes/'
        );
      },
    }),
  ],
});
