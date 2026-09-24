// Quote bodies are DRAFTED — that's deliberate. The brief's rule is to write
// the quote for the person and ask them to edit it, because that's the
// difference between getting one and not. Attribution is left as a placeholder
// so no real person is quoted saying something they didn't say.
//
// TODO[NEEDS ROBERT]: send each draft to the named person, let them rewrite it,
// then fill in `name`, `title`, `company` with what they approve.
//
// `relationship` is not optional. A peer endorsement is honest and useful when
// the relationship is visible; it's a problem only when it's dressed as a
// client. Never add a quote here from an agency client — those are the
// agency's relationships.

export const testimonials = [
  {
    id: "client-freelance",
    kind: "client", // answers "was he good to hire"
    quote:
      "We were paying two people to move the same data between two systems, and we'd budgeted for that forever. Robert scoped it in a fixed-price document we owned outright, which meant we could take it to our board without hedging. The build came in on the number, and the part I didn't expect was the handover — when something did go wrong six weeks later, our own team could read the logs and fix it.",
    name: "[NAME]",
    title: "[TITLE]",
    company: "[COMPANY]",
    relationship: "Freelance client",
    placement: "home + integration pages", // highest-value quote: put it where it does the most work
    todo: "TODO[NEEDS ROBERT]: this is the former-coworkers engagement from the past year. Highest-value quote available — get this one first.",
  },
  {
    id: "peer-engineering",
    kind: "peer", // answers "is he good at the craft"
    quote:
      "Robert is the person on our team who asks what happens when the sync fails at 2am, and then goes and builds the answer. I've reviewed a lot of his architecture decisions and the thing that stands out is that the failure paths are designed with the same care as the happy path — which is not normal.",
    name: "[NAME]",
    title: "[TITLE]",
    company: "Direct Development",
    relationship: "Engineering colleague",
    placement: "custom web apps service page",
    todo: "TODO[NEEDS ROBERT]: a current colleague who can speak to the platform and integration work.",
  },
  {
    id: "peer-product",
    kind: "peer",
    quote:
      "I've watched Robert take a room of people who couldn't agree on what a 'customer' was and walk out ninety minutes later with a data model everyone had signed off on. The technical work is good. Getting the requirements out of people is the rarer skill.",
    name: "[NAME]",
    title: "[TITLE]",
    company: "[COMPANY]",
    relationship: "Worked together on [PROJECT]",
    placement: "blueprint page",
    todo: "TODO[NEEDS ROBERT]: a professional contact who has actually worked with you on a real project. Name the working relationship in the attribution.",
  },
];

export const getTestimonial = (id) => testimonials.find((t) => t.id === id);

// Placement map — quotes sit next to the service or study they speak to.
// No dedicated testimonials section until there are four or more.
export const quoteForService = {
  "integration-blueprint": "peer-product",
  "system-integrations": "client-freelance",
  "custom-web-apps": "peer-engineering",
  "hubspot-websites": null, // TODO[NEEDS ROBERT]: no honest quote for this one yet. Leave it empty rather than borrowing one.
};
