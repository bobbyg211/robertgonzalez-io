import { useEffect, useState } from "react";
import { useInView, useReducedMotion } from "../hooks/useMotion.js";

// Types a short string out when it scrolls into view. Deliberately limited to
// mono, annotation-scale text — sheet numbers, figure captions, a status line.
// Never a heading: a headline that types itself withholds the one thing a
// visitor came for, and on a slow connection it withholds it for longer.
//
// The full string is always in the DOM for assistive tech; only the visible
// slice animates.
export default function Typed({ text, speed = 34, startDelay = 250, caret = true, className = "" }) {
  const [ref, inView] = useInView({ threshold: 0.6 });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(text.length);
      return;
    }

    let i = 0;
    let timer;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) clearInterval(timer);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [inView, reduced, text, speed, startDelay]);

  const done = n >= text.length;

  return (
    <span ref={ref} className={`typed ${className}`.trim()}>
      <span aria-hidden="true">{text.slice(0, n)}</span>
      <span className="sr-only">{text}</span>
      {caret && !done && !reduced && <span className="typed__caret" aria-hidden="true" />}
    </span>
  );
}
