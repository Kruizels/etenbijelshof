**Functionele eisen receptenwebsite (familiegebruik)**

#### Algemene richtlijnen
- Altijd gratis: gebruik alleen always free tiers, cost alerts ingesteld.
- Security first: HTTPS, HSTS, OWASP Top 10 mitigatie, MFA voor admin, dependency scans.
- Privacy & GDPR: data minimalisatie, cookie banner, EU providers, privacy friendly analytics.
- Performance budget: LCP <= 2.5 s, TBT <= 200 ms, CLS <= 0.1; merges blokkeren als overschreden.
- Accessibility: WCAG 2.1 AA, keyboard navigatie, voldoende contrast.
- Coding standards: ESLint 9, Prettier, Conventional Commits, 80 percent test coverage, SemVer tags.
- Latest stack: Next.js 15.3, React 19.1, Tailwind 4.0, Node 22 LTS, TypeScript 5.8, PostgreSQL 17.
- Documentation: README, Storybook, Figma style guide.
- Vendor lock in beperken: S3 compatible storage, Terraform infra.
- Monitoring: Grafana Cloud, Loki logs, Sentry, UptimeRobot.
- Back ups: wekelijkse DB snapshot, R2 replica naar B2.
- Single repo workflow: Turborepo, GitHub Projects kanban.

### 1. Recepten toevoegen en beheren
- Formulier: titel, beschrijving, ingredienten, stappen, bereidingstijd, porties, tags.
- Foto upload: jpg/png/webp max 10 MB, conversie naar webp 1600x1600, compressie max 300 KB.
- Validatie verplichte velden.
- Recept bewerken of verwijderen door eigenaar.
- Versiegeschiedenis: laatste datum en gebruiker.
- Bron veld, copyright checkbox, zichtbaarheid openbaar of alleen leden.

### 2. Veilig gebruikersbeheer en login
- Gratis auth provider (Auth0, Firebase, Supabase).
- Alleen vooraf aangemaakte accounts.
- HTTPS en OAuth 2 / OIDC, CSRF, rate limiting.
- Rollen: admin en gebruiker, gasten lezen openbaar recepten.

### 3. Recept weergave en printen
- Recept pagina met foto, ingredienten, stappen.
- Print knop met print stylesheet.
- Porties slider past hoeveelheden aan.

### 4. Zoeken en filteren
- Full text search op titel en ingredienten.
- Filters: categorie, tijd, moeilijkheid, tags.
- Autocomplete.
- Sortering op relevantie of datum.

### 5. Navigatie en organisatie
- Categorie overzicht.
- Favorieten.
- Recent toegevoegd.
- Verrassing knop.
- Boodschappenlijst generator met PDF export.

### 6. Responsief en toegankelijk
- Mobiel vriendelijk vanaf 320 px.
- WCAG AA, tekstgrootte instelbaar.

### 7. Data export en back up
- Exporteer alle recepten naar PDF of JSON.
- Wekelijkse back up.

### 8. Prestatie en onderhoud
- Server side caching.
- Monitoring en logging.
- Regelmatige updates en patches.

### 9. Database en opslag
- PostgreSQL (Supabase, Railway, PlanetScale).
- Full text search met tsvector.
- JSONB kolommen voor extra data.
- Schema migratietooling.
- Schaalbaar naar read replicas.

### 10. Ontwikkelrichtlijnen
- Standaard versies zoals boven.
- Mono repo structuur apps/web apps/api packages/ui infra.
- Dev container en Docker Compose.
- CI/CD met GitHub Actions: lint, test, build, lighthouse, deploy.
- Dependabot en Renovate.
- Vitest unit tests, Playwright e2e.
- Performance budget checks.
- OpenAPI spec in /api.
- Changelog via changesets.

### 11. Hosting en deployment
- Supabase Free voor auth en database.
- Gratis object storage: Cloudflare R2, Backblaze B2, Oracle OCI, Cloudinary Free.
- Statische hosting Netlify Free of Vercel Hobby.
- Secrets beheer in dash.
- Cost alerts.

### 12. Copyright en bronvermelding
- Bron veld verplicht bij externe inspiratie.
- Alleen eigen of rechtenvrije foto.
- Disclaimer en gebruiksvoorwaarden.

### 13. SEO en toekomst
- Schone slugs, meta tags, recipe schema.
- Noindex optie tot public launch.
- Alerts voor usage limieten.

### 14. Beheer security en compliance
- HTTPS TLS 1.2+, security headers, cookies Secure HttpOnly SameSite.
- Rate limiting, CAPTCHA, MFA.
- OWASP Top 10 mitigatie plan.
- Dependency sbom, CodeQL, ZAP scan.
- Encryptie at rest.
- Audit logs 90 dagen.
- Privacy friendly analytics.

### 15. Security roadmap
- Zero trust JWT, SRI, secret rotation, bug bounty.
- Continuous monitoring alerts.
