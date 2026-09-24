// The interactive system picker. Doubles as lead qualification: whatever a
// visitor selects is prefilled into the contact form.
//
// `pairs` maps a selected combination to what connecting them actually looks
// like. Keys are the two ids sorted and joined — order of clicking shouldn't
// change the answer.

export const systems = [
  { id: "hubspot", label: "HubSpot", role: "CRM" },
  { id: "salesforce", label: "Salesforce", role: "CRM" },
  { id: "netsuite", label: "NetSuite", role: "ERP" },
  { id: "quickbooks", label: "QuickBooks", role: "Accounting" },
  { id: "shopify", label: "Shopify", role: "Commerce" },
  { id: "stripe", label: "Stripe", role: "Payments" },
  { id: "airtable", label: "Airtable", role: "Ops database" },
  { id: "sheets", label: "Google Sheets", role: "The spreadsheet" },
  { id: "custom", label: "Something internal", role: "Custom system" },
];

export const getSystem = (id) => systems.find((s) => s.id === id);

const key = (a, b) => [a, b].sort().join("+");

// TODO[INVENTED]: the flows and case study links below are plausible rather
// than drawn from real engagements. Worth revisiting once the real case
// studies are picked, so every pairing points at something true.
export const pairs = {
  [key("netsuite", "hubspot")]: {
    flows: [
      "Products, pricing and stock → CRM, every 15 minutes",
      "Closed-won deals → sales orders, matched not duplicated",
      "Nightly reconciliation catches drift before anyone notices it",
    ],
    decision: "The first question is which system owns price. It's almost always the ERP — but it has to be decided, not assumed.",
    study: "distributor-netsuite-hubspot",
  },
  [key("hubspot", "quickbooks")]: {
    flows: [
      "Closed deals → invoices, once, with an idempotency key",
      "Payment status → deal properties, so sales can see what's paid",
      "Customer records matched on a stable external id",
    ],
    decision: "The trap is retries. A timeout that gets retried without an idempotency key invoices the customer twice.",
    study: "field-service-ops-platform",
  },
  [key("hubspot", "shopify")]: {
    flows: [
      "Orders → CRM timeline, with line items intact",
      "Customers deduplicated against existing contacts by email",
      "Abandoned checkouts → workflow enrolment",
    ],
    decision: "Guest checkout is the interesting case: the same human can exist as three Shopify customers and one CRM contact.",
    study: "distributor-netsuite-hubspot",
  },
  [key("salesforce", "sheets")]: {
    flows: [
      "The spreadsheet becomes a real object with validation and history",
      "Existing rows migrated and deduplicated, not re-keyed",
      "Read-only export kept alive for whoever still wants the sheet",
    ],
    decision: "Usually this one isn't an integration at all. If a spreadsheet is load-bearing, the honest answer is to replace it.",
    study: "field-service-ops-platform",
  },
  [key("custom", "hubspot")]: {
    flows: [
      "Your system's objects mapped onto CRM objects, field by field",
      "Webhooks in, queued and retried, so your app never blocks on theirs",
      "A dead-letter queue for records that need a human decision",
    ],
    decision: "When one side is yours, the design question is how much of the mess stays on your side of the boundary. Usually: all of it.",
    study: "brokerage-policy-sync",
  },
  [key("salesforce", "stripe")]: {
    flows: [
      "Subscriptions and payment status → opportunity records",
      "Failed payments → an owned task, not an unread email",
      "Refunds and disputes reflected against the right account",
    ],
    decision: "Webhook ordering. Stripe does not promise events arrive in order, and a naive handler will resurrect a cancelled subscription.",
    study: "brokerage-policy-sync",
  },
};

export const fallbackPair = {
  flows: [
    "Objects mapped between the two, field by field, with one owner per field",
    "Scheduled or event-driven sync depending on how fresh the data has to be",
    "Failures queued with a readable reason instead of disappearing",
    "Reconciliation that reports drift before a person finds it",
  ],
  decision: "Every pairing comes down to the same first question: when the two systems disagree about a field, which one is right? That's a business decision, and it's the one the Blueprint exists to settle.",
  study: "distributor-netsuite-hubspot",
};

export const lookupPair = (a, b) => pairs[key(a, b)] || fallbackPair;
