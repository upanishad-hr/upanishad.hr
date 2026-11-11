# upanishad.hr

Company website of Upanishad d.o.o. Astro 7 + Tailwind 4, static, hosted on Netlify (site `upanishad`).
Pushing to `main` deploys production; pull requests get a Netlify deploy preview.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check && astro build → dist/
```

## Do not break

`public/.well-known/matrix/{server,client}` and `public/_headers` make Matrix work for `@user:upanishad.hr`
(federation, Element logins, calls). They must be served as JSON with `Access-Control-Allow-Origin: *`.
After every deploy:

```bash
curl -i https://upanishad.hr/.well-known/matrix/client   # 200, application/json, CORS header
```

## trade.upanishad.hr

The trade page (Upanishad as a sales agent for Western Balkan manufacturers) is built from this repo under
`/trade/` and `/trade/en/` (`src/components/Trade.astro`, text in `src/i18n/trade.ts`). On Netlify,
`trade.upanishad.hr` is a domain alias of the `upanishad` site and `netlify.toml` rewrites that host to `/trade/`.
Locally: `npm run dev`, then http://localhost:4321/trade/. After a deploy:

```bash
curl -sI https://trade.upanishad.hr/ | head -1          # 200
curl -s https://trade.upanishad.hr/ | grep -o '<title>[^<]*'   # Upanishad Trade · ...
curl -sI https://trade.upanishad.hr/en/ | head -1       # 200
```

## Writing

Copy rules (what to say, Croatian style, AI tells to avoid): [docs/voice.md](docs/voice.md).
