import { useEffect, useRef, useState } from "react";
import { Defs, DNode } from "./parts.jsx";
import { useReducedMotion, useInView } from "../../hooks/useMotion.js";
import Typed from "../Typed.jsx";

// The hero. A buyer who can't define "integration" should understand it after
// five seconds of watching: records leave one system, pass through something
// I built, arrive in the other, and the field that moved lights up underneath.
//
// Everything is driven by one rAF loop reading getPointAtLength, so a packet
// arriving and its field row lighting are the same event rather than two
// animations that drift apart. With reduced motion it renders the finished
// state — every node, every line, no movement.

const FIELDS = [
  { from: "customer.id", to: "contact.hs_id" },
  { from: "item.price", to: "product.price" },
  { from: "order.status", to: "deal.stage" },
  { from: "ship_addr", to: "shipping_address" },
];

const V = { w: 580, h: 210 };

const NODES = [
  { id: "a", x: 8, y: 48, w: 152, h: 64, label: "NetSuite", sub: "erp", kind: "system" },
  { id: "svc", x: 232, y: 56, w: 116, h: 48, label: "Sync", sub: "yours", kind: "service" },
  { id: "b", x: 420, y: 48, w: 152, h: 64, label: "HubSpot", sub: "crm", kind: "system" },
];

// Out along the top through the service, back along a curve underneath.
const P_IN = "M160 80 L232 80";
const P_OUT = "M348 80 L420 80";
const P_BACK = "M420 100 C 380 172, 200 172, 160 100";

// A packet's life: travel in, dwell inside the service, travel out.
const IN_END = 0.36;
const DWELL_END = 0.48;

export default function HeroFlow() {
  const reduced = useReducedMotion();
  const [wrapRef, inView] = useInView({ threshold: 0.1, once: false });
  const svgRef = useRef(null);
  const pathsRef = useRef({});
  const [packets, setPackets] = useState([]);
  const [hot, setHot] = useState(-1);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (reduced || !inView) return;

    const svg = svgRef.current;
    if (!svg) return;

    pathsRef.current = {
      in: svg.querySelector("#p-in"),
      out: svg.querySelector("#p-out"),
      back: svg.querySelector("#p-back"),
    };

    // Four packets outbound, offset so one is always somewhere visible, plus
    // two coming back the other way. Speeds differ slightly — identical
    // spacing reads as a conveyor belt, not as data.
    const seeds = [
      { id: 0, dir: "fwd", t: 0.0, speed: 0.00042, field: 0 },
      { id: 1, dir: "fwd", t: 0.3, speed: 0.00038, field: 1 },
      { id: 2, dir: "fwd", t: 0.62, speed: 0.00045, field: 2 },
      { id: 3, dir: "fwd", t: 0.85, speed: 0.0004, field: 3 },
      { id: 4, dir: "back", t: 0.15, speed: 0.00033, field: -1 },
      { id: 5, dir: "back", t: 0.7, speed: 0.00036, field: -1 },
    ];

    let state = seeds.map((s) => ({ ...s, x: 0, y: 0, hidden: true }));
    let raf;
    let last = performance.now();
    let hotUntil = 0;
    let hotField = -1;
    let busyUntil = 0;

    const pointOn = (path, frac) => {
      if (!path) return null;
      const len = path.getTotalLength();
      const p = path.getPointAtLength(Math.max(0, Math.min(1, frac)) * len);
      return { x: p.x, y: p.y };
    };

    const tick = (now) => {
      const dt = Math.min(48, now - last);
      last = now;

      state = state.map((p) => {
        let t = p.t + p.speed * dt;

        if (t >= 1) {
          t -= 1;
          if (p.dir === "fwd") {
            // Arrival. This is the moment the field row lights.
            hotField = p.field;
            hotUntil = now + 950;
          }
        }

        let pos = null;
        let hidden = false;

        if (p.dir === "back") {
          pos = pointOn(pathsRef.current.back, t);
        } else if (t < IN_END) {
          pos = pointOn(pathsRef.current.in, t / IN_END);
        } else if (t < DWELL_END) {
          // Inside the service: the packet is hidden and the box pulses.
          hidden = true;
          busyUntil = now + 220;
        } else {
          pos = pointOn(pathsRef.current.out, (t - DWELL_END) / (1 - DWELL_END));
        }

        return { ...p, t, hidden, x: pos ? pos.x : p.x, y: pos ? pos.y : p.y };
      });

      setPackets(state.map(({ id, x, y, hidden, dir }) => ({ id, x, y, hidden, dir })));
      setHot(now < hotUntil ? hotField : -1);
      setBusy(now < busyUntil);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, inView]);

  return (
    <div className="diagram sheet" ref={wrapRef}>
      <div className="diagram__bar">
        <span>
          <Typed text="Fig. 01 — one record, end to end" speed={22} startDelay={500} caret={false} />
        </span>
        <span className="diagram__live">
          <span className="diagram__pulse" />
          {reduced ? "static" : "live"}
        </span>
      </div>

      <div className="diagram__body paper">
        <svg
          ref={svgRef}
          className="flow__svg"
          viewBox={`0 0 ${V.w} ${V.h}`}
          role="img"
          aria-label="Records moving from an ERP through a sync service into a CRM, with the matching fields highlighted below."
        >
          <Defs id="hero" />

          {/* construction lines: the drafting underlay, not decoration */}
          <g className="dash march">
            <path d={`M84 8 V48`} />
            <path d={`M496 8 V48`} />
            <path d={`M290 140 V186`} />
            <path d="M8 130 H572" opacity="0.5" />
          </g>
          <text className="mono-label" x="8" y="20">
            source
          </text>
          <text className="mono-label" x="572" y="20" textAnchor="end">
            destination
          </text>
          <text className="mono-label" x="290" y="198" textAnchor="middle">
            built and owned by you
          </text>

          {/* the routes */}
          <g color="var(--flow)">
            <path id="p-in" d={P_IN} fill="none" stroke="var(--flow)" strokeWidth="1.3" opacity="0.5" />
            <path id="p-out" d={P_OUT} fill="none" stroke="var(--flow)" strokeWidth="1.3" opacity="0.5" markerEnd="url(#hero-arrow)" />
            <path id="p-back" d={P_BACK} fill="none" stroke="var(--node)" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.45" className="march--rev" markerEnd="url(#hero-arrow)" />
          </g>

          {NODES.map((n) => (
            <DNode key={n.id} node={n} />
          ))}

          {/* the service pulses while it's holding a record */}
          <rect
            x="232"
            y="56"
            width="116"
            height="48"
            rx="4"
            fill="var(--flow)"
            opacity={busy ? 0.1 : 0}
            style={{ transition: "opacity .18s" }}
          />

          {!reduced &&
            packets.map((p) =>
              p.hidden ? null : (
                <g key={p.id}>
                  <circle cx={p.x} cy={p.y} r="6.5" fill={p.dir === "back" ? "var(--node)" : "var(--flow)"} opacity="0.14" />
                  <circle cx={p.x} cy={p.y} r="3" fill={p.dir === "back" ? "var(--node)" : "var(--flow)"} />
                </g>
              )
            )}
        </svg>
      </div>

      <div className="flow__map">
        {FIELDS.map((f, i) => (
          <div key={f.from} className={`flow__row ${hot === i ? "is-hot" : ""}`}>
            <span>{f.from}</span>
            <svg className="flow__arrow" width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
              <path d="M0 5h12M8.5 1.5 12 5 8.5 8.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <span>{f.to}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
