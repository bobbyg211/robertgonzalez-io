import { useId } from "react";

// Ground for a section. Adjacent sections separate by having different ground
// rather than by a rule drawn between them.
//
// Two registers, deliberately unalike. `cross` is dense and fine — a field of
// small marks. `projection` and `frame` are sparse and large: a handful of
// hairlines each. The contrast between the two registers is what stops a page
// of fields reading as one texture.
//
// Everything here corresponds to something real on a drawing, which is what
// the first attempt got wrong — compass arcs and a perspective fan were just
// geometry, decorative, belonging to nothing else on the page.

function Crosses() {
  // Unique per instance: more than one cross field can share a page, and a
  // duplicated pattern id would have them all resolve to the first one.
  const id = `f-cross-${useId()}`;
  return (
    <svg width="100%" height="100%" aria-hidden="true">
      <defs>
        <pattern id={id} width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M28 21v14M21 28h14" stroke="currentColor" strokeWidth="1" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// Projection lines: the construction guides that carry an edge from one view
// of a drawing into the next. They're pinned to the content column's own
// edges, so they extend the text block rather than sitting at arbitrary
// percentages — which is the difference between deliberate and random.
// `side` picks which column edge the guide runs down. One vertical, not two —
// a pair reads as a frame, which is a different device and already in use.
function Projection({ side = "right" }) {
  const s = side === "left" ? "l" : "r";
  return (
    <>
      <span className={`proj__v proj__v--${s}`} />
      <span className="proj__h" />
      <span className={`proj__x proj__x--t${s}`} />
    </>
  );
}

// The border ruled around a drawing sheet, with corner brackets and a title
// block. Built from positioned elements rather than a stretched SVG so the
// hairlines stay 1px at every section size.
function Frame({ label }) {
  return (
    <>
      <span className="frame__box" />
      <span className="frame__c frame__c--tl" />
      <span className="frame__c frame__c--tr" />
      <span className="frame__c frame__c--bl" />
      <span className="frame__c frame__c--br" />
      {label && <span className="frame__block">{label}</span>}
    </>
  );
}

const KINDS = { cross: Crosses, projection: Projection, frame: Frame };

export default function SectionField({ kind = "cross", fade = "y", label, side }) {
  const Field = KINDS[kind] || Crosses;
  return (
    <span className={`field field--${kind} field--fade-${fade}`} aria-hidden="true">
      <Field label={label} side={side} />
    </span>
  );
}
