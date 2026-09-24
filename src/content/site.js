// Everything a buyer reads that isn't a service or a case study.
// TODO[INVENTED] markers flag anything I made up that needs Robert's real number.

export const site = {
  name: "Robert Gonzalez",
  domain: "robertgonzalez.io",
  email: "hello@robertgonzalez.io", // TODO[INVENTED]: confirm the address to publish
  linkedin: "https://www.linkedin.com/in/robertgonzalez", // TODO[INVENTED]: real profile URL
  github: "https://github.com/bobbyg211",
};

export const hero = {
  headline: ["I connect the systems", "your business runs on."],
  lede: "Integrations and custom software for operations-heavy businesses that have outgrown copy and paste. Usually the same project.",
  primary: { label: "Start with a Blueprint", to: "/services/integration-blueprint" },
  secondary: { label: "See the work", to: "/work" },
  note: "Currently booking new projects for Q1.", // TODO[INVENTED]: set or delete. No availability labels on services — this is a scheduling note, not a capability label.
};

// TODO[INVENTED]: every number below. Replace with real counts before launch,
// or delete the stat — the counters only earn their animation if they're true.
export const proofStats = [
  { value: 10, suffix: "+", label: "years building for operations teams" },
  { value: 20, suffix: "+", label: "organizations shipped for" },
  { value: 30, suffix: "+", label: "integrations shipped end to end" },
  { value: 2400000, format: "compact", label: "records under sync today" },
  { value: 40, suffix: " hrs", label: "of manual work eliminated weekly" },
];

// The systems are the evidence for this number, so the number introduces them
// rather than sitting in a separate column with no stated relationship.
export const systemsProof = {
  value: 12,
  suffix: "",
  label: "platforms integrated end to end",
};

// TODO[DECISION]: these are the systems, not clients. The brief kills the logo
// wall as a hero element, so this reads as "what I work in", low in the page.
export const systemsWorkedIn = [
  "HubSpot",
  "NetSuite",
  "Salesforce",
  "QuickBooks",
  "Shopify",
  "Stripe",
  "Airtable",
  "ServiceTitan",
  "Snowflake",
  "Postgres",
];

export const aboutShort = {
  heading: "I run engineering for an agency. This is what I do on my own.",
  body: [
    "By day I'm Director of Engineering at Direct Development, where I architect and lead the builds that client teams depend on — integrations, internal platforms, and the systems that keep them in sync.",
    "That matters to you for one reason: you're not hiring someone who learns your stack on your budget. You're hiring someone who scopes this for a living and has already made the expensive mistakes on somebody else's project.",
  ],
};

export const aboutLong = {
  heading: "Ten years of making systems talk to each other.",
  body: [
    "I'm Robert Gonzalez, an engineer in Chicago. I build integrations and custom software for businesses whose operations have outgrown their tools — the ones where somebody's whole Tuesday is moving records from one system into another by hand.",
    "I'm Director of Engineering at Direct Development, where I'm the architect and lead engineer on the platforms and integrations our client teams run on. That's the day job, and it's the reason my freelance work looks the way it does: I spend every week inside the failure modes of real integrations — the partial sync, the silent auth expiry, the field that was a string until it wasn't — so I scope for them instead of discovering them at your expense.",
    "The freelance practice is deliberately small. I take a handful of projects a year, I quote them fixed, and I'd rather tell you a project isn't worth building than bill you to find out.",
  ],
  // TODO[INVENTED]: city, tenure, and "handful of projects a year" — confirm all three.
  facts: [
    { k: "Role", v: "Director of Engineering, Direct Development" },
    { k: "Based", v: "Chicago, IL" }, // TODO[INVENTED]
    { k: "Building since", v: "2015" }, // TODO[INVENTED]
    { k: "Works in", v: "Node, TypeScript, React, Postgres, HubSpot" },
  ],
};

export const navLinks = [
  { to: "/services/system-integrations", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
];
