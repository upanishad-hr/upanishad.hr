// PROTOTYPE — shared copy for the three homepage directions in /prototype.
// Real copy, Croatian. Delete this folder once a direction is chosen.

export const hero = {
  eyebrow: 'Softver za sportsku industriju',
  title: 'Softver za sportsku industriju.',
  lead:
    'Gradimo podatkovne platforme u stvarnom vremenu, AI agente koji rade u stvarnim poslovnim sustavima i vlastitu tehnologiju za sportsku analitiku.',
  cta: 'Razgovarajmo',
  secondary: 'Pogledajte radove',
};

export const nav = ['Što radimo', 'Radovi', 'Istraživanje', 'O nama'];

export const stats = [
  { value: '< 1 ms', label: 'prosječna obrada cijene' },
  { value: '~20', label: 'dodataka na platformi' },
  { value: '42', label: 'zapisane arhitekturne odluke' },
  { value: '2024.', label: 'osnovano u Aljmašu' },
];

export const pillars = [
  {
    key: 'data',
    title: 'Sportski podaci u stvarnom vremenu',
    body:
      'Prikupljanje koeficijenata i događaja iz više izvora, uparivanje utakmica i timova među pružateljima, izračun cijena po klijentu i isporuka u standardnom formatu — u milisekundama.',
    tags: ['Kotlin', 'Aeron', 'Kubernetes', 'TimescaleDB'],
  },
  {
    key: 'agents',
    title: 'AI agenti u stvarnim sustavima',
    body:
      'Agenti koji rade s rezervacijama, kanalima prodaje i državnim registrima. Agent predlaže, čovjek potvrđuje, poslužitelj provjerava.',
    tags: ['MCP', 'TypeScript', 'PostgreSQL'],
  },
  {
    key: 'rnd',
    title: 'Istraživanje i razvoj',
    body:
      'Vlastita tehnologija i intelektualno vlasništvo: modeliranje kretanja igrača i prediktivno upravljanje toplinom u zgradama.',
    tags: ['strojno učenje', 'simulacija', 'vremenske serije'],
  },
];

export const work = [
  {
    client: 'SportLive',
    kind: 'B2B infrastruktura sportskih podataka',
    body:
      'Platforma koja prikuplja koeficijente iz više izvora, uparuje ih na zajedničke identifikatore, određuje cijene za svaku kladionicu i isporučuje standardizirani feed. Uz nju portal za samoposluživanje, back office i tržnica dodataka.',
    role: 'Arhitektura, razvoj i rad platforme',
    status: 'Spremno za pilot',
    facts: ['< 1 ms prosječna obrada cijene', '~20 dodataka', 'Kubernetes, vlastiti hosting'],
  },
  {
    client: 'Aura',
    kind: 'AI agent za iznajmljivače',
    body:
      'Domaćin upravlja cijenama, dostupnošću, porukama gostima, prijavama u eVisitor i računima razgovorom na hrvatskom — često diktiranjem. Agent priprema, domaćin potvrđuje, poslužitelj provodi.',
    role: 'Proizvod od ideje do produkcije',
    status: 'U produkciji',
    facts: ['Beds24 · Booking.com · eVisitor', 'ChatGPT / MCP', 'potvrda prije svake promjene'],
  },
  {
    client: 'Kickter',
    kind: 'Tržnica sponzorstava za mlade sportske klubove',
    body:
      'Lokalne tvrtke zakupljuju mjesto za logo na objavama kluba za dan utakmice, a klub dokazuje da je objava izašla. Upanishad vodi tehnologiju kao vanjski CTO.',
    role: 'Tehničko vodstvo i MVP',
    status: 'U razvoju',
    facts: ['domenski model', 'opseg MVP-a', 'tehnički plan'],
  },
  {
    client: 'Vodeći europski pružatelj sportskih podataka',
    kind: 'Istraživanje i razvoj po narudžbi',
    body:
      'Video sustavi, virtualna snimka i profiliranje igrača. Rezultati pripadaju klijentu.',
    role: 'R&D po narudžbi',
    status: 'U tijeku',
    facts: ['računalni vid', 'profiliranje igrača'],
  },
];

export const research = [
  {
    code: 'OTISAK',
    title: 'Digitalni otisak kretanja igrača',
    body:
      'TV snimka ne prikazuje igrače bez lopte, pa je 40–64 % zapisa o položaju procjena. Model iz prošlih utakmica gradi „otisak” kretanja svakog igrača; provjeravamo smanjuje li on pogrešku predviđanja položaja 1–4 sekunde unaprijed.',
    phase: 'Dokazivanje koncepta · TRL 3–4',
    market: 'Pružatelji sportskih podataka, klubovi, lige',
  },
  {
    code: 'KLIMA',
    title: 'Prediktivno upravljanje toplinom',
    body:
      'Vodeni krug bez dizalice topline, s više spremnika topline, kojim upravlja softver prema vremenskoj prognozi. Prvi prototip je staklenik; fiziku mjere i potvrđuju fakulteti.',
    phase: 'U pripremi',
    market: 'Staklenici, obiteljske kuće, projektanti',
  },
];

export const quote = 'Alat koji zna reći „ne” je alat kojem se vjeruje.';

export const principles = [
  { title: 'Arhitektura prije koda', body: 'Svaka važna odluka zapisana je i obrazložena prije nego što postane kod.' },
  { title: 'Čovjek potvrđuje', body: 'AI predlaže, ljudi odlučuju, sustav provjerava da je potvrđeno baš ono što je predloženo.' },
  { title: 'Od ideje do pilota u mjesecima', body: 'Dokaz koncepta ili MVP u tri do šest mjeseci, s jasnim kriterijem uspjeha.' },
];

export const people = [
  {
    name: 'Matej Šimunić',
    role: 'CEO i arhitekt',
    body: '14 godina softverskog inženjerstva u pet zemalja. Prije Upanishada solution architect u Eviden/Atosu.',
  },
  {
    name: 'Leo Radočaj',
    role: 'CTO',
    body: 'Razvoj platforme sportskih podataka.',
  },
];

// Contact parts are stored reversed and joined only in the browser on click (see reveal script).
export const contact = {
  emailReversed: 'rh.dahsinapu@jetam',
  phoneReversed: '6847 637 79 583+',
};

export const legal = {
  name: 'Upanishad d.o.o.',
  full: 'Upanishad društvo s ograničenom odgovornošću za informatički inžinjering',
  address: 'Mladena Palinkaša 21, 31205 Aljmaš',
  court: 'Trgovački sud u Osijeku',
  mbs: '030286273',
  oib: '45236388470',
  capital: 'Temeljni kapital 2.500,00 EUR', // TODO: ZTD čl. 21 also wants the amount paid in
  director: 'Direktor: Matej Šimunić',
  bank: 'TODO: banka i IBAN',
};
