import { useInView } from "../hooks/useMotion.js";
import { getSpecimen } from "../content/code.js";
import Typed from "./Typed.jsx";
import Marks from "./Marks.jsx";

// Highlighting is a single pass over a small TS-ish grammar. A real highlighter
// is 40kB to make a dozen lines on a marketing site look right, which is the
// wrong trade — and every specimen here is hand-written, so the grammar only
// has to cover what's actually in them.
const TOKEN =
  /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(export|const|let|return|await|async|import|from|type|new|if|else|function)\b|\b(\d+(?:\.\d+)?)\b|([A-Za-z_$][\w$]*)(?=\s*\()|([A-Za-z_$][\w$]*)(?=\s*:)/g;

const CLASS = ["t-com", "t-str", "t-kw", "t-num", "t-fn", "t-key"];

function tokenize(line) {
  const out = [];
  let last = 0;
  let m;

  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(line)) !== null) {
    if (m.index > last) out.push({ c: "t-p", v: line.slice(last, m.index) });
    const which = m.slice(1).findIndex((g) => g !== undefined);
    out.push({ c: CLASS[which], v: m[which + 1] });
    last = m.index + m[0].length;
  }

  if (last < line.length) out.push({ c: "t-p", v: line.slice(last) });
  return out;
}

export default function CodeSpecimen({ name, figure }) {
  const specimen = getSpecimen(name);
  const [ref, inView] = useInView({ threshold: 0.15 });

  if (!specimen) return null;
  const lines = specimen.code.split("\n");

  return (
    <div className={`diagram sheet ${inView ? "is-in" : ""}`} ref={ref}>
      <Marks />
      <div className="diagram__bar">
        <span>{figure ? `${figure} — ` : ""}{specimen.file}</span>
        <span className="diagram__live" style={{ color: "var(--muted)" }}>
          {lines.length} lines
        </span>
      </div>

      <pre className="code">
        <code>
          {lines.map((line, i) => (
            <span
              className="code__line"
              key={i}
              // Lines settle in sequence rather than all at once. It reads as
              // a file being written, and it's cheap — one transition-delay.
              style={{ transitionDelay: `${Math.min(i * 45, 700)}ms` }}
            >
              <span className="code__no">{i + 1}</span>
              <span>
                {tokenize(line).map((t, j) => (
                  <span className={t.c} key={j}>
                    {t.v}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </code>
      </pre>

      <div className="code__foot">
        <Typed text={specimen.caption} speed={18} startDelay={600} caret={false} />
      </div>
    </div>
  );
}
