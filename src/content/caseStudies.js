// Case studies. Integrations and apps first, website builds after.
//
// TODO[INVENTED]: every engagement below is a plausible reconstruction, not a
// real project. Client descriptors, numbers and details all need replacing with
// Robert's actual work. The *format* is the deliverable here: header, problem,
// what I built, results, stack, CTA — same six blocks every time.
//
// Anonymisation rule: integration clients get industry + systems, never a name.
// Direct Development work is presented as role, never ownership.

export const caseStudies = [
  {
    slug: "distributor-netsuite-hubspot",
    kind: "integration",
    featured: true,
    client: "Building materials distributor",
    systems: ["NetSuite", "HubSpot"],
    serviceSlug: "system-integrations",
    serviceLabel: "System integration",
    title: "One customer record, two systems, no one retyping it",
    summary:
      "Sales quoted from stale inventory because the ERP and the CRM only met when someone exported a spreadsheet. Now they reconcile themselves every fifteen minutes.",
    problem: [
      "A regional distributor ran sales in HubSpot and everything downstream — inventory, pricing, invoicing — in NetSuite. The two had no connection. Every morning an operations coordinator exported three reports out of NetSuite, cleaned them in Excel, and imported them into HubSpot so that reps could see what was actually in stock.",
      "By mid-afternoon the numbers were wrong again. Reps quoted from a snapshot that was hours old, and roughly one quote a week went out against stock that had already been committed to someone else. Each one meant an apology call, a re-quote, and occasionally a discount to keep the customer. The coordinator's estimate was ten to twelve hours a week on the export alone.",
      "The part that actually hurt wasn't the hours. It was that nobody could answer \"is this price current\" without opening two systems and trusting their gut.",
    ],
    built: {
      plain: [
        "I built a service that sits between the two systems and keeps them agreed. Products, pricing and available stock flow from NetSuite into HubSpot every fifteen minutes. Closed-won deals flow the other way and open as sales orders in NetSuite, with the customer matched to an existing account rather than duplicated.",
        "When something can't be synced — a product with no price, a deal missing a required field — it doesn't fail silently and it doesn't block everything behind it. It lands in a queue with a plain-English reason, and the ops lead gets one digest email a day rather than a stream of alerts.",
      ],
      technical: [
        "The service is a Node worker running scheduled and event-driven jobs. NetSuite is read through SuiteQL for bulk pulls and RESTlets for writes; HubSpot through the v3 CRM API with batch endpoints, which is the difference between staying inside the rate limit and not. Every record carries a stable external ID in both systems, so a re-run is an upsert rather than a duplicate.",
        "Conflict resolution was the decision that mattered most and it was settled in the Blueprint, not in code: NetSuite wins on anything financial or inventory-related, HubSpot wins on contact and lifecycle data, and the three fields both systems legitimately own are last-write-wins with an audit entry. Failures go to a dead-letter table with the payload attached, so a fix is a replay instead of a re-import.",
        "A nightly reconciliation job compares record counts and a checksum of the synced fields across both systems and reports drift. That job is the reason a silent failure can't run for six weeks, which is the failure mode that actually destroys trust in an integration.",
      ],
    },
    results: [
      { value: 41000, suffix: "", label: "records under sync", note: "products, companies, deals" },
      { value: 11, suffix: " hrs", label: "of manual export eliminated weekly" },
      { value: 15, suffix: " min", label: "maximum data age, down from a day" },
      { value: 0, suffix: "", label: "stale-inventory quotes since cutover" },
    ],
    stack: ["Node", "TypeScript", "NetSuite SuiteQL", "HubSpot API v3", "Postgres", "Fly.io"],
    fig: "NetSuite ↔ HubSpot, bidirectional with reconciliation",
    code: "reconcile",
    architecture: {
      viewBox: "0 0 620 380",
      nodes: [
        { id: "ns", step: 0, x: 24, y: 40, w: 150, h: 58, label: "NetSuite", sub: "ERP · source of truth", kind: "system" },
        { id: "hs", step: 0, x: 446, y: 40, w: 150, h: 58, label: "HubSpot", sub: "CRM · sales", kind: "system" },
        { id: "sync", step: 1, x: 220, y: 150, w: 180, h: 62, label: "Sync service", sub: "node · scheduled + events", kind: "service" },
        { id: "dlq", step: 2, x: 24, y: 274, w: 150, h: 54, label: "Dead letter", sub: "replayable", kind: "store" },
        { id: "rec", step: 3, x: 446, y: 274, w: 150, h: 54, label: "Reconcile", sub: "nightly checksum", kind: "service" },
      ],
      edges: [
        { id: "manual", step: 0, d: "M174 69 L446 69", label: "a person, every morning", kind: "manual" },
        { id: "in", step: 1, d: "M99 98 L99 181 L220 181", label: "products · stock · price", kind: "auto" },
        { id: "out", step: 1, d: "M400 181 L521 181 L521 98", label: "closed deals → orders", kind: "auto" },
        { id: "fail", step: 2, d: "M280 212 L280 250 L99 250 L99 274", label: "can't sync", kind: "warn" },
        { id: "check", step: 3, d: "M521 274 L521 240 L340 240 L340 212", label: "drift report", kind: "dotted" },
      ],
      steps: [
        {
          title: "Two systems, one spreadsheet",
          body: "Before anything is built, the only connection between the ERP and the CRM is a person with an export and an afternoon.",
        },
        {
          title: "A service in the middle",
          body: "Stock, pricing and products move one way on a fifteen-minute schedule. Closed deals move the other way as orders, matched to existing accounts.",
        },
        {
          title: "Failure gets somewhere to go",
          body: "A record that can't be written lands in a dead-letter table with its payload and a readable reason. One digest a day, and a fix is a replay.",
        },
        {
          title: "Drift gets caught",
          body: "A nightly job compares both systems field by field and reports disagreement — so a silent failure can't run for six weeks.",
        },
      ],
    },
  },

  {
    slug: "brokerage-policy-sync",
    kind: "integration",
    featured: true,
    client: "Specialty insurance brokerage",
    systems: ["Salesforce", "Underwriting portal", "DocuSign"],
    serviceSlug: "system-integrations",
    serviceLabel: "System integration",
    title: "A submission that stops being retyped three times",
    summary:
      "The same application was keyed into three systems by three people. One intake now feeds all of them, and the audit trail is a side effect rather than a project.",
    problem: [
      "A specialty brokerage took submissions by email, keyed them into Salesforce, keyed them again into a carrier underwriting portal, and generated documents for signature by hand from a Word template. Three people touched the same application, and each one introduced the possibility of a typo that wouldn't be caught until a policy was bound against the wrong number.",
      "Compliance made it worse rather than better. Every few months an auditor asked which version of a submission was sent to which carrier and when, and the answer lived in somebody's sent folder.",
    ],
    built: {
      plain: [
        "Submissions now land in one intake form. From there, the application creates the Salesforce record, pushes to the carrier portal, and generates the signature packet with the values already filled in — from one set of data entered once.",
        "Every step writes to a timeline on the submission: what was sent, where, when, and by whom. The compliance answer that used to take an afternoon is now a page.",
      ],
      technical: [
        "Salesforce is the system of record for the submission object; the integration writes through the REST API with an external key so retries are idempotent. The carrier portal had no public API, so that leg runs as an authenticated session-based client with strict schema validation on the way in — brittle by nature, which is exactly why it's isolated behind a queue with retry and explicit alerting rather than run inline.",
        "DocuSign templates are populated from the same normalised submission payload that feeds the other two legs, so the three systems cannot disagree about what was submitted. Envelope status flows back via webhook and updates the Salesforce record, which is what turns the timeline into an audit trail rather than a log.",
      ],
    },
    results: [
      { value: 3, suffix: "→1", label: "systems keyed by hand, now one intake" },
      { value: 6, suffix: " hrs", label: "returned per week across the team" },
      { value: 100, suffix: "%", label: "of submissions with a full audit timeline" },
      { value: 9, suffix: "", label: "failure scenarios handled explicitly" },
    ],
    stack: ["Node", "Salesforce REST", "DocuSign eSignature", "Redis queue", "Postgres"],
    fig: "One intake, three destinations, one audit trail",
    code: "retry",
    architecture: {
      viewBox: "0 0 620 380",
      nodes: [
        { id: "form", step: 0, x: 24, y: 150, w: 150, h: 58, label: "Intake", sub: "one form", kind: "service" },
        { id: "sf", step: 1, x: 430, y: 34, w: 166, h: 56, label: "Salesforce", sub: "system of record", kind: "system" },
        { id: "q", step: 1, x: 226, y: 150, w: 166, h: 58, label: "Queue", sub: "retry · isolate", kind: "service" },
        { id: "portal", step: 2, x: 430, y: 150, w: 166, h: 56, label: "Carrier portal", sub: "no public api", kind: "system" },
        { id: "ds", step: 2, x: 430, y: 264, w: 166, h: 56, label: "DocuSign", sub: "packet + webhook", kind: "system" },
        { id: "audit", step: 3, x: 24, y: 264, w: 150, h: 56, label: "Timeline", sub: "who · what · when", kind: "store" },
      ],
      edges: [
        { id: "e1", step: 0, d: "M174 179 L226 179", label: "", kind: "auto" },
        { id: "e2", step: 1, d: "M392 170 L430 170 L430 90", label: "submission", kind: "auto" },
        { id: "e3", step: 2, d: "M392 179 L430 179", label: "application", kind: "auto" },
        { id: "e4", step: 2, d: "M392 190 L411 190 L411 292 L430 292", label: "signature packet", kind: "auto" },
        { id: "e5", step: 3, d: "M430 320 L99 320 L99 320", label: "status webhook", kind: "dotted" },
        { id: "e6", step: 3, d: "M99 208 L99 264", label: "", kind: "dotted" },
      ],
      steps: [
        { title: "One place to enter it", body: "The submission is typed once, into a form that validates it while the person who has the context is still looking at it." },
        { title: "Salesforce becomes the record", body: "The submission object is created with an external key, so a retry updates rather than duplicates." },
        { title: "The brittle leg gets isolated", body: "The carrier portal has no API. That leg runs behind a queue with retries and loud failure, so it can break without taking the intake down." },
        { title: "The audit trail falls out of it", body: "Every send and every signature status writes to one timeline. Compliance questions become a page instead of an afternoon in a sent folder." },
      ],
    },
  },

  {
    slug: "field-service-ops-platform",
    kind: "app",
    featured: true,
    client: "Field service contractor",
    systems: ["Custom app", "QuickBooks", "Twilio"],
    serviceSlug: "custom-web-apps",
    serviceLabel: "Custom web app",
    title: "The scheduling spreadsheet becomes software",
    summary:
      "Eleven tabs, four editors, one macro nobody understood — running dispatch for forty crews. Replaced with a tool that fits the way they actually schedule.",
    problem: [
      "Dispatch ran on a shared spreadsheet. It had grown to eleven tabs and four simultaneous editors, and the person who wrote the scheduling macro had left two years earlier. Overwrites happened weekly. There was no history, so when a crew turned up at the wrong site nobody could reconstruct who had changed what.",
      "Every off-the-shelf field service product they trialled assumed a job belonged to one crew for one day. Their work doesn't look like that — a job is a sequence of visits by different crews with dependencies between them, and that sequencing is the thing they're good at.",
    ],
    built: {
      plain: [
        "A scheduling and dispatch tool built around their model: a job is a chain of visits, each with its own crew, window and prerequisites. Dispatchers drag visits across a week view; the app refuses the moves that break a dependency and explains why rather than just snapping back.",
        "Crews get a phone view of their day and mark visits complete from the field. Completed visits create invoices in QuickBooks automatically, and customers get an SMS when a crew is on the way.",
        "Every change is recorded with who made it, so the Monday morning question of what happened on Friday has an answer.",
      ],
      technical: [
        "React front end with an optimistic drag-and-drop scheduler over a Postgres schema where a visit is the atomic unit and dependencies are explicit rows rather than implied ordering. Constraint checks run both client-side for immediate feedback and server-side as the actual authority, because a phone with a stale cache will otherwise happily schedule the impossible.",
        "The audit log is append-only and written in the same transaction as the mutation, which makes history a guarantee rather than a best effort. QuickBooks invoicing and Twilio notifications run as background jobs with idempotency keys — a retry after a timeout must not bill a customer twice, and that is the kind of thing that has to be designed in rather than patched later.",
        "Roles came out of the first week of interviews: dispatchers see everything, crew leads see their own visits, and the owner sees the money. It's a small permission model, deliberately, because the complicated ones stop matching how a company works within a year.",
      ],
    },
    results: [
      { value: 40, suffix: "", label: "crews dispatched daily in the tool" },
      { value: 11, suffix: "→0", label: "spreadsheet tabs retired" },
      { value: 100, suffix: "%", label: "of changes attributable to a person" },
      { value: 10, suffix: " wks", label: "from kickoff to crews using it" },
    ],
    stack: ["React", "Node", "Postgres", "QuickBooks API", "Twilio", "Render"],
    fig: "Visit-level scheduling with an append-only history",
    code: "constraint",
    architecture: {
      viewBox: "0 0 620 380",
      nodes: [
        { id: "disp", step: 0, x: 24, y: 40, w: 160, h: 56, label: "Dispatch board", sub: "week view · drag", kind: "service" },
        { id: "crew", step: 0, x: 24, y: 150, w: 160, h: 56, label: "Crew view", sub: "phone · field", kind: "service" },
        { id: "api", step: 1, x: 232, y: 95, w: 160, h: 62, label: "API", sub: "constraint authority", kind: "service" },
        { id: "db", step: 1, x: 440, y: 95, w: 156, h: 62, label: "Postgres", sub: "visits · deps", kind: "store" },
        { id: "log", step: 2, x: 440, y: 205, w: 156, h: 54, label: "Audit log", sub: "append only", kind: "store" },
        { id: "jobs", step: 3, x: 232, y: 290, w: 160, h: 56, label: "Background jobs", sub: "idempotent", kind: "service" },
        { id: "qb", step: 3, x: 440, y: 290, w: 156, h: 56, label: "QuickBooks", sub: "invoices", kind: "system" },
        { id: "tw", step: 3, x: 24, y: 290, w: 160, h: 56, label: "Twilio", sub: "on-the-way sms", kind: "system" },
      ],
      edges: [
        { id: "a", step: 0, d: "M184 68 L208 68 L208 126 L232 126", label: "", kind: "auto" },
        { id: "b", step: 0, d: "M184 178 L208 178 L208 126 L232 126", label: "", kind: "auto" },
        { id: "c", step: 1, d: "M392 126 L440 126", label: "", kind: "auto" },
        { id: "d", step: 2, d: "M518 157 L518 205", label: "same transaction", kind: "dotted" },
        { id: "e", step: 3, d: "M312 157 L312 290", label: "visit completed", kind: "auto" },
        { id: "f", step: 3, d: "M392 318 L440 318", label: "", kind: "auto" },
        { id: "g", step: 3, d: "M232 318 L184 318", label: "", kind: "auto" },
      ],
      steps: [
        { title: "Two interfaces, one model", body: "Dispatchers get a week board. Crews get their own day on a phone. Both are views of the same visit, not separate systems." },
        { title: "The server is the authority", body: "Constraints are checked in the browser for speed and on the server for truth, because a stale phone will otherwise schedule the impossible." },
        { title: "History is a guarantee", body: "The audit entry is written in the same transaction as the change. Not a log that might be there — a row that cannot be missing." },
        { title: "The rest falls out", body: "A completed visit raises the invoice and sends the message, as idempotent background jobs. A retry never bills twice." },
      ],
    },
  },

  {
    slug: "platform-role-direct-development",
    kind: "integration",
    featured: true,
    role: true,
    client: "Direct Development",
    systems: ["HubSpot", "Internal data platform"],
    serviceSlug: "system-integrations",
    serviceLabel: "Architect & lead engineer",
    title: "Architecting the platform an agency runs its client work on",
    summary:
      "As Director of Engineering, the architect and lead engineer on an internal platform that keeps HubSpot and a central data service in sync for every client team.",
    problem: [
      "This one is a role, not a freelance engagement, and it's here because it's the clearest picture of how I work at scale. At Direct Development I'm the architect and lead engineer on the internal platform our client teams depend on day to day.",
      "The problem it solves is one every multi-client engineering team has: the same integration work being rebuilt slightly differently for each account, with no shared answer for auth, retries, field mapping or monitoring — so every new account started at zero and every failure was diagnosed from scratch.",
    ],
    built: {
      plain: [
        "A shared platform with one way to do the common things: connect an account, map fields, run a sync, see what failed. Account-specific work becomes configuration and a small amount of bespoke code, instead of a new codebase each time.",
        "My role is architecture and technical leadership — the data model, the integration patterns, the review standard, and the calls about what belongs in the platform versus in one client's build.",
      ],
      technical: [
        "The design decision that carried the most weight was making field mapping declarative and versioned, so a mapping change is a reviewable diff rather than an edit to live behaviour. Auth, rate limiting, retry and dead-lettering live once in the platform, which means a fix to backoff behaviour is one change rather than a dozen.",
        "TODO[NEEDS ROBERT]: this is the one case study that describes real work, and it's written from the brief rather than from the project. It needs your detail — scale, the actual architecture, and the results — and a check that everything here is fine to publish. Nothing identifying about any client should appear.",
      ],
    },
    results: [
      { value: 1, suffix: "", label: "shared integration platform, not one per account" },
      { value: 0, suffix: "", label: "bespoke auth implementations remaining" },
    ],
    stack: ["TypeScript", "Node", "HubSpot API", "Postgres", "AWS"],
    fig: "Shared platform, per-account configuration",
    architecture: {
      viewBox: "0 0 620 340",
      nodes: [
        { id: "a1", step: 0, x: 24, y: 30, w: 132, h: 48, label: "Account A", sub: "config", kind: "system" },
        { id: "a2", step: 0, x: 24, y: 96, w: 132, h: 48, label: "Account B", sub: "config", kind: "system" },
        { id: "a3", step: 0, x: 24, y: 162, w: 132, h: 48, label: "Account C", sub: "config", kind: "system" },
        { id: "plat", step: 1, x: 224, y: 60, w: 176, h: 130, label: "Platform", sub: "auth · retry · mapping", kind: "service" },
        { id: "hs", step: 2, x: 448, y: 60, w: 148, h: 54, label: "HubSpot", sub: "per account", kind: "system" },
        { id: "data", step: 2, x: 448, y: 136, w: 148, h: 54, label: "Data service", sub: "central", kind: "store" },
        { id: "obs", step: 3, x: 224, y: 250, w: 176, h: 52, label: "Observability", sub: "one dashboard", kind: "store" },
      ],
      edges: [
        { id: "e1", step: 1, d: "M156 54 L190 54 L190 125 L224 125", label: "", kind: "auto" },
        { id: "e2", step: 1, d: "M156 120 L190 120 L190 125 L224 125", label: "", kind: "auto" },
        { id: "e3", step: 1, d: "M156 186 L190 186 L190 125 L224 125", label: "", kind: "auto" },
        { id: "e4", step: 2, d: "M400 100 L424 100 L424 87 L448 87", label: "", kind: "auto" },
        { id: "e5", step: 2, d: "M400 150 L424 150 L424 163 L448 163", label: "", kind: "auto" },
        { id: "e6", step: 3, d: "M312 190 L312 250", label: "every sync, every account", kind: "dotted" },
      ],
      steps: [
        { title: "Many accounts, one shape", body: "Each client account becomes configuration against a shared platform rather than its own codebase." },
        { title: "The hard parts live once", body: "Auth, rate limiting, retry and dead-lettering are implemented in the platform. A fix to backoff is one change, not twelve." },
        { title: "Mapping is declarative", body: "Field mappings are versioned data, so a change to live behaviour is a reviewable diff." },
        { title: "One place to look", body: "Every sync across every account reports into the same dashboard, so diagnosis doesn't start from scratch." },
      ],
    },
  },

  {
    slug: "manufacturer-hubdb-catalog",
    // TODO[NEEDS ROBERT]: only publish a name you have written permission for.
    clientName: "Ambrose Manufacturing",
    kind: "website",
    client: "Industrial manufacturer",
    systems: ["HubSpot CMS", "HubDB"],
    serviceSlug: "hubspot-websites",
    serviceLabel: "HubSpot CMS",
    title: "A 400-product catalogue that marketing maintains",
    summary:
      "The product range lived in a spreadsheet and a PDF. Modelled into HubDB, it became filterable listings and 400 generated pages nobody hand-builds.",
    problem: [
      "The catalogue existed as a spreadsheet that fed a print PDF. On the website it was a downloadable file, which meant no product had a page, nothing ranked, and any spec change meant re-exporting a document.",
      "Marketing had asked for product pages twice and been quoted per page both times.",
    ],
    built: {
      plain: [
        "I modelled the range in HubDB — products, categories, specifications and downloads as related tables — and built dynamic pages on top. Every product gets its own URL, generated from the data rather than built by hand.",
        "The listing page filters by category and specification without a page reload. Adding a product is a row; changing a spec is a cell.",
      ],
      technical: [
        "Dynamic pages driven by HubDB with server-side filtering on the listing for the indexable states and client-side narrowing after that, so the filter combinations that matter for search have real URLs. Specification tables render from a related table rather than a rich-text field, which is what stops the page layout drifting per product.",
      ],
    },
    results: [
      { value: 400, suffix: "+", label: "product pages generated from data" },
      { value: 3, suffix: "", label: "templates covering the whole catalogue" },
      { value: 0, suffix: "", label: "developer hours to add a product" },
    ],
    stack: ["HubSpot CMS", "HubDB", "HubL", "Vanilla JS"],
    fig: "One table, three templates, four hundred pages",
    architecture: {
      viewBox: "0 0 620 260",
      nodes: [
        { id: "db", step: 0, x: 24, y: 96, w: 166, h: 62, label: "HubDB", sub: "products · specs", kind: "store" },
        { id: "tpl", step: 1, x: 240, y: 96, w: 156, h: 62, label: "3 templates", sub: "listing · detail · category", kind: "service" },
        { id: "pages", step: 2, x: 444, y: 40, w: 152, h: 54, label: "400+ pages", sub: "one url each", kind: "system" },
        { id: "filter", step: 2, x: 444, y: 158, w: 152, h: 54, label: "Filtered views", sub: "indexable", kind: "system" },
      ],
      edges: [
        { id: "e1", step: 1, d: "M190 127 L240 127", label: "", kind: "auto" },
        { id: "e2", step: 2, d: "M396 115 L420 115 L420 67 L444 67", label: "", kind: "auto" },
        { id: "e3", step: 2, d: "M396 139 L420 139 L420 185 L444 185", label: "", kind: "auto" },
      ],
      steps: [
        { title: "Model the content", body: "Products, categories and specifications as related HubDB tables instead of a spreadsheet and a PDF." },
        { title: "Three templates, not four hundred", body: "Listing, category and detail. Every page in the catalogue is one of those three, filled from data." },
        { title: "Give search something to index", body: "The filter states that matter get real URLs, so the catalogue can rank instead of sitting inside a download." },
      ],
    },
  },

  {
    slug: "nonprofit-crm-site",
    // TODO[NEEDS ROBERT]: only publish a name you have written permission for.
    clientName: "The Larkin Fund",
    kind: "website",
    client: "National nonprofit",
    systems: ["HubSpot CMS", "HubSpot CRM"],
    serviceSlug: "hubspot-websites",
    serviceLabel: "HubSpot CMS",
    title: "A site that knows who's already a donor",
    summary:
      "Programme pages, gated research and donation flows wired into the CRM, so returning supporters stop being asked for details the organisation already has.",
    problem: [
      "Every form on the old site asked for the same eight fields, including from people who had been donating for years. Supporters noticed, and the organisation had no reliable way to tell a first-time visitor from a major donor.",
    ],
    built: {
      plain: [
        "I rebuilt the site on HubSpot CMS with forms wired to CRM properties and progressive profiling, so a known contact is asked for one new thing rather than eight old ones. Programme pages show different calls to action depending on whether someone has given before.",
        "Marketers got modules with real fields and guardrails, so campaign pages get built in an afternoon without a developer.",
      ],
      technical: [
        "Smart content keyed on lifecycle stage and a custom donor property, with the fallback state designed first so an unknown visitor never sees an empty personalisation slot. Forms use progressive profiling against a deliberately small property set, because a large one produces contacts with eighty fields and no usable segmentation.",
      ],
    },
    results: [
      { value: 8, suffix: "→1", label: "form fields asked of known supporters" },
      { value: 14, suffix: "", label: "reusable modules replacing bespoke pages" },
      { value: 100, suffix: "%", label: "of forms writing to mapped CRM properties" },
    ],
    stack: ["HubSpot CMS", "HubSpot CRM", "HubL", "SCSS"],
    fig: "Site as the front end of the CRM",
    architecture: {
      viewBox: "0 0 620 240",
      nodes: [
        { id: "vis", step: 0, x: 24, y: 88, w: 156, h: 58, label: "Visitor", sub: "known or not", kind: "system" },
        { id: "page", step: 1, x: 232, y: 88, w: 156, h: 58, label: "Page", sub: "smart content", kind: "service" },
        { id: "crm", step: 1, x: 440, y: 30, w: 156, h: 56, label: "HubSpot CRM", sub: "lifecycle · donor", kind: "store" },
        { id: "form", step: 2, x: 440, y: 148, w: 156, h: 56, label: "Form", sub: "progressive", kind: "service" },
      ],
      edges: [
        { id: "e1", step: 1, d: "M180 117 L232 117", label: "", kind: "auto" },
        { id: "e2", step: 1, d: "M388 105 L414 105 L414 58 L440 58", label: "who is this", kind: "dotted" },
        { id: "e3", step: 2, d: "M388 129 L414 129 L414 176 L440 176", label: "one new field", kind: "auto" },
      ],
      steps: [
        { title: "Ask who it is first", body: "The page resolves the visitor against the CRM before deciding what to show, with the unknown state designed first." },
        { title: "Show the right ask", body: "A returning donor and a first-time visitor get different calls to action on the same programme page." },
        { title: "Ask for one thing", body: "Progressive profiling against a small property set, so forms build a usable profile instead of eighty empty fields." },
      ],
    },
  },

  {
    slug: "healthcare-network-site",
    // TODO[NEEDS ROBERT]: only publish a name you have written permission for.
    clientName: "Wexler Health Network",
    kind: "website",
    client: "Multi-location healthcare network",
    systems: ["HubSpot CMS", "HubDB"],
    serviceSlug: "hubspot-websites",
    serviceLabel: "HubSpot CMS",
    title: "Thirty locations, one template, an accessibility standard that held",
    summary:
      "Location and provider pages generated from structured data, built to WCAG 2.1 AA and tested with a screen reader rather than an overlay widget.",
    problem: [
      "Thirty location pages and a hundred and forty provider bios had been built by hand over six years. Hours were wrong in a dozen places, three locations that had moved still showed the old address, and an accessibility audit had come back with findings the previous vendor had answered by installing an overlay.",
    ],
    built: {
      plain: [
        "Locations and providers became HubDB tables with a relationship between them, so a provider appears on every location they work at and an address is corrected once. Both page types generate from two templates.",
        "Accessibility was built in rather than retrofitted: semantic structure, real focus management, and keyboard and screen reader testing as part of the build.",
      ],
      technical: [
        "Location and provider tables joined through a relationship column, with hours stored as structured data rather than free text so they can be rendered as markup search engines can read. The overlay was removed — it was suppressing findings rather than fixing them, and it made keyboard navigation measurably worse.",
      ],
    },
    results: [
      { value: 170, suffix: "+", label: "pages generated from two templates" },
      { value: 1, suffix: "", label: "place to correct an address" },
      { value: 0, suffix: "", label: "accessibility overlays remaining" },
    ],
    stack: ["HubSpot CMS", "HubDB", "HubL", "axe / NVDA"],
    fig: "Locations × providers, joined once",
    architecture: {
      viewBox: "0 0 620 240",
      nodes: [
        { id: "loc", step: 0, x: 24, y: 34, w: 160, h: 56, label: "Locations", sub: "30 rows", kind: "store" },
        { id: "prov", step: 0, x: 24, y: 142, w: 160, h: 56, label: "Providers", sub: "140 rows", kind: "store" },
        { id: "join", step: 1, x: 240, y: 88, w: 150, h: 58, label: "Relationship", sub: "many to many", kind: "service" },
        { id: "out", step: 2, x: 440, y: 88, w: 156, h: 58, label: "170+ pages", sub: "2 templates", kind: "system" },
      ],
      edges: [
        { id: "e1", step: 1, d: "M184 62 L212 62 L212 117 L240 117", label: "", kind: "auto" },
        { id: "e2", step: 1, d: "M184 170 L212 170 L212 117 L240 117", label: "", kind: "auto" },
        { id: "e3", step: 2, d: "M390 117 L440 117", label: "", kind: "auto" },
      ],
      steps: [
        { title: "Two tables", body: "Locations and providers as structured rows, with hours as data rather than free text." },
        { title: "Joined, not duplicated", body: "A provider working at four locations is one row related four ways, so a correction happens once." },
        { title: "Generated and tested", body: "Both page types come from two templates, built to WCAG 2.1 AA and checked with a keyboard and a screen reader." },
      ],
    },
  },
];

export const getStudy = (slug) => caseStudies.find((s) => s.slug === slug);
export const featuredStudies = caseStudies.filter((s) => s.featured);
export const studiesForService = (slug) => caseStudies.filter((s) => s.serviceSlug === slug);
