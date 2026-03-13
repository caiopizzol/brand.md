import type { ModuleId } from "shared";
import { useApp } from "../app";

const NAV_GROUPS = [
  {
    label: "Strategy",
    items: [
      { id: "tese" as ModuleId, num: "01", name: "Market Thesis" },
      { id: "proposito" as ModuleId, num: "02", name: "Purpose & Vision" },
      { id: "cultura" as ModuleId, num: "03", name: "Cultural Principles" },
      { id: "filosofia" as ModuleId, num: "04", name: "Philosophy" },
      { id: "manifesto" as ModuleId, num: "05", name: "Manifesto" },
    ],
  },
  {
    label: "Verbal Identity",
    items: [
      { id: "tom" as ModuleId, num: "06", name: "Tone of Voice" },
      { id: "vocab" as ModuleId, num: "07", name: "Vocabulary" },
      { id: "frases" as ModuleId, num: "08", name: "Phrase System" },
    ],
  },
  {
    label: "Visual",
    items: [{ id: "visual" as ModuleId, num: "09", name: "Visual Direction" }],
  },
];

export function Output() {
  const { goTo, activeModule, setActiveModule } = useApp();

  return (
    <div className="output-screen">
      <div className="out-topbar">
        <div className="out-topbar-left">
          <div className="out-brand">
            <strong>Fit</strong>Parent
          </div>
          <div className="out-tabs">
            <button type="button" className="out-tab active">
              Document
            </button>
            <button type="button" className="out-tab">
              .brand
            </button>
            <button type="button" className="out-tab">
              Agent Skill
            </button>
          </div>
        </div>
        <div className="out-topbar-right">
          <button
            type="button"
            className="out-btn"
            onClick={() => goTo("flow")}
          >
            Refine
          </button>
          <button type="button" className="out-btn">
            Copy .brand
          </button>
          <button type="button" className="out-btn primary">
            Download .brand
          </button>
        </div>
      </div>

      <div className="out-body">
        <div className="out-sidebar">
          <div className="out-sidebar-inner">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="out-nav-group">
                <div className="out-nav-label">{group.label}</div>
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`out-nav-item${activeModule === item.id ? " active" : ""}`}
                    onClick={() => setActiveModule(item.id)}
                  >
                    <span className="ni-num">{item.num}</span> {item.name}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="out-sidebar-footer">
            <div className="out-sf-brand">FitParent</div>
            <div className="out-sf-cat">Fitness for busy parents</div>
            <div className="out-sf-bar">
              <div className="out-sf-fill" />
            </div>
          </div>
        </div>

        <div className="out-content">
          <div className="out-content-inner">
            {activeModule === "tese" && <ModTese />}
            {activeModule === "proposito" && <ModProposito />}
            {activeModule === "cultura" && <ModCultura />}
            {activeModule === "filosofia" && <ModFilosofia />}
            {activeModule === "manifesto" && <ModManifesto />}
            {activeModule === "tom" && <ModTom />}
            {activeModule === "vocab" && <ModVocab />}
            {activeModule === "frases" && <ModFrases />}
            {activeModule === "visual" && <ModVisual />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModTese() {
  return (
    <>
      <div className="m-tag">
        01 — Market Thesis{" "}
        <button type="button" className="m-regen">
          Regenerate
        </button>
      </div>
      <div className="m-title">
        The fitness industry forgot who's actually using it.
      </div>
      <div className="m-text">
        The $96 billion fitness industry is designed for two people: the person
        with unlimited time, and the person who hates their body. Everyone else
        — the millions of parents who just want to feel functional — is an
        afterthought.
      </div>
      <div className="m-quote">
        "Fitness became a performance. FitParent makes it a practice — something
        that fits inside a real life, not one you have to build around it."
      </div>
      <div className="m-subheader">Strategic Diagnosis</div>
      <div className="m-rows">
        <div className="m-row">
          <div className="m-row-label">Problem</div>
          <div>
            <div className="m-row-title">The Time Myth</div>
            <div className="m-row-body">
              Fitness content assumes an hour. Parents have 15 minutes. The gap
              isn't motivation — it's architecture.
            </div>
          </div>
        </div>
        <div className="m-row">
          <div className="m-row-label">Response</div>
          <div>
            <div className="m-row-title">Fitness as Infrastructure</div>
            <div className="m-row-body">
              Not a goal to achieve but a system to maintain. Like sleep, like
              meals — built into the rhythm.
            </div>
          </div>
        </div>
        <div className="m-row">
          <div className="m-row-label">Territory</div>
          <div>
            <div className="m-row-title">The Functional Parent</div>
            <div className="m-row-body">
              The only brand that treats parenthood as the context, not the
              obstacle.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ModProposito() {
  return (
    <>
      <div className="m-tag">
        02 — Purpose, Vision & Mission{" "}
        <button type="button" className="m-regen">
          Regenerate
        </button>
      </div>
      <div className="m-grid-3">
        <div className="m-card">
          <div className="m-card-label">Purpose</div>
          <div className="m-card-title">Why we exist</div>
          <div className="m-card-body">
            Staying healthy shouldn't require becoming a different person.
          </div>
        </div>
        <div className="m-card">
          <div className="m-card-label">Vision</div>
          <div className="m-card-title">Where we're going</div>
          <div className="m-card-body">
            A world where fitness is infrastructure, not aspiration.
          </div>
        </div>
        <div className="m-card">
          <div className="m-card-label">Mission</div>
          <div className="m-card-title">What we do daily</div>
          <div className="m-card-body">
            Short, effective movement designed around the real constraints of
            parenthood.
          </div>
        </div>
      </div>
      <div className="m-subheader">Promise & Personality</div>
      <div className="m-quote">
        "You'll feel capable, not guilty. Strong enough to carry everything you
        love."
      </div>
      <div className="m-pills">
        <span className="m-pill">Warm</span>
        <span className="m-pill">Direct</span>
        <span className="m-pill">Grounded</span>
        <span className="m-pill">Anti-guilt</span>
        <span className="m-pill">Functional</span>
        <span className="m-pill">Honest</span>
        <span className="m-pill">Realistic</span>
        <span className="m-pill">Calm</span>
      </div>
    </>
  );
}

function ModCultura() {
  return (
    <>
      <div className="m-tag">
        03 — Cultural Principles{" "}
        <button type="button" className="m-regen">
          Regenerate
        </button>
      </div>
      <div className="m-text">
        Non-negotiable principles that govern every decision, every piece of
        communication.
      </div>
      <div className="m-clause">
        <div className="m-clause-num">01</div>
        <div className="m-clause-title">Never make them feel behind.</div>
        <div className="m-clause-body">
          The fitness industry profits from inadequacy. We refuse. Every
          touchpoint should make someone feel seen, not judged.
        </div>
      </div>
      <div className="m-clause">
        <div className="m-clause-num">02</div>
        <div className="m-clause-title">Design for 15 minutes, not 60.</div>
        <div className="m-clause-body">
          We don't offer "modified" versions of long workouts. We build from the
          constraint. Fifteen minutes is the architecture.
        </div>
      </div>
      <div className="m-clause">
        <div className="m-clause-num">03</div>
        <div className="m-clause-title">
          Parenthood is the context, not the obstacle.
        </div>
        <div className="m-clause-body">
          We never position kids, schedules, or responsibilities as things
          "getting in the way." They are the reason.
        </div>
      </div>
      <div className="m-clause">
        <div className="m-clause-num">04</div>
        <div className="m-clause-title">Consistency beats intensity.</div>
        <div className="m-clause-body">
          Three 15-minute sessions beat one "beast mode" Sunday. Our metrics
          reflect this.
        </div>
      </div>
      <div className="m-clause">
        <div className="m-clause-num">05</div>
        <div className="m-clause-title">Respect their intelligence.</div>
        <div className="m-clause-body">
          No dumbing down, no condescending tips, no performativity. Speak to
          them like adults.
        </div>
      </div>
    </>
  );
}

function ModFilosofia() {
  return (
    <>
      <div className="m-tag">
        04 — Philosophy{" "}
        <button type="button" className="m-regen">
          Regenerate
        </button>
      </div>
      <div className="m-tagline">
        Fitness isn't a goal.
        <br />
        It's plumbing.
      </div>
      <div className="m-text" style={{ marginTop: 20 }}>
        Exercise should be invisible infrastructure — like running water. You
        don't aspire to have plumbing. You just need it to work.
      </div>
      <div className="m-subheader">Pillars</div>
      <div className="m-grid-2">
        <div className="m-card">
          <div className="m-card-label">01</div>
          <div className="m-card-title">Function</div>
          <div className="m-card-body">
            Movement exists to serve your life, not the other way around.
          </div>
        </div>
        <div className="m-card">
          <div className="m-card-label">02</div>
          <div className="m-card-title">Rhythm</div>
          <div className="m-card-body">
            Not discipline. Not willpower. Something you fall into naturally.
          </div>
        </div>
        <div className="m-card">
          <div className="m-card-label">03</div>
          <div className="m-card-title">Enough</div>
          <div className="m-card-body">
            Fifteen minutes is enough. Three days is enough. "Enough" is a
            radical position.
          </div>
        </div>
        <div className="m-card">
          <div className="m-card-label">04</div>
          <div className="m-card-title">Presence</div>
          <div className="m-card-body">
            The goal isn't a better body. It's more energy for the life you
            chose.
          </div>
        </div>
      </div>
    </>
  );
}

function ModManifesto() {
  return (
    <>
      <div className="m-tag">
        05 — Manifesto{" "}
        <button type="button" className="m-regen">
          Regenerate
        </button>
      </div>
      <div className="m-manifesto">
        You didn't stop caring about your body.
        <br />
        You started caring about everything else more.
        <br />
        <br />
        <em>That's not failure. That's parenthood.</em>
        <br />
        <br />
        You don't need another app that tells you
        <br />
        to wake up at 5am and "choose yourself."
        <br />
        You chose. You chose the 3am feeding.
        <br />
        The school run. The bedtime negotiations.
        <br />
        <br />
        What you need is something that fits
        <br />
        in the spaces between.
        <br />
        <br />
        <em>Fifteen minutes. No guilt. No transformation story.</em>
        <br />
        <br />
        Just movement that makes you feel
        <br />a little more like yourself.
        <br />
        <br />
        Strong enough to carry
        <br />
        everything you love.
      </div>
      <div className="m-tagline">Keep up with the life you built.</div>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 9,
          color: "var(--gray-500)",
          marginTop: 8,
        }}
      >
        Brand signature
      </div>
    </>
  );
}

function ModTom() {
  return (
    <>
      <div className="m-tag">
        06 — Tone of Voice{" "}
        <button type="button" className="m-regen">
          Regenerate
        </button>
      </div>
      <div className="m-text">
        Like a knowledgeable friend who gets it. Never a coach, never a guru,
        never an influencer.
      </div>
      <div className="m-tone-grid">
        <div className="m-tone-item">
          <div className="m-tone-word">Warm</div>
          <div className="m-tone-def">
            We acknowledge reality. We never shame. We meet people where they
            are.
          </div>
        </div>
        <div className="m-tone-item">
          <div className="m-tone-word">Direct</div>
          <div className="m-tone-def">
            No fluff. Parents don't have time for it. Respect their attention.
          </div>
        </div>
        <div className="m-tone-item">
          <div className="m-tone-word">Grounded</div>
          <div className="m-tone-def">
            Real bodies, real schedules. No aspirational imagery of 6am beach
            runs.
          </div>
        </div>
        <div className="m-tone-item">
          <div className="m-tone-word">Anti-guilt</div>
          <div className="m-tone-def">
            We never imply they're not doing enough. The subtext: you're already
            incredible.
          </div>
        </div>
      </div>
      <div className="m-subheader">In Practice</div>
      <div className="m-example">
        <div className="m-ex-label bad">Avoid</div>
        <div className="m-ex-text bad">
          "No excuses! Crush your workout before the kids wake up!"
        </div>
        <div className="m-ex-label good">Prefer</div>
        <div className="m-ex-text good">
          "15 minutes while the pasta boils. That counts."
        </div>
      </div>
      <div className="m-example">
        <div className="m-ex-label bad">Avoid</div>
        <div className="m-ex-text bad">
          "Get your pre-baby body back in 30 days!"
        </div>
        <div className="m-ex-label good">Prefer</div>
        <div className="m-ex-text good">
          "Your body carried a human. Now let's make sure it can carry a toddler
          up three flights."
        </div>
      </div>
      <div className="m-example">
        <div className="m-ex-label bad">Avoid</div>
        <div className="m-ex-text bad">
          "Join the tribe and transform your life!"
        </div>
        <div className="m-ex-label good">Prefer</div>
        <div className="m-ex-text good">
          "You don't need a new life. Just a little more energy for the one you
          have."
        </div>
      </div>
    </>
  );
}

function ModVocab() {
  return (
    <>
      <div className="m-tag">
        07 — Vocabulary{" "}
        <button type="button" className="m-regen">
          Regenerate
        </button>
      </div>
      <div className="m-text">
        Words that belong to the brand. They should appear consistently across
        every touchpoint.
      </div>
      <div className="m-pills">
        <span className="m-pill">practice</span>
        <span className="m-pill">routine</span>
        <span className="m-pill">functional</span>
        <span className="m-pill">sustainable</span>
        <span className="m-pill">rhythm</span>
        <span className="m-pill">energy</span>
        <span className="m-pill">capable</span>
        <span className="m-pill">real</span>
      </div>
      <div className="m-subheader">Never Use</div>
      <div className="m-pills">
        <span className="m-pill avoid">crush it</span>
        <span className="m-pill avoid">beast mode</span>
        <span className="m-pill avoid">no excuses</span>
        <span className="m-pill avoid">transformation</span>
        <span className="m-pill avoid">get your body back</span>
        <span className="m-pill avoid">cheat day</span>
      </div>
      <div className="m-subheader">Writing Rules</div>
      <div className="m-clause">
        <div className="m-clause-num">01</div>
        <div className="m-clause-title">Short sentences win.</div>
        <div className="m-clause-body">
          If it takes more than one breath to read, it's too long.
        </div>
      </div>
      <div className="m-clause">
        <div className="m-clause-num">02</div>
        <div className="m-clause-title">Periods over exclamation marks.</div>
        <div className="m-clause-body">
          Let the content carry the energy, not the punctuation.
        </div>
      </div>
      <div className="m-clause">
        <div className="m-clause-num">03</div>
        <div className="m-clause-title">
          Show the constraint, not the aspiration.
        </div>
        <div className="m-clause-body">
          "15 minutes while the baby naps" beats "imagine having more energy."
        </div>
      </div>
      <div className="m-clause">
        <div className="m-clause-num">04</div>
        <div className="m-clause-title">"You" over "we".</div>
        <div className="m-clause-body">
          Make the user the protagonist. Always.
        </div>
      </div>
    </>
  );
}

function ModFrases() {
  return (
    <>
      <div className="m-tag">
        08 — Phrase System{" "}
        <button type="button" className="m-regen">
          Regenerate
        </button>
      </div>
      <div className="m-subheader">Core Lines</div>
      <div className="m-line-row">
        <span className="m-line-lang">EN</span>
        <span className="m-line-text">Keep up with the life you built.</span>
      </div>
      <div className="m-line-row">
        <span className="m-line-lang">EN</span>
        <span className="m-line-text">Fifteen minutes. No guilt.</span>
      </div>
      <div className="m-line-row">
        <span className="m-line-lang">EN</span>
        <span className="m-line-text">Fitness that fits.</span>
      </div>
      <div className="m-line-row">
        <span className="m-line-lang">PT</span>
        <span className="m-line-text">
          Acompanhe a vida que voce construiu.
        </span>
      </div>
      <div className="m-line-row">
        <span className="m-line-lang">PT</span>
        <span className="m-line-text">Quinze minutos. Sem culpa.</span>
      </div>
      <div className="m-subheader">Cultural Lines</div>
      <div className="m-line-row">
        <span className="m-line-lang">EN</span>
        <span className="m-line-text">
          Your body carried a human. Give it 15 minutes.
        </span>
      </div>
      <div className="m-line-row">
        <span className="m-line-lang">EN</span>
        <span className="m-line-text">
          Strong enough to carry everything you love.
        </span>
      </div>
      <div className="m-line-row">
        <span className="m-line-lang">EN</span>
        <span className="m-line-text">
          Not a new you. A more functional you.
        </span>
      </div>
      <div className="m-subheader">Community Lines</div>
      <div className="m-line-row">
        <span className="m-line-lang">EN</span>
        <span className="m-line-text">
          You showed up. That's the whole thing.
        </span>
      </div>
      <div className="m-line-row">
        <span className="m-line-lang">EN</span>
        <span className="m-line-text">Three days this week. That's a win.</span>
      </div>
    </>
  );
}

function ModVisual() {
  return (
    <>
      <div className="m-tag">
        09 — Visual Direction{" "}
        <button type="button" className="m-regen">
          Regenerate
        </button>
      </div>
      <div className="m-text">
        Warm, real, grounded. No studio lighting, no sweat-dripping close-ups.
        Think editorial lifestyle — kitchens, parks, living room floors. Natural
        light. Real spaces.
      </div>
      <div className="m-grid-2">
        <div className="m-card">
          <div className="m-card-label">Logo</div>
          <div className="m-card-title">Clean wordmark</div>
          <div className="m-card-body">
            Sans-serif with generous spacing. Approachable, not athletic.
          </div>
        </div>
        <div className="m-card">
          <div className="m-card-label">Typography</div>
          <div className="m-card-title">Humanist sans-serif</div>
          <div className="m-card-body">
            Warmth — Inter, Instrument Sans. Paired with a serif for editorial
            moments.
          </div>
        </div>
        <div className="m-card">
          <div className="m-card-label">Photography</div>
          <div className="m-card-title">Real life, natural light</div>
          <div className="m-card-body">
            Documentary style. Parents in motion, not performing. Soft, warm
            tones.
          </div>
        </div>
        <div className="m-card">
          <div className="m-card-label">Graphic</div>
          <div className="m-card-title">Minimal and soft</div>
          <div className="m-card-body">
            Rounded corners, warm neutrals, soft gradients. Feels like a deep
            breath.
          </div>
        </div>
      </div>
    </>
  );
}
