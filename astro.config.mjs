import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://upanishad.hr',
  devToolbar: { enabled: false },
  i18n: {
    defaultLocale: 'hr',
    locales: ['hr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  vite: { plugins: [tailwindcss()] },
});
