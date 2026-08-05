---
name: brand
description: Create or update a brand.md file: brand strategy, audience, positioning, personality, messaging, voice, approved visual primitives, naming, claims, and sub-brand inheritance. Use for verbal and strategic brand identity. For the applied visual system (design tokens, palettes, type scales, layout, components, motion) this skill hands off to a DESIGN.md rather than writing one into brand.md.
---

# brand.md Generator

Generate a `brand.md` file, the open standard for brand identity, at spec version
0.3.0. Full format: [`spec/brand-md.md`](../../spec/brand-md.md).

## Scope

This skill produces durable identity: the things that should survive a complete
visual redesign without repositioning the company.

**In scope:** strategy, audience, positioning, personality, references, promise,
guardrails, voice, messaging, vocabulary, tonal rules, approved visual primitives
(identity colors, typefaces, logo invariants, imagery territory, art direction),
and governance (naming, claims, accessibility commitments).

**Out of scope:** color ramps, semantic color roles, hover and focus states, type
scales, spacing, layout, shape language, elevation, components, motion, UI
iconography, responsive behavior. Those belong in a `DESIGN.md`, and Phase 4 hands
off to one.

Never write an applied design system into `brand.md`. Two files defining the same
palette is the failure this boundary exists to prevent.

## Process

### Phase 0: Discovery

Before anything else, survey what already exists.

1. **Walk up** from the working directory to the project root, collecting
   `brand.md` files. If a parent exists, read it fully. It is the master brand and
   the new file will be a product or sub-brand that inherits from it.
2. **Walk down** from the project root for `DESIGN.md` files, skipping
   `node_modules`, `dist`, `build`, and `vendor`. These are existing expressions of
   the brand.
3. **Report** what you found before proceeding: "Found a master brand.md for Acme
   at the project root, and two design systems at website/DESIGN.md and
   product/DESIGN.md. I will generate a product-level brand.md that inherits from
   the master, and leave both design systems alone."
4. **Never rewrite a DESIGN.md in this phase.** It is owned downstream. If the brand
   you are about to write would contradict one, note it and raise it in Phase 5.

When generating a product brand:
- The parent's layers are your foundation
- Generate a **sparse file**, only the sections where the product diverges
- The parent's Guardrails always apply. You can tighten them, not loosen them
- Accessibility commitments always apply and can only be raised
- Ask which architecture fits: `branded-house`, `endorsed`, `sub-brand`, or
  `independent`

### Phase 1: Research

Research the brand independently before asking anything. This is the work a
strategist does in week one.

1. **If a URL is provided**, search and scrape to understand what the product
   actually does, not just the marketing
2. **Find 3-5 direct competitors** and read their homepages, about pages, and
   pricing pages, since that is where positioning lives
3. **Find audience discussions** in forums, threads, and reviews. What do people
   actually care about, and what frustrates them?
4. **Identify the market gap.** What pattern do all competitors follow, and where is
   the whitespace?
5. **Collect candidate references** from any industry, including non-software ones.
   These feed a required section, so gather them deliberately rather than as an
   afterthought.

Do 5-8 searches from different angles. For product brands, research the product's
market, not the parent company's.

### Phase 2: Interview

Present findings and ask the founder to react. This is a hypothesis, not a form. Use
research to propose defaults they can accept or change.

**Seed:** brand name, one-line description in their words, URL.

**For product brands:** how this relates to the parent, which architecture fits,
what should be inherited versus different. Skip questions about anything that will
be inherited.

**Market:** category (be specific), competitors, market gap, what the brand is NOT.

**Audience:** who they are and what they are trying to do, what they already
believe, what they are skeptical of, and who the brand is explicitly not for.

**Identity:** archetype (offer 2-3), brand attributes, tone words, what the brand
must communicate that the market is not saying, what it must never communicate.

**References:** propose 2-4 references and 1-3 anti-references from research. For
each, get agreement on the specific trait to borrow and the trait not to copy. A
bare list of admired brands is not usable output.

**Visual primitives:** approved colors and their meaning, which are mandatory,
approved typefaces, and whether licensing has been verified. Ask, do not invent. Do
not ask about ramps, scales, or component styling.

**Governance:** naming rules, claims the brand can substantiate and the evidence
behind each, accessibility target. Skip any the founder has not established.

**Founder context:** why they are building this, where it goes in 3 years, reference
and anti-reference brands.

**Language:** en / pt-BR.

### Phase 3: Generation

Write the file per [`spec/brand-md.md`](../../spec/brand-md.md). Frontmatter carries
`specVersion: "0.3.0"`.

```
## Strategy    Overview, Audience, Positioning, Personality,
               References & Anti-References, Promise, Guardrails
## Voice       Identity, Tagline & Slogans, Manifesto?, Message Pillars,
               Phrases, Vocabulary?, Social Bios?, Tonal Rules
## Visual      Logo & Marks?, Core Colors, Typefaces,
               Photography & Illustration?, Art Direction
## Governance? Naming?, Claims?, Accessibility Commitments?
```

Sections marked `?` are optional. Everything else is required at 0.3.

Each layer builds on the one before it. Strategy first, then Voice from Strategy,
then Visual informed by both.

Constraints specific to the narrowed Visual layer:

- **Core Colors:** 2-5 approved colors with name, exact value, meaning, and
  mandatory or optional status. No primary, secondary, and accent trio is required,
  so do not invent an accent to fill a slot. No application roles, because "use for
  CTAs" is a per-surface decision.
- **Typefaces:** families, roles, and fallbacks only. No sizes, weights, or line
  heights. Mark licensing verified only if it was actually checked, otherwise write
  "unverified".
- **Art Direction:** state visual territory as a concrete object, not a mood. "The
  reference room of a research library: one ink, generous margins, no ornament" is
  usable. "Editorial, archival, quietly authoritative" is not.
- **Claims:** only what a human approved or what has cited evidence. Draft
  candidates must be labeled drafts. Never record an unverified statement as
  approved.

A complete reference file is at
[`examples/marginalia/brand.md`](../../examples/marginalia/brand.md).

### Phase 4: Design handoff (opt-in)

Only after the `brand.md` is written and the user has confirmed it.

Ask whether they want a `DESIGN.md` for a specific surface. If yes, read
[`references/design-md-handoff.md`](references/design-md-handoff.md) and follow it.
If no, stop. Do not persist visual system recommendations into `brand.md` as a
consolation prize.

### Phase 5: Alignment report

If Phase 0 found existing `DESIGN.md` files and this brand changed materially,
report which ones may now be out of step, and how. Do not edit them.

State plainly that this is a review, not an enforced check. Nothing validates
brand-to-design consistency automatically today.

## Quality standards

- Every section should read as though a senior strategist wrote it. Never generic.
- Ground positioning in competitive whitespace, not in what sounds good.
- The essence is one specific concept, never a word like "quality" or "innovation".
- Tonal rules must be directly usable as system prompt modifiers.
- Phrases must be ownable. Swap in a competitor's name and the line should break.
- References must name the trait to borrow and the trait to avoid.
- The "what we are not" sections matter as much as the positive ones. They are what
  prevent drift.
- Be opinionated. A strategist has a point of view. Do not hedge.
- Positioning must include explicit negations.
- The Guardrails litmus test must be one sentence anyone in the org can apply.

## Never

- Never write ramps, roles, type scales, spacing, components, or motion into
  `brand.md`
- Never modify a `DESIGN.md` during brand generation
- Never invent an approved claim, a verified font license, or a color the founder
  did not approve
- Never resolve a brand-to-design conflict silently. Report it and ask
