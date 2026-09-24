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
  // ---- second round. Bracket was closest, so most of these push on it:
  // the engineer's glyph, but carrying movement rather than sitting still.
  {
    id: "bracketflow",
    name: "Bracket flow",
    why: "The bracket with a record travelling through it. Says engineer and integration in one shape, and the arrow breaking the brackets is what stops it reading as a generic code icon.",
    draw: (w) => (
      <>
        <path d="M12 5H5.5v22H12M20 5h6.5v22H20" stroke="currentColor" strokeWidth={w} />
        <path d="M9 16h14M19.5 12.5 23 16l-3.5 3.5" stroke="var(--flow)" strokeWidth={w} />
      </>
    ),
  },
  {
    id: "branch",
    name: "Branch",
    why: "One record in, two systems out, with the split marked. The clearest picture of a sync there is, and it survives small because it's three strokes.",
    draw: (w) => (
      <>
        <path d="M4 16h9" stroke="currentColor" strokeWidth={w} />
        <path d="M13 16c5 0 4-7 9-7h6M13 16c5 0 4 7 9 7h6" stroke="currentColor" strokeWidth={w} />
        <circle cx="13" cy="16" r={w > 2.4 ? 3.8 : 3.2} fill="var(--flow)" />
      </>
    ),
  },
  {
    id: "block",
    name: "Block",
    why: "A block-diagram element: two inputs, one output. Lifted straight from the architecture drawings on the case study pages, so it inherits their meaning.",
    draw: (w) => (
      <>
        <rect x="9.5" y="9.5" width="13" height="13" rx="2.2" stroke="currentColor" strokeWidth={w} />
        <path d="M3.5 13.5h6M3.5 18.5h6" stroke="currentColor" strokeWidth={w} />
        <path d="M22.5 16h6" stroke="var(--flow)" strokeWidth={w + 0.5} />
      </>
    ),
  },
  {
    id: "interlock",
    name: "Interlock",
    why: "Two corners overlapping into a shared square. Nothing in it is literal, which is its advantage — it can outlive a change in what you sell.",
    draw: (w) => (
      <>
        <path d="M5 16V5h11" stroke="currentColor" strokeWidth={w} />
        <path d="M27 16v11H16" stroke="var(--flow)" strokeWidth={w} />
        <path d="M16 5h11v11M16 27H5V16" stroke="currentColor" strokeWidth={w} opacity="0.25" />
      </>
    ),
  },
  {
    id: "crossover",
    name: "Crossover",
    why: "Two lines trading places — data going both ways at once. The most movement of anything here, and the least like a stock icon.",
    draw: (w) => (
      <>
        <path d="M4 10.5h8l8 11h8" stroke="currentColor" strokeWidth={w} />
        <path d="M4 21.5h8l8-11h8" stroke="var(--flow)" strokeWidth={w} />
      </>
    ),
  },
  {
    id: "record",
    name: "Record",
    why: "A record with one field lit — the hero's field map reduced to three strokes. The quietest option, and the one that works best as a repeating device rather than a logo.",
    draw: (w) => (
      <>
        <path d="M6 10h20" stroke="currentColor" strokeWidth={w + 0.4} />
        <path d="M6 16h13" stroke="var(--flow)" strokeWidth={w + 0.4} />
        <path d="M6 22h20" stroke="currentColor" strokeWidth={w + 0.4} opacity="0.4" />
      </>
    ),
  },
  {
    id: "keystone",
    name: "Keystone",
    why: "Two posts and the piece that joins them. Reads as infrastructure rather than as software, which may be exactly right for operations buyers.",
    draw: (w) => (
      <>
        <path d="M6 27V13M26 27V13" stroke="currentColor" strokeWidth={w} />
        <path d="M6 13a10 10 0 0 1 20 0" stroke="var(--flow)" strokeWidth={w} />
        <path d="M16 5v6" stroke="currentColor" strokeWidth={w} opacity="0.35" />
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
