// Line icons drawn to match the diagrams: 1.4px stroke, square-ish joins,
// nothing filled. They should look like they came off the same drawing.
const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const ArrowRight = (p) => (
  <svg {...base} {...p}>
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
  </svg>
);

export const ArrowUpRight = (p) => (
  <svg {...base} {...p}>
    <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
  </svg>
);

export const Check = (p) => (
  <svg {...base} {...p}>
    <path d="M3 8.5 6.5 12 13 4.5" />
  </svg>
);

export const Cross = (p) => (
  <svg {...base} {...p}>
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);

export const Chevron = (p) => (
  <svg {...base} {...p}>
    <path d="M6 3.5 10.5 8 6 12.5" />
  </svg>
);

export const Menu = (p) => (
  <svg {...base} {...p}>
    <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
  </svg>
);

export const Spark = (p) => (
  <svg {...base} {...p}>
    <path d="M8 2v3M8 11v3M2 8h3M11 8h3M4 4l2 2M12 12l-2-2M12 4l-2 2M4 12l2-2" />
  </svg>
);
