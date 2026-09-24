import { useEffect, useState, useRef } from "react";

// Single source of truth for whether this visitor wants motion. Every animated
// component asks this rather than relying on the CSS override alone — the CSS
// can neuter a transition, but it can't stop a requestAnimationFrame loop.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

// Fires once when the element reaches the viewport. `once` is the default
// because re-animating on the way back up is noise, not delight.
export function useInView({ threshold = 0.2, rootMargin = "0px 0px -8% 0px", once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}

// Which of a set of elements is currently the reader's focus. Drives the
// scroll-built architecture diagram: the active step decides which layers
// are drawn, without pinning the page or hijacking the scroll.
export function useActiveIndex(count, { offset = 0.42 } = {}) {
  const refs = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * offset;
      let next = 0;
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) next = i;
      });
      setActive(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count, offset]);

  const setRef = (i) => (el) => {
    refs.current[i] = el;
  };

  return [active, setRef];
}
