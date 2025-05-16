# Iteratie 0 - Setup & Security-baseline

## Doel
Een solide fundament leggen voor alle volgende iteraties en direct een minimale maar complete security-basis neerzetten.

## User-stories
| ID | Story | Acceptance criteria |
|----|-------|---------------------|
| US-0.1 | Als solo-developer wil ik een GitHub-repository met Turborepo zodat front-end, API en infra centraal versie-gecontroleerd zijn. | Repo aangemaakt, branch 'main' beschermd, README aanwezig. |
| US-0.2 | Als developer wil ik lokaal met 1 commando (dev up) een Docker-Compose stack (Postgres 17.5, Supabase CLI emulator) starten. | docker compose up start services zonder fouten; next dev toont site. |
| US-0.3 | Als security officer wil ik verkeer geforceerd via HTTPS met HSTS preload. | HTTP->HTTPS 301, Qualys SSL-labs A-rating. |
| US-0.4 | Als security officer wil ik standaard security-headers (CSP, X-Frame-Options, Referrer-Policy, X-Content-Type-Options). | Headers aanwezig, scan toont geen ontbrekende. |
| US-0.5 | Als admin wil ik MFA geactiveerd op mijn Supabase-account. | Login vereist tweede factor; dashboard toont MFA enabled. |
| US-0.6 | Als developer wil ik GitHub Actions die lint, test en build draaien. | Push naar main triggert workflow; badge in README is groen. |
| US-0.7 | Als security officer wil ik rate-limiting op auth-routes en Turnstile CAPTCHA om brute-force en bot-registraties te blokkeren. | >5 requests/min naar /auth => 429; Turnstile challenge na 3 fouten. |
| US-0.8 | Als admin wil ik Cloudflare Access Rules zodat alleen mijn e-mail toegang heeft tot /admin/* en Supabase-Studio. | 403 voor onbevoegden; Access MFA prompt bij login. |
| US-0.9 | Als owner wil ik Cloudflare Web Analytics om page-views te zien zonder extra cookies. | Dashboard toont verkeer; script in head geladen. |

## Taken
- DNS delegatie: zet bij Strato de nameservers op Cloudflare.
- Cloudflare Free plan aanmaken, domein toevoegen.
- Activeer Universal SSL (status Active Certificate) en zet Strict SSL op Full (strict).
- Access policy: bescherm /admin/* en Supabase-Studio URL op jouw e-mail (MFA enforced).
- Pages project koppelen aan GitHub (apps/web), build cmd npm run build, output ./out.
- Pages Functions setup voor API-routes; maak KV-namespace RL voor rate-limiting.
- Implementeer rate-limiter + Turnstile verificatie in Pages Function.
- Web Analytics activeren (automatic injection).
- Firewall rule: blok POST buiten EU op /api/*.
- R2-bucket recipe-photos; S3 keys in .env.
- Initialiseer Git repo, .gitignore, push naar GitHub.
- Configureer Turborepo (apps/web, packages/ui, infra).
- VS Code dev-container (Dockerfile, devcontainer.json).
- docker-compose.yml met PostgreSQL 17.5, Supabase CLI, Mailpit.
- Installeer Next.js 15.3 + Tailwind 4.0 starter.
- ESLint 9, Prettier config, Husky pre-commit hook.
- GitHub Actions workflow lint-test-build.yml.
- Security headers via Cloudflare Transform Rules.
- Activeer MFA op Supabase-account.
- Documenteer setup in README.

## Uitschieters / Risks
- Eerste DNS-propagatie kan tot 24h duren -> vooruit plannen.
- Turnstile token-verify latency -> mitigeren met KV-cache.
- Pages build minuten limiet (20 min) bij grote npm install -> gebruik pnpm en caching.

## Definition of Done
- Alle tasks afgevinkt.
- User-stories voldoen aan acceptatiecriteria.
- OWASP ZAP scan < 3 medium issues.
- Pipeline slaagt zonder waarschuwingen.
- Demo aan PO: site via Cloudflare Pages HTTPS met headers, Access lockdown en werkende Turnstile.
