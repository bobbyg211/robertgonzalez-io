import { useId } from "react";

// Background fields for sections. The grid belongs to the banner and the
// diagram plates, so a section that needs its own ground gets a different
// mark from the same drawing tradition — the registration crosses off a
// print sheet, compass construction arcs, or the ray fan of a perspective
// setup. All three are hairline and heavily faded; they separate sections by
// giving them different ground, not by drawing a line between them.

function Crosses() {
  // Unique per instance: more than one cross field can share a page, and a
  // duplicated pattern id would have them all resolve to the first one.
  const id = `f-cross-${useId()}`;
  // The same crosshair as the corner registration marks, tiled sparsely.
  // Reads as a marked-up sheet rather than as graph paper.
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

function Arcs() {
  // Compass construction: concentric arcs struck from a point off the corner
  // of the sheet, the way a drawing gets set out before anything is drawn.
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1000 500"
      preserveAspectRatio="xMinYMax slice"
      aria-hidden="true"
    >
      <g stroke="currentColor" fill="none" strokeWidth="1">
        {[170, 290, 410, 530, 650, 770, 890, 1010, 1130].map((r, i) => (
          <circle key={r} cx="-40" cy="540" r={r} strokeDasharray={i % 3 === 2 ? "3 6" : undefined} />
        ))}
        <path d="M-40 540 L1000 540M-40 540 L-40 -40" strokeDasharray="4 7" opacity="0.7" />
      </g>
    </svg>
  );
}

function Rays() {
  // A perspective fan converging on a vanishing point. Used once per page at
  // most — it has a direction, so it pulls the eye somewhere.
  const lines = Array.from({ length: 17 }, (_, i) => i);
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1000 500"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
    >
      <g stroke="currentColor" fill="none" strokeWidth="1">
        {lines.map((i) => (
          <path
            key={i}
            d={`M1040 250 L-60 ${-420 + i * 82}`}
            strokeDasharray={i % 2 ? "3 8" : undefined}
            opacity={i % 2 ? 0.55 : 1}
          />
        ))}
        <circle cx="1040" cy="250" r="3" fill="currentColor" stroke="none" opacity="0.5" />
      </g>
    </svg>
  );
}

const KINDS = { cross: Crosses, arcs: Arcs, rays: Rays };

export default function SectionField({ kind = "cross", fade = "y" }) {
  const Field = KINDS[kind] || Crosses;
  return (
    <span className={`field field--${kind} field--fade-${fade}`} aria-hidden="true">
      <Field />
    </span>
  );
}
