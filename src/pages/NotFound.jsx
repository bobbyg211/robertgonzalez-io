import { Link } from "react-router-dom";
import { ArrowRight } from "../components/Icons.jsx";

export default function NotFound() {
  return (
    <div className="wrap notfound">
      <p className="eyebrow">404</p>
      <h1>No route to this page.</h1>
      <p className="lede" style={{ maxWidth: "40ch" }}>
        Which is at least a failure that tells you what went wrong, rather than one that
        fails quietly.
      </p>
      <Link to="/" className="btn btn--primary">
        Back to the start <ArrowRight />
      </Link>
    </div>
  );
}
