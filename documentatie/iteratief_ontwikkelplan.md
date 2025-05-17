# Iteratief ontwikkelplan - Receptenwebsite (solo-developer)

> **Stack-versies (gecontroleerd 16 mei 2025)** Next.js 15.3 (stable) (nextjs.org) React 19.1 (latest) (react.dev) Tailwind CSS 4.0 (tailwindcss.com) Node.js 22 LTS (v22.15.1) (nodejs.org) PostgreSQL 17.5 (postgresql.org)

| Iteratie                                  | Duur (wk) | Doel & deliverables                                                                                                                                                                                                                                                                     | Kritische risico's                | Afhankelijkheden      |
| ----------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | --------------------- |
| **0. Setup + Security-baseline**          | 1         | - GitHub repo (Turborepo) <br>- Dev-container + Docker Compose (Postgres 17.5, Supabase CLI) <br>- Basis Next.js 15.3 app met Tailwind 4.0 <br>- **Security-headers, HTTPS redirect, HSTS, CSP** <br>- Rate-limiting + CAPTCHA op auth-routes <br>- MFA ingeschakeld voor admin-account | Onboarding tijd, TLS misconfig    | None                  |
| **1. Familie MVP**                        | 2         | - Publieke recept-view (titel, foto, ingredienten, stappen) <br>- Supabase Auth (email-link) <br>- Recept toevoegen + foto-upload (10 MB -> WebP 1600 px) <br>- Recepten opslaan in Supabase DB <br>- Print-stylesheet                                                                  | Foto-compressie, Auth-flow        | Iteratie 0 infra      |
| **2. Zoek, organisatie & A11y**           | 2         | - Full-text search (tsvector) op titel + ingredienten <br>- Categorie & tag schema + filter UI <br>- Favorieten (per user) <br>- Portie-slider (hoeveelheden schalen) <br>- WCAG AA fixes, Axe-tests in CI                                                                              | SQL-performance, UI-complexiteit  | Iteratie 1 data       |
| **3. Boodschappenlijst & random picker**  | 1         | - Boodschappenlijst generator + PDF-export <br>- "Verrassing" knop (random recipe API)                                                                                                                                                                                                  | PDF-lib limieten                  | Iteratie 2 tags       |
| **4. Logging & observability**            | 1         | - Loki + Grafana Cloud pipeline <br>- Structured JSON logs <br>- Error tracking met Sentry free                                                                                                                                                                                         | Config-complexiteit               | Iteratie 0 infra      |
| **5. Back-ups & object-storage migratie** | 1         | - Foto's naar Cloudflare R2 <br>- R2 <-> Backblaze B2 replica script <br>- Nightly DB snapshot                                                                                                                                                                                          | Data-migratie downtime            | Iteratie 1 files      |
| **6. Performance hardening**              | 1         | - Caching headers, ISR/Turbopack build <br>- Lighthouse score >= 90 automatisch in CI                                                                                                                                                                                                   | Regressie door caching            | Iteratie 2+3 features |
| **7. SEO & public preview**               | 1         | - Schone slugs, meta-tags, Recipe schema.org JSON-LD <br>- Preview-mode met `robots noindex` <br>- Sitemap generator                                                                                                                                                                    | Schema validatie                  | Iteratie 6 perf       |
| **8. Soft launch & feedback**             | 1         | - "Public" flag live (robots index) <br>- Familie & vrienden feedbackronde <br>- Bugfix-sprint                                                                                                                                                                                          | Onverwachte load                  | Alle voorgaande       |
| **9. Post-launch backlog**                | infinity  | - Reacties/ratings <br>- PWA offline mode <br>- i18n (multi-language) <br>- Publieke self-registration met email-verificatie <br>- Community features & moderation dashboard                                                                                                            | Scope creep, gratis tier limieten | Launch                |

## Tijdlijn

- **Maand 1** - Iteraties 0-1 (veilig fundament + familie-MVP)
- **Maand 2** - Iteraties 2-4 (zoeken, a11y, boodschappen, logs)
- **Maand 3** - Iteraties 5-8 (back-ups, performance, SEO, soft-launch)
- **Daarna** - Iteratie 9 (backlog & community)

### Exit-criteria

- CI groen, Lighthouse >= 90, Axe 0 violaties, OWASP ZAP hoogstens laag-severity issues
- Functionele acceptatie door PO per iteratie
- Release via Vercel preview -> promotie productie (vX.Y.0 tag)

> **Workflow**: GitHub Projects (gratis kanban) + VS Code dev-container; elk ticket <= 1 dag; micro-retro na elke iteratie.
