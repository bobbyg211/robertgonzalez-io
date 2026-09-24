// Registration marks — the crosses a printer aligns a plate to. They frame a
// diagram as a drawing on a sheet rather than a box on a page.
function Cross({ className }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1" opacity="0.55" />
    </svg>
  );
}

export default function Marks() {
  return (
    <span className="marks" aria-hidden="true">
      <Cross className="marks__tl" />
      <Cross className="marks__tr" />
      <Cross className="marks__bl" />
      <Cross className="marks__br" />
    </span>
  );
}
