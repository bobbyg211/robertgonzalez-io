import { Link } from "react-router-dom";
import { ArrowRight } from "../components/Icons.jsx";
import PageBanner from "../components/PageBanner.jsx";
import Typed from "../components/Typed.jsx";

export default function NotFound() {
  return (
    <PageBanner sheet="——" label="no such sheet" className="notfound">
      <p className="eyebrow">
        <Typed text="404" caret={false} speed={90} />
      </p>
      <h1>No route to this page.</h1>
      <p className="lede" style={{ maxWidth: "40ch" }}>
        Which is at least a failure that tells you what went wrong, rather than one that
        fails quietly.
      </p>
      <Link to="/" className="btn btn--primary">
        Back to the start <ArrowRight />
      </Link>
    </PageBanner>
  );
}
