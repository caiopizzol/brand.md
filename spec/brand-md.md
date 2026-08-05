# brand.md Specification

**Version:** 0.3.0
**Status:** Draft
**Website:** thebrand.md (until brand.md is acquired)

## What is brand.md?

`brand.md` is a standard file format for defining brand identity. It lives in a project's root directory, alongside `README.md`, `CLAUDE.md`, and `AGENTS.md`, and gives AI tools and humans a single source of truth for what a brand means, how it speaks, and which identity assets are approved.

Any AI agent that writes copy, generates social posts, names a feature, or makes a public claim can read `brand.md` to stay on-brand without additional prompting.

### What brand.md owns

Durable identity: the things that should survive a complete visual redesign without repositioning the company.

- Strategy: purpose, audience, positioning, personality, references, promise, guardrails
- Voice: verbal identity, messaging, taglines, vocabulary, tonal rules
- Visual primitives: approved colors, approved typefaces, logo invariants, imagery territory, art direction
- Governance: naming, claims, accessibility commitments

### What brand.md does not own

An applied visual and interaction system. That is the job of a `DESIGN.md` file, a separate open format with its own specification and tooling.

`brand.md` does not define color ramps, semantic color roles, hover and focus states, type scales, spacing systems, layout grids, shape language, elevation, components, motion, UI iconography, or responsive behavior. A brand can have several `DESIGN.md` files, one per surface (marketing site, product interface, presentation system), each expressing the same identity differently.

The boundary is a single test:

> If it should survive a complete visual redesign, it belongs in `brand.md`.
> If it could change during that redesign without repositioning the company, it belongs in `DESIGN.md`.

## File Name and Location

- **File name:** `brand.md` (lowercase, exactly)
- **Location:** Project root directory for the master brand; any subdirectory for product brands
- **Format:** Markdown with YAML frontmatter

The file is standard markdown. It renders on GitHub, any editor highlights it, and any markdown parser can process it.

## Frontmatter

Every `brand.md` file begins with YAML frontmatter:

```yaml
---
name: "Acme"
tagline: "Build faster, break nothing"
specVersion: "0.3.0"
version: 1
language: en
---
```

| Field | Required | Description |
|---|---|---|
| `name` | Yes | Brand name exactly as it should appear everywhere |
| `tagline` | Yes | Primary tagline, the one-line brand signature |
| `version` | Yes | Integer, starts at 1, increments when this file's content is revised |
| `language` | Yes | Primary language: `en` or `pt-BR` |
| `specVersion` | No | Version of this specification the file targets. Absent means `0.2.0` |
| `type` | No | `master` (default), `product`, or `sub-brand` |
| `architecture` | No | `branded-house`, `endorsed`, `sub-brand`, or `independent` |

**`version` vs `specVersion`.** These answer different questions. `version` is the revision number of this particular brand identity (bump it when the brand changes). `specVersion` is the version of the format the file is written against (bump it when migrating to a newer spec). A file can be at `version: 7` and `specVersion: "0.3.0"` at the same time.

