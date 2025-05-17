# Iteratie 0 – Setup & Security-baseline

## Overzicht keuzes & dependencies

- **Framework**  
  – Next.js 15.x + React 18.x
- **Styling**  
  – CSS-modules (geen Tailwind) + globale reset in `styles/globals.css`
- **Codekwaliteit**  
  – ESLint 9.x, Prettier 3.x
- **Local dev**  
  – Dockerfile + `docker-compose.yml` → `docker-compose up -d`
- **CI & Deployment**  
  – GitHub Flow (`main` + feature-branches), Actions lint/build/deploy → Cloudflare Pages
- **Cloudflare-stack (free)**  
  – Pages & Functions, D1, R2, Access, Turnstile
- **Auth**  
  – next-auth of eigen OIDC-SDK
- **Storage**  
  – D1 voor recepten, R2 voor foto’s
- **Security**  
  – Access rules voor `/admin/*`, CSP/HSTS via Transform Rules

---

## Takenlijst

- [ ] Repo `etenbijelshof` aanmaken + branch-protectie op `main`
- [ ] Dockerfile & docker-compose.yml voor Next.js dev
- [ ] `package.json` met dependencies + scripts
- [ ] ESLint + Prettier config (`.eslintrc.cjs`, `.prettierrc`)
- [ ] CSS-modules structuur + `styles/globals.css`
- [ ] GitHub Actions workflow (`.github/workflows/ci.yml`)
- [ ] DNS nameservers wijzigen bij Strato → Cloudflare
- [ ] Cloudflare Pages project koppelen aan GitHub-repo
- [ ] Wrangler CLI configuratie (`wrangler.toml`) + bindings voor D1 & R2
- [ ] D1-schema maken voor recepten (titel, body, image_url)
- [ ] R2-bucket `recipe-photos` aanmaken + S3-credentials in GH Secrets
- [ ] Next-auth (OIDC) instellen + Turnstile CAPTCHA + KV rate-limiter
- [ ] Cloudflare Access rule voor `/admin/*` (e-mail + MFA)
- [ ] Transform Rules: CSP, HSTS, X-Frame-Options, etc.
- [ ] OWASP ZAP scan (<3 medium)
- [ ] Demo: site live op `etenbijelshof.nl`, admin-route beschermd, upload/login werkt

---

## Stappenplan per dag

### Dag 1 – Repo & Docker-setup

1. Maak GitHub-org “etenbijelshof” en repo `etenbijelshof`.
2. Zet branch-bescherming op `main` (vereis PR + CI-status).
3. Voeg **Dockerfile** toe:
   ```dockerfile
   FROM node:22-alpine
   WORKDIR /usr/src/app
   COPY package.json package-lock.json ./
   RUN npm ci
   COPY . .
   EXPOSE 3000
   CMD ["npm", "run", "dev"]
   ```
4. Voeg **docker-compose.yml** toe:
   ```yaml
   version: "3.8"
   services:
     app:
       build: .
       volumes:
         - ./:/usr/src/app
       ports:
         - "3000:3000"
   ```
5. Test lokaal:
   ```bash
   docker-compose up -d
   # browser → http://localhost:3000 (leeg Next.js-welkom)
   ```

### Dag 2 – Next.js, CSS-modules & CI

1. `npm init next-app@15` + kies TypeScript.
2. Maak map `styles/` met `globals.css`:
   ```css
   /* styles/globals.css */
   *,
   *::before,
   *::after {
     box-sizing: border-box;
     margin: 0;
     padding: 0;
   }
   body {
     font-family: system-ui, sans-serif;
     line-height: 1.5;
   }
   :root {
     --primary: #f05a28;
   }
   ```
3. In `_app.tsx`:

   ```tsx
   // pages/_app.tsx
   import "../styles/globals.css";
   import type { AppProps } from "next/app";

   export default function App({ Component, pageProps }: AppProps) {
     return <Component {...pageProps} />;
   }
   ```

