import { useInView } from "../hooks/useMotion.js";

// Content is in the DOM and readable from the first paint; this only adds the
// entrance. Nothing here is allowed to gate whether text exists.
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
