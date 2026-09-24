import { DNode, DEdge, Defs } from "./parts.jsx";
import { useActiveIndex } from "../../hooks/useMotion.js";

// The case study diagram that builds as you read. Each step of the explanation
// adds its layer; the drawing teaches instead of decorating.
//
// The stage is sticky on desktop and inline on mobile, and it is never pinned
// — the page scrolls at its normal speed the whole way through. Every layer is
// in the DOM from the start, so with reduced motion or no JS you get the
// complete drawing rather than an empty box.

export default function Architecture({ architecture, figure, id = "arch" }) {
  const { viewBox, nodes, edges, steps } = architecture;
  const [active, setRef] = useActiveIndex(steps.length);

  return (
    <div className="arch">
      <div className="arch__stage">
        <div className="diagram sheet">
          <div className="diagram__bar">
            <span>
              Fig. 02 — {figure}
            </span>
            <span className="diagram__live" style={{ color: "var(--muted)" }}>
              layer {Math.min(active + 1, steps.length)} / {steps.length}
            </span>
          </div>
          <div className="diagram__body paper">
            <svg viewBox={viewBox} role="img" aria-label={figure} style={{ width: "100%", height: "auto" }}>
              <Defs id={id} />
              {edges.map((e) => (
                <g key={e.id} className={`arch__layer ${e.step <= active ? "is-on" : ""}`}>
                  <DEdge edge={e} defsId={id} />
                </g>
              ))}
              {nodes.map((n) => (
                <g key={n.id} className={`arch__layer ${n.step <= active ? "is-on" : ""}`}>
                  <DNode node={n} dim={n.step > active} />
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      <div className="arch__steps">
        {steps.map((s, i) => (
          <div key={s.title} ref={setRef(i)} className={`arch__step ${i === active ? "is-active" : ""}`}>
            <h4>
              <span className="arch__num">{String(i + 1).padStart(2, "0")}</span>
              {s.title}
            </h4>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
