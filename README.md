# brand.md

An open standard for brand identity files.

`brand.md` is a file that lives in your project root and tells AI tools how your brand looks, sounds, and behaves. Like `AGENTS.md` gives AI agents coding instructions, `brand.md` gives them brand context.

## Quick example

```markdown
---
name: "Acme"
tagline: "Build faster, break nothing"
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

### Colors
- Primary: #0F172A (deep navy) — headings, UI chrome
- Accent: #38BDF8 (sky blue) — CTAs, links, highlights
...
```

## Structure

```
brand.md
├── Frontmatter (name, tagline, version, language, type?, architecture?)
├── ## Strategy
│   ├── ### Overview
│   ├── ### Positioning
│   ├── ### Personality
│   ├── ### Promise
│   └── ### Guardrails
├── ## Voice
│   ├── ### Identity
│   ├── ### Tagline & Slogans
│   ├── ### Manifesto (optional)
│   ├── ### Message Pillars
│   ├── ### Phrases
│   ├── ### Social Bios (optional)
│   └── ### Tonal Rules
└── ## Visual
    ├── ### Colors
    ├── ### Typography
    ├── ### Photography (optional)
    └── ### Style (optional)
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

Product brands are sparse — they only define sections where they diverge. Missing sections inherit from the parent. Guardrails always cascade down.

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
/plugin marketplace add thebrandmd/brand.md
/plugin install brand-md@brand-md
```

### Run it

```
/brand-md:brand
```

The skill researches your market, interviews you, and generates a complete `brand.md`.

### Or test locally

```bash
git clone https://github.com/thebrandmd/brand.md
claude --plugin-dir ./brand.md
```

Then run `/brand-md:brand` inside Claude Code.

## Spec

Full specification: [spec/brand-md.md](spec/brand-md.md)

## Why brand.md?

Every AI agent writing copy, generating social posts, designing pages, or creating marketing assets currently has **zero brand context**. You either paste brand guidelines into every prompt, or you get generic output.

`brand.md` fixes this. One file, one location, every tool reads it.

## License

MIT
