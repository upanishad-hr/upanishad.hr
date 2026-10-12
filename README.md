# upanishad.hr

Company website of Upanishad d.o.o. Astro 7 + Tailwind 4, static, hosted on Netlify (site `upanishad`).
Pushing to `main` deploys production; pull requests get a Netlify deploy preview.

```bash
npm install
npm run dev      # http://localhost:4321  (/prototype has the design directions, ←/→ to switch)
npm run build    # astro check && astro build → dist/
```

## Do not break

`public/.well-known/matrix/{server,client}` and `public/_headers` make Matrix work for `@user:upanishad.hr`
(federation, Element logins, calls). They must be served as JSON with `Access-Control-Allow-Origin: *`.
After every deploy:

```bash
curl -i https://upanishad.hr/.well-known/matrix/client   # 200, application/json, CORS header
```

## Writing

Copy rules (what to say, Croatian style, AI tells to avoid): [docs/voice.md](docs/voice.md).
