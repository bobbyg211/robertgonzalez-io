// Placeholder logo lockups. There are no real logo files yet, and a row of
// broken images or grey rectangles would say nothing — so each client gets a
// generated mark drawn in the same hairline language as everything else,
// paired with its name set in the display face.
//
// The mark is deterministic from the name, so a client always looks the same
// wherever it appears. Swapping in real artwork means replacing the <Mark>
// with an <img> and nothing else.
//
// `redacted` is the treatment for a client who can't be named: the plate
// stays, the identity doesn't. That's the anonymisation policy made visible
// rather than a gap in the page.

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const MARKS = [
  // circle struck through
  <g key="0">
    <circle cx="14" cy="14" r="9" />
    <path d="M5 14h18" />
  </g>,
  // diamond in a square
  <g key="1">
    <rect x="5" y="5" width="18" height="18" />
    <path d="M14 8l6 6-6 6-6-6z" />
  </g>,
  // two arcs meeting
  <g key="2">
    <path d="M14 5a9 9 0 0 0 0 18" />
    <path d="M14 5a9 9 0 0 1 0 18" />
    <path d="M14 5v18" />
  </g>,
  // stacked rules
  <g key="3">
    <path d="M5 9h18M5 14h12M5 19h18" />
  </g>,
  // triangle over a baseline
  <g key="4">
    <path d="M14 6l8 13H6z" />
    <path d="M4 22h20" />
  </g>,
  // crosshair in a circle
  <g key="5">
    <circle cx="14" cy="14" r="9" />
    <path d="M14 3v22M3 14h22" />
  </g>,
  // nested squares
  <g key="6">
    <rect x="4" y="4" width="20" height="20" />
    <rect x="10" y="10" width="8" height="8" />
  </g>,
  // hexagon
  <g key="7">
    <path d="M14 4l8.5 5v10L14 24l-8.5-5V9z" />
  </g>,
];

function Mark({ seed }) {
  return (
    <svg
      className="clogo__mark"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {MARKS[seed % MARKS.length]}
    </svg>
  );
}

export default function ClientLogo({ name, industry, redacted = false, size = "md" }) {
  if (redacted) {
    return (
      <span className={`clogo clogo--${size} clogo--redacted`}>
        <svg
          className="clogo__mark"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          aria-hidden="true"
        >
          <rect x="4" y="4" width="20" height="20" strokeDasharray="3 3" />
          <path d="M8 18L18 8" />
        </svg>
        <span className="clogo__text">
          <span className="clogo__name">{industry || "Client withheld"}</span>
          <span className="clogo__sub">Named on request</span>
        </span>
      </span>
    );
  }

  return (
    <span className={`clogo clogo--${size}`}>
      <Mark seed={hash(name)} />
      <span className="clogo__text">
        <span className="clogo__name">{name}</span>
        {industry && <span className="clogo__sub">{industry}</span>}
      </span>
    </span>
  );
}
