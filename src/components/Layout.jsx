import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { site, navLinks } from "../content/site.js";
import { services } from "../content/services.js";
import { ArrowRight, Menu, Cross, Chevron } from "./Icons.jsx";

function Nav() {
  const [open, setOpen] = useState(false);
  // The sheet is two levels: the top level, and the services submenu. Listing
  // all four services at the top level buried Work and About below the fold.
  const [view, setView] = useState("root");
  const [stuck, setStuck] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Reset to the top level once the sheet has closed, not while it's closing.
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => setView("root"), 200);
    return () => clearTimeout(t);
  }, [open]);

  // The page behind a full-height sheet shouldn't scroll under it.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`nav ${stuck ? "nav--stuck" : ""}`}>
        <div className="nav__inner">
          <Link to="/" className="nav__brand">
            <span className="nav__dot" aria-hidden="true" />
            Robert Gonzalez
          </Link>

          <nav className="nav__links" aria-label="Main">
            {navLinks.map((l) =>
              l.to === "/services" ? (
                // Services keeps its own page and gains a menu, because the
                // four of them were otherwise reachable only from the footer.
                <span className="nav__group" key={l.to}>
                  <NavLink to={l.to} className="nav__link">
                    {l.label}
                  </NavLink>
                  <span className="nav__menu">
                    {services.map((svc) => (
                      <Link key={svc.slug} to={`/services/${svc.slug}`} className="nav__menu-item">
                        <span className="nav__menu-name">{svc.name}</span>
                        <span className="nav__menu-note">{svc.kicker}</span>
                      </Link>
                    ))}
                    <Link to="/services" className="nav__menu-all">
                      All services <ArrowRight />
                    </Link>
                  </span>
                </span>
              ) : (
                <NavLink key={l.to} to={l.to} className="nav__link">
                  {l.label}
                </NavLink>
              )
            )}
          </nav>

          {/* Desktop only. On a phone this crushed the wordmark into two
              lines and duplicated what the sheet already offers. */}
          <Link to="/contact" className="btn btn--primary nav__cta">
            Start a project
          </Link>

          <button
            className="nav__toggle"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="nav-sheet"
          >
            {open ? <Cross /> : <Menu />}
            Menu
          </button>
        </div>
      </header>

      {open && (
        <div className="nav__sheet" id="nav-sheet">
          {view === "root" ? (
            <>
              <button
                type="button"
                className="nav__row nav__row--parent"
                onClick={() => setView("services")}
                aria-expanded={false}
              >
                Services
                <Chevron />
              </button>
              <Link to="/work" className="nav__row">
                Work
              </Link>
              <Link to="/about" className="nav__row">
                About
              </Link>
              <Link to="/contact" className="btn btn--primary btn--block nav__sheet-cta">
                Start a project <ArrowRight />
              </Link>
            </>
          ) : (
            <>
              <button type="button" className="nav__back" onClick={() => setView("root")}>
                <Chevron className="nav__back-arrow" />
                Services
              </button>
              {services.map((svc) => (
                <Link key={svc.slug} to={`/services/${svc.slug}`} className="nav__row">
                  {svc.name}
                  <span className="nav__row-note">{svc.kicker}</span>
                </Link>
              ))}
              <Link to="/services" className="btn btn--ghost btn--block nav__sheet-cta">
                All services <ArrowRight />
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__col">
            <p style={{ fontFamily: "var(--display)", fontSize: "1.15rem", fontWeight: 600, letterSpacing: "-0.02em", maxWidth: "24ch" }}>
              I connect the systems your business runs on.
            </p>
            <Link to="/contact" className="btn btn--plain" style={{ marginTop: 14 }}>
              Start a project <ArrowRight />
            </Link>
          </div>

          <div className="footer__col">
            <h4>Services</h4>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Work</h4>
            <ul>
              <li>
                <Link to="/work">All case studies</Link>
              </li>
              <li>
                <Link to="/work?filter=integration">Integrations</Link>
              </li>
              <li>
                <Link to="/work?filter=app">Custom apps</Link>
              </li>
              <li>
                <Link to="/work?filter=website">Websites</Link>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Elsewhere</h4>
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={site.linkedin}>LinkedIn</a>
              </li>
              <li>
                <a href={site.github}>GitHub</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="annot" style={{ textTransform: "none" }}>
            Built and drawn by hand
          </span>
        </div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

export default function Layout({ children }) {
  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
