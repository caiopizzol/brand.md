---
name: brand
description: Create or update BRAND.md files for strategy, audience, positioning, personality, messaging, voice, approved identity primitives, governance, and sub-brand inheritance. Use for durable verbal and strategic identity. Hand applied visual systems such as tokens, layout, components, and motion to DESIGN.md.
---

# BRAND.md Generator

Create or update `BRAND.md` at spec version 0.3.0. The format and section
requirements are defined in [`spec/brand-md.md`](../../spec/brand-md.md).

`BRAND.md` owns identity that should survive a complete visual redesign.
`DESIGN.md` owns how that identity is applied to a particular surface. Never put
ramps, semantic roles, type scales, spacing, layout, components, or motion in
`BRAND.md`.

## Workflow

### 1. Resolve existing context

Walk from the working directory to the project root and read every applicable
`BRAND.md`, root to leaf. Accept a legacy lowercase `brand.md` only when no
`BRAND.md` exists in the same directory. Compare exact directory entry names;
two successful path probes may still refer to one file on a case-insensitive file
system. If both spellings are distinct entries, report the conflict and stop. For
a child brand, write only sections that differ from the effective parent.

Ask which architecture applies: `branded-house`, `endorsed`, `sub-brand`, or
`independent`. Guardrails inherit unless the child is `independent`; inherited
guardrails may be tightened but not loosened. Accessibility commitments always
inherit and may only be raised.

Discover nearby `DESIGN.md` paths, skipping generated and dependency directories.
Read and attribute them only when materially updating a brand, checking alignment,
or performing the design handoff. A design belongs to this brand when its `brand`
frontmatter resolves to this file. Treat location-based attribution as an
inference.

### 2. Gather evidence

Research only what is missing. Relevant sources may include the product, direct
competitors, audience discussions, reviews, and references outside the category.
Use enough evidence to understand the category, audience, competitive pattern,
and credible whitespace. Do not satisfy a fixed search quota.

Derive what the evidence supports. Ask only unresolved decisions, propose useful
defaults, skip inherited or irrelevant sections, and ask in small clusters. Never
invent approved claims, verified licenses, or approved colors.

At minimum, resolve:

- the brand, product, audience, category, and relationship to any parent;
- positioning, explicit negations, personality, references, and anti-references;
- voice, messaging, and identity guardrails;
- approved identity colors, typefaces, logo rules, and art direction;
- any established naming, claims, or accessibility commitments.

For each reference, record the trait to borrow and the trait not to copy. Ask about
identity primitives, not design-system roles or styling.

### 3. Generate the brand file

Write `specVersion: "0.3.0"` and follow the spec. The required shape is:

```text
Strategy: Overview, Audience, Positioning, Personality,
          References & Anti-References, Promise, Guardrails
Voice:    Identity, Tagline & Slogans, Message Pillars, Phrases, Tonal Rules
Visual:   Core Colors, Typefaces, Art Direction
```

Optional sections are Manifesto, Vocabulary, Social Bios, Logo & Marks,
Photography & Illustration, and the Governance layer with Naming, Claims, and
Accessibility Commitments.

Keep identity primitives narrow:

- Core Colors contain 2 to 5 approved colors with exact values, meaning, and
  mandatory or optional status, never surface roles.
- Typefaces contain families, roles, and fallbacks, not a scale. Mark licensing
  verified only when it was checked.
- Art Direction names a concrete visual territory, not a list of adjectives.
- Claims distinguish approved, evidenced claims from draft candidates.

Use [`examples/marginalia/BRAND.md`](../../examples/marginalia/BRAND.md) when a
complete example is useful.

### 4. Hand off to design only when requested

After the user confirms the brand, offer a `DESIGN.md` for a named surface. If they
accept, read and follow
[`references/design-md-handoff.md`](references/design-md-handoff.md). Otherwise
stop. Never add applied design recommendations to `BRAND.md` as a substitute.

### 5. Report possible downstream drift

After a material brand update, report linked or inferred `DESIGN.md` files that may
need review and describe the potential conflict. Do not edit them unless the user
requests the design handoff. This is a review convention, not an automated check.

## Non-negotiable checks

- The output follows the specification and contains no generic filler.
- Positioning is grounded in evidence and includes explicit negations.
- Phrases are ownable; replacing the brand name with a competitor should break
  them.
- Tonal rules are usable instructions, and guardrails give a practical litmus
  test.
- No applied tokens, roles, components, or motion appear in `BRAND.md`.
- No brand-to-design conflict is silently resolved.
