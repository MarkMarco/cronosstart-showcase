// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://modelos.cronosstart.com.br',
  redirects: {
    '/': '/modelos',
  },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
