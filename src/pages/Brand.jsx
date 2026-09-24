import PageBanner from "../components/PageBanner.jsx";
import SectionField from "../components/SectionField.jsx";
import Reveal from "../components/Reveal.jsx";
import { Plate } from "../components/SectionMarks.jsx";

// Working page for choosing a mark. Delete this file, its route and its
// footer link once one is picked — it's a decision aid, not part of the site.

// Each mark draws into a 32-unit box and takes its stroke weight as an
// argument, because a hairline that reads at 96px disappears at 16.
const MARKS = [
  {
    id: "link",
    name: "Link",
    why: "Two systems, one connection. The most literal statement of the primary service, and the only mark here a buyer could describe back to you.",
    draw: (w) => (
      <>
        <rect x="2.6" y="10.6" width="10.8" height="10.8" rx="2.4" stroke="currentColor" strokeWidth={w} />
        <rect x="18.6" y="10.6" width="10.8" height="10.8" rx="2.4" stroke="currentColor" strokeWidth={w} />
        <path d="M13.4 16h5.2" stroke="var(--flow)" strokeWidth={w + 0.7} />
      </>
    ),
  },
  {
    id: "sync",
    name: "Sync",
    why: "Two directions, squared off rather than circular so it reads as data rather than as a refresh icon. Risk: it lives next door to a very common glyph.",
    draw: (w) => (
      <>
        <path d="M5 12.5h19M19.5 8l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth={w} />
        <path d="M27 21.5H8M12.5 17 8 21.5l4.5 4.5" stroke="var(--flow)" strokeWidth={w} />
      </>
    ),
  },
  {
    id: "plate",
    name: "Plate",
    why: "The registration corners that frame every drawing on the site, around the live dot. The only candidate that comes straight out of the existing language.",
    draw: (w) => (
      <>
        <path d="M4 11V4h7M21 4h7v7M28 21v7h-7M11 28H4v-7" stroke="currentColor" strokeWidth={w} />
        <circle cx="16" cy="16" r={w > 2.4 ? 5.4 : 4.6} fill="var(--flow)" />
      </>
    ),
  },
  {
    id: "fieldmap",
    name: "Field map",
    why: "Two fields, one mapped onto the other — the row that lights up in the hero, abstracted. Most specific to what you actually do; least legible small.",
    draw: (w) => (
      <>
        <path d="M4 8.5h10M18 23.5h10" stroke="currentColor" strokeWidth={w + 0.4} />
        <path d="M14.5 9.5 22 22.5" stroke="var(--flow)" strokeWidth={w + 0.2} />
      </>
    ),
  },
  {
    id: "bracket",
    name: "Bracket",
    why: "Code brackets holding a record. The one that says engineer fastest, and the one most likely to read as generic developer.",
    draw: (w) => (
      <>
        <path d="M12 5H5.5v22H12M20 5h6.5v22H20" stroke="currentColor" strokeWidth={w} />
        <circle cx="16" cy="16" r={w > 2.4 ? 5 : 4.4} fill="var(--flow)" />
      </>
    ),
  },
  {
    id: "rg",
    name: "RG",
    why: "Your initials as a node pair — R and G sharing a stem, the counter of the G left open as the connection. A monogram ages better than a concept.",
    draw: (w) => (
      <>
        <path d="M5 27V6h6.5a5 5 0 0 1 0 10H5m6.8 0L16 27" stroke="currentColor" strokeWidth={w} />
        <path d="M27 12.5a6.2 6.2 0 1 0 0 8V16h-4" stroke="var(--flow)" strokeWidth={w} />
      </>
    ),
  },
];

function Mark({ mark, size }) {
  const w = size <= 16 ? 3 : size <= 24 ? 2.6 : 2.2;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={`${mark.name} mark at ${size} pixels`}
    >
      {mark.draw(w)}
    </svg>
  );
}

export default function Brand() {
  return (
    <>
      <PageBanner sheet="07" label="brand">
        <p className="eyebrow">Brand</p>
        <h1>Six marks.</h1>
        <p className="lede">
          Each one at 96, 32 and 16 pixels, as a favicon on ink, and locked up with the
          wordmark. The 16px column is the one that decides it — anything that dies there is
          out, however good it looks large.
        </p>
      </PageBanner>

      <section className="section wrap has-ground">
        <SectionField kind="cross" />

        {MARKS.map((m, i) => (
          <Reveal key={m.id} className="mark-row">
            <div className="mark-row__head">
              <Plate no={String(i + 1).padStart(2, "0")} label={m.name} />
              <p className="mark-row__why">{m.why}</p>
            </div>

            <div className="mark-row__body">
              <div className="mark-sizes">
                {[96, 32, 16].map((size) => (
                  <span className="mark-size" key={size}>
                    <Mark mark={m} size={size} />
                    <span>{size}</span>
                  </span>
                ))}
              </div>

              <div className="mark-ink">
                <span className="mark-fav">
                  <Mark mark={m} size={20} />
                </span>
                <span className="mark-lock">
                  <Mark mark={m} size={22} />
                  <b>Robert Gonzalez</b>
                </span>
              </div>

              <span className="mark-lock">
                <Mark mark={m} size={22} />
                <b>Robert Gonzalez</b>
              </span>
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}
