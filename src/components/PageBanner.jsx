import Marks from "./Marks.jsx";
import Typed from "./Typed.jsx";

// Every page opens on a band of the drafting sheet: the grid at full strength,
// registration marks on the content column, and a dimension line along the top
// carrying the sheet number. It's the same grid as before — just no longer
// hiding at 4% behind everything else.
export default function PageBanner({ sheet, label, children, className = "" }) {
  return (
    <section className={`banner wrap sheet ${className}`.trim()}>
      <span className="banner__field" aria-hidden="true" />
      <Marks />

      <div className="banner__dim" aria-hidden="true">
        <span className="banner__rule banner__rule--start reveal is-in draw-x" />
        <span className="banner__sheet">
          <Typed text={`sheet ${sheet} — ${label}`} caret={false} />
        </span>
        <span className="banner__rule reveal is-in draw-x draw-x--slow" />
      </div>

      {children}
    </section>
  );
}