**`specVersion` gates required sections.** A file declaring `specVersion: "0.3.0"` is validated against the requirements in this document. A file with no `specVersion` is treated as `0.2.0` and keeps its original requirements, so no existing file becomes invalid when the spec adds a required section. See [Versioning](#versioning).

**`type`** declares what this file represents. `master` is the root brand (the company itself). `product` is a distinct product within the company. `sub-brand` is an extension closer to the parent than a standalone product.

**`architecture`** declares how tightly coupled this brand is to its parent. Only meaningful for non-master files. See [Hierarchy](#hierarchy) for details.

Keep frontmatter minimal. Every field here is machine-actionable. An AI agent reads `name` to know what to call the brand, `tagline` for quick reference, `language` to know what language to generate content in. Anything requiring interpretation belongs in a section, not frontmatter.

## Section Structure

The file uses H1 for the document title, H2 for layers, and H3 for sections within each layer. Four layers, in order: **Strategy**, **Voice**, **Visual**, **Governance**.

```
# [Brand Name]

## Strategy
### Overview
### Audience
### Positioning
### Personality
### References & Anti-References
### Promise
### Guardrails

## Voice
### Identity
### Tagline & Slogans
### Manifesto                    ← optional
### Message Pillars
### Phrases
### Vocabulary                   ← optional
### Social Bios                  ← optional
### Tonal Rules

## Visual
### Logo & Marks                 ← optional
### Core Colors
### Typefaces
### Photography & Illustration   ← optional
### Art Direction

## Governance                    ← optional layer
### Naming                       ← optional
### Claims                       ← optional
### Accessibility Commitments    ← optional
```

### Section names and aliases

Four sections were renamed in 0.3 to reflect their narrowed responsibility. Consumers must accept both names. The 0.3 name is preferred for new files.

| 0.3 name | Accepted alias (0.2) | Why it changed |
|---|---|---|
| `Core Colors` | `Colors` | Holds approved identity colors, not a full palette |
| `Typefaces` | `Typography` | Holds approved families, not a type scale |
| `Art Direction` | `Style` | Describes visual territory, not a design system |
| `Photography & Illustration` | `Photography` | Covers both, and illustration had no home |

A file using the 0.2 name is valid. A tool encountering either name must treat them as the same section.

---

## Hierarchy

A company has one brand but multiple products. Each product needs its own voice, colors, and positioning, while staying connected to the parent brand. `brand.md` supports this through directory-based hierarchy, following the same pattern as `CLAUDE.md` files.

### File discovery

Tools discover `brand.md` files by walking up the directory tree from the current working directory. Every `brand.md` found between the working directory and the project root is loaded, closest first.

```
acme/
├── brand.md                    ← master brand (Acme Corp)
├── website/
│   └── ...                     ← inherits root brand.md
├── cloud/
│   ├── brand.md                ← product brand (Acme Cloud)
│   └── storage/
│       └── brand.md            ← sub-product (Acme Cloud Storage)
└── analytics/
    └── brand.md                ← product brand (Acme Analytics)
```

A tool working in `acme/cloud/storage/` loads three files:
1. `acme/brand.md` (master)
2. `acme/cloud/brand.md` (product)
3. `acme/cloud/storage/brand.md` (sub-product)

A `brand.md` with no ancestors is a master brand, whether or not `type` is set.

### Architecture types

The `architecture` frontmatter field tells tools how much to inherit from the parent brand. Four models, from tightest coupling to full independence:

| Architecture | Relationship | Real-world example |
|---|---|---|
| `branded-house` | Master brand dominates. Product is an extension. | Google → Google Maps |
| `endorsed` | Product leads, parent endorses. | Marriott → Courtyard by Marriott |
| `sub-brand` | Shared DNA, distinct personality. | Apple → iPhone |
| `independent` | Own identity. Parent is background. | P&G → Tide |

If `architecture` is omitted, tools should default to `endorsed`, the most common pattern.

`architecture` governs inheritance between `brand.md` files only. It says nothing about how a product's `DESIGN.md` relates to its parent's `DESIGN.md`. Design-system composition is a separate problem with its own unresolved questions (merge order, token deletion, component overrides), and this specification deliberately does not define it.

### Inheritance rules

Child `brand.md` files are sparse. They only include sections where the product diverges from the parent. Missing sections are inherited from the nearest ancestor that defines them.

Which sections are typically inherited depends on the architecture:

| Layer / Section | `branded-house` | `endorsed` | `sub-brand` | `independent` |
|---|---|---|---|---|
| **Strategy > Overview** | Inherit, narrow focus | Own | Own | Own |
| **Strategy > Audience** | Inherit, narrow focus | Own | Own | Own |
| **Strategy > Positioning** | Inherit, narrow focus | Own | Own | Own |
| **Strategy > Personality** | Inherit | Inherit | Own | Own |
| **Strategy > References & Anti-References** | Inherit | Inherit | Own | Own |
| **Strategy > Promise** | Inherit | Inherit | Own | Own |
| **Strategy > Guardrails** | Inherit | Inherit | Inherit | Own |
| **Voice > Identity** | Inherit | Own | Own | Own |
| **Voice > Tagline & Slogans** | Own | Own | Own | Own |
| **Voice > Message Pillars** | Inherit | Own | Own | Own |
| **Voice > Phrases** | Own | Own | Own | Own |
| **Voice > Vocabulary** | Inherit | Inherit | Inherit | Own |
| **Voice > Tonal Rules** | Inherit | Inherit | Inherit | Own |
| **Visual > Logo & Marks** | Inherit | Inherit | Inherit | Own |
| **Visual > Core Colors** | Inherit, may add | Inherit, may add | Own | Own |
| **Visual > Typefaces** | Inherit | Inherit | Own | Own |
| **Visual > Art Direction** | Inherit, narrow focus | Own | Own | Own |
| **Governance > Naming** | Inherit | Inherit | Inherit | Own |
| **Governance > Claims** | Inherit | Inherit | Inherit | Own |
| **Governance > Accessibility Commitments** | Inherit | Inherit | Inherit | Inherit |

This table is guidance, not enforcement. A product may include any section to override its parent, or omit any section to inherit it, regardless of architecture type.

**Guardrails merge, not replace.** When a child defines its own Guardrails section, the content is added to the parent's guardrails. A child brand can tighten guardrails but should not loosen them. The parent's "What the brand cannot be" list and litmus test always apply to descendants, unless the architecture is `independent`.

**Accessibility commitments always merge and never loosen,** at every architecture including `independent`. A child may raise the bar. It may not lower one the parent committed to.

### Example: product brand.md

A product `brand.md` that inherits Strategy and Visual from its parent, defining only its own Voice:

```yaml
---
name: "Acme Cloud"
tagline: "Infrastructure that disappears"
specVersion: "0.3.0"
version: 1
language: en
type: product
architecture: endorsed
---
```

```markdown
# Acme Cloud

## Strategy

### Overview
Acme Cloud is the infrastructure arm of Acme, the deployment
platform for teams that need uptime guarantees above 99.99%.

### Positioning
Category: Enterprise cloud infrastructure.
Not a hyperscaler. Not a hosting provider. Not DevOps consulting.

## Voice

### Identity
We are the cloud you forget is there, until you check
your uptime dashboard and smile.

### Tagline & Slogans
- Primary: "Infrastructure that disappears"
- "99.99% is our floor, not our ceiling"
- "The cloud you don't think about"

### Phrases
- "The cloud you forget about."
- "Uptime isn't a feature. It's the product."
- "We disappear so you can ship."
```

This file has no Audience, Personality, References, Promise, Guardrails, Tonal Rules, Message Pillars, Core Colors, Typefaces, or Art Direction sections. All inherited from `acme/brand.md`.

---

## Layer 1: Strategy

The strategic foundation. Why the brand exists and where it stands.

### Overview

**Required.**

What the brand is, where it came from, and what it really does.

Must include:
- What the brand is (1-2 sentences)
- Origin story (1-2 sentences, if applicable)
- What it really does, the deep description, not the surface product
- The problem it solves, the structural problem, not features
- The transformation: Before state → After state
- Long-term ambition (1 sentence)

### Audience

**Required.**

Who the brand is for, and who it is not for.

Must include:
- Primary audience: role, context, and what they are trying to accomplish
- What they already believe, and what they are skeptical of
- Secondary audiences, if any, and how they differ
- Who the brand is explicitly not for

Be concrete. "Engineering leaders at Series B companies who have been burned by a migration" is usable. "Modern businesses" is not.

This section exists partly because downstream consumers need it. A `DESIGN.md` Overview describes the emotional response a surface should produce, which is impossible to derive without knowing who is looking at it.

### Positioning

**Required.**

Where the brand stands in the market.

Must include:
- The category it creates or occupies, be specific ("Operating System for Sports Organizations" not "sports tech")
- What it is NOT, explicit negations ("Not a consultancy. Not software. Not SaaS.")
- Competitive landscape: how the market layers work, where this brand sits
- Structural differentials: 3-5 bullet points
- The territory the brand occupies: what concept or space it owns

### Personality

**Required.**

Who the brand is as a character.

Must include:
- Dominant archetype (e.g., "The Architect / The Calm Strategist")
- Brand attributes: 4-6 words the brand transmits (e.g., Order, Structure, Intelligence)
- What it IS: short declarative list (e.g., "Clear. Precise. Executive. Human.")
- What it is NOT: anti-pattern list (e.g., "Not aggressive. Not performative. Not hype-driven.")

### References & Anti-References

**Required.**

The specific worlds the brand borrows from, and the worlds it refuses.

A list of admired brand names is not enough. Every entry must state the exact trait to borrow and the trait not to copy. Without that, a reference is decoration.

Must include:
- 2-4 references, each with what to borrow and what not to borrow
- 1-3 anti-references, each with the specific pattern being rejected

```markdown
### References & Anti-References

#### References

- **The New Yorker:** Borrow its editorial confidence and its trust in the
  reader's patience. Do not borrow its visual nostalgia or its illustration style.
- **Linear:** Borrow its restraint and its information hierarchy. Do not borrow
  its dark gradients or its software-category vocabulary.

#### Anti-References

- **Generic enterprise SaaS:** Reject inflated headlines, interchangeable
  gradients, and any claim about "unlocking potential."
```

This section is required because it is the highest-value input any downstream consumer receives. A specific reference describes a point; a list of adjectives describes a region, and anything generated from a region comes back generic. Leaving this implicit is what produces average work.

Note that references are not only visual. "Borrow its trust in the reader's patience" constrains sentence length and voice as much as it constrains layout, which is why this section sits in Strategy rather than Visual.

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

Guardrails here are identity-level. They describe what makes the brand *wrong*. Rules about what makes a screen *inconsistent* ("don't mix rounded and sharp corners") are render-level and belong in a `DESIGN.md`.

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
- Must be ownable. If you swap in any other brand name and it still works, it's too generic

### Vocabulary

**Optional.**

The words the brand uses for recurring concepts, and the words it refuses.

Phrases and Vocabulary are different artifacts. A phrase is an ownable line. Vocabulary is terminology: the consistent noun for a thing across every surface, so the product, the docs, and the marketing site do not each invent their own.

When included:
- Preferred term, rejected alternatives, and why
- Capitalization rules for product and feature names, if any

```markdown
| Concept | We call it | Not |
|---|---|---|
| The main working area | workspace | dashboard, console, hub |
| A saved configuration | preset | template, profile |
```

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

How the brand communicates, the rules an AI agent should follow.

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

The brand's visual primitives and intent. Everything here is text-describable, and everything here should survive a redesign.

This layer is deliberately narrow. It holds what is approved and invariant, not how a given surface applies it. A `DESIGN.md` builds the operational system on top.

| This layer defines | A DESIGN.md defines |
|---|---|
| Approved identity colors and their meaning | Full palette, ramps, semantic roles, states, contrast pairs |
| Approved typefaces and fallbacks | Type scale, sizes, weights, line heights, tracking, responsive behavior |
| Logo invariants and prohibitions | Logo placement, sizing, and responsive treatment on a surface |
| Imagery territory | Imagery treatment, cropping, and overlay rules |
| Visual territory and references | A concrete design premise for one surface |

### Logo & Marks

**Optional.**

The marks that identify the brand, and the rules that never change.

When included:
- Primary mark and approved variants (wordmark, symbol, lockup), described in text
- Clear-space principle, expressed as a relationship rather than a pixel value (e.g., "clear space equal to the cap height of the wordmark")
- Minimum legible size, if one is established
- Immutable prohibitions (e.g., "never stretch, never recolor outside approved colors, never place on a busy photograph, never add effects")
- Where the source files live, if they are versioned somewhere

Screen-level placement, responsive switching between lockup and symbol, and header sizing are surface decisions. They belong in a `DESIGN.md`.

### Core Colors

**Required.** Accepted alias: `Colors`.

The approved identity colors. Typically 2 to 5.

Must include:
- Each color's name, exact value, and meaning
- Whether each is mandatory (identity-critical, must appear) or optional (available, not required)
- Color families to avoid, if any

There is no required primary, secondary, and accent trio. A brand with one color declares one color. Inventing an accent to fill a slot produces a brand asset nobody approved.

```markdown
### Core Colors

- **Ink** `#1A1C1E` (mandatory). The brand's voice in visual form: permanent,
  unhurried, never pure black.
- **Vermilion** `#B8422E` (mandatory). The single point of heat. Scarcity is the
  point; it means something because it is rare.
- **Limestone** `#F7F5F2` (optional). A warm ground, used when pure white feels
  clinical.

Avoid: saturated blues of any kind. Every competitor in the category owns one.
```

Do not assign application-level roles here. "Vermilion is the CTA color" is a decision one surface makes, and a presentation system may never have a CTA. State the meaning and let each `DESIGN.md` assign the role.

### Typefaces

**Required.** Accepted alias: `Typography`.

The approved type families.

Must include:
- Each family's name and its role in the identity (e.g., voice, data, code)
- Fallback stack for each
- Licensing or source status, and whether it has been verified

Do not include sizes, weights, line heights, or tracking. Those form a type scale, which is scoped to a surface and belongs in a `DESIGN.md`.

Licensing must be verified, not assumed. An unverified family should say so explicitly, because "approved" is a claim about rights the brand may not actually hold.

```markdown
### Typefaces

- **Public Sans**, the brand voice. Fallback: `-apple-system, Segoe UI, sans-serif`.
  Licensing: public domain (US Web Design System). Verified.
- **Space Grotesk**, technical data and metadata only. Fallback: `ui-monospace, monospace`.
  Licensing: SIL Open Font License 1.1. Verified.
```

### Photography & Illustration

**Optional.** Accepted alias: `Photography`.

The imagery territory.

When included:
- Mood: 3-5 descriptive words
- Subjects: what to photograph or illustrate
- Avoid: what never to show
- Illustration approach, if the brand uses illustration at all

### Art Direction

**Required.** Accepted alias: `Style`.

The brand's visual territory: the world it lives in, stated specifically enough that someone could design from it without asking follow-up questions.

Must include:
- Design keywords: 4-8 words (e.g., "Modular structure", "Evident grid", "Disciplined minimalism")
- Direction statement: 1-2 sentences (e.g., "The identity should communicate system, not decoration.")
- Visual territory: the concrete world the brand occupies, stated as a thing rather than a mood

This is required in 0.3. In 0.2 it was optional as `Style`, and an optional section is exactly where the most useful input goes missing. A `DESIGN.md` generated without it has nothing to work from but adjectives.

State territory as an object, not a temperature. "Editorial, archival, quietly authoritative" is a region. "The reference room of a research library: one ink, generous margins, no ornament" is a point.

Visual territory here is brand-wide. A single surface should narrow it into its own premise rather than repeat it verbatim, because the same identity legitimately reads differently as a marketing site, a product interface, and a printed document.

---

## Layer 4: Governance

**Optional layer.**

The rules about what the brand is allowed to say and commit to. Every section here is optional, because a brand may have none of these established yet. Omit rather than invent.

### Naming

**Optional.**

How new things get named.

When included:
- Naming pattern for products, features, and releases
- Capitalization and formatting rules
- Reserved words the brand owns, and words it will not use
- What requires approval before shipping

### Claims

**Optional.**

The statements the brand is permitted to make in public.

When included:
- Approved claims, each with the evidence or source that supports it
- Claims that require legal or leadership review before use
- Prohibited claims, including any the brand cannot substantiate

**This section must contain only claims a human has approved or that are backed by cited evidence.** An AI agent may draft candidates and label them as drafts. It must never record an unverified statement as approved. A fabricated approved claim is a liability, not a copywriting error.

### Accessibility Commitments

**Optional.**

The accessibility bar the brand commits to, as a promise rather than a measurement.

When included:
- Conformance target (e.g., "WCAG 2.2 AA on all public surfaces")
- Commitments that go beyond the target, if any
- Where exceptions are tracked, if they exist

This is the commitment, not the verification. Whether a specific color pair meets a contrast ratio is a design-system question, and `DESIGN.md` tooling already checks it. Recording the commitment here is what gives that check something to be measured against.

---

## How AI Tools Should Consume brand.md

### Single file

An AI agent encountering a single `brand.md` file should:

1. **Read frontmatter** for brand name, tagline, language, and `specVersion`
2. **Read Strategy** to understand what the brand is and who it is for (context for any decision)
3. **Read Voice > Tonal Rules** as system-prompt-level instructions for any text generation
4. **Read Voice > Phrases and Vocabulary** as few-shot examples and required terminology
5. **Read Governance > Claims** before asserting anything factual about the brand in public copy
6. **Read Visual** for approved primitives and art direction when producing anything visual

Each layer can be extracted independently:
- Writing a blog post? → Voice, plus Governance > Claims
- Naming a feature? → Governance > Naming, plus Voice > Vocabulary
- Preparing a pitch? → Strategy + Voice
- Building or restyling a UI? → see the next section

### When a DESIGN.md is present

`brand.md` is upstream of any `DESIGN.md`. The dependency runs one way: a `DESIGN.md` names the brand it expresses, and `brand.md` does not track its designs.

When both files apply to the surface being built:

- `brand.md` is authoritative for meaning, positioning, personality, voice, terminology, claims, and which visual primitives are approved
- `DESIGN.md` is authoritative for concrete visual and interaction decisions: palette, roles, states, type scale, layout, shape, elevation, components, motion
- A `DESIGN.md` may interpret the brand and may use a subset of approved primitives. It must not redefine an approved primitive with a contradictory value under the same meaning
- Conflicts should be reported to a human, not silently resolved, and updating one file must not automatically rewrite the other

Do not generate CSS, tokens, or component styles from `brand.md` alone when a `DESIGN.md` exists for that surface. Generating them from `brand.md` is what produces two competing design systems.

### Multiple files (hierarchy)

When multiple `brand.md` files exist in the directory tree:

1. **Discover** by walking up from the working directory, collecting all `brand.md` files
2. **Load the master first**, the root `brand.md` is the brand foundation
3. **Apply each child in order**, from root to leaf, each child narrows or overrides
4. **For sections present in the child**, use the child's version
5. **For sections missing in the child**, inherit from the nearest ancestor that defines them
6. **Read the `architecture` field** to understand coupling strength, which determines how much weight to give the parent versus the child
7. **Merge guardrails**, a child's Guardrails are additive. The parent's "cannot be" list applies to all descendants unless architecture is `independent`
8. **Merge accessibility commitments** at every architecture. A child may raise the bar, never lower it

The mental model: brand.md inherits like CSS. The master brand is the base stylesheet. Each product layer adds specificity. More specific wins for explicit declarations. Unset properties cascade down.

## Versioning

### File versioning

`version` is an integer that starts at 1. Increment it when the brand identity in this file is revised. This allows tools to detect when a brand has been updated.

`specVersion` records which version of this specification the file targets. Omit it and the file is treated as `0.2.0`.

### Specification versioning

The specification follows semantic versioning.

- **Patch** releases clarify wording without changing what a file may contain.
- **Minor** releases are additive. They may add sections, add optional frontmatter fields, rename a section while accepting the previous name as an alias, or relax an existing requirement. A file valid under the previous minor version stays valid.
- **Major** releases may remove a section, drop an alias, or add a requirement that older files cannot satisfy.

New required sections are additive when they are gated on `specVersion`. A file that does not declare `specVersion: "0.3.0"` is validated against 0.2 and is unaffected by requirements introduced here.

### Migrating 0.2 to 0.3

Nothing is forced. A 0.2 file keeps working indefinitely. To adopt 0.3:

1. Add `specVersion: "0.3.0"` to frontmatter
2. Add `Strategy > Audience`
3. Add `Strategy > References & Anti-References`
4. Rename `Visual > Style` to `Visual > Art Direction`, and fill in the visual territory if it was thin or absent. If the section did not exist, write it, since it is required in 0.3
5. Rename `Visual > Colors` to `Visual > Core Colors` and reduce it to approved identity colors. Move ramps, semantic roles, and application rules such as "use for CTAs" into the relevant `DESIGN.md`
6. Rename `Visual > Typography` to `Visual > Typefaces` and reduce it to families, fallbacks, and verified licensing. Move sizes, weights, and line heights into the relevant `DESIGN.md`
7. Optionally add `Voice > Vocabulary` and a `Governance` layer

Steps 5 and 6 are the only ones that remove content, and the content is not deleted, it moves downstream. If no `DESIGN.md` exists yet, keep the values in a scratch note until one does, or generate the `DESIGN.md` first.
