# brand.md Specification

**Version:** 0.1.0
**Status:** Draft
**Website:** thebrand.md (until brand.md is acquired)

## What is brand.md?

`brand.md` is a standard file format for defining brand identity. It lives in a project's root directory — alongside `README.md`, `CLAUDE.md`, and `AGENTS.md` — and gives AI tools and humans a single source of truth for how a brand should look, sound, and behave.

Any AI agent that writes copy, generates social posts, designs landing pages, or creates marketing assets can read `brand.md` to stay on-brand without additional prompting.

## File Name and Location

- **File name:** `brand.md` (lowercase, exactly)
- **Location:** Project root directory
- **Format:** Markdown with YAML frontmatter

The file is standard markdown. It renders on GitHub, any editor highlights it, and any markdown parser can process it.

## Frontmatter

Every `brand.md` file begins with YAML frontmatter:

```yaml
---
name: "Acme"
tagline: "Build faster, break nothing"
version: 1
language: en
---
```

| Field | Required | Description |
|---|---|---|
| `name` | Yes | Brand name exactly as it should appear everywhere |
| `tagline` | Yes | Primary tagline — the one-line brand signature |
| `version` | Yes | Integer, starts at 1, increments on regeneration |
| `language` | Yes | Primary language: `en` or `pt-BR` |

Keep frontmatter minimal. Every field here is machine-actionable — an AI agent reads `name` to know what to call the brand, `tagline` for quick reference, `language` to know what language to generate content in. Anything requiring interpretation belongs in a section, not frontmatter.

## Section Structure

The file uses H1 for the document title, H2 for layers, and H3 for sections within each layer. Three layers, in order: **Strategy**, **Voice**, **Visual**.

```
# [Brand Name]

## Strategy
### Overview
### Positioning
### Personality
### Promise
### Guardrails

## Voice
### Identity
### Tagline & Slogans
### Manifesto              ← optional
### Message Pillars
### Phrases
### Social Bios            ← optional
### Tonal Rules

## Visual
### Colors
### Typography
### Photography            ← optional
### Style                  ← optional
```

---

## Layer 1: Strategy

The strategic foundation. Why the brand exists and where it stands.

### Overview

**Required.**

What the brand is, where it came from, and what it really does.

Must include:
- What the brand is (1-2 sentences)
- Origin story (1-2 sentences, if applicable)
- What it really does — the deep description, not the surface product
- The problem it solves — the structural/deep problem, not features
- The transformation: Before state → After state
- Long-term ambition (1 sentence)

### Positioning

**Required.**

Where the brand stands in the market.

Must include:
- The category it creates or occupies — be specific ("Operating System for Sports Organizations" not "sports tech")
- What it is NOT — explicit negations ("Not a consultancy. Not software. Not SaaS.")
- Competitive landscape: how the market layers work, where this brand sits
- Structural differentials: 3-5 bullet points
- The territory the brand occupies: what concept/space it owns

### Personality

**Required.**

Who the brand is as a character.

Must include:
- Dominant archetype (e.g., "The Architect / The Calm Strategist")
- Brand attributes: 4-6 words the brand transmits (e.g., Order, Structure, Intelligence)
- What it IS: short declarative list (e.g., "Clear. Precise. Executive. Human.")
- What it is NOT: anti-pattern list (e.g., "Not aggressive. Not performative. Not hype-driven.")

### Promise

**Required.**

What the brand commits to.

Must include:
- Core promise: 2-4 short declarative statements
- Base message: one sentence that captures the brand thesis
- Synthesizing phrase: one sentence that captures everything

### Guardrails

**Required.**

The boundaries that protect the brand.

Must include:
- Tone summary: 3-5 attributes (e.g., "Confident, calm, and human.")
- What the brand cannot be: explicit list of identities to avoid
- Litmus test: a one-line test for brand alignment (e.g., "If it sounds like a vendor, it's wrong.")

---

## Layer 2: Voice

The verbal identity. How the brand speaks and writes. This layer is the most directly useful for AI agents generating content.

### Identity

**Required.**

How the brand introduces itself.

Must include:
- Who we are: 2-3 paragraph identity statement (first person, as if the brand is speaking)
- Essence: one powerful sentence that captures the verbal identity

### Tagline & Slogans

**Required.**

The brand's signature lines.

Must include:
- Primary tagline (matches frontmatter `tagline`, with context for where to use it)
- 2-3 tagline alternatives
- 4-5 slogan options for different contexts

### Manifesto

**Optional.**

A declaration of what the brand believes and stands for.

When included:
- 8-12 short paragraphs with poetic rhythm
- Alternates between statement and expansion
- Written as a declaration, not a description
- Ends with brand name as a signature

### Message Pillars

**Required.**

The core themes the brand communicates.

Must include:
- 4-6 pillars (one word or short phrase each)
- Under each pillar: 1-2 key statements that express it

### Phrases

**Required.**

Short lines the brand owns.

Must include:
- 5-8 punchy one-liners
- Must be ownable — if you swap in any other brand name and it still works, it's too generic

### Social Bios

**Optional.**

Ready-to-use bios for social platforms.

When included:
- LinkedIn: paragraph format
- Instagram: bullet point format
- X/Twitter: single-line format
- Website: short paragraph format

### Tonal Rules

**Required.**

How the brand communicates — the rules an AI agent should follow.

Must include:
- 8-12 rules for how to communicate
- Identity boundaries: 4-6 "What we are not" statements
- We Say / We Never Say table:

```markdown
| We Say | We Never Say |
|---|---|
| "Install clarity" | "Unlock your potential" |
| "Operating architecture" | "Holistic solution" |
```

---

## Layer 3: Visual

The visual direction. How the brand looks. Everything here is text-describable — no binary assets.

### Colors

**Required.**

Must include:
- Primary, secondary, and accent colors with hex values
- Usage rules for each (e.g., "headings and CTAs", "backgrounds", "highlights")
- Colors or color families to avoid

### Typography

**Required.**

Must include:
- Display font: name, weight, usage
- Body font: name, weight, usage
- Mono font (if applicable): name, usage

### Photography

**Optional.**

When included:
- Mood: 3-5 descriptive words
- Subjects: what to photograph
- Avoid: what never to show

### Style

**Optional.**

When included:
- Design keywords: 4-8 words (e.g., "Modular structure", "Evident grid", "Disciplined minimalism")
- Reference brands or studios
- Direction statement: 1-2 sentences (e.g., "The identity should communicate system, not decoration.")

---

## How AI Tools Should Consume brand.md

An AI agent encountering a `brand.md` file should:

1. **Read frontmatter** for brand name, tagline, and language
2. **Read Strategy** to understand what the brand is (context for any decision)
3. **Read Voice > Tonal Rules** as system-prompt-level instructions for any text generation
4. **Read Voice > Phrases** as few-shot examples of the brand's voice
5. **Read Visual > Colors + Typography** when generating CSS, design specs, or UI

Each H2 layer can be extracted independently:
- Writing a blog post? → Voice layer
- Generating a landing page? → Voice + Visual
- Preparing a pitch? → Strategy + Voice
- Building a UI? → Visual + Strategy > Personality

## Versioning

The `version` field in frontmatter is an integer that starts at 1. Increment it when the brand.md is regenerated or substantially edited. This allows tools to detect when a brand has been updated.

The specification itself follows semantic versioning (e.g., 0.1.0). Breaking changes increment the major version.
