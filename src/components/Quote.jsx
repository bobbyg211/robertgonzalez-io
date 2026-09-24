// A quote always carries the working relationship, not just a job title.
// That's what makes a peer endorsement honest instead of a client quote in
// disguise — and it's why `relationship` is rendered, never optional.
export default function Quote({ quote, card = false }) {
  if (!quote) return null;

  return (
    <figure className={`quote ${card ? "quote--card" : ""}`}>
      <blockquote>“{quote.quote}”</blockquote>
      <figcaption className="quote__who">
        <strong>{quote.name}</strong>
        {[quote.title, quote.company].filter(Boolean).join(", ")}
        <span className="quote__rel">{quote.relationship}</span>
      </figcaption>
    </figure>
  );
}
