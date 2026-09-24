import { Link, useParams, Navigate } from "react-router-dom";
import { getStudy, caseStudies } from "../content/caseStudies.js";
import { getService } from "../content/services.js";
import { StudyCard } from "../components/Cards.jsx";
import Counter from "../components/Counter.jsx";
import Reveal from "../components/Reveal.jsx";
import Architecture from "../components/diagrams/Architecture.jsx";
import CodeSpecimen from "../components/CodeSpecimen.jsx";
import PageBanner from "../components/PageBanner.jsx";
import { ArrowRight } from "../components/Icons.jsx";
import ClientLogo from "../components/ClientLogo.jsx";

// Six blocks, same every time: header, the problem, what I built, results,
// stack, CTA. Lead with the problem, never the stack.

export default function CaseStudy() {
  const { slug } = useParams();
  const study = getStudy(slug);

  if (!study) return <Navigate to="/work" replace />;

  const service = getService(study.serviceSlug);
  const related = caseStudies.filter((s) => s.slug !== slug && s.kind === study.kind).slice(0, 2);

  return (
    <article className="study">
      {/* 01 — header */}
      <PageBanner sheet="04" label={study.kind === "website" ? "website build" : "case study"}>
        <p className="eyebrow">{study.serviceLabel}</p>
        <h1 style={{ maxWidth: "20ch" }}>{study.title}</h1>
        <p className="lede" style={{ marginTop: 18, maxWidth: "52ch" }}>
          {study.summary}
        </p>
        <div className="study__client">
          <ClientLogo
            name={study.clientName}
            industry={study.client}
            redacted={!study.clientName}
            size="lg"
          />
        </div>

        <div className="study__meta">
          {study.systems.map((s) => (
            <span className="tag" key={s}>
              {s}
            </span>
          ))}
          {study.role && <span className="tag tag--flow">Role, not ownership</span>}
        </div>
      </PageBanner>

      <div className="wrap">

      {/* 02 — the problem */}
      <section className="study__block">
        <h2>The problem</h2>
        <div className="study__prose body-l">
          {study.problem.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      {/* 03 — what I built: plain first, architecture underneath */}
      <section className="study__block">
        <h2>What I built</h2>
        <div className="study__prose body-l" style={{ marginBottom: 34 }}>
          {study.built.plain.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <Architecture architecture={study.architecture} figure={study.fig} id={slug} />

        <div className="study__prose" style={{ marginTop: 38 }}>
          <p className="eyebrow">How it works</p>
          {study.built.technical.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        {study.code && (
          <div style={{ marginTop: 30, maxWidth: 640 }}>
            <CodeSpecimen name={study.code} figure="Fig. 03" />
          </div>
        )}
      </section>

      {/* 04 — results */}
      <section className="study__block">
        <h2>Results</h2>
        <Reveal className="study__results">
          {study.results.map((r) => (
            <span className="stat" key={r.label}>
              <span className="stat__value">
                <Counter value={r.value} suffix={r.suffix} />
              </span>
              <span className="stat__label">{r.label}</span>
              {r.note && (
                <span className="stat__label" style={{ color: "var(--faint)", fontSize: "0.74rem" }}>
                  {r.note}
                </span>
              )}
            </span>
          ))}
        </Reveal>
      </section>

      {/* 05 — stack */}
      <section className="study__block">
        <p className="eyebrow">Stack</p>
        <div className="tag-row">
          {study.stack.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* 06 — CTA to the matching service */}
      {service && (
        <section className="study__block">
          <div className="study__cta">
            <p>
              This was {service.name}. Same problem in your business?
            </p>
            <Link to={`/services/${service.slug}`} className="btn btn--primary">
              {service.name} <ArrowRight />
            </Link>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="study__block">
          <p className="eyebrow">More like this</p>
          <div className="card-grid" style={{ marginTop: 6 }}>
            {related.map((s) => (
              <StudyCard key={s.slug} study={s} />
            ))}
          </div>
        </section>
      )}
      </div>
    </article>
  );
}
