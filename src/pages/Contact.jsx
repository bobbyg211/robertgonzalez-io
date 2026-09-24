import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { services, rush, getService } from "../content/services.js";
import { systems, getSystem } from "../content/systems.js";
import Reveal from "../components/Reveal.jsx";
import { ArrowRight, Check } from "../components/Icons.jsx";

// A qualifying form, not a single-line contact box. Fewer and better leads is
// the point: what they need, which systems, timeline, budget.
//
// Budget is asked as a range rather than a number. People will pick a band
// they'd be embarrassed to type, and a band is all that's needed to know
// whether there's a project here.

const TIMELINES = ["Exploring", "Next quarter", "In the next month", "Yesterday"];

// TODO[INVENTED]: bands need to match the real starting prices once those are set.
const BUDGETS = ["Under $5k", "$5k – $15k", "$15k – $40k", "$40k+", "Not sure yet"];

const ENDPOINT = null; // TODO[NEEDS ROBERT]: wire to Formspree / HubSpot form / an API route.

export default function Contact() {
  const [params] = useSearchParams();

  const preSystems = (params.get("systems") || "").split(",").filter((s) => getSystem(s));
  const preService = getService(params.get("service"))?.slug || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: preService,
    systems: preSystems,
    timeline: "",
    budget: "",
    rush: false,
    detail: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const toggleSystem = (id) =>
    setForm((f) => ({
      ...f,
      systems: f.systems.includes(id) ? f.systems.filter((s) => s !== id) : [...f.systems, id],
    }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!ENDPOINT) {
      // Nothing is wired yet, and pretending otherwise would lose a real lead.
      // Log it, show the honest state, and fall back to email.
      console.info("[contact] no endpoint configured. Payload:", form);
      setSent(true);
      return;
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSent(true);
    } catch (err) {
      setError("That didn't send. Email hello@robertgonzalez.io and I'll pick it up there.");
    }
  };

  if (sent) {
    return (
      <section className="page-head wrap wrap--narrow">
        <Reveal className="form__sent">
          <Check width="28" height="28" style={{ color: "var(--flow)" }} />
          <h2>Got it.</h2>
          <p className="muted" style={{ maxWidth: "42ch" }}>
            I read these myself and reply within a business day. If what you sent is
            scoped enough, the reply will have a number in it.
          </p>
          {!ENDPOINT && (
            <p className="annot" style={{ textTransform: "none" }}>
              TODO[NEEDS ROBERT]: no form endpoint is wired yet — this submission only
              reached the console.
            </p>
          )}
        </Reveal>
      </section>
    );
  }

  return (
    <>
      <section className="page-head wrap wrap--narrow">
        <p className="eyebrow">Start a project</p>
        <h1>Tell me what&rsquo;s broken.</h1>
        <p className="lede">
          Six questions. They exist so that my first reply can be useful rather than a
          request for the same information.
        </p>
      </section>

      <section className="section--tight wrap wrap--narrow" style={{ paddingBottom: 60 }}>
        <form className="form" onSubmit={submit}>
          <div className="split" style={{ gap: 18 }}>
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                className="input"
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="input"
                required
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              className="input"
              value={form.company}
              onChange={(e) => set("company", e.target.value)}
            />
          </div>

          <fieldset className="fieldset">
            <legend>What do you need?</legend>
            <div className="opt-row">
              {services.map((s) => (
                <label className="opt" key={s.slug}>
                  <input
                    type="radio"
                    name="service"
                    checked={form.service === s.slug}
                    onChange={() => set("service", s.slug)}
                  />
                  <span>{s.name}</span>
                </label>
              ))}
              <label className="opt">
                <input
                  type="radio"
                  name="service"
                  checked={form.service === "unsure"}
                  onChange={() => set("service", "unsure")}
                />
                <span>Not sure yet</span>
              </label>
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <legend>Which systems are involved?</legend>
            <p className="field__hint">Pick any that apply.</p>
            <div className="opt-row">
              {systems.map((s) => (
                <label className="opt" key={s.id}>
                  <input
                    type="checkbox"
                    checked={form.systems.includes(s.id)}
                    onChange={() => toggleSystem(s.id)}
                  />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <legend>Timeline</legend>
            <div className="opt-row">
              {TIMELINES.map((t) => (
                <label className="opt" key={t}>
                  <input
                    type="radio"
                    name="timeline"
                    checked={form.timeline === t}
                    onChange={() => set("timeline", t)}
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <legend>Budget range</legend>
            <p className="field__hint">
              A band, not a number. It tells me whether to scope this as a phase or a
              project.
            </p>
            <div className="opt-row">
              {BUDGETS.map((b) => (
                <label className="opt" key={b}>
                  <input
                    type="radio"
                    name="budget"
                    checked={form.budget === b}
                    onChange={() => set("budget", b)}
                  />
                  <span>{b}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor="detail">What&rsquo;s happening today?</label>
            <p className="field__hint">
              Who does the work by hand, how often, and what goes wrong when it&rsquo;s
              missed. That paragraph is worth more than a feature list.
            </p>
            <textarea
              id="detail"
              className="textarea"
              value={form.detail}
              onChange={(e) => set("detail", e.target.value)}
            />
          </div>

          {/* Rush lives inside the inquiry flow, is never a published turnaround,
              and is only real once the work is scoped. */}
          <details className="form__rush">
            <summary>{rush.summary}</summary>
            <p>{rush.body}</p>
            <label className="opt" style={{ display: "inline-block", marginTop: 14 }}>
              <input
                type="checkbox"
                checked={form.rush}
                onChange={(e) => set("rush", e.target.checked)}
              />
              <span>There&rsquo;s a date this has to hit</span>
            </label>
          </details>

          {error && <p className="form__err">{error}</p>}

          <div className="btn-row">
            <button type="submit" className="btn btn--primary">
              Send it <ArrowRight />
            </button>
            <span className="annot" style={{ textTransform: "none" }}>
              I reply within a business day
            </span>
          </div>
        </form>
      </section>
    </>
  );
}
