# brand.md — Vision

## An open standard for brand identity

`brand.md` is a file format. It lives in your project root — alongside `README.md`, `CLAUDE.md`, and `AGENTS.md` — and gives AI tools and humans a single source of truth for how a brand looks, sounds, and behaves.

Like `llms.txt` gives LLMs context about a website, and `AGENTS.md` gives AI agents coding instructions, `brand.md` gives any tool the brand context it needs to stay on-brand.

**Website:** thebrand.md (until brand.md is acquired)
**Spec:** [spec/brand-md.md](spec/brand-md.md)

## Three layers

```
brand.md
├── ## Strategy    — why the brand exists, where it stands
├── ## Voice       — how the brand speaks and writes
└── ## Visual      — how the brand looks
```

Each layer builds on the previous. Strategy informs Voice. Voice + Strategy inform Visual.

### Strategy

Positioning, personality, promise, guardrails. The "why" and "who."

Generated from: founder input + agentic market research.

### Voice

The verbal identity — tonal rules, phrases, manifesto, social bios.

This layer is the most directly useful for AI agents. Tonal rules are system prompt modifiers. Phrases are few-shot examples. The "We Say / We Never Say" table is a guardrails list.

### Visual

Colors, typography, photography direction, style.

Everything is text-describable — hex values, font names, mood words. No binary assets. An AI agent reading this layer can generate CSS, Midjourney prompts, or design specs.

## How it's generated

The `/brand` Claude Code skill is the reference generator:

1. **Research** — 5-8 web searches to understand the market, competitors, and audience
2. **Interview** — Conversational founder interview with research-informed defaults
3. **Generation** — Three-layer output, each section grounded in competitive whitespace

## How tools consume it

Any AI agent encountering `brand.md` should:

1. Read **frontmatter** for brand name, tagline, language
2. Read **Strategy** for context on any decision
3. Read **Voice > Tonal Rules** as system-prompt-level instructions
4. Read **Voice > Phrases** as few-shot examples
5. Read **Visual** when generating CSS, design specs, or UI

Each layer can be extracted independently. Writing a blog post? Read Voice. Building a landing page? Read Voice + Visual. Preparing a pitch? Read Strategy + Voice.

## Roadmap

### Now
- Spec v0.1 — section structure, required/optional fields, consumption guidelines
- `/brand` skill — the reference generator
- Real-world brand.md example from professional deliverables

### Next
- thebrand.md — spec website, examples directory, adoption tracker
- GitHub repo — open standard, community contributions
- Integrations — Cursor, Windsurf, and other AI tools reading `brand.md` automatically

### Later
- `brand.md` domain acquisition (Moldova ccTLD)
- Toolkit extension — executable templates for social posts, emails, landing pages (separate file or spec extension)
- Brand consistency checker — tool that reads `brand.md` and audits content against it
