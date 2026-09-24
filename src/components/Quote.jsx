import { useInView } from "../hooks/useMotion.js";

// A quote always carries the working relationship, not just a job title.
// That's what makes a peer endorsement honest instead of a client quote in
// disguise — and it's why `relationship` is rendered, never optional.
export default function Quote({ quote, card = false }) {
  // The rule draws itself once, when the quote arrives, and stays drawn. It
  // used to key off an ancestor's reveal class with a hover trigger layered on
  // top, so leaving the element could snap it shut again depending on which
  // wrapper happened to be in view.
  const [ref, inView] = useInView({ threshold: 0.35 });

  if (!quote) return null;

  return (
    <figure
      ref={ref}
      className={`quote ${card ? "quote--card" : ""} ${inView ? "is-in" : ""}`.trim()}
    >
      <blockquote>“{quote.quote}”</blockquote>
      <figcaption className="quote__who">
        <strong>{quote.name}</strong>
        {[quote.title, quote.company].filter(Boolean).join(", ")}
        <span className="quote__rel">{quote.relationship}</span>
      </figcaption>
    </figure>
  );
}
