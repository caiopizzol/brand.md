# BRAND.md and DESIGN.md

**Applies to:** BRAND.md specification 0.3.0
**Status:** Draft

[DESIGN.md](https://github.com/google-labs-code/design.md) is an open format for describing a visual and interaction system to coding agents. It pairs machine-readable design tokens with prose that explains how to apply them, and it ships a CLI that lints, diffs, and exports.

`BRAND.md` and `DESIGN.md` are complementary, not competing. This document defines the boundary, the link between them, and the rules for keeping them consistent.

## The model

> `BRAND.md` owns durable identity intent and primitives.
> `DESIGN.md` owns a self-contained visual system for one surface.

The dependency runs one way. A `DESIGN.md` declares which brand it expresses. A `BRAND.md` does not track its designs.

```
BRAND.md                      ← one identity
├── website/DESIGN.md         ← an independent literary journal
├── product/DESIGN.md         ← a research archive workstation
└── decks/DESIGN.md           ← a museum exhibition catalog
```

One brand, several surfaces, each a legitimate and different expression of the same identity. That is the case the boundary has to support, and it is why the brand file cannot own the design system.

## Ownership

| Concern | BRAND.md | DESIGN.md |
|---|---|---|
| Purpose, origin, ambition | Owns | |
| Audience and market | Owns | |
| Positioning and differentiation | Owns | |
| Brand architecture and sub-brands | Owns | |
| Personality and archetype | Owns | |
| References and anti-references | Owns | Narrows into a surface premise |
| Voice, tonal rules, messaging, taglines | Owns | |
| Vocabulary and terminology | Owns | Uses it in UI copy |
| Naming rules and approved claims | Owns | |
| Accessibility commitment | Owns the commitment | Owns the measurement |
| Approved identity colors and their meaning | Owns | Mirrors, then extends |
| Approved typefaces, fallbacks, licensing | Owns | Mirrors, then builds a scale |
| Logo invariants and prohibitions | Owns | Owns placement and responsive treatment |
| Imagery territory | Owns | Owns treatment and cropping |
| Full palette, ramps, semantic roles, states | | Owns |
| Type scale, weights, line heights, tracking | | Owns |
| Layout, spacing, grid | | Owns |
| Shape language, elevation, motion | | Owns |
| Components and interaction states | | Owns |
| UI iconography | | Owns |
| Render-level do's and don'ts | | Owns |
| Verbal do's and don'ts | Owns | |
| Tokens, export, lint, diff | | Owns |

The test, applied to any single item:

> If it should survive a complete visual redesign, it belongs in `BRAND.md`.
> If it could change during that redesign without repositioning the company, it belongs in `DESIGN.md`.

## The link

A `DESIGN.md` declares its brand with a relative path in frontmatter:

```yaml
---
name: Marginalia Product Interface
description: Visual system for the authenticated reading and annotation workspace.
brand: ../BRAND.md
colors:
  primary: "#1B1A17"
---
```

The token key is the role, not the brand's name for the color. `#1B1A17` is the
brand's Ink, mirrored here and assigned the `primary` role by this surface. See
[Brand colors are named by meaning, design tokens by role](#brand-colors-are-named-by-meaning-design-tokens-by-role).

Include the relationship in prose as well, so it survives any tool that only reads the body:

```markdown
## Overview

This design system expresses the [Marginalia brand](../BRAND.md) for the
authenticated reading workspace.
```

### Why this is safe

`brand` is not part of the DESIGN.md schema. It is an extension key, and the format is explicit that it accepts custom keys and structures. Verified against the published CLI at version 0.4.0:

- A `brand` scalar produces no errors and no warnings. The only finding on an otherwise valid file is the normal token summary.
- Unknown top-level keys are retained rather than dropped.
- The `token-like-ignored` rule, which warns about unrecognized keys, fires only when the value is an **object** whose leaves look like hex colors or CSS dimensions, or whose keys are typography property names. Flat scalars are excluded by design, so a string path is silent by construction rather than by luck.
- `diff` and `export` ignore unknown keys.

One documentation gap: the spec's "Consumer Behavior for Unknown Content" table covers unknown sections, token names, and component properties, but has no row for unknown top-level frontmatter keys. The implementation clearly intends to support them. A small upstream addition to that table would make the guarantee explicit. This is worth doing but is not a blocker.

A structured value such as a `designs:` map would be the riskier shape, which is one more reason to keep the link a single scalar.

### Why there is no reverse link

A `design:` field in `BRAND.md` cannot represent one brand with several designs, and a list of them becomes stale the moment a surface is added, renamed, or removed. Finding the designs that belong to a brand is a downward directory walk, which needs no maintenance. Skip vendored and build directories (`node_modules`, `dist`, `vendor`, `build`) when walking.

Discovery does not go stale, but **attribution can still be wrong**, so the walk is two steps rather than one. Walking finds *candidates*. Associating a candidate with a brand means resolving its `brand` path and checking that it points at this file. A repository can easily contain a `DESIGN.md` that belongs to a nested sub-brand, an example or test fixture, an unlinked design system, or one explicitly linked to a different brand. Treating every descendant as an expression of the nearest brand misattributes all four.

When a candidate has no `brand` field, it is unlinked. It may be inferred to belong to the nearest ancestor `BRAND.md`, but the inference must be labeled as an inference wherever it is reported.

If real usage later proves that discovery is not enough, a structured field can be added then. It is not needed now.

### Scope

There is deliberately no `scope` field. The directory path, `name`, `description`, and Overview already identify the surface. Add a dedicated field only when a consumer needs to branch on it programmatically.

## Mirror primitives, derive the system, declare provenance

DESIGN.md describes itself as self-contained, and its tokens are normative. A design system that omitted its own colors and told the reader to go look at another file would break that contract.

It would not, however, be caught. Verified against 0.4.0: a `DESIGN.md` with no `colors` block at all lints with zero errors, zero warnings, and exit status 0. Not even the `missing-primary` warning fires, because that rule needs a `colors` block to inspect. So the self-contained contract is a contract, not an enforced rule, and an agent that delegates its colors upstream produces a file that passes lint and still fails the reader.

So a linked `DESIGN.md` still contains the brand colors it uses and the font families it uses. That is not accidental overlap. It is controlled duplication with a defined direction:

1. **Mirror** the approved primitives it needs, at their exact values. Copy, do not reinterpret.
2. **Derive** the operational system on top: ramps, semantic roles, states, contrast pairs, type scale, spacing, shape, elevation, components, motion.
3. **Declare** provenance through the `brand` field and the Overview sentence, so a reader knows which values were inherited and which were designed here.

Two rules follow:

- A `DESIGN.md` may use a **subset** of approved primitives. A presentation system does not need every color the brand approved.
- A `DESIGN.md` must not **redefine an approved primitive with a contradictory value under the same meaning**. Introducing a different "Vermilion" is a brand change, and a brand change needs a human.

### Brand colors are named by meaning, design tokens by role

`BRAND.md` names a color for what it means: Ink, Vermilion, Limestone. `DESIGN.md`
names it for the job it does on this surface: `primary`, `tertiary`, `neutral`.

Do not carry the brand names across as token keys. The DESIGN.md spec requires a
`primary` color, and its linter warns when one is missing:

```
warning  missing-primary  No 'primary' color defined. The agent will
                          auto-generate key colors, reducing your control
                          over the palette.
```

A design system whose color tokens are `ink` and `vermilion` trips that warning
and loses the semantic layer that makes roles reassignable per surface. Mirror the
value under the role key, and record the mapping in the Colors prose:

```markdown
| Role | Brand color | Value |
|---|---|---|
| `primary` | Ink (mandatory) | `#1B1A17` |
| `tertiary` | Vermilion (mandatory) | `#B8422E` |
| `neutral` | Limestone | `#F4F1EA` |
```

The mapping table is what makes the duplication auditable. Without it, nobody can
tell an inherited value from an invented one.

The same rule explains why role assignment cannot live upstream. Ink is `primary`
on both Marginalia surfaces, but Limestone is the page ground on the site and the
application chrome in the product, with white inverted between them. Both are
correct. A brand file cannot know which.

Every color a `DESIGN.md` declares should also be referenced by at least one
component, or the linter flags it:

```
warning  orphaned-tokens  'outline' is defined but never referenced by any component.
```

An approved brand color the surface does not need should simply be left out, not
declared and left unused.

## Synthesize the Overview, do not quote it

The Overview is the most important section of a `DESIGN.md`. It should be specific to its medium, audience, and task.

Copying the brand's art direction verbatim into every design file produces three identical Overviews for three surfaces that should not look identical. Narrow instead:

| Layer | Text |
|---|---|
| BRAND.md Art Direction | The reference room of a research library: one ink, generous margins, no ornament. |
| website/DESIGN.md Overview | An independent literary journal. Long measure, visible white space, a single accent used only in pull quotes. |
| product/DESIGN.md Overview | A research archive workstation. Dense, keyboard-first, calm under long sessions, chrome that recedes behind the text being read. |

Each is recognizably the same identity. None is a copy. The inputs to that synthesis are the brand's audience, personality, references and anti-references, and art direction, plus the medium and the job the surface does.

## Conflicts

When both files exist and disagree, classify before acting:

| Situation | What it means | Action |
|---|---|---|
| Approved primitive absent | The surface did not need it | Fine, no action |
| Mandatory primitive absent | Identity-critical color or typeface missing | Report, ask |
| Derived value | Ramp, state, or role built on a primitive | Fine, expected |
| Contradictory value | Same meaning, different value | Report, ask, do not resolve silently |
| Prohibited pattern present | Violates an identity-level guardrail | Report, ask |

Report the result as an alignment review:

```
Brand alignment
- Mandatory primitives present: Ink yes, Vermilion yes
- Approved typefaces used: yes (Public Sans, Space Grotesk)
- Logo prohibitions preserved: not applicable, no logo in this surface
- Contradictions requiring approval: none
```

**This is a convention, not an enforcement guarantee.** Nothing checks it automatically today. `BRAND.md` has no linter, and the DESIGN.md CLI has no knowledge of `BRAND.md`. An agent following this document performs the review; a human decides.

Updating one file must never silently rewrite the other.

## What this does not solve

Named so nobody assumes otherwise.

**Cross-file validation is not automated.** "Every mandatory brand color appears in the design system" is mechanically checkable, but no tool does it. A future checker would also need to normalize colors before comparing, since `#B8422E`, `rgb(184, 66, 46)`, and an `oklch()` equivalent are the same color and different strings.

**Visual conformance is unsolved.** `designmd lint` validates the document: token structure, references, section order, contrast pairs. It does not inspect a rendered page, CSS output, screenshots, logo misuse, photography, or whether components actually consume the tokens they declare. Scoping a future brand checker to verbal content is reasonable; visual conformance remains an open capability, not a delegated one.

**Design inheritance is out of scope.** `BRAND.md` architecture types govern inheritance between brand files only. Mapping them onto token inheritance is tempting and unreliable: an `endorsed` product might share every token, some, or none, and a `branded-house` product might need a distinct system for platform or accessibility reasons. DESIGN.md is self-contained and has no inheritance semantics, and adding them would require settling merge order, token deletion, component overrides, cycles, missing parents, and export and diff behavior. That is a design-system composition feature and it should wait for real examples.

## Validating a DESIGN.md

```bash
npx -p @google/design.md designmd lint DESIGN.md
```

Both `design.md` and `designmd` are published bin names and both work on macOS, Linux, and Windows. Prefer `designmd` in scripts and skill instructions: upstream documents the dot-free alias because the `.md` suffix can collide with Windows file associations during command resolution.

With Bun:

```bash
bunx --package @google/design.md designmd lint DESIGN.md
```

## Migrating a 0.2 brand file that contains visual content

A legacy 0.2 `brand.md` typically holds a palette with usage rules and a type scale. Rename it to the canonical `BRAND.md` when convenient, and update any relative links at the same time. The visual content is not deleted, it moves downstream.

1. Generate or open the `DESIGN.md` for the surface that needs it
2. Move ramps, semantic roles, and application rules ("use for CTAs", hover states) into that file
3. Move sizes, weights, line heights, and tracking into its `typography` tokens
4. Reduce `BRAND.md` to approved primitives: colors with meaning and mandatory or optional status, typefaces with fallbacks and verified licensing
5. Add `brand: <relative-path>` to the `DESIGN.md`, plus the Overview provenance sentence
6. Run the linter

If there is no `DESIGN.md` yet, do step 1 first. Do not delete values from `BRAND.md` before they have somewhere to live.

## Worked example

[`examples/marginalia/`](../examples/marginalia/) contains one brand and two surfaces that share an identity and look different on purpose. Both `DESIGN.md` files lint clean against 0.4.0.
