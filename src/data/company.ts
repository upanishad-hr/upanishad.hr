// Language-neutral company data. Translated legal lines (address, court, capital, director) are in
// src/i18n/strings.ts; together they are what ZTD čl. 21 requires on a d.o.o. website.

// Stored reversed and assembled in the browser on click, so scrapers don't find them in the HTML.
export const contact = {
  emailReversed: 'rh.dahsinapu@jetam',
  phoneReversed: '6847 637 79 583+',
};

// Trade (zastupanje proizvođača) lives on trade.upanishad.hr. The same Netlify site serves it: netlify.toml
// rewrites that host to /trade/. In `astro dev` the links stay local, so both pages can be clicked through.
const dev = import.meta.env.DEV;
export const trade = {
  url: { hr: 'https://trade.upanishad.hr/', en: 'https://trade.upanishad.hr/en/' },
  link: { hr: dev ? '/trade/' : 'https://trade.upanishad.hr/', en: dev ? '/trade/en/' : 'https://trade.upanishad.hr/en/' },
  home: { hr: dev ? '/' : 'https://upanishad.hr/', en: dev ? '/en/' : 'https://upanishad.hr/en/' },
  // Shown in plain text: factories copy it into their mail client.
  email: 'trade@upanishad.hr',
  // Empty = not shown. Matej approved the phone on 2026-11-11.
  phone: '+385 97 736 7486',
};

export const legal = {
  name: 'Upanishad d.o.o.',
  full: 'Upanishad društvo s ograničenom odgovornošću za informatički inžinjering',
  mbs: '030286273',
  oib: '45236388470',
  bank: 'PBZ · IBAN HR74 2340 0091 1112 6950 3',
};
