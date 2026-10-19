# Kinga — Before Harm Happens

Kinga ("protection" in Kiswahili) is a **privacy-first early-warning and referral platform** that lets girls — or someone worried about a girl — discreetly signal the risk of **child marriage, FGM and gender-based violence** before harm happens. A signal travels over a basic-phone channel (USSD or SMS), is triaged by trained responders, and is matched to verified local services, while the platform stores as little personal data as possible.

> **Status: working prototype / demonstrator.** All case data lives in the browser (`localStorage`) and is seeded with fictional demo content. No real reports are transmitted or stored by this build. See [Prototype scope and production path](#prototype-scope-and-production-path).

---

## Table of contents

1. [Highlights](#highlights)
2. [Who it is for](#who-it-is-for)
3. [Pages and routes](#pages-and-routes)
4. [How a signal flows through the system](#how-a-signal-flows-through-the-system)
5. [Privacy and safeguarding by design](#privacy-and-safeguarding-by-design)
6. [Tech stack](#tech-stack)
7. [Getting started](#getting-started)
8. [Scripts](#scripts)
9. [Project structure](#project-structure)
10. [Architecture notes](#architecture-notes)
11. [Internationalisation](#internationalisation)
12. [Community circle (Nostr)](#community-circle-nostr)
13. [Testing and quality](#testing-and-quality)
14. [Deployment](#deployment)
15. [Resetting demo data](#resetting-demo-data)
16. [Prototype scope and production path](#prototype-scope-and-production-path)
17. [Known limitations](#known-limitations)
18. [Contributing](#contributing)
19. [Emergency contacts](#emergency-contacts)

---

## Highlights

- **Discreet signalling** — a USSD menu (`*384*21#` in the simulator) and an SMS keyword flow (`KINGA HELP`) that work on any basic phone, no data or smartphone needed.
- **Consent before data** — the county is only requested *after* the user agrees to be contacted.
- **Uncertainty is never ignored** — answering "I am not sure" about urgency is treated as an *emerging* risk.
- **Responder dashboard** — triage queue, case detail, assignment, escalation, referral, notes, closure and "unreachable" handling.
- **Referral engine** — transparent, explainable ranking of verified services by eligibility, county coverage, capacity, accessibility and 24/7 availability. A human always makes the final decision.
- **Verified referral directory** — organisations, services and responders with verification and capacity controls.
- **Anonymised community analytics** — county-level, aggregate charts only.
- **Audit trail** — every sensitive action (assignment, escalation, referral, org suspension, etc.) is written to an audit log.
- **Bilingual** — complete English and Kiswahili UI, USSD/SMS flows and helpline descriptions.
- **Peer-support circle** — a pseudonymous community feed carried on the Nostr protocol.
- **Safety-first UI** — a persistent help button, a safety/precautions page, and national free helplines surfaced throughout.

## Who it is for

| Role | What they do in Kinga |
| --- | --- |
| **Girl / reporter** | Sends a discreet signal via USSD, SMS or the web simulator; can reach free helplines directly. |
| **Concerned person** | Reports on behalf of someone else (`concerned-other` reporter type). |
| **Responder** | Works the triage queue, contacts the reporter if consented, escalates or refers. |
| **Organisation admin** | Keeps service capacity (`available` / `limited` / `full`) up to date. |
| **Platform admin** | Verifies organisations and responders, activates/suspends services, reviews the audit log. |
| **Community member** | Reads and (with a free Nostr key) posts to the peer-support circle. |

## Pages and routes

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Mission, how it works, and a live snapshot of recent signals |
| `/ussd` | USSD & SMS simulator | Try the exact phone menu tree in a phone mock-up |
| `/community` | Community circle | Pseudonymous peer-support feed (Nostr) |
| `/safety` | Safety & precautions | Digital-safety guidance and helplines |
| `/dashboard` | Responder dashboard | Triage queue and filters |
| `/cases/:caseId` | Case detail | Timeline, notes, referral suggestions, actions |
| `/referrals` | Referral directory | Verified organisations and services |
| `/analytics` | Community analytics | Aggregate county/category/outcome charts |
| `/admin` | Administration | Organisation, responder and service controls; audit log |
| `/:nip19` | NIP-19 resolver | Resolves Nostr identifiers (`npub…`, `note…`, etc.) |
| `*` | Not found | 404 page |

## How a signal flows through the system

```text
 Basic phone                    Kinga                          Responder / service
 ───────────                    ─────                          ───────────────────
 *384*21#  or  "KINGA HELP" ─►  Session state machine
                                language → welcome → risk
                                → urgency → consent → county
                                         │
                                         ▼
                                 submitSignal()  ──►  Case created (status: new)
                                 (no names, no phone,        │
                                  county-level only)         ▼
                                                      Responder dashboard
                                                      assign → in-progress
                                                            │
                                                            ▼
                                                      Referral engine ranks services
                                                      (human picks one)
                                                            │
                                                            ▼
                                            referred / escalated / closed / unreachable
                                            (every step recorded in the audit log)
```

**Case lifecycle** — `new → assigned → in-progress → escalated → referred → closed`, with `unreachable` as a terminal state when contact fails.

**Risk categories** — child marriage, FGM, GBV, threats, school dropout, other.
**Risk levels** — `info`, `emerging`, `urgent`.
**Channels** — `ussd`, `sms`, `web`.

### The referral engine

`src/lib/kinga/engine.ts` filters then scores services. A service is considered only if it is active, not at full capacity, handles the case's risk category, and belongs to an **active** organisation. Scoring (higher is better):

| Factor | Effect |
| --- | --- |
| Covers the case's county | +5 |
| Capacity `available` / `limited` | +3 / +1 |
| Accessibility features | +1 per feature (max +2) |
| 24/7 service | +3 for urgent cases, +1 otherwise |
| Urgent case, out-of-county service | −2 |

Ties are broken in favour of in-county services. Each result carries machine-readable reasons that the UI renders in the active language, so responders can see *why* a service was suggested. `suggestResponder()` similarly proposes the verified responder covering the county with the fewest open cases.

## Privacy and safeguarding by design

- **Data minimisation** — a signal carries no name, phone number or precise location. County is the most specific geography ever stored.
- **Consent-gated collection** — location is requested only after consent to be contacted.
- **Pseudonymous identities** — responders appear as initials (e.g. "Responder A.O."); community authors are shown pseudonymously, never with profile metadata.
- **Phone-number guard** — the community composer refuses phone-number-shaped content.
- **Helplines, not guesses** — only nationally published free hotlines carry numbers; other organisations are reached "via a Kinga responder" so numbers can't go stale or be misdialled.
- **Auditability** — sensitive actions are mirrored into an audit log.
- **No tracking** — no analytics scripts; a strict Content-Security-Policy is set in `index.html`.
- **Human in the loop** — the engine ranks and explains; a trained responder decides.

## Tech stack

| Area | Technology |
| --- | --- |
| UI | React 19, TypeScript (strict), Vite |
| Styling | Tailwind CSS 4, `tw-animate-css`, shadcn/ui on Radix (`radix-ui`) |
| Fonts | Fraunces (headings) and Inter (body) via Fontsource — self-hosted, no external requests |
| Routing | React Router 7 |
| Data / cache | TanStack Query 5 |
| Charts | Recharts |
| Forms / validation | React Hook Form, Zod |
| Social protocol | Nostr via Nostrify (`@nostrify/react`) and `nostr-tools` |
| Head / SEO | Unhead |
| Testing | Vitest, Testing Library, jsdom |
| Linting | ESLint 10 with React Hooks, React Refresh and custom project rules |

## Getting started

### Prerequisites

- **Node.js 22** (used by the CI/CD pipelines) and npm

### Install and run

```bash
npm install
npm run dev
```

The dev server listens on **http://localhost:8080**.

> Note: `npm run dev`, `build` and `test` each run `npm i --silent` first, so dependencies stay in sync automatically.

### Try the demo

1. Open **/ussd** and dial `*384*21#` in the phone simulator (or switch to the SMS tab and send `KINGA HELP`). Choose a language, walk through the menu and submit a signal.
2. Open **/dashboard** — your new case appears at the top of the triage queue.
3. Open the case, assign it, review the suggested services, then refer, escalate or close it.
4. Visit **/admin** to see the action recorded in the audit log, and **/analytics** for aggregate charts.
5. Toggle the language (English / Kiswahili) from the header menu.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Install deps and start the Vite dev server on port 8080 |
| `npm run build` | Install deps, produce a production build in `dist/`, and copy `index.html` to `404.html` for SPA hosting |
| `npm run test` | Full gate: `tsc --noEmit` → `eslint` → `vitest run` → production build |
| `npx vitest` | Run the unit/smoke tests in watch mode |
| `npx tsc --noEmit` | Type-check only |
| `npx eslint` | Lint only |

## Project structure

```text
src/
├── App.tsx                  # Providers (Query, Nostr, i18n, Head, Tooltip, Toaster)
├── AppRouter.tsx            # Route table
├── main.tsx                 # Entry point
├── index.css                # Tailwind + design tokens
├── pages/                   # Index, Ussd, Community, Safety, Dashboard,
│                            #   CaseDetail, Referrals, Analytics, Admin, NIP19, NotFound
├── components/
│   ├── kinga/               # Product components: header, footer, logo, help button,
│   │                        #   USSD/SMS simulators, badges, pseudonym badge
│   ├── ui/                  # shadcn/ui primitives
│   └── auth/                # Nostr login dialogs and account switcher
├── hooks/                   # useKingaSession, useCommunity, useNostr, useCurrentUser, …
├── lib/
│   ├── kinga/
│   │   ├── types.ts         # Domain model
│   │   ├── seed.ts          # Fictional demo data
│   │   ├── store.ts         # localStorage-backed store + audit log
│   │   ├── engine.ts        # Referral and responder matching
│   │   ├── session.ts       # USSD/SMS menu state machine
│   │   ├── helplines.ts     # Public Kenyan helplines and support organisations
│   │   ├── actingUser.ts    # Demo responder identity used in audit entries
│   │   └── format.ts        # Localised time/date helpers
│   └── i18n/                # en.ts, sw.ts, context.ts, useLanguage.ts, index.tsx (provider)
├── contexts/                # App-wide config context
└── test/                    # Test setup, TestApp wrapper, smoke and unit tests

public/                      # robots.txt, manifest, SPA _redirects
eslint-rules/                # Custom ESLint rules
.github/workflows/           # GitHub Pages deployment
.gitlab-ci.yml               # GitLab Pages pipeline
```

## Architecture notes

- **State store** — `src/lib/kinga/store.ts` exposes a tiny external store consumed with `useSyncExternalStore` (`useKinga()`), persisted under the `kinga:state:v1` localStorage key. Mutating functions (`submitSignal`, `assignCase`, `referCase`, `escalateCase`, `closeCase`, `markUnreachable`, `addCaseNote`, `setOrgStatus`, `setServiceCapacity`, …) each append an audit entry.
- **USSD/SMS session** — `session.ts` is a pure state machine (`language → welcome → risk → urgency → consent → county → done`, plus `info` and `support` branches). The same tree drives both the USSD and SMS simulators.
- **Render purity** — time-relative helpers read the clock internally (`timeAgo(ts, lang, now = Date.now())`), so components never call `Date.now()` during render.
- **i18n** — the context, the `useLanguage` hook and the provider live in separate files to keep Fast Refresh working. Import the hook from `@/lib/i18n/useLanguage` and the `Lang` type from `@/lib/i18n/context`.
- **Path alias** — `@/` maps to `src/`.
- **Routing on static hosts** — `public/_redirects` and the build step that copies `index.html` to `404.html` make deep links work on Netlify-style hosts and GitHub Pages.

## Internationalisation

- Languages: **English (`en`)** and **Kiswahili (`sw`)**.
- All strings live in `src/lib/i18n/en.ts` and `sw.ts`. Missing Swahili keys fall back to English, then to the key itself.
- Placeholders use `{name}` syntax: `t('case.updated', { ago: '3 h ago' })`.
- The chosen language persists in `localStorage` (`kinga:lang`) and sets `<html lang>`.
- USSD sessions begin with a language choice (1. English, 2. Kiswahili), as many Kenyan USSD services do.

To add a string, add the same key to **both** dictionaries.

## Community circle (Nostr)

The `/community` page is a peer-support feed built on Nostr kind-1 notes.

- Posts are tagged `kinga-circle`; the feed merges tagged posts with a small set of seed-author keys that hold demonstration conversations.
- Reading is public. Posting requires a free Nostr key (login dialogs are in `components/auth`).
- Default relays are configured in `src/lib/appRelays.ts`; Blossom upload servers in `src/App.tsx`. Users can manage their own relays.
- The composer blocks phone-number-shaped content, and authors are rendered pseudonymously.

## Testing and quality

```bash
npm run test
```

The gate runs, in order:

1. **TypeScript** (`tsc --noEmit`, strict mode)
2. **ESLint** (React Hooks purity rules, Fast Refresh rules, project-specific rules for placeholder comments, inline scripts and the web manifest)
3. **Vitest** — currently 14 tests, including a route smoke test (`src/test/routes.test.tsx`) that renders every page, confirms none crashes, and confirms no third-party branding appears
4. **Production build**

## Deployment

Kinga builds to static files in `dist/`, so it can be hosted anywhere.

- **GitHub Pages** — `.github/workflows/deploy.yml` builds and deploys on every push to `main` (Node 22).
- **GitLab Pages** — `.gitlab-ci.yml` runs the test gate, then deploys.
- **Netlify / Cloudflare Pages / similar** — publish `dist/`; `public/_redirects` provides the SPA fallback.

```bash
npm run build      # outputs dist/ (with 404.html fallback)
```

If you serve from a sub-path rather than a domain root, set Vite's `base` option in `vite.config.ts` and update `start_url` in `public/manifest.webmanifest`.

## Resetting demo data

Case data, partner status and the audit log persist in your browser. To restore the original seeded demo, either call `resetDemo()` from `src/lib/kinga/store.ts` or clear the site's `kinga:state:v1` key in your browser's developer tools (Application → Local Storage).

## Prototype scope and production path

This repository demonstrates the product experience end to end. It intentionally does **not** yet include:

| Prototype (this repo) | Production target |
| --- | --- |
| Browser `localStorage` store | Server-side API and database (the code comments reference a NestJS + PostgreSQL backend) |
| USSD/SMS **simulators** | Integration with a telecom/aggregator gateway (USSD short code, SMS shortcode) |
| Demo responder identity | Real authentication, role-based access control and MFA for responders and admins |
| Client-side audit log | Append-only, tamper-evident server-side audit storage |
| Fictional organisations | Onboarding and verification of real partner organisations under data-sharing agreements |

Before any real-world pilot, the platform needs a data-protection impact assessment, compliance review under Kenya's Data Protection Act, safeguarding sign-off with child-protection authorities, responder training, and security testing.

## Known limitations

- Data is per-browser and not shared between devices or users.
- The PWA manifest has no icons yet (`"icons": []`), so install prompts will show a default icon.
- The USSD code `*384*21#` is a simulator placeholder and is not a registered short code.
- Seed organisations, responders and cases are fictional.
- Community relays are public Nostr relays; availability varies, and the circle shows seeded content if relays are unreachable.
- Helpline numbers should be re-verified periodically before each release.

## Contributing

1. Create a branch and make your change.
2. Add or update tests where behaviour changes.
3. Run `npm run test` and make sure it passes.
4. Keep new UI strings in **both** `en.ts` and `sw.ts`.
5. Preserve the privacy principles above — never add fields that collect names, phone numbers or precise locations to a signal.

Coding conventions: strict TypeScript (no `any`), function components with hooks, Tailwind utility classes, shadcn/ui primitives from `@/components/ui`.

## Emergency contacts

If you or someone you know is in danger, contact these free national services in Kenya:

| Service | Number |
| --- | --- |
| National GBV Helpline (HAK) | **1195** |
| Childline Kenya | **116** |
| Kenya Red Cross Emergency | **1199** |
| Police / national emergency line | **112** (also 999) |

Kinga is a prototype and is **not** a substitute for emergency services.
