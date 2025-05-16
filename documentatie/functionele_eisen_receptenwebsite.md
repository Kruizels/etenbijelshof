# Functionele eisen receptenwebsite (familiegebruik)

#### Algemene richtlijnen
- **Altijd gratis**: alleen always-free tiers; cost alerts ingesteld.
- **Security first**: HTTPS/TLS 1.2+, HSTS, CSP, X-Frame-Options, Secure/HttpOnly/SameSite-cookies, OWASP Top 10 mitigatie, MFA voor admin, dependency SBOM en CodeQL-scans in CI, OWASP ZAP dynamic scans.
- **Privacy & GDPR**: data-minimalisatie, cookie-banner, EU-providers, privacy-vriendelijke analytics.
- **Performance-budget**: LCP ≤ 2.5 s, TBT ≤ 200 ms, CLS ≤ 0.1; merges blokkeren bij overschrijding.
- **Accessibility**: WCAG 2.1 AA, keyboard-navigatie, voldoende contrast, instelbare tekstgrootte.
- **Coding standards**: ESLint 9, Prettier, Conventional Commits, ≥ 80 % testcoverage, SemVer tags.
- **Latest stack**: Next.js 15.3, React 19.1, Node 22 LTS, TypeScript 5.8, **Cloudflare D1 (SQLite-engine)**.
- **Documentation**: README, Storybook, Figma style guide.
- **Vendor-lock-in beperken**: Terraform voor infra; gebruik S3-compatibele storage (Cloudflare R2, B2).
- **Monitoring**: Grafana Cloud, Loki logs, Sentry, UptimeRobot.
- **Back-ups**: wekelijkse D1-snapshot, R2 → Backblaze B2.
- **Single-repo workflow**: Turborepo, GitHub Projects (Kanban).

### 1. Recepten toevoegen en beheren
- Formulier: titel, beschrijving, ingrediënten, stappen, bereidingstijd, porties, tags.
- Foto-upload: jpg/png/webp ≤ 10 MB; convert → webp 1600 × 1600; compressie ≤ 300 KB.
- Validatie verplichte velden.
- Recept bewerken/verwijderen door eigenaar.
- Versie​geschiedenis: datum & gebruiker.
- Bron-veld, copyright-checkbox, zichtbaarheid (openbaar of alleen leden).

### 2. Veilig gebruikersbeheer en login
- **Auth via Supabase Auth (free tier) uitsluitend**:
  - E-mail-link, OAuth/OIDC (Google, GitHub, etc.), JWT-uitgifte, sessiebeheer.
- **User flows**:
  - Invite-only accounts én self-registration met moderatie (nieuw account pas actief na goedkeuring).
- CSRF-bescherming, rate-limiting, HTTPS/OAuth 2.

### 3. Receptweergave en printen
- Receptpagina met foto, ingrediënten, stappen.
- Print-knop + print-stylesheet.
- Porties-slider past hoeveelheden dynamisch aan.

### 4. Zoeken en filteren
- Basic search op titel en ingrediënten (LIKE-queries in D1).
- Filters: categorie, tijd, moeilijkheid, tags.
- Autocomplete.
- Sortering op relevantie of datum.
- **Migratiepad**: in toekomstige releases overstap naar managed PostgreSQL voor full-text search (tsvector).

### 5. Navigatie en organisatie
- Categorie-overzicht.
- Favorieten.
- Recent toegevoegd.
- Verrassing-knop.
- Boodschappenlijst-generator + PDF-export.

### 6. Responsief en toegankelijk
- Mobielvriendelijk vanaf 320 px.
- WCAG 2.1 AA, keyboard-navigatie, instelbare tekstgrootte.

### 7. Data-export en back-up
- Exporteer recepten als PDF of JSON.
- Wekelijkse back-up van D1 (snapshot + R2 → B2).

### 8. Prestatie en onderhoud
- Server-side caching (Workers KV of R2 + Cache API).
- Monitoring & logging zoals hierboven.
- Regelmatige updates en patches.

### 9. Database en opslag
- **Use D1 (SQLite-engine)** voor alle CRUD in live omgeving.
- **Migratiepad**: overstap naar managed PostgreSQL (Supabase DB of Railway) voor JSONB-velden, full-text search en read-replica’s.
- Schema-migratietooling (dbmate, Flyway, etc.).

### 10. Ontwikkelrichtlijnen
- Mono-repo (apps/web, apps/api, packages/ui, infra).
- Dev-container + Docker Compose.
- CI/CD (GitHub Actions): lint, test (Vitest), build, Lighthouse checks, deploy.
- Dependabot en Renovate.
- Playwright e2e.
- Performance-budget checks in pipeline.
- OpenAPI-spec in `/api`.
- Changelog via Changesets.

### 11. Hosting en deployment
- **Auth**: Supabase Auth (gratis).
- **Frontend/API**: Cloudflare Pages & Functions (free tier).
- **Object storage**: Cloudflare R2 (free) + B2 voor replica.
- **Secrets**: beheer via Terraform variables of GitHub Secrets.
- Cost alerts ingesteld.

### 12. Copyright en bronvermelding
- Bron-veld verplicht bij externe inspiratie.
- Alleen eigen of rechtenvrije foto’s.
- Disclaimer en gebruiksvoorwaarden.

### 13. SEO en toekomst
- Schone slugs, meta-tags, Recipe Schema.
- Noindex-optie pre-launch.
- Alerts voor usage-limieten.

### 14. Beheer security en compliance
- Zie “Security first” in Algemene richtlijnen.
- Audit logs 90 dagen bewaren.
- Encryptie at-rest (R2 + snapshot encryptie).

### 15. Security roadmap
- Zero-Trust JWT, SRI, secret-rotation, bug-bounty.
- Continuous monitoring alerts.
