import { Link, useParams, Navigate } from "react-router-dom";
import { getService, services, rush } from "../content/services.js";
import { getStudy } from "../content/caseStudies.js";
import { getTestimonial, quoteForService } from "../content/testimonials.js";
import { StudyCard } from "../components/Cards.jsx";
import Quote from "../components/Quote.jsx";
import Reveal from "../components/Reveal.jsx";
import Disclosure from "../components/Disclosure.jsx";
import BlueprintPreview from "../components/diagrams/BlueprintPreview.jsx";
import CodeSpecimen from "../components/CodeSpecimen.jsx";
import PageBanner from "../components/PageBanner.jsx";
import { Plate } from "../components/SectionMarks.jsx";
import SectionField from "../components/SectionField.jsx";
import { ArrowRight, Check } from "../components/Icons.jsx";

// Same skeleton on all four: the problem, what's delivered, the process, a
// relevant case study, starting price, CTA. These are the pages that rank and
// the pages sent straight to a prospect, so each one has to stand alone.

export default function Service() {
  const { slug } = useParams();
  const service = getService(slug);

  if (!service) return <Navigate to="/" replace />;

  const study = getStudy(service.caseStudy);
  const quote = getTestimonial(quoteForService[slug]);
  const nextService = getService(service.next?.slug);
  const isBlueprint = slug === "integration-blueprint";
  const pair = getService(service.pairsWith);
  // Whatever this service pairs with leads the row; the rest keep their order.
  const others = services
    .filter((s) => s.slug !== slug)
    .sort((a, b) => (a.slug === service.pairsWith ? -1 : b.slug === service.pairsWith ? 1 : 0));

  // Code appears on two of the four service pages. Sprinkled, not standard —
  // a specimen on every page stops being an aside and becomes the argument.
  const specimen = { "integration-blueprint": "fieldMap", "system-integrations": "retry" }[slug];
  const specimenNote = {
    "integration-blueprint": "The field specification, as the thing it becomes.",
    "system-integrations": "What \u201cerror handling\u201d actually means.",
  }[slug];

  return (
    <>
      <PageBanner sheet="02" label={service.name.toLowerCase()}>
        <p className="eyebrow">{service.kicker}</p>
        <h1>{service.name}</h1>
        <p className="lede">{service.lede}</p>
        <div className="btn-row" style={{ marginTop: 26 }}>
          <Link to={`/contact?service=${service.slug}`} className="btn btn--primary">
            Start a project <ArrowRight />
          </Link>
          <span className="annot" style={{ textTransform: "none" }}>
            {service.price} · {service.priceNote}
          </span>
        </div>
      </PageBanner>

      <section className="section has-ground">
        <SectionField kind="projection" side="left" fade="y" />
        <div className="wrap split">
          <Reveal>
            <Plate no="01" label="the problem" />
            <h2>{service.problem.heading}</h2>
          </Reveal>
          <Reveal delay={80} className="body-l">
            {service.problem.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {isBlueprint && (
        <section className="section wrap">
          <Reveal className="section__head">
            <p className="eyebrow">What it looks like</p>
            <h2>An actual Blueprint, anonymised.</h2>
            <p>
              Nobody buys a document they&rsquo;ve never seen. Here are four pages from a real
              one, with the client redacted.
            </p>
          </Reveal>
          <Reveal>
            <BlueprintPreview />
          </Reveal>
          <p className="figcap">
            <b>Fig. 04</b> Statement of work, entity relationships, field specification,
            failure handling. Swipe or use the arrows.
          </p>
        </section>
      )}

      {specimen && (
        <section className="section--tight wrap">
          <div className="split" style={{ alignItems: "center" }}>
            <Reveal>
              <p className="eyebrow">For the technical reader</p>
              <h3>{specimenNote}</h3>
              <p className="muted" style={{ marginTop: 12, fontSize: "0.96rem" }}>
                Skip this if it isn&rsquo;t your job. Nothing above depends on it.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <CodeSpecimen name={specimen} />
            </Reveal>
          </div>
        </section>
      )}

      <section className="section wrap has-ground">
        <SectionField kind="cross" />
        <div className="split split--sidebar">
          <div>
            <Reveal className="section__head">
              <Plate no="02" label="what you get" />
              <h2>Delivered every time.</h2>
            </Reveal>
            <div className="deliverables">
              {service.deliverables.map((d, i) => (
                <Reveal key={d.title} delay={i * 50} className="deliverable">
                  <h4>{d.title}</h4>
                  <p>{d.body}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120} className="sticky-side">
            <div className="price-box">
              <span className="annot" style={{ marginBottom: 4 }}>
                Starting price
              </span>
              <span className="price-box__value">{service.price}</span>
              <span className="price-box__note">{service.priceNote}</span>
            </div>

            <ul className="checks">
              {service.outcomes.map((o) => (
                <li key={o}>
                  <Check width="15" height="15" />
                  {o}
                </li>
              ))}
            </ul>

            {pair && (
              <Link to={`/services/${pair.slug}`} className="pair-card">
                <span className="annot" style={{ marginBottom: 10 }}>
                  Usually the same project
                </span>
                <span className="pair-card__name">
                  {pair.name} <ArrowRight />
                </span>
                <span className="pair-card__note">{pair.card}</span>
              </Link>
            )}
          </Reveal>
        </div>

        {quote && (
          <Reveal
            style={{
              maxWidth: 720,
              marginInline: "auto",
              marginTop: "clamp(34px, 5vw, 58px)",
            }}
          >
            <Quote quote={quote} card />
          </Reveal>
        )}
      </section>

      <section className="section section--tinted">
        <div className="wrap split">
          <Reveal>
            <Plate no="03" label="process" />
            <h2>The process.</h2>
            <p className="muted" style={{ marginTop: 14 }}>
              No surprises in the middle. You know what happens next at every point,
              including what I need from you.
            </p>
          </Reveal>
          <Reveal delay={80} className="steps">
            {service.process.map((p) => (
              <div className="step" key={p.title}>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.body}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {study && (
        <section className="section wrap has-ground section--framed">
          <SectionField
            kind="frame"
            fade="none"
            title="Fig. 06 — Finished example"
            label="worked example"
          />
          <Reveal className="section__head">
            <Plate no="04" label="relevant work" />
            <h2>What this looks like finished.</h2>
          </Reveal>
          <Reveal style={{ maxWidth: 560 }}>
            <StudyCard study={study} />
          </Reveal>
        </section>
      )}

      <section className="section--tight wrap">
        <Reveal className="study__cta">
          <p>
            {isBlueprint
              ? "Not sure whether this is an integration or a rebuild? That's exactly what the Blueprint answers."
              : `Want to talk about ${service.name.toLowerCase()}?`}
          </p>
          <div className="btn-row">
            <Link to={`/contact?service=${service.slug}`} className="btn btn--primary">
              Start a project <ArrowRight />
            </Link>
            {nextService && (
              <Link to={`/services/${nextService.slug}`} className="btn btn--ghost">
                {service.next.label}
              </Link>
            )}
          </div>

          <Disclosure summary={rush.summary} className="disc--rush disc--spaced">
            <p>{rush.body}</p>
          </Disclosure>
        </Reveal>
      </section>

      <section className="section--tight wrap">
        <p className="eyebrow">Other services</p>
        <div className="card-grid" style={{ marginTop: 6 }}>
          {others.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="card service-card">
                <h3>{s.name}</h3>
                <p>{s.card}</p>
                <span className="service-card__foot">
                  <span className="service-card__price">{s.price}</span>
                </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
