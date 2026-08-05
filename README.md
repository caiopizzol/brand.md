# brand.md

An open standard for brand identity files.

`brand.md` is a file that lives in your project root and tells AI tools how your brand looks, sounds, and behaves. Like `AGENTS.md` gives AI agents coding instructions, `brand.md` gives them brand context.

## Quick example

```markdown
---
name: "Acme"
tagline: "Build faster, break nothing"
specVersion: "0.3.0"
version: 1
language: en
---

# Acme

## Strategy

### Overview
Acme is a deployment platform for teams that ship daily...

### Positioning
Category: Zero-downtime deployment infrastructure.
Not a CI/CD pipeline. Not a hosting provider. Not DevOps consulting...

### Personality
Archetype: The Reliable Engineer...

### Promise
Ship with confidence. Every time...

### Guardrails
If it sounds like marketing, rewrite it...

## Voice

### Identity
We are the infrastructure teams trust when downtime isn't an option...

### Tonal Rules
- Write like an engineer explaining to another engineer.
- Never use "revolutionary" or "game-changing."
- Calm confidence. Always.

| We Say | We Never Say |
|---|---|
| "Zero-downtime deploys" | "Seamless cloud solution" |

...

## Visual

### Core Colors
- Deep Navy #0F172A (mandatory) — the brand's weight and steadiness
- Sky Blue #38BDF8 (mandatory) — the one point of energy, used sparingly

### Art Direction
Visual territory: an aircraft maintenance log. Plain, exact, no ornament.
...
```

Notice what the Visual layer does not contain: no ramps, no type scale, no
component styling. Those live in a [`DESIGN.md`](#relationship-to-designmd).

## Structure

```
brand.md
├── Frontmatter (name, tagline, version, language, specVersion?, type?, architecture?)
├── ## Strategy
│   ├── ### Overview
│   ├── ### Audience
│   ├── ### Positioning
│   ├── ### Personality
│   ├── ### References & Anti-References
│   ├── ### Promise
│   └── ### Guardrails
├── ## Voice
│   ├── ### Identity
│   ├── ### Tagline & Slogans
│   ├── ### Manifesto (optional)
│   ├── ### Message Pillars
│   ├── ### Phrases
│   ├── ### Vocabulary (optional)
│   ├── ### Social Bios (optional)
│   └── ### Tonal Rules
├── ## Visual
│   ├── ### Logo & Marks (optional)
│   ├── ### Core Colors
│   ├── ### Typefaces
│   ├── ### Photography & Illustration (optional)
│   └── ### Art Direction
└── ## Governance (optional)
    ├── ### Naming (optional)
    ├── ### Claims (optional)
    └── ### Accessibility Commitments (optional)
```

## Hierarchy

Like `CLAUDE.md`, `brand.md` supports directory-based hierarchy. A master brand in the project root cascades down to product brands in subdirectories.

```
company/
├── brand.md                    ← master brand (Acme Corp)
├── cloud/
│   └── brand.md                ← product brand (Acme Cloud)
└── analytics/
    └── brand.md                ← product brand (Acme Analytics)
```

Product brands are sparse: they only define sections where they diverge. Missing sections inherit from the parent. Guardrails and accessibility commitments always cascade down, and a child can tighten them but never loosen them.

Four architecture types control how much a product inherits:

| Architecture | Coupling | Example |
|---|---|---|
| `branded-house` | Tightest | Google → Google Maps |
| `endorsed` | Parent visible | Marriott → Courtyard by Marriott |
| `sub-brand` | Shared DNA | Apple → iPhone |
| `independent` | Loosest | P&G → Tide |

See [spec/brand-md.md](spec/brand-md.md) for the full hierarchy specification.

## Generate one

### Install

Add the marketplace and install the plugin:

```
/plugin marketplace add caiopizzol/brand.md
/plugin install brand-md@brand-md
```

### Run it

```
/brand-md:brand
```

The skill researches your market, interviews you, and generates a complete `brand.md`.

### Or test locally

```bash
git clone https://github.com/caiopizzol/brand.md
claude --plugin-dir ./brand.md
```

Then run `/brand-md:brand` inside Claude Code.

## Relationship to DESIGN.md

`brand.md` owns durable identity. [`DESIGN.md`](https://github.com/google-labs-code/design.md)
owns a self-contained visual system for one surface: design tokens, palettes,
type scales, layout, components, motion.

```
brand.md                      one identity
├── website/DESIGN.md         an independent literary journal
├── product/DESIGN.md         a research archive workstation
└── decks/DESIGN.md           a museum exhibition catalog
```

One brand, several surfaces, each a different expression of the same identity.
That is why the brand file cannot own the design system.

The test:

> If it should survive a complete visual redesign, it belongs in `brand.md`.
> If it could change during that redesign without repositioning the company,
> it belongs in `DESIGN.md`.

The dependency runs one way. A `DESIGN.md` declares `brand: ../brand.md`;
`brand.md` does not track its designs.

Full contract: [spec/design-md-integration.md](spec/design-md-integration.md).
Worked example: [examples/marginalia](examples/marginalia).

## Spec

Full specification: [spec/brand-md.md](spec/brand-md.md)

Files without `specVersion` are treated as 0.2 and stay valid, so nothing has to
migrate on a deadline.

## Why brand.md?

Every AI agent writing copy, generating social posts, designing pages, or creating marketing assets currently has **zero brand context**. You either paste brand guidelines into every prompt, or you get generic output.

`brand.md` fixes this. One file, one location, every tool reads it.

## License

MIT

## Contributors

<a href="https://github.com/caiopizzol"><img src="https://github.com/caiopizzol.png" width="50" height="50" alt="caiopizzol" title="Caio Pizzol" /></a>
