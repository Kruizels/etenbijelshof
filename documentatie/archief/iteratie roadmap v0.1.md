# Project Iteration Roadmap

---

## Iteratie 0 · Project-bootstrap & Cloudflare-fundamenten

1. **Repository & tooling**

   * Init GitHub-repo met `main` en trunk-based branching-policy.
   * Configureer Node 22 LTS, pnpm + workspace-scripts.
   * Voeg ESLint (+TypeScript strict) en Prettier toe.
2. **Wrangler & lokale stack**

   * Installeer Wrangler v3, maak `.dev.vars` aan voor secrets.
   * Maak een lokale D1-database + minio-emulator voor R2.
3. **CI/CD skeleton**

   * GitHub Action: `lint → test → build → open-next export`.
   * PR-preview naar Cloudflare Pages (preview deploy token).
4. **Cloudflare‐resources (free tier)**

   * Maak D1-database `etenbijelshof-db` met Wrangler.
   * Maak R2-bucket `etenbijelshof-images` (10 GB limit).
   * Maak KV-namespace `CACHE`.
   * Reserveer Worker subdomain en zet default route in Pages.
5. **Auth0 tenant**

   * Tenant aanmaken (EU-region), social connectors uitzetten, MFA optioneel.
   * Registreer callback/issuer-URLs; voeg test-applicatie toe.
6. **Hello-World smoke-test**

   * Deploy minimal OpenNext worker (`GET /healthz` → `200 OK`).
   * Schakel Turnstile dev-mode in ter verificatie.

---

## Iteratie 1 · Beveiligd gebruikers­beheer (Phase 1 – MVP)

1. **next-auth + Auth0 integreren**

   * Environment-vars, session-strategie (JWT 15 min sliding).
   * Middleware voor protected routes + role-check (`viewer | contributor | admin`).
2. **Invite-only registratie-flow**

   * Admin-pagina om tokens te genereren; token check in signup-callback.
3. **Basis UI lay-out**

   * Tailwind + shadcn/ui; navigatie, toestel-breakpoints 320 px+.
4. **Cypress/E2E**: login-, logout-, invite-flow
5. **OWASP checks**

   * Helmet-achtige headers in Next config.
   * Turnstile op public formulieren (login en sign-up).

---

## Iteratie 2 · Recipe CRUD + D1‑schema

1. **Database-migraties**

   * Deploy SQL uit requirements (Users, Recipes, indexen).
2. **API-routes / Server Actions**

   * `POST /api/recipes`, `PATCH /api/recipes/:id`, `DELETE` (RBAC enforced).
3. **UI-formulieren**

   * Rich ingredient + instructions veld (Markdown lite).
   * Client-side validatie (Zod).
4. **Edge-cache helper**

   * Wrapper `getRecipe()` met KV-cache (TTL = 1 h).
5. **Unit- & integration-tests op CRUD**

---

## Iteratie 3 · Afbeeldingen & Performance

1. **Image upload endpoint**

   * Direct-upload naar R2 via presigned URL.
   * Metadata (/recipes table) met origineel + WebP variant.
2. **Image-processing Worker**

   * Sharp.js resize 800 px, WebP, cache-control 1 year.
3. **Lighthouse-budget**

   * Automatische run in CI (< 75 KB critical path, CLS < 0.1).
4. **Core Web Vitals monitoring**

   * Voeg CF Analytics ping-endpoint toe; dashboard-grafiek.
5. **Alert scripts**

   * Wrangler alert blokken voor 90 k requests/DAG, D1-reads 450 k.

---

## Iteratie 4 · Zoeken & Discovery (Phase 2 – Enhanced)

1. **LIKE-gebaseerde zoek-API**

   * Endpoint `/api/search?q=` met paginatie, collation NOCASE.
2. **Filter UI**

   * Client-side filter chips (tags, ingrediënten).
3. **Random recipe & basic recommendations**

   * SQL `ORDER BY random()` met categorie-fallback.
4. **KV-cache voor zoekresultaten (TTL 10 min).**
5. **E2E-tests**: search + filters

---

## Iteratie 5 · Shopping‑lijst & Print

1. **Client-side lijstgenerator**

   * Afleiden van recept-ingrediënten → localStorage schema v1.
2. **Export naar PDF**

   * Gebruik `react-to-print` (client-side) + print-CSS.
3. **Print-vriendelijke pagina**

   * `@media print` stylesheet, hide nav.
4. **Step-by-step kookmodus**

   * Full-screen, swipe/keyboard navigatie, keeps-awake flag (mobile).

---

## Iteratie 6 · Operational Hardening & Accessibility

1. **WCAG 2.2 AA audit**

   * axe-CI scan + manueel toetsenbord-/screenreader-ronde.
2. **Rate limiting & bot-shield**

   * CF WAF rules: path-tier, Turnstile failover.
3. **Monthly D1 → R2 back-up Worker**

   * Cron trigger 00:00 UTC, gzip dump, 30-d retention.
4. **Dependabot + Snyk alerts + signed commits**
5. **README & user-docs finaliseren**

   * ASCII-clean Markdown, tabellen minimaliseren.

---

## Iteratie 7 · Voorbereiding op toekomstige uitbreidingen

1. **Roadmap-checkpoint**

   * Meet verbruik t.o.v. gratislimieten, beslis upgrade-pad.
2. **Architectuurreview**

   * Identificeer hotspots (beeld-verwerking, database-groei).
3. **Proof-of-concept Workers-AI image pipeline**

   * Alleen in side-branch, kostenanalyse.

---

### Aanpak & spelregels

* **Definition-of-Done** per taak: code gereviewd, tests groen, deploy-preview op Pages, 0 ReDoS/OWASP-lekken.
* KISS-principe: liever één Worker-script goed dan micro-Workers.
* Elke merge naar `main` is een potentiële release; rollback via OpenNext atomic deploys.
