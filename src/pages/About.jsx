import { Link } from "react-router-dom";
import { aboutLong } from "../content/site.js";
import Reveal from "../components/Reveal.jsx";
import PageBanner from "../components/PageBanner.jsx";
import { ArrowRight } from "../components/Icons.jsx";

export default function About() {
  return (
    <>
      <PageBanner sheet="05" label="about">
        <p className="eyebrow">About</p>
        <h1>{aboutLong.heading}</h1>
      </PageBanner>

      <section className="section--tight wrap">
        <div className="split split--sidebar">
          <Reveal className="body-l" style={{ maxWidth: "62ch" }}>
            {aboutLong.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={90} className="sticky-side">
            <div className="about__photo paper--dots">
              {/* TODO[NEEDS ROBERT]: photograph. */}
              [ photo ]
            </div>
            <div className="card" style={{ padding: 22 }}>
              {aboutLong.facts.map((f) => (
                <div
                  key={f.k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 14,
                    padding: "9px 0",
                    borderBottom: "1px solid var(--line-2)",
                    fontSize: "0.9rem",
                  }}
                >
                  <span className="muted">{f.k}</span>
                  <span style={{ textAlign: "right" }}>{f.v}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section--tight wrap">
        <Reveal className="study__cta">
          <p>The fastest way to find out if this is worth doing is to describe it.</p>
          <Link to="/contact" className="btn btn--primary">
            Start a project <ArrowRight />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
