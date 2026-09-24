import { Link } from "react-router-dom";
import { hero, proofStats, systemsWorkedIn, aboutShort } from "../content/site.js";
import { services } from "../content/services.js";
import { featuredStudies } from "../content/caseStudies.js";
import { getTestimonial } from "../content/testimonials.js";
import { ServiceCard, StudyCard } from "../components/Cards.jsx";
import Quote from "../components/Quote.jsx";
import Counter from "../components/Counter.jsx";
import Reveal from "../components/Reveal.jsx";
import Marks from "../components/Marks.jsx";
import PageBanner from "../components/PageBanner.jsx";
import Typed from "../components/Typed.jsx";
import { SheetRule, Plate } from "../components/SectionMarks.jsx";
import CodeSpecimen from "../components/CodeSpecimen.jsx";
import HeroFlow from "../components/diagrams/HeroFlow.jsx";
import BeforeAfter from "../components/diagrams/BeforeAfter.jsx";
import SystemPicker from "../components/diagrams/SystemPicker.jsx";
import { ArrowRight } from "../components/Icons.jsx";

export default function Home() {
  const clientQuote = getTestimonial("client-freelance");

  return (
    <>
      <PageBanner sheet="01" label="integration engineering" className="hero">
        <div className="hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">Integrations · Custom software</p>
            <h1>
              {hero.headline[0]}
              <br />
              <em>{hero.headline[1]}</em>
            </h1>
            <p className="lede">{hero.lede}</p>
            <div className="btn-row">
              <Link to={hero.primary.to} className="btn btn--primary">
                {hero.primary.label} <ArrowRight />
              </Link>
              <Link to={hero.secondary.to} className="btn btn--ghost">
                {hero.secondary.label}
              </Link>
            </div>
            {hero.note && (
              <p className="hero__note">
                <span className="nav__dot" aria-hidden="true" />
                <Typed text={hero.note} speed={26} startDelay={900} />
              </p>
            )}
          </div>

          <div className="sheet">
            <Marks />
            <HeroFlow />
          </div>
        </div>
      </PageBanner>

      <section className="wrap section--tight">
        <div className="proof">
          <div className="proof__stats">
            {proofStats.map((s) => (
              <span className="stat" key={s.label}>
                <span className="stat__value">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <span className="stat__label">{s.label}</span>
              </span>
            ))}
          </div>
          <div className="proof__logos">
            {systemsWorkedIn.slice(0, 6).map((s) => (
              <span className="logo-chip" key={s}>
                {s}
              </span>
            ))}
            <span className="logo-chip" style={{ borderStyle: "dashed" }}>
              +{systemsWorkedIn.length - 6} more
            </span>
          </div>
        </div>
      </section>

      <div className="wrap">
        <SheetRule label="fig. 03 — the cost of doing it by hand" cross />
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="section__head">
            <Plate no="01" label="the problem" />
            <h2>Somebody&rsquo;s whole Tuesday is moving records by hand.</h2>
            <p>
              And the hours aren&rsquo;t even the expensive part — it&rsquo;s the order that
              shipped to the old address, and the quote built on stock that was already
              promised to someone else.
            </p>
          </Reveal>
          <Reveal>
            <BeforeAfter />
          </Reveal>
          <p className="figcap">
            <b>Fig. 03</b> The same work, before and after. Typical of a distribution
            client&rsquo;s morning export.
          </p>
        </div>
      </section>

      <div className="wrap">
        <SheetRule label="what I do" align="left" quiet />
      </div>

      <section className="section wrap" style={{ paddingTop: 12 }}>
        <Reveal className="section__head">
          <Plate no="02" label="services" />
          <h2>Four ways to work together.</h2>
          <p>
            Most projects start with a Blueprint, because a fixed price is only honest if
            somebody has looked at the data first.
          </p>
        </Reveal>
        <div className="card-grid card-grid--4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 70}>
              <ServiceCard service={s} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--tinted">
        <div className="wrap">
          <Reveal className="section__head">
            <p className="eyebrow">Try it</p>
            <h2>What would connecting your systems actually look like?</h2>
            <p>Pick the two that should be talking to each other.</p>
          </Reveal>
          <Reveal>
            <SystemPicker />
          </Reveal>
        </div>
      </section>

      <section className="section--tight wrap">
        <div className="split" style={{ alignItems: "center" }}>
          <Reveal>
            <p className="eyebrow">Under it</p>
            <h3 style={{ maxWidth: "20ch" }}>
              Which system owns a field is a business decision. So it lives somewhere you
              can read it.
            </h3>
            <p className="muted" style={{ marginTop: 14, fontSize: "0.96rem" }}>
              Not buried in a function somewhere. You don&rsquo;t have to read this — but
              the person who maintains it after me does.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <CodeSpecimen name="fieldMap" figure="Fig. 04" />
          </Reveal>
        </div>
      </section>

      <div className="wrap">
        <SheetRule label="fig. 05 — selected plates" cross />
      </div>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <Reveal className="section__head">
          <p className="eyebrow">Selected work</p>
          <h2>Case studies.</h2>
          <p>
            Integration and software work first. Clients are described by industry and
            system rather than named.
          </p>
        </Reveal>

        <div className="card-grid">
          {featuredStudies.slice(0, 2).map((s) => (
            <Reveal key={s.slug}>
              <StudyCard study={s} />
            </Reveal>
          ))}
        </div>

        <Reveal className="btn-row" style={{ marginTop: 26 }}>
          <Link to="/work" className="btn btn--ghost">
            All case studies <ArrowRight />
          </Link>
        </Reveal>
      </section>

      {clientQuote && (
        <section className="section--tight wrap">
          <Reveal style={{ maxWidth: 760 }}>
            <Quote quote={clientQuote} />
          </Reveal>
        </section>
      )}

      <section className="section wrap">
        <div className="split split--sidebar">
          <Reveal>
            <p className="eyebrow">About</p>
            <h2>{aboutShort.heading}</h2>
            <div style={{ marginTop: 18 }}>
              {aboutShort.body.map((p) => (
                <p key={p.slice(0, 24)} className="body-l">
                  {p}
                </p>
              ))}
            </div>
            <Link to="/about" className="btn btn--plain" style={{ marginTop: 10 }}>
              More about how I work <ArrowRight />
            </Link>
          </Reveal>
          <Reveal delay={90}>
            <div className="about__photo paper--dots">
              {/* TODO[NEEDS ROBERT]: photograph. Brief calls for a short about block with photo. */}
              [ photo ]
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section--tight wrap" style={{ paddingBottom: 20 }}>
        <Reveal className="study__cta">
          <p>Got two systems that should be talking to each other?</p>
          <Link to="/contact" className="btn btn--primary">
            Start a project <ArrowRight />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
