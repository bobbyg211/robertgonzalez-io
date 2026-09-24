# Before this goes anywhere near a prospect

Everything below is something I made up to make the site demo-able, or
something only Robert can answer. Grep the source for `TODO[` to find them in
place. Three categories:

- `TODO[INVENTED]` — I wrote a plausible number or client. Replace or delete.
- `TODO[NEEDS ROBERT]` — only you have this.
- `TODO[DECISION]` — an open item from the brief I made a call on; confirm it.

---

## 1. Invented numbers (the dangerous ones)

Animated counters are what make a number feel *verified*. An invented one
animating into place is worse than no number at all. Every value below is
fiction:

| Where | File | What |
|---|---|---|
| Home proof strip | `src/content/site.js` | 10+ years, 20+ orgs, 30+ integrations, 2.4M records, 40 hrs/wk, 12 platforms |
| Distributor study | `src/content/caseStudies.js` | 41,000 records, 11 hrs/wk, 15 min, 0 stale quotes |
| Brokerage study | `src/content/caseStudies.js` | 3→1 systems, 6 hrs/wk, 100% audit, 9 scenarios |
| Field service study | `src/content/caseStudies.js` | 40 crews, 11→0 tabs, 100% attributable, 10 wks |
| Website studies | `src/content/caseStudies.js` | 400+ pages, 170+ pages, 8→1 fields, etc. |

The brief's fallback applies where hard numbers don't exist: use scope figures
instead — objects mapped, fields synced, error scenarios handled. Those are
true and still concrete.

## 2. Rates — all four are placeholders

In `src/content/services.js`, search `price:`.

| Service | Placeholder | Decide |
|---|---|---|
| Integration Blueprint | $3,500 flat | flat fee, credited against the build |
| Code Audit | $4,500 flat | flat fee, credited against the build |
| Prototype to Production | from $15,000 | |
| System Integrations | from $12,000 | primary revenue service |
| Custom Web Apps | from $18,000 | |
| HubSpot Websites | from $7,500 | volume service |

Budget bands in `src/pages/Contact.jsx` (`BUDGETS`) need to line up with
whatever you set, or the form will qualify people out of projects you want.

No availability labels appear anywhere — that was deliberate, per the brief.
The one scheduling line is `hero.note` in `site.js`; set it or delete it.

## 3. Case studies — all seven are reconstructions

`src/content/caseStudies.js`. The six-block format is the real deliverable:
header → problem → what I built → results → stack → CTA. Swap the content,
keep the shape.

- **Pick the real integration/SaaS studies.** Open item from the brief.
- **`rental-ops-tool-rescue`** is fabricated end to end and is the only case
  study for the two new services. It needs a real engagement, or the two
  services launch without one — which is survivable for Code Audit and weak
  for Prototype to Production.
- **Pick the three website builds** worth full case studies (custom HubDB,
  CRM tie-ins, complex templating).
- **`platform-role-direct-development`** is the one describing real work. It is
  written from the brief, not the project, and is framed as *role* throughout
  ("architect and lead engineer"). It needs your detail and a check that
  everything in it is fine to publish. Nothing higher-ed appears anywhere on
  the site — Bard GPS and Enrollify are absent by design.
- **Client naming.** `src/content/clients.js` holds 16 fabricated companies
  driving the `/work` marquee and the logo plates. The names are invented and
  may collide with real businesses — replace the lot. The three website builds
  carry a `clientName` and render named; every other study renders the
  redacted plate. Adding `clientName` to a study is all it takes to name it.

Each study carries an `architecture` object — nodes, edges and steps with
explicit coordinates. That's what drives the build-on-scroll diagram. Changing
a study means redrawing its diagram; the coordinate system is a plain
viewBox, so it's tweakable by hand.

## 4. Testimonials — quote bodies drafted, attribution blank

`src/content/testimonials.js`. The quotes are written *for* the person to edit,
which is the brief's rule and the difference between getting one and not.
Attribution is `[NAME]` / `[TITLE]` / `[COMPANY]` so nobody is quoted saying
something they didn't say.

1. **`client-freelance`** — the former-coworkers engagement. Highest-value
   quote available; it answers "was he good to hire". Get this one first. It's
   placed on the home page and the integration service page.
2. **`peer-engineering`** — a Direct Development colleague, on the craft.
3. **`peer-product`** — a professional contact; name the working relationship.

`relationship` renders on every quote and is not optional — that's what keeps a
peer endorsement honest. No agency-client quotes anywhere; those are the
agency's relationships.

`quoteForService["hubspot-websites"]` is deliberately `null`. There's no honest
quote for it yet, and borrowing one would undo the rule.

## 5. Not wired

- **Contact form has no endpoint.** `ENDPOINT` in `src/pages/Contact.jsx` is
  `null`; submissions land in the console and the success screen says so.
  Wire Formspree, a HubSpot form, or an API route.
- **Photo.** Two `[ photo ]` placeholders — home about block and `/about`.
- **Email, LinkedIn, GitHub** in `src/content/site.js` are guesses.
- **Favicon / OG image.** None yet.
- **About facts** — city and "building since 2015" are invented.

## 6. Open items from the brief I did *not* decide

- Lead generation beyond the site. Untouched — it isn't a site decision.
- Existing freelance clients' 30–60 day notice on new rates. Nothing on the
  site says anything about it, which is correct; it's an email.

---

## Decisions I made that are worth a second look

- **Four service pages, one URL each**, plus `/work`, `/work/:slug`, `/about`,
  `/contact`. No rate-card page — starting prices live on service pages, per
  the brief.
- **Rush delivery** appears in exactly two places: a collapsed `<details>` on
  each service page and inside the contact form. No published window, no
  fixed percentage (25–50%, per project), framed as a conversation. It is
  never presented as a fifth service.
- **Support retainer is not built yet.** The brief lists it as an add-on
  offered *after* a build, so it has no home on a site aimed at new leads.
  Say if you want it on service pages.
- **Website builds sit below integrations** on `/work` and `/` — the order is
  the positioning.
- **The proof strip lists systems, not client logos.** The brief kills the
  logo wall as a hero element; if the agency relationships allow real client
  logos, they'd go in the `/work` bottom strip rather than the home hero.
