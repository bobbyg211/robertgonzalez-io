import { useInView } from "../hooks/useMotion.js";
import Typed from "./Typed.jsx";

// Devices for breaking a page into plates. They separate sections by being
// drawn between them rather than by filling an area with another field —
// which is what lets several appear on one page without any two of them
// reading as competing grids.

function Cross() {
  return (
    <svg className="srule__cross" width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
      <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

// A dimension rule with a mono callout. `align="left"` puts the label at the
// margin with the measure running off to the right; centred reads as a break
// between two plates.
export function SheetRule({ label, align = "center", cross = false, quiet = false, typed = false }) {
  const [ref, inView] = useInView({ threshold: 0.9 });
  const on = inView ? "is-in" : "";

  const line = (side) => (
    <span className={`srule__line srule__line--tick-${side} draw-x ${on}`} />
  );

  return (
    <div className="srule" ref={ref} aria-hidden="true">
      {cross && <Cross />}
      {align === "center" && line("start")}
      {label && (
        <span className={`srule__label ${quiet ? "srule__label--quiet" : ""}`.trim()}>
          {typed ? <Typed text={label} caret={false} speed={26} /> : label}
        </span>
      )}
      {line("end")}
      {cross && <Cross />}
    </div>
  );
}

// A figure number above a section head, the way a plate is captioned.
export function Plate({ no, label }) {
  return (
    <span className="plate">
      <span className="plate__no">{no}</span>
      <span className="plate__line" aria-hidden="true" />
      {label}
    </span>
  );
}
