// Shared SVG vocabulary for every diagram on the site. One node shape, one
// edge shape, one set of arrowheads — so a hero animation and a case study
// architecture read as pages from the same drawing set.

export function Defs({ id = "d" }) {
  return (
    <defs>
      <marker
        id={`${id}-arrow`}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M0 1 L9 5 L0 9" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </marker>
      <marker
        id={`${id}-tick`}
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="8"
        markerHeight="8"
        orient="auto"
      >
        <path d="M5 1 V9" stroke="currentColor" strokeWidth="1.2" />
      </marker>
    </defs>
  );
}

const stroke = {
  system: "var(--ink)",
  service: "var(--flow)",
  store: "var(--node)",
};

// Corner ticks: the short right-angle marks that say "this was drawn, not
// dropped in". Four L-shapes just inside each corner of the box.
function Corners({ x, y, w, h, color }) {
  const t = 7;
  const c = [
    `M${x} ${y + t} V${y} H${x + t}`,
    `M${x + w - t} ${y} H${x + w} V${y + t}`,
    `M${x + w} ${y + h - t} V${y + h} H${x + w - t}`,
    `M${x + t} ${y + h} H${x} V${y + h - t}`,
  ];
  return (
    <g stroke={color} strokeWidth="1.4" fill="none" opacity="0.9">
      {c.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
  );
}

export function DNode({ node, dim = false }) {
  const { x, y, w, h, label, sub, kind = "system" } = node;
  const color = stroke[kind] || stroke.system;

  return (
    <g opacity={dim ? 0.28 : 1} style={{ transition: "opacity .45s" }}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="4"
        fill="var(--surface)"
        stroke={color}
        strokeWidth="1.1"
        strokeDasharray={kind === "store" ? "5 3" : undefined}
        opacity={kind === "system" ? 0.85 : 1}
      />
      <Corners x={x} y={y} w={w} h={h} color={color} />
      <text className="flow__node-label" x={x + 14} y={y + h / 2 - 1}>
        {label}
      </text>
      {sub && (
        <text className="flow__node-sub" x={x + 14} y={y + h / 2 + 15}>
          {sub}
        </text>
      )}
    </g>
  );
}

const edgeStyle = {
  auto: { stroke: "var(--flow)", strokeWidth: 1.4, strokeDasharray: undefined, opacity: 1 },
  manual: { stroke: "var(--manual)", strokeWidth: 1.3, strokeDasharray: "2 5", opacity: 0.95 },
  warn: { stroke: "var(--manual)", strokeWidth: 1.3, strokeDasharray: "6 4", opacity: 0.95 },
  dotted: { stroke: "var(--construct)", strokeWidth: 1.2, strokeDasharray: "2 4", opacity: 1 },
};

export function DEdge({ edge, defsId = "d", dim = false }) {
  const s = edgeStyle[edge.kind] || edgeStyle.auto;

  return (
    <g opacity={dim ? 0.18 : 1} style={{ transition: "opacity .45s" }} color={s.stroke}>
      <path
        d={edge.d}
        fill="none"
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeDasharray={s.strokeDasharray}
        strokeLinecap="round"
        markerEnd={`url(#${defsId}-arrow)`}
      />
      {edge.label && <EdgeLabel d={edge.d} text={edge.label} color={s.stroke} />}
    </g>
  );
}

// Label sits on the midpoint of the path with a paper-coloured knockout
// behind it, the way a dimension label interrupts its own line.
function EdgeLabel({ d, text, color }) {
  const mid = midpointOf(d);
  if (!mid) return null;
  const width = text.length * 5.1 + 12;

  return (
    <g>
      <rect
        x={mid.x - width / 2}
        y={mid.y - 8}
        width={width}
        height={16}
        rx="3"
        fill="var(--surface)"
      />
      <text
        x={mid.x}
        y={mid.y + 3.5}
        textAnchor="middle"
        className="mono-label"
        style={{ fill: color, opacity: 0.85 }}
      >
        {text}
      </text>
    </g>
  );
}

// Cheap midpoint: average the path's explicit coordinate pairs. Every path in
// the content uses absolute M/L/H/V commands, so this is exact enough for a
// label and avoids measuring the DOM.
function midpointOf(d) {
  const nums = d.match(/-?\d+(\.\d+)?/g);
  if (!nums || nums.length < 4) return null;
  const pts = [];
  for (let i = 0; i + 1 < nums.length; i += 2) {
    pts.push({ x: +nums[i], y: +nums[i + 1] });
  }
  const a = pts[Math.floor((pts.length - 1) / 2)];
  const b = pts[Math.ceil((pts.length - 1) / 2)];
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}
