import { Link } from "react-router-dom";
import { services, rush } from "../content/services.js";
import { ServiceCard } from "../components/Cards.jsx";
import PageBanner from "../components/PageBanner.jsx";
import SectionField from "../components/SectionField.jsx";
import Reveal from "../components/Reveal.jsx";
import Disclosure from "../components/Disclosure.jsx";
import { Plate } from "../components/SectionMarks.jsx";
import { ArrowRight } from "../components/Icons.jsx";

// The index that was missing. "Services" in the nav went straight to one
// service page, which left the other three findable only from the footer.

// The fastest way to route someone is to let them recognise their own
// sentence, rather than read four descriptions and work it out.
const CHOOSER = [
  {
    says: "“These two systems should be talking and they aren't.”",
    slug: "system-integrations",
  },
  {
    says: "“The tool we need doesn't exist, so it's a spreadsheet.”",
    slug: "custom-web-apps",
  },
  {
    says: "“I don't know what this should cost yet.”",
    slug: "integration-blueprint",
  },
  {
    says: "“We need a site on HubSpot that marketing can actually use.”",
    slug: "hubspot-websites",
  },
];

export default function Services() {
  const primary = services.filter((s) => s.primary);
  const secondary = services.filter((s) => !s.primary);
  const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

  return (
    <>
      <PageBanner sheet="02" label="services">
        <p className="eyebrow">Services</p>
        <h1>Two things I build, and two ways in.</h1>
        <p className="lede">
          Most engagements are an integration, a custom application, or both — and more
          often than not they&rsquo;re the same project. Everything is quoted as a fixed
          price, from a scope somebody has actually looked at.
        </p>
      </PageBanner>

      <section className="section wrap has-ground">
        <SectionField kind="cross" />

        <div className="card-grid">
          {primary.map((s, i) => (
            <Reveal key={s.slug} delay={i * 70}>
              <ServiceCard service={s} index={services.indexOf(s)} featured />
            </Reveal>
          ))}
        </div>

        <div className="srule" aria-hidden="true">
          <span className="srule__label srule__label--quiet">also</span>
          <span className="srule__line srule__line--tick-end draw-x is-in" />
        </div>

        <div className="card-grid">
          {secondary.map((s, i) => (
            <Reveal key={s.slug} delay={i * 70}>
              <ServiceCard service={s} index={services.indexOf(s)} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--tinted">
        <div className="wrap split">
          <Reveal>
            <Plate no="01" label="which one" />
            <h2>Find the sentence you&rsquo;d say.</h2>
            <p className="muted" style={{ marginTop: 14 }}>
              If none of them fits, the Blueprint exists precisely for that — it&rsquo;s
              the one that answers what you need before anyone quotes it.
            </p>
          </Reveal>

          <Reveal delay={80} className="chooser">
            {CHOOSER.map((c) => (
              <Link key={c.slug} to={`/services/${c.slug}`} className="chooser__row">
                <span className="chooser__says">{c.says}</span>
                <span className="chooser__to">
                  {bySlug[c.slug].name} <ArrowRight />
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section--tight wrap">
        <Reveal className="study__cta">
          <p>Not sure which of these you need? That&rsquo;s a normal place to start.</p>
          <Link to="/contact" className="btn btn--primary">
            Start a project <ArrowRight />
          </Link>
        </Reveal>

        <Disclosure summary={rush.summary} className="disc--rush disc--spaced">
          <p>{rush.body}</p>
        </Disclosure>
      </section>
    </>
  );
}
