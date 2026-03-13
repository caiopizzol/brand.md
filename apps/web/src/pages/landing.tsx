import { useApp } from "../app";

export function Landing() {
  const { goTo } = useApp();

  return (
    <div
      className="landing"
      style={{ display: "flex", flexDirection: "column", width: "100%" }}
    >
      <nav className="nav">
        <div className="nav-logo">
          <strong>dot</strong>brand
        </div>
        <div className="nav-right">
          <button
            type="button"
            className="nav-link"
            onClick={() => {
              document
                .querySelector(".how-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            How it works
          </button>
          <button
            type="button"
            className="nav-link"
            onClick={() => {
              document
                .querySelector(".pricing-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Pricing
          </button>
          <button
            type="button"
            className="nav-cta"
            onClick={() => goTo("flow")}
          >
            Start
          </button>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-eyebrow">.brand</div>
        <h1>
          Your brand,
          <br />
          in <em>one file.</em>
        </h1>
        <p className="hero-sub">
          Answer a few questions. Our agents research your market. You get a{" "}
          <code>.brand</code> file every AI tool can read.
        </p>
        <div className="hero-actions">
          <button
            type="button"
            className="hero-btn"
            onClick={() => goTo("flow")}
          >
            Start
          </button>
          <button
            type="button"
            className="hero-link"
            onClick={() => goTo("output")}
          >
            See an example
          </button>
        </div>
      </div>

      <div className="how-section">
        <div className="how-label">How it works</div>
        <div className="how-grid">
          <div className="how-step">
            <div className="how-num">01</div>
            <div className="how-title">Tell us what you're building</div>
            <div className="how-desc">
              Name, description, who it's for, and why it matters to you. Two
              minutes.
            </div>
            <div className="how-time">2 minutes</div>
          </div>
          <div className="how-step">
            <div className="how-num">02</div>
            <div className="how-title">We research your market</div>
            <div className="how-desc">
              Our agents find competitors, map positioning, and surface the gap
              your brand can own.
            </div>
            <div className="how-time">30 seconds</div>
          </div>
          <div className="how-step">
            <div className="how-num">03</div>
            <div className="how-title">React, refine, export</div>
            <div className="how-desc">
              Adjust our suggestions, add your taste, and download your{" "}
              <code>.brand</code> file.
            </div>
            <div className="how-time">3 minutes</div>
          </div>
        </div>
      </div>

      <div className="output-section">
        <div className="section-label">The output</div>
        <div className="section-title">
          Not a PDF. A <code>.brand</code> file.
        </div>
        <div className="section-sub">
          Drop it in your project. Every AI tool stays on-brand.
        </div>
        <div className="terminal-card">
          <div className="terminal-header">
            <span className="td r" />
            <span className="td y" />
            <span className="td g" />
            <span className="terminal-filename">.brand</span>
          </div>
          <div className="terminal-body">
            <div className="c">---</div>
            <div>
              <span className="k">brand:</span>{" "}
              <span className="s">FitParent</span>
            </div>
            <div>
              <span className="k">version:</span> 1.0
            </div>
            <div>
              <span className="k">generated:</span>{" "}
              <span className="s">dotbrand</span>
            </div>
            <div className="c">---</div>
            <br />
            <div className="h"># Brand Platform</div>
            <br />
            <div className="h">## Market Thesis</div>
            <div>The fitness industry is designed for two people:</div>
            <div>the one with unlimited time, and the one who</div>
            <div>hates their body. Everyone else is an afterthought.</div>
            <br />
            <div className="h">## Tone of Voice</div>
            <div>
              <span className="k">attributes:</span>{" "}
              <span className="s">
                [warm, direct, grounded, anti-aspirational]
              </span>
            </div>
            <div>
              <span className="k">never:</span>{" "}
              <span className="s">[guilt-based, aggressive, jargon-heavy]</span>
            </div>
            <br />
            <div className="h">## Agent Instructions</div>
            <div>When writing for FitParent, sound like a</div>
            <div>knowledgeable friend. Never a drill sergeant.</div>
          </div>
        </div>
      </div>

      <div className="pricing-section">
        <div className="section-label">Pricing</div>
        <div className="section-title">One brand, one price.</div>
        <div className="section-sub">
          No subscriptions. Own the file forever.
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-name">Preview</div>
            <div className="pricing-price">Free</div>
            <div className="pricing-per">See your strategy before paying</div>
            <ul className="pricing-features">
              <li>Market research</li>
              <li>Positioning draft</li>
              <li>3 section previews</li>
            </ul>
            <button
              type="button"
              className="pricing-btn"
              onClick={() => goTo("flow")}
            >
              Start free
            </button>
          </div>
          <div className="pricing-card featured">
            <div className="pricing-name">Full .brand file</div>
            <div className="pricing-price">$79</div>
            <div className="pricing-per">per brand</div>
            <ul className="pricing-features">
              <li>All 9 strategy sections</li>
              <li>Verbal identity and tone</li>
              <li>Visual direction</li>
              <li>Unlimited regenerations</li>
              <li>Export: .brand, .md, agent skill</li>
            </ul>
            <button
              type="button"
              className="pricing-btn"
              onClick={() => goTo("flow")}
            >
              Build your brand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
