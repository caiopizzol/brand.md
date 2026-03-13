import { useState } from "react";
import type { AgentResearch, FlowStep } from "shared";
import { FLOW_STEPS } from "shared";
import { useApp } from "../app";

const TONE_OPTIONS = [
  "Warm",
  "Grounded",
  "Bold",
  "Direct",
  "Playful",
  "Minimal",
  "Poetic",
  "Honest",
  "Technical",
  "Provocative",
  "Sophisticated",
  "Calm",
];

const ATTRIBUTE_OPTIONS = [
  "Sophisticated",
  "Welcoming",
  "Precise",
  "Daring",
  "Minimalist",
  "Vibrant",
  "Trustworthy",
  "Innovative",
  "Artisanal",
  "Exclusive",
  "Accessible",
  "Authentic",
  "Serene",
  "Contemporary",
];

const NEVER_OPTIONS = [
  "Fake urgency / scarcity",
  "Aggressive promotions",
  "Generic mass language",
  "Cold / overly technical",
  "Fear-based appeals",
  "Direct competitor bashing",
  "Arrogance / showing off",
];

export function Flow() {
  const { goTo, flowData, updateFlow } = useApp();
  const [step, setStep] = useState<FlowStep>("seed");
  const [research, setResearch] = useState<AgentResearch | null>(null);
  const [researching, setResearching] = useState(false);

  const stepIndex = FLOW_STEPS.indexOf(step);

  const toggleList = (
    field: "toneWords" | "brandAttributes" | "neverCommunicate",
    value: string,
  ) => {
    const current = flowData[field];
    updateFlow({
      [field]: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    });
  };

  const startResearch = async () => {
    setResearching(true);
    // TODO: call API to trigger agent research
    // For now, simulate with a delay + mock data
    await new Promise((r) => setTimeout(r, 2000));
    setResearch({
      competitors: [
        { name: "Competitor A", positioning: "Premium, aspirational tone" },
        {
          name: "Competitor B",
          positioning: "Mass market, aggressive pricing",
        },
        { name: "Competitor C", positioning: "Community-driven, grassroots" },
      ],
      marketGap:
        "Most brands in this space lean heavily on hype and transformation narratives. There's room for a more grounded, honest approach.",
      suggestedTones: ["warm", "honest", "grounded"],
      suggestedAttributes: ["authentic", "accessible", "welcoming"],
      suggestedGuardrails: [
        "Fake urgency / scarcity",
        "Generic mass language",
        "Fear-based appeals",
      ],
      pricePositioning: "Mid-range with premium perception",
      audienceInsights:
        "Your audience values authenticity over polish. They've been burned by overpromising brands and respond to honesty and restraint.",
    });
    setResearching(false);
  };

  const next = () => {
    const nextIndex = stepIndex + 1;
    if (nextIndex < FLOW_STEPS.length) {
      const nextStep = FLOW_STEPS[nextIndex];
      // Trigger research when entering the react step
      if (nextStep === "react" && !research && !researching) {
        startResearch();
      }
      setStep(nextStep);
    } else {
      goTo("generating");
    }
  };

  const back = () => {
    if (stepIndex === 0) {
      goTo("landing");
    } else {
      setStep(FLOW_STEPS[stepIndex - 1]);
    }
  };

  return (
    <div className="flow">
      <div className="flow-header">
        <div className="flow-steps">
          {FLOW_STEPS.map((s, i) => (
            <div
              key={s}
              className={`flow-step-bar${i < stepIndex ? " done" : i === stepIndex ? " active" : ""}`}
            />
          ))}
        </div>
        <div className="flow-title">{STEP_TITLES[step]}</div>
        <div className="flow-sub">{STEP_SUBTITLES[step]}</div>
      </div>
      <div className="flow-content">
        {step === "seed" && <StepSeed />}
        {step === "people" && <StepPeople />}
        {step === "react" && <StepReact />}
        {step === "confirm" && <StepConfirm />}
        <div className="flow-actions">
          <button type="button" className="btn-back" onClick={back}>
            Back
          </button>
          <button type="button" className="btn-next" onClick={next}>
            {stepIndex === FLOW_STEPS.length - 1
              ? "Generate .brand"
              : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );

  function StepSeed() {
    return (
      <>
        <div className="flow-card">
          <div className="flow-card-label">Essentials</div>
          <div className="flow-question">What's your brand called?</div>
          <input
            className="flow-textarea"
            style={{ minHeight: "unset", padding: "12px 16px" }}
            placeholder="e.g. FitParent"
            value={flowData.brandName}
            onChange={(e) => updateFlow({ brandName: e.target.value })}
          />
        </div>
        <div className="flow-card">
          <div className="flow-card-label">Your product</div>
          <div className="flow-question">Describe what you're building</div>
          <div className="flow-hint">
            A few sentences is enough. What is it, who is it for, what makes it
            different?
          </div>
          <textarea
            className="flow-textarea"
            placeholder="A fitness app for busy parents who only have 15 minutes a day. No guilt, no transformation stories — just functional movement that fits real life..."
            value={flowData.description}
            onChange={(e) => updateFlow({ description: e.target.value })}
          />
        </div>
        <div className="flow-card">
          <div className="flow-card-label">Optional</div>
          <div className="flow-question">Got a URL?</div>
          <div className="flow-hint">
            Landing page, app store link, or GitHub repo. We'll use it to
            understand your product better.
          </div>
          <input
            className="flow-textarea"
            style={{ minHeight: "unset", padding: "12px 16px" }}
            placeholder="https://..."
            value={flowData.url}
            onChange={(e) => updateFlow({ url: e.target.value })}
          />
        </div>
      </>
    );
  }

  function StepPeople() {
    return (
      <>
        <div className="flow-card">
          <div className="flow-card-label">Your audience</div>
          <div className="flow-question">Who is this for?</div>
          <div className="flow-hint">
            Describe your ideal user — their life, frustrations, what they care
            about.
          </div>
          <textarea
            className="flow-textarea"
            placeholder="Busy parents aged 30-45 who want to stay healthy but don't have time for traditional fitness. They've tried other apps and felt guilty for not keeping up..."
            value={flowData.audience}
            onChange={(e) => updateFlow({ audience: e.target.value })}
          />
        </div>
        <div className="flow-card">
          <div className="flow-card-label">Only you know this</div>
          <div className="flow-question">Why are you building this?</div>
          <div className="flow-hint">
            Not the market opportunity. The personal reason.
          </div>
          <textarea
            className="flow-textarea"
            placeholder="I became a parent and every fitness app made me feel like I was failing..."
            value={flowData.whyBuilding}
            onChange={(e) => updateFlow({ whyBuilding: e.target.value })}
          />
        </div>
        <div className="flow-card">
          <div className="flow-card-label">The dream</div>
          <div className="flow-question">
            Where do you want this brand to go?
          </div>
          <div className="flow-hint">
            The big ambition. Not the business plan — the vision.
          </div>
          <textarea
            className="flow-textarea"
            placeholder="To be the brand that proves fitness doesn't require suffering. Not the biggest — the most honest..."
            value={flowData.dream}
            onChange={(e) => updateFlow({ dream: e.target.value })}
          />
        </div>
      </>
    );
  }

  function StepReact() {
    if (researching) {
      return (
        <div className="flow-card">
          <div className="flow-research-loading">
            <div className="flow-research-line" />
            <div className="flow-research-status">
              Researching your market...
            </div>
            <div className="flow-research-detail">
              Analyzing competitors, audience sentiment, and positioning gaps
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        {research && (
          <div className="flow-card">
            <div className="flow-card-label">What we found</div>
            <div className="flow-insight">
              <div className="flow-insight-label">Market gap</div>
              <div className="flow-insight-text">{research.marketGap}</div>
            </div>
            <div className="flow-insight" style={{ marginTop: 8 }}>
              <div className="flow-insight-label">Audience insight</div>
              <div className="flow-insight-text">
                {research.audienceInsights}
              </div>
            </div>
            <div className="flow-insight" style={{ marginTop: 8 }}>
              <div className="flow-insight-label">Competitors</div>
              <div className="flow-insight-text">
                {research.competitors
                  .map((c) => `${c.name} — ${c.positioning}`)
                  .join(". ")}
              </div>
            </div>
            <div className="flow-insight" style={{ marginTop: 8 }}>
              <div className="flow-insight-label">Suggested positioning</div>
              <div className="flow-insight-text">
                {research.pricePositioning}
              </div>
            </div>
          </div>
        )}
        <div className="flow-card">
          <div className="flow-card-label">Tone of voice</div>
          <div className="flow-question">How should the brand sound?</div>
          <div className="flow-hint">
            {research
              ? "We've highlighted suggestions based on your market. Pick what feels right."
              : "Select the words that feel right."}
          </div>
          <div className="flow-choices">
            {TONE_OPTIONS.map((word) => {
              const val = word.toLowerCase();
              const suggested = research?.suggestedTones.includes(val);
              return (
                <button
                  key={word}
                  type="button"
                  className={`flow-choice${flowData.toneWords.includes(val) ? " selected" : ""}${suggested && !flowData.toneWords.includes(val) ? " suggested" : ""}`}
                  onClick={() => toggleList("toneWords", val)}
                >
                  {word}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flow-card">
          <div className="flow-card-label">Identity attributes</div>
          <div className="flow-question">What should the brand express?</div>
          <div className="flow-hint">Select the attributes that resonate.</div>
          <div className="flow-choices">
            {ATTRIBUTE_OPTIONS.map((attr) => {
              const val = attr.toLowerCase();
              const suggested = research?.suggestedAttributes.includes(val);
              return (
                <button
                  key={attr}
                  type="button"
                  className={`flow-choice${flowData.brandAttributes.includes(val) ? " selected" : ""}${suggested && !flowData.brandAttributes.includes(val) ? " suggested" : ""}`}
                  onClick={() => toggleList("brandAttributes", val)}
                >
                  {attr}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flow-card">
          <div className="flow-card-label">References</div>
          <div className="flow-question">Which brands inspire you?</div>
          <div className="flow-hint">
            From any industry. What do they get right that you also want?
          </div>
          <textarea
            className="flow-textarea"
            placeholder="Aesop — the care in every detail. Kinfolk — the editorial aesthetic. Apple — the restraint..."
            value={flowData.referenceBrands}
            onChange={(e) => updateFlow({ referenceBrands: e.target.value })}
          />
        </div>
        <div className="flow-card">
          <div className="flow-card-label">Guardrails</div>
          <div className="flow-question">What should the brand never do?</div>
          <div className="flow-hint">
            {research
              ? "Based on competitor patterns, we've suggested some. Confirm or adjust."
              : "Select the communication patterns to avoid."}
          </div>
          <div className="flow-choices">
            {NEVER_OPTIONS.map((item) => {
              const suggested = research?.suggestedGuardrails.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  className={`flow-choice${flowData.neverCommunicate.includes(item) ? " selected" : ""}${suggested && !flowData.neverCommunicate.includes(item) ? " suggested" : ""}`}
                  onClick={() => toggleList("neverCommunicate", item)}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  function StepConfirm() {
    return (
      <>
        <div className="flow-card">
          <div className="flow-card-label">Summary</div>
          <div className="flow-question">Here's what we know</div>
          <div className="flow-summary">
            <div className="flow-summary-row">
              <div className="flow-summary-label">Brand</div>
              <div className="flow-summary-value">
                {flowData.brandName || "—"}
              </div>
            </div>
            <div className="flow-summary-row">
              <div className="flow-summary-label">Product</div>
              <div className="flow-summary-value">
                {flowData.description || "—"}
              </div>
            </div>
            <div className="flow-summary-row">
              <div className="flow-summary-label">Audience</div>
              <div className="flow-summary-value">
                {flowData.audience || "—"}
              </div>
            </div>
            <div className="flow-summary-row">
              <div className="flow-summary-label">Why</div>
              <div className="flow-summary-value">
                {flowData.whyBuilding || "—"}
              </div>
            </div>
            <div className="flow-summary-row">
              <div className="flow-summary-label">Dream</div>
              <div className="flow-summary-value">{flowData.dream || "—"}</div>
            </div>
            {flowData.toneWords.length > 0 && (
              <div className="flow-summary-row">
                <div className="flow-summary-label">Tone</div>
                <div className="flow-summary-value">
                  {flowData.toneWords.join(", ")}
                </div>
              </div>
            )}
            {flowData.brandAttributes.length > 0 && (
              <div className="flow-summary-row">
                <div className="flow-summary-label">Attributes</div>
                <div className="flow-summary-value">
                  {flowData.brandAttributes.join(", ")}
                </div>
              </div>
            )}
            {flowData.neverCommunicate.length > 0 && (
              <div className="flow-summary-row">
                <div className="flow-summary-label">Never</div>
                <div className="flow-summary-value">
                  {flowData.neverCommunicate.join(", ")}
                </div>
              </div>
            )}
            {research && (
              <div className="flow-summary-row">
                <div className="flow-summary-label">Research</div>
                <div className="flow-summary-value">
                  {research.competitors.length} competitors analyzed, market gap
                  identified
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flow-card">
          <div className="flow-card-label">Output language</div>
          <div className="flow-question">
            What language should the .brand file be in?
          </div>
          <div className="flow-choices">
            <button
              type="button"
              className={`flow-choice${flowData.language === "en" ? " selected" : ""}`}
              onClick={() => updateFlow({ language: "en" })}
            >
              English
            </button>
            <button
              type="button"
              className={`flow-choice${flowData.language === "pt-BR" ? " selected" : ""}`}
              onClick={() => updateFlow({ language: "pt-BR" })}
            >
              Português (BR)
            </button>
            <button
              type="button"
              className={`flow-choice${flowData.language === "bilingual" ? " selected" : ""}`}
              onClick={() => updateFlow({ language: "bilingual" })}
            >
              Bilingual
            </button>
          </div>
        </div>
      </>
    );
  }
}

const STEP_TITLES: Record<import("shared").FlowStep, string> = {
  seed: "Tell us about your brand",
  people: "Who is it for, and why?",
  react: "We did some research",
  confirm: "Ready to generate",
};

const STEP_SUBTITLES: Record<import("shared").FlowStep, string> = {
  seed: "Just the essentials. Name, description, and a URL if you have one.",
  people: "Your audience, your motivation, and where you want this to go.",
  react: "Here's what we found. React to our suggestions and add your taste.",
  confirm: "Review everything before we generate your .brand file.",
};
