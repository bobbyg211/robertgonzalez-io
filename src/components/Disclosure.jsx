import { useState } from "react";
import { Chevron } from "./Icons.jsx";

// Not a <details>. A closed <details> doesn't lay its content out at all, so
// there's no height to animate between — every smooth version of one is really
// a button and a panel underneath. This is that, with aria-expanded doing the
// job the native element would have done for free.
//
// The panel animates on grid-template-rows 0fr → 1fr, which transitions to the
// content's real height without anyone having to measure it.
export default function Disclosure({ summary, children, className = "" }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`disc ${open ? "is-open" : ""} ${className}`.trim()}>
      <button
        type="button"
        className="disc__summary"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{summary}</span>
        <Chevron className="disc__caret" />
      </button>

      <div className="disc__panel">
        <div className="disc__inner">
          <div className="disc__body">{children}</div>
        </div>
      </div>
    </div>
  );
}
