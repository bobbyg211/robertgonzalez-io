import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { caseStudies, otherClients } from "../content/caseStudies.js";
import { StudyCard } from "../components/Cards.jsx";
import Reveal from "../components/Reveal.jsx";
import PageBanner from "../components/PageBanner.jsx";
import { SheetRule } from "../components/SectionMarks.jsx";
import SectionField from "../components/SectionField.jsx";

// Integrations and software first, website builds below, everything else as a
// logo strip at the bottom. The order is the positioning.

const FILTERS = [
  { id: "all", label: "Everything" },
  { id: "integration", label: "Integrations" },
  { id: "app", label: "Custom apps" },
  { id: "website", label: "Websites" },
];

export default function Work() {
  const [params] = useSearchParams();
  const [filter, setFilter] = useState(params.get("filter") || "all");

  const shown = caseStudies.filter((s) => filter === "all" || s.kind === filter);
  const lead = shown.filter((s) => s.kind !== "website");
  const sites = shown.filter((s) => s.kind === "website");

  return (
    <>
      <PageBanner sheet="03" label="selected work">
        <p className="eyebrow">Case studies</p>
        <h1>The work, and what it changed.</h1>
        <p className="lede">
          Integration clients are described by industry and the systems involved rather
          than named. Everything here leads with the problem, not the stack.
        </p>
      </PageBanner>

      <section className="wrap section--tight">
        <div className="work-filters" role="group" aria-label="Filter case studies">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className="chip"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              <span className="chip__dot" />
              {f.label}
            </button>
          ))}
        </div>

        {lead.length > 0 && (
          <div className="card-grid">
            {lead.map((s) => (
              <Reveal key={s.slug}>
                <StudyCard study={s} />
              </Reveal>
            ))}
          </div>
        )}

        {sites.length > 0 && (
          <>
            <SheetRule label="plate 02 — website builds" cross />
            <div className="section__head" style={{ marginTop: 10 }}>
              <p className="eyebrow">Website builds</p>
              <h2>HubSpot CMS, where the build was the interesting part.</h2>
              <p>
                Three of twenty-odd, kept as full case studies because of what they do
                technically rather than how they look.
              </p>
            </div>
            <div className="card-grid">
              {sites.map((s) => (
                <Reveal key={s.slug}>
                  <StudyCard study={s} />
                </Reveal>
              ))}
            </div>
          </>
        )}

        {shown.length === 0 && <p className="muted">Nothing in that category yet.</p>}
      </section>

      <section className="section--tight wrap has-ground" style={{ paddingBottom: 40 }}>
        <SectionField kind="cross" />
        <p className="eyebrow">And the rest</p>
        <h3 style={{ maxWidth: "20ch" }}>Websites built for 20+ organisations.</h3>
        {/* TODO[NEEDS ROBERT]: replace these descriptors with the real client list,
            or with logos if the agency relationships allow it. */}
        <div className="logo-wall">
          {otherClients.map((c) => (
            <span className="logo-chip" key={c}>
              {c}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
