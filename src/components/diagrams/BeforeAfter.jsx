import { useInView } from "../../hooks/useMotion.js";
import { Check, Cross, ArrowRight } from "../Icons.jsx";

// Sells the outcome rather than the technology: the manual workflow on the
// left, the same work automated on the right. The steps stagger in as the
// section arrives — which is the only animation here, because the comparison
// does the work, not the motion.

const BEFORE = [
  "Export three reports",
  "Clean in Excel",
  "Paste into the CRM",
  "Find the mismatch",
  "Apologise to a customer",
];

const AFTER = ["A record changes", "It's in both systems"];

export default function BeforeAfter() {
  const [ref, inView] = useInView({ threshold: 0.25 });

  return (
    <div className={`ba ${inView ? "is-in" : ""}`} ref={ref}>
      <div className="ba__panel ba__panel--before">
        <span className="ba__title">
          <Cross width="13" height="13" /> Today
        </span>
        <div className="ba__lane">
          {BEFORE.map((s, i) => (
            <span key={s} className="ba__step" style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="ba__tick">{String(i + 1).padStart(2, "0")}</span>
              {s}
            </span>
          ))}
        </div>
        <p className="ba__cost">
          <strong>11 hours a week</strong> — plus the quote that went out against stock
          somebody else had already committed.
        </p>
      </div>

      <div className="ba__join" aria-hidden="true">
        <ArrowRight width="22" height="22" />
      </div>

      <div className="ba__panel ba__panel--after">
        <span className="ba__title">
          <Check width="13" height="13" /> After
        </span>
        <div className="ba__lane">
          {AFTER.map((s, i) => (
            <span key={s} className="ba__step" style={{ transitionDelay: `${500 + i * 120}ms` }}>
              <span className="ba__tick">
                <Check width="12" height="12" />
              </span>
              {s}
            </span>
          ))}
        </div>
        <p className="ba__cost">
          <strong>Fifteen minutes, unattended</strong> — and when it can't, a person is
          told which record and why.
        </p>
      </div>
    </div>
  );
}
