# brand.md — Vision

## An open standard for brand identity

`brand.md` is a file format. It lives in your project root — alongside `README.md`, `CLAUDE.md`, and `AGENTS.md` — and gives AI tools and humans a single source of truth for how a brand looks, sounds, and behaves.

Like `llms.txt` gives LLMs context about a website, and `AGENTS.md` gives AI agents coding instructions, `brand.md` gives any tool the brand context it needs to stay on-brand.

**Website:** thebrand.md (until brand.md is acquired)
**Spec:** [spec/brand-md.md](spec/brand-md.md)

## Four layers

```
brand.md
├── ## Strategy     why the brand exists, where it stands
├── ## Voice        how the brand speaks and writes
├── ## Visual       approved identity primitives and art direction
└── ## Governance   naming, claims, accessibility commitments (optional)
```

Each layer builds on the previous. Strategy informs Voice. Voice and Strategy inform Visual.

### Strategy

Audience, positioning, personality, references, promise, guardrails. The "why" and "who."

Generated from: founder input plus agentic market research.

### Voice

The verbal identity — tonal rules, phrases, manifesto, social bios.

This layer is the most directly useful for AI agents. Tonal rules are system prompt modifiers. Phrases are few-shot examples. The "We Say / We Never Say" table is a guardrails list.

### Visual

Approved identity primitives: core colors, typefaces, logo invariants, imagery territory, art direction.

Everything is text-describable. No binary assets. This layer is deliberately narrow: it holds what is approved and invariant, not how a given surface applies it.

It does not contain ramps, semantic roles, type scales, spacing, components, or motion. Those belong to a [`DESIGN.md`](https://github.com/google-labs-code/design.md), and one brand can have several, one per surface.

### Governance

Naming rules, approved claims and their evidence, accessibility commitments. Optional, because a brand may have none of these established yet.

Claims carry a hard rule: an agent may draft candidates, but it must never record an unverified statement as approved.

## How it's generated

The `/brand` Claude Code skill is the reference generator:

1. **Research** — 5-8 web searches to understand the market, competitors, and audience
2. **Interview** — Conversational founder interview with research-informed defaults
3. **Generation** — Three-layer output, each section grounded in competitive whitespace

## How tools consume it

Any AI agent encountering `brand.md` should:

1. Read **frontmatter** for brand name, tagline, language, specVersion
2. Read **Strategy** for context on any decision
3. Read **Voice > Tonal Rules** as system-prompt-level instructions
4. Read **Voice > Phrases and Vocabulary** as few-shot examples and required terminology
5. Read **Governance > Claims** before asserting anything factual in public copy
6. Read **Visual** for approved primitives and art direction

Each layer can be extracted independently. Writing a blog post? Read Voice. Naming a feature? Read Governance and Vocabulary. Preparing a pitch? Read Strategy and Voice.

Building a UI? Read the surface's `DESIGN.md`. When one exists, it is authoritative for concrete visual decisions and `brand.md` is authoritative for meaning, voice, and which primitives are approved. Do not generate CSS from `brand.md` alone.

## Roadmap

### Now
- Spec v0.3, the DESIGN.md boundary, audience, references, governance, specVersion gating
- `/brand` skill, narrowed to identity, with an opt-in design handoff
- Worked example: one brand, two design systems that both lint clean

### Next
- Real usage across three surfaces of one brand, to learn which primitives actually repeat
- Upstream addition to the DESIGN.md unknown-content table for frontmatter keys
- Integrations, other AI tools reading `brand.md` automatically

### Later
- `brand.md` domain acquisition (Moldova ccTLD)
- A brand linter, once 0.3 has been exercised enough to know what is worth checking
- Cross-file primitive validation with color normalization
- Verbal consistency checker that audits copy against Voice

Deliberately not on the roadmap: design-system inheritance, and any visual conformance checking. The first needs real examples before it can be designed. The second is an unsolved capability, not something the DESIGN.md linter already covers.
