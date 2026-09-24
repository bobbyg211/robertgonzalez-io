import { useRef } from "react";
import ClientLogo from "./ClientLogo.jsx";
import { useReducedMotion } from "../hooks/useMotion.js";

// The clients without a case study. A marquee because the list is long and
// flat — nothing in it ranks above anything else, so a grid just makes a wall
// to scan, while a moving strip reads as "and these too".
//
// Two identical runs sit side by side and the track translates by exactly half
// its width, so the loop has no seam. It pauses on hover and on keyboard focus.
// With reduced motion it stops being a marquee at all and becomes a plain
// wrapping list, which is also what it is for anyone using a screen reader.
export default function LogoMarquee({ clients, speed = 62 }) {
  const reduced = useReducedMotion();
  const trackRef = useRef(null);

  if (reduced) {
    return (
      <ul className="marquee__static">
        {clients.map((c) => (
          <li key={c.name}>
            <ClientLogo name={c.name} industry={c.industry} size="sm" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="marquee" tabIndex={0} aria-label="Other clients">
      <div
        className="marquee__track"
        ref={trackRef}
        style={{ animationDuration: `${speed}s` }}
      >
        {[0, 1].map((run) => (
          <ul className="marquee__run" key={run} aria-hidden={run === 1}>
            {clients.map((c) => (
              <li key={c.name}>
                <ClientLogo name={c.name} industry={c.industry} size="sm" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
