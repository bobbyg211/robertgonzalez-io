import { useState } from "react";
import { Link } from "react-router-dom";
import { systems, lookupPair, getSystem } from "../../content/systems.js";
import { getStudy } from "../../content/caseStudies.js";
import { Check, ArrowRight } from "../Icons.jsx";

// Pick the two systems you run. The page shows what connecting them actually
// involves, the decision it turns on, and the matching case study.
//
// It's also the qualifier: the selection is carried into the contact form, so
// an inquiry arrives already saying which systems are in play.

export default function SystemPicker() {
  const [picked, setPicked] = useState([]);

  const toggle = (id) =>
    setPicked((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      // Two at a time: the third click replaces the oldest, so the control
      // never dead-ends on "deselect something first".
      return cur.length < 2 ? [...cur, id] : [cur[1], id];
    });

  const ready = picked.length === 2;
  const pair = ready ? lookupPair(picked[0], picked[1]) : null;
  const study = pair ? getStudy(pair.study) : null;
  const labels = picked.map((id) => getSystem(id)?.label).filter(Boolean);

  return (
    <div className="picker">
      <div className="picker__chips" role="group" aria-label="Select the two systems you use">
        {systems.map((s) => (
          <button
            key={s.id}
            type="button"
            className="chip"
            aria-pressed={picked.includes(s.id)}
            onClick={() => toggle(s.id)}
          >
            <span className="chip__dot" />
            {s.label}
          </button>
        ))}
      </div>

      <div className="picker__result" aria-live="polite">
        {!ready ? (
          <p className="picker__empty">
            {picked.length === 0
              ? "Pick the two systems that should be talking to each other."
              : `${labels[0]} and — pick one more.`}
          </p>
        ) : (
          <div className="picker__grid">
            <div className="picker__pane">
              <span className="annot" style={{ marginBottom: 14 }}>
                {labels[0]} → {labels[1]}
              </span>
              <h4>What connecting them looks like</h4>
              <ul className="picker__flowlist">
                {pair.flows.map((f) => (
                  <li key={f}>
                    <Check width="13" height="13" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="picker__pane">
              <h4>The decision it turns on</h4>
              <p className="muted" style={{ fontSize: "0.95rem" }}>
                {pair.decision}
              </p>

              {study && (
                <>
                  <div className="bp__rule" style={{ margin: "18px 0" }} />
                  <span className="annot" style={{ marginBottom: 10 }}>
                    Closest case study
                  </span>
                  <Link to={`/work/${study.slug}`} className="btn btn--plain">
                    {study.title} <ArrowRight />
                  </Link>
                </>
              )}

              <div style={{ marginTop: 20 }}>
                <Link
                  to={`/contact?systems=${picked.join(",")}`}
                  className="btn btn--accent btn--block"
                >
                  Talk about connecting these <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