4. Installeer en configureer ESLint + Prettier:
   ```bash
   npm install -D eslint@^9.26.0 prettier@^3.5.3 eslint-config-next
   ```
   **.eslintrc.cjs**
   ```js
   module.exports = {
     extends: ["next", "next/core-web-vitals", "prettier"],
   };
   ```
   **.prettierrc**
   ```json
   { "semi": true, "singleQuote": true, "trailingComma": "all" }
   ```
5. Voeg scripts toe in `package.json`:
   ```json
   "scripts": {
     "dev": "next dev",
     "build": "next build",
     "start": "next start",
     "lint": "eslint . --ext .ts,.tsx",
     "format": "prettier --write ."
   }
   ```
6. Maak **.github/workflows/ci.yml** (zie sectie hieronder).
7. Push → CI moet groen badge tonen in README.

### Dag 3 – Cloudflare Pages & Functions

1. Voeg `wrangler.toml` toe:
   ```toml
   name = "etenbijelshof"
   main = "src/index.ts"
   compatibility_date = "2025-05-17"
   account_id = "<CF_ACCOUNT_ID>"
   workers_dev = false
   route = ""
   zone_id = "<CF_ZONE_ID>"
   [[ d1_databases ]]
   binding = "RECIPES_DB"
   database_name = "recepten_db"
   [[ kv_namespaces ]]
   binding = "RATE_LIMIT_KV"
   ```
2. Installeer Wrangler:
   ```bash
   npm install -D wrangler@^3.0.0
   ```
3. Maak minimale Function `src/index.ts`:
   ```ts
   import { Router } from "itty-router";
   const router = Router();
   router.get("/", () => new Response("OK"));
   export default {
     fetch: (req: Request) => router.handle(req),
   };
   ```
4. Test lokaal met `npx wrangler dev`.

### Dag 4 – D1-schema & R2 bucket

1. Schrijf D1-migratie `migrations/01_create_recepten.sql`:
   ```sql
   CREATE TABLE recepten (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     title TEXT NOT NULL,
     body TEXT NOT NULL,
     image_url TEXT
   );
   ```
2. Deploy migratie: `npx wrangler d1 execute --name recepten_db migrations/01_create_recepten.sql`
3. Maak R2 bucket `recipe-photos` in Cloudflare dashboard.
4. Test in Function: example D1-query & R2-upload/download.

### Dag 5 – Auth & Turnstile

1. Installeer next-auth: `npm install next-auth`
2. Configureer `pages/api/auth/[...nextauth].ts` met je OIDC-provider.
3. Voeg Turnstile-widget toe aan login pagina en Functions middleware met KV-rate-limit (5 req/min).
4. Test: loginflow + CAPTCHA na 3 mislukte pogingen.

### Dag 6 – Security hardening

1. In Cloudflare dashboard → **Access** → Protect `/admin/*` met e-mail + MFA.
2. In **Rules** → **Transform Rules**:
   - **Content-Security-Policy**
   - **Strict-Transport-Security**
   - **X-Frame-Options**
   - **Referrer-Policy**
   - **X-Content-Type-Options**
3. Verifieer via `curl -I https://etenbijelshof.nl`.

### Dag 7 – Validate & demo

1. Draai OWASP ZAP scan tegen je function en Pages URL (<3 medium).
2. Zorg dat CI-pipeline groen is op `main`.
3. Schrijf in README:
   - Setup-instructies (`docker-compose up -d`)
   - Live URL + admin-demo (screenshots)
4. Doe een live demo:
   - Recept ophalen
   - Foto uploaden
   - Admin-route betreden (Access MFA)
   - Login/CAPTCHA

---

### GitHub Actions workflow (`.github/workflows/ci.yml`)

```yaml
name: CI & Deploy

on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 22

      - name: Install dependencies
        run: npm ci

      - name: Lint & Format
        run: |
          npm run lint
          npm run format -- --check

      - name: Build
        run: npm run build

      - name: Publish to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          projectName: etenbijelshof
          directory: .next
```
