import { useRef, useState } from "react";
import { Chevron } from "../Icons.jsx";
import Marks from "../Marks.jsx";

// The entry offer is a document, which makes it the hardest thing on the site
// to sell — nobody buys a PDF they've never seen. So: an actual anonymised
// deliverable, scrollable and swipeable, redacted where a real one would be.
//
// Native scroll-snap does the work. No scroll hijacking, no carousel library,
// and it swipes on a phone because that's just how the element already behaves.

const REDACT = ({ w = 60 }) => <span className="bp__redact" style={{ width: w }} aria-hidden="true" />;

const PAGES = [
  {
    no: "01",
    kind: "Statement of work",
    title: "Scope & sequence",
    body: (
      <>
        <p className="bp__h">1.1 In scope</p>
        <p>
          Bidirectional synchronisation of <b>Customer</b>, <b>Product</b> and{" "}
          <b>Sales Order</b> objects between <REDACT w={52} /> and <REDACT w={44} />, on a
          fifteen-minute schedule with event-driven writes on deal close.
        </p>
        <div className="bp__rule" />
        <p className="bp__h">1.2 Explicitly out of scope</p>
        <p>
          Historical orders prior to <REDACT w={38} />. Multi-currency handling. Any write to
          the general ledger.
        </p>
        <div className="bp__rule" />
        <p className="bp__h">1.3 Build sequence</p>
        <p>
          Phase 1 — products and pricing, one way. Phase 2 — customer matching and
          deduplication. Phase 3 — order write-back. Phase 4 — reconciliation and alerting.
        </p>
      </>
    ),
  },
  {
    no: "02",
    kind: "Data model",
    title: "Entity relationships",
    body: (
      <svg viewBox="0 0 260 210" style={{ width: "100%", height: "auto" }} aria-hidden="true">
        <g stroke="var(--construct)" strokeWidth="0.8" strokeDasharray="2 3" fill="none">
          <path d="M0 52 H260M0 122 H260" opacity="0.6" />
        </g>
        {[
          { x: 8, y: 14, w: 94, h: 38, t: "Customer", s: "erp" },
          { x: 158, y: 14, w: 94, h: 38, t: "Company", s: "crm" },
          { x: 8, y: 86, w: 94, h: 38, t: "Item", s: "erp" },
          { x: 158, y: 86, w: 94, h: 38, t: "Product", s: "crm" },
          { x: 83, y: 158, w: 94, h: 38, t: "Sales Order", s: "erp → crm" },
        ].map((b) => (
          <g key={b.t}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="3" fill="var(--surface)" stroke="var(--ink)" strokeWidth="0.9" opacity="0.9" />
            <text x={b.x + 9} y={b.y + 17} style={{ font: "600 9px var(--display)", fill: "var(--ink)" }}>
              {b.t}
            </text>
            <text x={b.x + 9} y={b.y + 29} style={{ font: "400 6.5px var(--mono)", fill: "var(--faint)", letterSpacing: "0.06em" }}>
              {b.s}
            </text>
          </g>
        ))}
        <g stroke="var(--flow)" strokeWidth="1" fill="none">
          <path d="M102 33 H158" />
          <path d="M102 105 H158" />
          <path d="M130 158 V140 H55 V124" />
        </g>
        <g style={{ font: "400 6px var(--mono)", fill: "var(--faint)" }}>
          <text x="112" y="29">1 : 1</text>
          <text x="112" y="101">1 : 1</text>
          <text x="136" y="150">n : 1</text>
        </g>
      </svg>
    ),
  },
  {
    no: "03",
    kind: "Field specification",
    title: "Mapping & ownership",
    body: (
      <table className="bp__spec">
        <thead>
          <tr>
            <th>Source</th>
            <th>Dest</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["entityid", "hs_object_id", "erp"],
            ["companyname", "name", "erp"],
            ["email", "email", "crm"],
            ["baseprice", "price", "erp"],
            ["qtyavailable", "inventory", "erp"],
            ["lifecyclestage", "—", "crm"],
            ["shipaddress", "address", "erp"],
            ["lastmodified", "hs_lastmod", "system"],
          ].map((r) => (
            <tr key={r[0]}>
              <td>{r[0]}</td>
              <td>{r[1]}</td>
              <td style={{ color: r[2] === "crm" ? "var(--node)" : "var(--flow-2)" }}>{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
  {
    no: "04",
    kind: "Process flow",
    title: "Failure handling",
    body: (
      <>
        <svg viewBox="0 0 260 128" style={{ width: "100%", height: "auto" }} aria-hidden="true">
          {[
            { x: 4, y: 8, t: "Read" },
            { x: 92, y: 8, t: "Validate" },
            { x: 180, y: 8, t: "Write" },
          ].map((b) => (
            <g key={b.t}>
              <rect x={b.x} y={b.y} width="72" height="30" rx="3" fill="var(--surface)" stroke="var(--ink)" strokeWidth="0.9" />
              <text x={b.x + 10} y={b.y + 19} style={{ font: "600 9px var(--display)", fill: "var(--ink)" }}>
                {b.t}
              </text>
            </g>
          ))}
          <g stroke="var(--flow)" strokeWidth="1" fill="none">
            <path d="M76 23 H92M164 23 H180" />
          </g>
          <g stroke="var(--manual)" strokeWidth="1" strokeDasharray="4 3" fill="none">
            <path d="M128 38 V70 H44 V88" />
            <path d="M216 38 V70 H136 V88" />
          </g>
          <rect x="4" y="88" width="80" height="28" rx="3" fill="var(--manual-soft)" stroke="var(--manual)" strokeWidth="0.9" />
          <text x="13" y="106" style={{ font: "600 8px var(--display)", fill: "#9a4326" }}>
            Dead letter
          </text>
          <rect x="96" y="88" width="80" height="28" rx="3" fill="var(--manual-soft)" stroke="var(--manual)" strokeWidth="0.9" />
          <text x="105" y="106" style={{ font: "600 8px var(--display)", fill: "#9a4326" }}>
            Retry ×3
          </text>
        </svg>
        <div className="bp__rule" />
        <p className="bp__h">4.2 Scenarios handled</p>
        <p>
          Auth token expiry · rate limit · partial batch · required field missing · duplicate
          match · deleted upstream · clock skew · <REDACT w={40} />
        </p>
      </>
    ),
  },
];

export default function BlueprintPreview() {
  const trackRef = useRef(null);
  const [page, setPage] = useState(0);

  const go = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(PAGES.length - 1, i));
    const child = track.children[next];
    if (child) track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setPage(next);
  };

  // Track which page is centred so the dots stay honest when someone swipes.
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const mid = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let best = Infinity;
    Array.from(track.children).forEach((c, i) => {
      const center = c.offsetLeft - track.offsetLeft + c.clientWidth / 2;
      const d = Math.abs(center - mid);
      if (d < best) {
        best = d;
        closest = i;
      }
    });
    setPage(closest);
  };

  return (
    <div className="bp sheet">
      <Marks />
      <div className="bp__track" ref={trackRef} onScroll={onScroll} tabIndex={0} aria-label="Blueprint preview pages">
        {PAGES.map((p) => (
          <article className="bp__page" key={p.no}>
            <header className="bp__page-head">
              <span className="bp__page-title">{p.title}</span>
              <span>{p.kind}</span>
            </header>
            <div className="bp__body">{p.body}</div>
            <footer className="bp__page-foot">
              <span>Integration Blueprint — anonymised</span>
              <span>p. {p.no}</span>
            </footer>
          </article>
        ))}
      </div>

      <div className="bp__nav">
        <div className="bp__dots">
          {PAGES.map((p, i) => (
            <button
              key={p.no}
              className="bp__dot"
              aria-current={i === page}
              aria-label={`Page ${i + 1}: ${p.title}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button className="bp__btn" onClick={() => go(page - 1)} disabled={page === 0} aria-label="Previous page">
          <Chevron style={{ transform: "rotate(180deg)" }} />
        </button>
        <button
          className="bp__btn"
          onClick={() => go(page + 1)}
          disabled={page === PAGES.length - 1}
          aria-label="Next page"
        >
          <Chevron />
        </button>
      </div>
    </div>
  );
}
