// Four services, one page each. Same skeleton every time: problem, what's
// delivered, process, a case study, starting price, CTA.
// TODO[INVENTED]: every `price` and `priceValue` below. Direction is agreed
// (up from $100/hr, quoted fixed, starting prices shown in context) but the
// exact numbers are Robert's call. Search this file for `price:` to set them.

export const services = [
  {
    slug: "system-integrations",
    tier: "build",
    name: "System Integrations",
    kicker: "The build",
    card: "Two systems that should be talking and aren't. I build the connection, the error handling, and the monitoring that tells you when it breaks.",
    lede: "The build. Your systems exchange data automatically, reconcile themselves when they disagree, and tell someone when they can't.",
    price: "Projects start at $12,000",
    priceNote: "Quoted fixed from a Blueprint. Phased billing on longer builds.",
    problem: {
      heading: "The cost isn't the typing. It's what the typing gets wrong.",
      body: [
        "Someone on your team exports a report, opens two tabs, and retypes records from one system into the other. It's twelve hours a week, and everyone's made peace with that. What nobody's priced is the other half: the order that shipped to the old address, the quote built on stale inventory, the customer who got invoiced twice because two systems each thought they were the source of truth.",
        "An integration isn't about saving the twelve hours, though it does. It's about there only being one answer to \"what is this customer's address\" — and that answer being right everywhere at once.",
      ],
    },
    deliverables: [
      {
        title: "The sync itself",
        body: "Bidirectional or one-way, on a schedule or event-driven, built against your real objects and real edge cases.",
      },
      {
        title: "Error handling that escalates",
        body: "Retries with backoff, dead-letter queues for records that can't be saved, and a human alerted when something needs a decision.",
      },
      {
        title: "Reconciliation",
        body: "A scheduled job that compares both systems and reports drift, so a silent failure can't run for six weeks.",
      },
      {
        title: "Monitoring & logs",
        body: "A dashboard showing what synced, what didn't, and why — readable by your ops lead, not just by me.",
      },
      {
        title: "Backfill",
        body: "Existing records migrated and matched, including the deduplication nobody wants to talk about.",
      },
      {
        title: "Documentation & handoff",
        body: "Architecture, runbook, and credentials rotation, written so your next developer isn't starting from zero.",
      },
    ],
    process: [
      {
        title: "Blueprint",
        body: "Either the Integration Blueprint you already own, or we start there. I don't build off a thirty-minute call.",
      },
      {
        title: "Build in slices",
        body: "One object at a time, working end to end in a sandbox, so you see real records moving in week two rather than month two.",
      },
      {
        title: "Parallel run",
        body: "The integration runs alongside the manual process for a cycle. We compare outputs before anything is trusted.",
      },
      {
        title: "Cut over & watch",
        body: "Manual process retires, monitoring goes live, and I stay on it through the first full cycle.",
      },
    ],
    outcomes: [
      "One source of truth per field, decided deliberately",
      "Failures that page a person instead of failing silently",
      "Hours returned to the team who were doing it by hand",
      "A system your next developer can actually read",
    ],
    caseStudy: "distributor-netsuite-hubspot",
    next: { slug: "custom-web-apps", label: "Need software, not just a sync?" },
    pairsWith: "custom-web-apps",
  },

  {
    slug: "custom-web-apps",
    tier: "build",
    name: "Custom Web Apps",
    kicker: "Front to back",
    card: "Internal tools and SaaS products, designed and built end to end — for the process that no off-the-shelf product actually fits.",
    lede: "When the process is the business and no product fits it, the spreadsheet becomes the software. I build the thing that replaces it.",
    price: "Projects start at $18,000",
    priceNote: "Quoted fixed by phase. Most first releases land in 8–14 weeks.",
    problem: {
      heading: "The spreadsheet works right up until it's load-bearing.",
      body: [
        "It started as one person's tracker. Now it's got eleven tabs, four people editing it, a macro nobody understands, and a copy on someone's desktop that may or may not be current. It runs a real part of your business and it has no permissions, no history, no validation, and no backup worth the name.",
        "You've looked at off-the-shelf tools. They're built for how most companies do this, and the way you do it is the reason you win. Bending your process to fit somebody's product is a real cost, and usually a bigger one than building the tool.",
      ],
    },
    deliverables: [
      {
        title: "Product definition",
        body: "User flows, data model, and a scoped first release that solves the expensive problem rather than every problem.",
      },
      {
        title: "Interface design & build",
        body: "Designed and built by the same person, so what gets specced is what gets shipped. Responsive and accessible by default.",
      },
      {
        title: "Backend & data model",
        body: "API, database, background jobs, and the migrations to get your existing data in without losing history.",
      },
      {
        title: "Auth & permissions",
        body: "Roles that match how your team actually works, including the person who should only ever see their own records.",
      },
      {
        title: "Integrations included",
        body: "The app talks to the systems you already run. That's the same work as the integration service, done inside the build.",
      },
      {
        title: "Deploy & handover",
        body: "Hosted, monitored, documented, with a repository you own and a path for whoever maintains it next.",
      },
    ],
    process: [
      {
        title: "Shape the first release",
        body: "We cut scope to the one workflow that costs you most. Everything else goes on a list for later, in writing.",
      },
      {
        title: "Prototype the hard part first",
        body: "Whatever is riskiest — the data model, the import, the permissions — gets built first, while there's still room to change course.",
      },
      {
        title: "Two-week slices",
        body: "You use working software every two weeks. Feedback changes the next slice, not a change-order conversation.",
      },
      {
        title: "Launch & stabilise",
        body: "Real users, real data, and me watching the logs. Then a support arrangement, or a clean handoff to your team.",
      },
    ],
    outcomes: [
      "A tool that fits your process instead of the other way round",
      "Permissions, validation, and history the spreadsheet never had",
      "One first release in weeks, not a year-long platform project",
      "Code and infrastructure you own outright",
    ],
    caseStudy: "field-service-ops-platform",
    next: { slug: "integration-blueprint", label: "Not sure of the scope yet?" },
    pairsWith: "system-integrations",
  },

  {
    slug: "prototype-to-production",
    tier: "build",
    name: "Prototype to Production",
    kicker: "Finish the build",
    card: "Something got built fast and now it runs part of the business. I take it the rest of the way — the data model, the auth, the failure paths, the parts that got skipped.",
    lede: "The app works in a demo and falls over with real users. I take it from there, without throwing away what already works.",
    price: "Projects start at $15,000",
    priceNote: "Quoted fixed from a Code Audit. Never quoted off a demo.",
    problem: {
      heading: "The prototype works right up until it's load-bearing.",
      body: [
        "Somebody built it quickly — an ops lead with an AI assistant, a contractor on a deadline, a founder before there was a team. It worked, so it stayed. Now forty people use it, it holds data nobody has a backup of, and everyone has quietly agreed not to touch the parts that look frightening.",
        "The tell is usually the same: it demos beautifully and breaks on real data. One shared login instead of accounts. Keys sitting in the front-end bundle. No migrations, so nobody can change the schema. No error handling, so a failure is a blank screen. None of that is incompetence — it's what gets skipped when the goal is proving the thing works, and skipping it was the right call at the time.",
        "What's changed is that it's now load-bearing, and the cost of it being wrong has stopped being hypothetical.",
      ],
    },
    deliverables: [
      {
        title: "The data model, fixed",
        body: "Schema corrected and migrations introduced, so the next change is a change rather than a rewrite. Existing data migrated, not discarded.",
      },
      {
        title: "Real accounts and permissions",
        body: "Individual logins, roles that match how your team works, and an end to the shared password everybody knows.",
      },
      {
        title: "Failure paths",
        body: "Validation, error handling and retries, so a bad input is a message rather than a blank screen — and so a failure reaches a person.",
      },
      {
        title: "Tests where they earn it",
        body: "Coverage on the logic that would cost you money if it were wrong. Not a coverage percentage for its own sake.",
      },
      {
        title: "Deploys you can trust",
        body: "Environments, a repeatable deploy, and backups that have actually been restored from at least once.",
      },
      {
        title: "Documentation and handover",
        body: "Architecture, runbook and a readable repository — so this is the last time it needs rescuing.",
      },
    ],
    process: [
      {
        title: "Audit first",
        body: "Always. I don't quote a fixed price on a codebase I haven't read, and neither should anyone else.",
      },
      {
        title: "Stop the bleeding",
        body: "The dangerous things first, in priority order: data loss, access, secrets. Usually the first week or two.",
      },
      {
        title: "Make it changeable",
        body: "Migrations, structure and tests, so the thing can accept features again instead of resisting them.",
      },
      {
        title: "Then the backlog",
        body: "Only once it's safe. Features built on an unsound base are how it got here.",
      },
    ],
    outcomes: [
      "Keeps what works instead of starting over",
      "Data you could restore if you had to",
      "A codebase your next developer will accept",
      "The dangerous things fixed before the nice ones",
    ],
    caseStudy: "rental-ops-tool-rescue",
    next: { slug: "code-audit", label: "Start with the audit" },
  },

  {
    slug: "integration-blueprint",
    tier: "entry",
    name: "Integration Blueprint",
    kicker: "The scoping package",
    card: "A scoping package you own outright: statement of work, data model, field-level specs, process flows. Build it with me, or take it to anyone.",
    lede: "Before anyone writes code, you get a document that says exactly what will be built, what it will cost, and where it can go wrong. You own it. You can build it with me or hand it to any developer.",
    price: "$3,500 flat",
    priceNote: "Fixed fee. Credited against the build if you continue with me.",
    problem: {
      heading: "Most integration projects fail in the quote, not the build.",
      body: [
        "A developer gives you a number based on a thirty-minute call. Three weeks in, someone discovers that your NetSuite customer records don't map cleanly onto HubSpot companies, that two systems disagree about what a \"closed\" order is, and that nobody asked what should happen when a sync fails at 2am.",
        "Now the number is wrong, the timeline is wrong, and you're too far in to stop. That is not bad luck. That is what happens when scoping is free — because when it's free, nobody does it properly.",
      ],
    },
    deliverables: [
      {
        title: "Statement of work",
        body: "Plain-language scope: what gets built, what explicitly does not, and the sequence it gets built in.",
      },
      {
        title: "Entity relationship diagram",
        body: "How the objects in each system actually map to each other, including the places they don't.",
      },
      {
        title: "Field-level data specification",
        body: "Every field, its source, its destination, its transformation, and which system wins a conflict.",
      },
      {
        title: "Process & error flows",
        body: "The happy path, and every failure case that matters: auth expiry, rate limits, partial syncs, bad data.",
      },
      {
        title: "Build estimate",
        body: "A fixed price and timeline for the build, broken out by phase so you can stage it if you want.",
      },
      {
        title: "Full ownership",
        body: "It's yours. Build it with me, put it out to bid, or shelve it. No strings, no retained rights.",
      },
    ],
    process: [
      {
        title: "Systems audit",
        body: "Ninety minutes with you and whoever actually does the work today. I want to see the spreadsheet, not hear about it.",
      },
      {
        title: "Access & inspection",
        body: "Read-only access to the systems in scope. I look at your real data, because real data is where the surprises live.",
      },
      {
        title: "Model & specify",
        body: "I build the data model and write the field-level specs, flagging every decision that needs your call rather than guessing.",
      },
      {
        title: "Walkthrough & handoff",
        body: "We go through the document together, I revise it once, and it's yours. Usually two to three weeks start to finish.",
      },
    ],
    outcomes: [
      "A fixed, defensible build price instead of a guess",
      "A document any developer can quote against, not just me",
      "Every integration decision surfaced while it's still cheap to change",
      "A written answer for what happens when the sync fails",
    ],
    caseStudy: "distributor-netsuite-hubspot",
    next: { slug: "system-integrations", label: "Ready to build? Start here" },
  },

  {
    slug: "code-audit",
    tier: "entry",
    name: "Code Audit",
    kicker: "The read-through",
    card: "A week inside the code you already have: what's load-bearing, what's dangerous, and what it would actually cost to finish. Yours to keep.",
    lede: "Before anyone quotes you a number, somebody reads it. You get a document saying what's there, what's at risk, and what finishing it costs — and you own it.",
    price: "$4,500 flat",
    priceNote: "Fixed fee. Credited against the build if you continue with me.",
    problem: {
      heading: "Nobody can price finishing it, because nobody has read it.",
      body: [
        "You ask what it would take to get this production-ready and you get one of two answers. A developer who hasn't opened the repository gives you a number that will be wrong. Or someone tells you to start over — which is sometimes true and is always the easiest thing to say.",
        "Neither answer is worth anything, because both are guesses. The only way to know what a codebase costs to finish is for somebody to read it, run it, and try to break it.",
      ],
    },
    deliverables: [
      {
        title: "Architecture map",
        body: "What's actually in there and how it fits together, in plain language — usually the first time anyone has written it down.",
      },
      {
        title: "Risk register",
        body: "Everything that could lose data, leak it, or take the system down, ranked by how bad and how likely. This is the part that tends to change the conversation.",
      },
      {
        title: "Security review",
        body: "Auth, access control, exposed keys, and what anyone with the URL can currently do.",
      },
      {
        title: "Keep or rebuild, per piece",
        body: "Not a verdict on the whole thing. Most of these codebases are two-thirds sound, and the honest answer is which third isn't.",
      },
      {
        title: "Fixed build estimate",
        body: "A price and sequence to get it production-ready, phased so you can stop after the dangerous parts if you want to.",
      },
      {
        title: "Full ownership",
        body: "Yours. Finish it with me, hand it to your own team, or use it to hire properly. No retained rights.",
      },
    ],
    process: [
      {
        title: "Access and a walkthrough",
        body: "The repository, the running app, and thirty minutes with whoever built it. No blame in that conversation — it's the fastest way to learn what was deliberate.",
      },
      {
        title: "Read it and run it",
        body: "I read the code, run it against real-shaped data, and try the things a user will eventually do by accident.",
      },
      {
        title: "Write it up",
        body: "Architecture, risks, and the estimate — with every judgement call flagged as mine rather than presented as fact.",
      },
      {
        title: "Walkthrough and handoff",
        body: "We go through it together, I revise once, and it's yours. About a week, start to finish.",
      },
    ],
    outcomes: [
      "A real number instead of a guess or a shrug",
      "The dangerous things named before they happen",
      "A document you can hand to any developer, not just me",
      "An honest answer on what to keep and what to rebuild",
    ],
    caseStudy: "rental-ops-tool-rescue",
    next: { slug: "prototype-to-production", label: "Ready to finish it?" },
  },

  {
    slug: "hubspot-websites",
    tier: "volume",
    name: "HubSpot Websites & CMS",
    kicker: "Built on the CRM, not beside it",
    card: "HubSpot CMS builds where the site is wired into the CRM — custom modules, HubDB, dynamic pages, and templates your marketers can actually use.",
    lede: "A HubSpot site built by someone who spends the rest of his time in the CRM behind it. The content model is designed first; the templates come after.",
    price: "Projects start at $7,500",
    priceNote: "Fixed by scope. Page count matters less than how many templates you need.",
    problem: {
      heading: "Most HubSpot sites are built by people who never touch the CRM.",
      body: [
        "The result is a site that looks fine and fights you from day one. Modules that only the developer can change. A team of thirty on one page template with a rich-text field, rebuilding the same layout by hand. Data that lives in a spreadsheet because nobody modelled it in HubDB, so the site can never show it.",
        "The site isn't a brochure sitting next to your CRM. It's the front end of it, and it should be built that way.",
      ],
    },
    deliverables: [
      {
        title: "Content model first",
        body: "HubDB tables and dynamic pages designed around your actual content, so listings, filters and detail pages come free.",
      },
      {
        title: "Custom modules",
        body: "Fields your marketing team understands, with guardrails, so pages can't be broken by someone doing their job.",
      },
      {
        title: "CRM-aware pages",
        body: "Personalisation, gated content, and forms wired to the properties and workflows your sales team already uses.",
      },
      {
        title: "Performance & accessibility",
        body: "Built to pass an audit, not decorated with an overlay. Keyboard navigation and screen reader support tested, not assumed.",
      },
      {
        title: "Migration",
        body: "Existing content moved with redirects mapped, so the rankings you have on launch day are the ones you keep.",
      },
      {
        title: "Team training",
        body: "A session with your marketers plus written docs, because a site nobody can edit is a site that's out of date in a month.",
      },
    ],
    process: [
      {
        title: "Content & template audit",
        body: "What pages exist, what they actually need to be, and the smallest set of templates that covers them.",
      },
      {
        title: "Model & design",
        body: "HubDB structure and page designs together, so the design never promises something the data can't fill.",
      },
      {
        title: "Build & populate",
        body: "Templates and modules built, content migrated, redirects mapped, forms and workflows connected.",
      },
      {
        title: "Launch & train",
        body: "Go live, then hand the keys over properly with a walkthrough and documentation.",
      },
    ],
    outcomes: [
      "Marketers who can build pages without a developer",
      "Content modelled once and reused everywhere",
      "Forms that land in the right place in the CRM",
      "An accessibility standard that holds after launch",
    ],
    caseStudy: "manufacturer-hubdb-catalog",
    next: { slug: "system-integrations", label: "Also need the CRM connected?" },
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);

// Rush delivery is a modifier on a scoped project, never a standalone service
// and never a published turnaround. It surfaces inside the inquiry flow only.
export const rush = {
  summary: "Need this faster?",
  body: "Rush delivery moves a project to the front of my queue on a compressed timeline we agree up front. It's priced per project — typically 25–50% on top of the project fee, depending on what it actually displaces. It's only available on work that's already scoped, so it's a conversation once we know what we're building, not a box you tick now.",
};
