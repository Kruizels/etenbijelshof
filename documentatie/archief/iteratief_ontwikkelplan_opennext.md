# Iteratief ontwikkelplan - Receptenwebsite (solo-developer, geactualiseerd voor OpenNext op Cloudflare Workers)

> **Stack-versies (gecontroleerd 20 mei 2025)**  
> Next.js 15.3 (stable) — React 19.1 (latest) — Tailwind CSS 4.0 — Node.js 22 LTS — PostgreSQL 17.5

| Iteratie                                 | Duur (wk) | Doel & deliverables                                                                                                                                                                                                                                                                                                                   | Kritische risico's                                 | Afhankelijkheden |
| ---------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------- |
| **0. Setup + Security-baseline**         | 1         | - GitHub mono-repo (Turborepo) <br> - Docker Compose dev-omgeving <br> - Next.js 15.3 app met Tailwind 4.0 <br> - **SSR via OpenNext op Cloudflare Workers** <br> - CI/CD met wrangler + `.open-next/` build <br> - **Security headers, HSTS, CSP, HTTPS redirect** <br> - Rate-limiting + CAPTCHA op auth-routes <br> - MFA op admin | SSR werkt niet zonder OpenNext; TLS/headers missen | Geen             |
| **1. Familie MVP**                       | 2         | - Publieke receptweergave (titel, afbeelding, ingredienten, stappen) <br> - Supabase Auth (magic link) <br> - Recept toevoegen + foto-upload (10 MB → WebP 1600 px) <br> - CRUD via D1 + upload naar R2 <br> - Print-stylesheet                                                                                                       | Foto-compressie, auth-flow                         | Iteratie 0 infra |
| **2. Zoek, organisatie & A11y**          | 2         | - Basic search (LIKE) op D1 <br> - Categorie + tag structuur + UI filters <br> - Favorieten per user <br> - Portie-slider (dynamische hoeveelheden) <br> - WCAG AA, Axe CI checks                                                                                                                                                     | SQL performance, UI-UX complexity                  | Iteratie 1       |
| **3. Boodschappenlijst & random picker** | 1         | - PDF-generator met lijst export <br> - "Verrassing" knop met random recipe API                                                                                                                                                                                                                                                       | PDF lib beperkingen                                | Iteratie 2       |
| **4. Logging & observability**           | 1         | - Logs via Loki + Grafana Cloud <br> - Structured JSON logging <br> - Sentry integratie                                                                                                                                                                                                                                               | Config-fouten, data blindheid                      | Iteratie 0       |
| **5. Back-ups & storage hardening**      | 1         | - Migreer foto's naar R2 <br> - Setup: R2 → B2 replicatie <br> - Nightly D1 snapshot + encryptie                                                                                                                                                                                                                                      | Data loss of downtime                              | Iteratie 1       |
| **6. Performance tuning**                | 1         | - Cloudflare Cache API headers <br> - `.open-next` output audit <br> - Lighthouse budget ≥ 90 score                                                                                                                                                                                                                                   | Caching regressies                                 | Iteratie 2/3     |
| **7. SEO & preview mode**                | 1         | - Schone slugs + meta-tags + Recipe JSON-LD <br> - Preview mode met `robots: noindex` <br> - Sitemap XML endpoint                                                                                                                                                                                                                     | Schema errors                                      | Iteratie 6       |
| **8. Soft launch**                       | 1         | - Toggle voor `public=true` → site indexeerbaar <br> - Feedbackronde familie <br> - Bugfix sprint                                                                                                                                                                                                                                     | Load, edge cases                                   | Alles ervoor     |
| **9. Post-launch backlog**               | ∞         | - Reacties + ratings <br> - PWA / offline mode <br> - i18n setup (en/nl) <br> - Self-registration + moderatie <br> - Community features                                                                                                                                                                                               | Scope creep, quota                                 | Live release     |

## Tijdlijn

- **Maand 1** — Iteratie 0–1 (infra, auth, recept toevoegen/weergeven)
- **Maand 2** — Iteratie 2–4 (zoeken, lijst, logging)
- **Maand 3** — Iteratie 5–8 (storage, perf, SEO, soft-launch)
- **Daarna** — Iteratie 9 (backlog & features)

## Exit-criteria

- CI groen, Lighthouse ≥ 90, Axe zonder violaties
- OWASP ZAP scan max laag risico
- SSR via OpenNext werkt correct op Workers
- Elke iteratie gevalideerd door PO op basis van story deliverables
- Release op Cloudflare Workers via `main` branch met wrangler deploy

> **Workflow**: GitHub Projects (gratis kanban), VS Code dev-container, CI met lint/test/build/deploy. Elke taak < 1 dag. Micro-retro aan eind iteratie.

## Aangepaste notities t.o.v. origineel

- ❌ Vercel preview + promote verwijderd: ✔ vervangen door OpenNext + wrangler
- ❌ Turbopack caching verwijderd: ✔ vervangen door Cache API / headers
- ✔ Volledige ondersteuning voor SSR routes + `pages/api` via `.open-next` folder
- ✔ Alle originele functionele doelen behouden
