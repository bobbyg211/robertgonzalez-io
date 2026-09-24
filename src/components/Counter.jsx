import { useEffect, useState } from "react";
import { useInView, useReducedMotion } from "../hooks/useMotion.js";

// Counters only animate numbers that are real. Every value rendered here comes
// from content marked TODO[INVENTED] until Robert replaces it — the animation
// is what makes a number feel verified, so an invented one is worse than none.
export default function Counter({ value, suffix = "", prefix = "", duration = 1100, className = "" }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced || value === 0) {
      setShown(value);
      return;
    }

    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // Ease-out cubic: fast enough to feel confident, settled by the time the
      // eye gets to the label underneath it.
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toLocaleString()}
      {suffix}
    </span>
  );
}
