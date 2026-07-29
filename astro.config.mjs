// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://cronosstart.com.br',

  redirects: {
    '/': '/modelos',
  },

  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4400,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      // Exclui os 6 modelos demonstrativos (já marcados noindex,nofollow) — só as
      // páginas reais (home e legais) devem aparecer no sitemap.
      filter: (page) => {
        const path = new URL(page).pathname;
        return path === '/modelos/' || path === '/politica-de-privacidade/' || path === '/termos-de-uso/';
      },
    }),
  ],
});