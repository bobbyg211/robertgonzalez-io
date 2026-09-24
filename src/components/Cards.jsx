import { Link } from "react-router-dom";
import { ArrowUpRight } from "./Icons.jsx";
import Counter from "./Counter.jsx";
import ClientLogo from "./ClientLogo.jsx";

export function ServiceCard({ service, index }) {
  return (
    <Link to={`/services/${service.slug}`} className="card service-card">
      <span className="service-card__index">{String(index + 1).padStart(2, "0")}</span>
      <ArrowUpRight className="service-card__arrow" />
      <h3>{service.name}</h3>
      <p>{service.card}</p>
      <span className="service-card__foot">
        <span className="service-card__price">{service.price}</span>
        <span className="muted">{service.kicker}</span>
      </span>
    </Link>
  );
}

export function StudyCard({ study, visual }) {
  const headline = [study.client, study.systems.join(" · "), study.serviceLabel].filter(Boolean);

  return (
    <Link to={`/work/${study.slug}`} className="card study-card">
      {visual && <div className="study-card__visual">{visual}</div>}
      <div className="study-card__body">
        <ClientLogo
          name={study.clientName}
          industry={study.client}
          redacted={!study.clientName}
          size="sm"
        />
        <span className="study-card__meta">{headline.slice(1).join(" — ")}</span>
        <h3>{study.title}</h3>
        <p>{study.summary}</p>
        <span className="study-card__results">
          {study.results.slice(0, 2).map((r) => (
            <span className="stat stat--sm" key={r.label}>
              <span className="stat__value">
                <Counter value={r.value} suffix={r.suffix} />
              </span>
              <span className="stat__label">{r.label}</span>
            </span>
          ))}
        </span>
      </div>
    </Link>
  );
}
