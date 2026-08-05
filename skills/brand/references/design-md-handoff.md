# Design handoff: brand.md to DESIGN.md

Read this only when generating or updating a `DESIGN.md` from an approved
`brand.md`. Full contract: [`spec/design-md-integration.md`](../../../spec/design-md-integration.md).

`DESIGN.md` is an open format from Google Labs for describing a visual and
interaction system to coding agents. It pairs YAML design tokens with prose and
ships a linter.

## Preconditions

1. The `brand.md` exists and the user has confirmed it
2. The user asked for a `DESIGN.md`, for a named surface
3. You know which surface: marketing site, product interface, docs, presentations,
   something else

If any of these is missing, stop and ask. Do not generate a design system nobody
requested.

## Resolve the brand first

1. Walk up from the target directory, collecting every `brand.md`
2. Apply them root to leaf. A child's section overrides the parent's; a missing
   section inherits
3. Merge Guardrails additively. Merge accessibility commitments additively, and
   never loosen either
4. The result is the effective brand. Work from that, not from a single file

If an existing `DESIGN.md` is present at the target path, read it fully first. You
are updating it, not replacing it, and its existing decisions deserve to survive
unless they conflict with the brand.

## Ownership

Take from the brand, do not reinvent:

- Approved identity colors, at their exact values
- Approved typefaces, roles, and fallbacks
- Logo invariants and prohibitions
- Imagery territory
- Audience, personality, references and anti-references, art direction

Decide here, because the brand deliberately does not:

- Semantic color roles, ramps, states, contrast pairs
- Type scale: sizes, weights, line heights, tracking, responsive behavior
- Layout, spacing, grid
- Shape language, elevation, motion
- Components and their states
- UI iconography
- Logo placement and responsive treatment on this surface
- Imagery treatment and cropping
- Render-level do's and don'ts

## Steps

### 1. Write the premise, do not copy the art direction

The Overview is the most important section. Synthesize a premise specific to this
surface from the brand's audience, personality, references and anti-references, and
art direction, plus the medium and the job the surface does.

Never paste the brand's visual territory into every design file. Three surfaces
would get three identical Overviews and should not.

| Source | Text |
|---|---|
| brand.md Art Direction | The reference room of a research library: one ink, generous margins, no ornament. |
| Marketing site premise | An independent literary journal. Long measure, visible white space, one accent used only in pull quotes. |
| Product premise | A research archive workstation. Dense, keyboard-first, calm over long sessions, chrome that recedes behind the text. |

State the premise as a concrete object. A named reference carries its own negative
constraints: a model knows what a lecture handout is and also knows it does not
glow. Adjectives carry none of that.

### 2. Mirror the primitives

Copy the approved values exactly. Do not adjust, harmonize, or "improve" them.

Use a **subset** if the surface does not need all of them. A presentation system may
never need every approved color.

Never redefine an approved primitive with a contradictory value under the same
meaning. A different Vermilion is a brand change and needs a human.

### 3. Name tokens by role, not by brand name

`brand.md` names colors for meaning. `DESIGN.md` names them for the job they do
here. Token keys must be roles: `primary`, `secondary`, `tertiary`, `neutral`,
`surface`, `outline`.

A `primary` color is required by the DESIGN.md spec, and the linter warns when it is
missing. Tokens named `ink` and `vermilion` trip that warning and lose the semantic
layer.

Record the mapping in the Colors prose so inherited values can be told apart from
derived ones:

```markdown
| Role | Brand color | Value | Origin |
|---|---|---|---|
| `primary` | Ink (mandatory) | `#1B1A17` | Mirrored |
| `tertiary` | Vermilion (mandatory) | `#B8422E` | Mirrored |
| `secondary` | none | `#5C574E` | Derived from Ink |
```

Every declared color should be referenced by at least one component, or the linter
flags it as orphaned. If the surface does not need an approved color, leave it out
rather than declaring it unused.

### 4. Build the system

Derive tokens and prose for each section. Sections must appear in this order, and
the linter warns when they do not:

```
Overview → Colors → Typography → Layout → Elevation & Depth
        → Shapes → Components → Do's and Don'ts
```

Custom sections such as `## Motion`, `## Iconography`, or `## Logo` are permitted
anywhere and are exempt from the ordering rule.

Write prose for every section, not just tokens. The tokens are the values; the prose
is why they exist and how to apply them, and it is what an agent actually reads.

Derive the Do's and Don'ts from the brand's guardrails, anti-references, and this
surface's premise. Render-level only here. Identity-level prohibitions stay upstream.

### 5. Link back

Add the brand path to frontmatter as a scalar:

```yaml
---
name: Marginalia Workstation
description: Visual system for the authenticated reading and annotation workspace.
brand: ../brand.md
---
```

Repeat it in the Overview prose so it survives tools that only read the body:

```markdown
This design system expresses the [Marginalia brand](../brand.md) for the
authenticated reading workspace.
```

Do not add a reverse link in `brand.md`. One brand has many designs, and a
maintained list goes stale.

Do not add a `scope` field. The path, `name`, `description`, and Overview already
identify the surface.

### 6. Lint

```bash
npx -p @google/design.md designmd lint path/to/DESIGN.md
```

With Bun:

```bash
bunx --package @google/design.md designmd lint path/to/DESIGN.md
```

Both `design.md` and `designmd` are published bin names and both work on macOS,
Linux, and Windows. Prefer `designmd`: upstream documents the dot-free alias because
the `.md` suffix can collide with Windows file associations.

Fix every error. Fix warnings too, or state why one is being accepted. Common ones:

| Rule | Meaning |
|---|---|
| `missing-primary` | No `primary` color. Assign the role |
| `orphaned-tokens` | Color declared but unreferenced. Use it or drop it |
| `section-order` | Known sections out of spec order |
| Contrast findings | A component's text and background pair. Check against the brand's accessibility commitment |

The linter validates the document. It does not check a rendered page, CSS output,
logo misuse, photography, or whether components actually consume their tokens. A
clean lint is not a claim that the surface looks right.

### 7. Report alignment

```
Brand alignment
- Mandatory primitives present: Ink yes, Vermilion yes
- Approved typefaces used: yes (Public Sans, Space Grotesk)
- Logo prohibitions preserved: not applicable, no logo on this surface
- Accessibility commitment (WCAG 2.2 AA): all component pairs pass
- Contradictions requiring approval: none
```

This is a convention, not an enforced check. Nothing validates it automatically:
`brand.md` has no linter and the DESIGN.md CLI cannot see `brand.md`. Say so.

## Conflicts

| Situation | Action |
|---|---|
| Approved primitive unused | Fine, the surface did not need it |
| Mandatory primitive missing | Report, ask |
| Derived value (ramp, state, role) | Fine, expected |
| Same meaning, different value | Report, ask, do not resolve |
| Prohibited pattern present | Report, ask |

Never edit `brand.md` to resolve a conflict with a design system. The dependency
runs one way. If the brand is genuinely wrong, that is a separate conversation with
the user.

## Out of scope

**Design inheritance.** A product's `DESIGN.md` does not inherit from its parent's.
`brand.md` architecture types govern brand files only, and mapping them onto tokens
is unreliable: an `endorsed` product might share every token, some, or none.
Generate each design system as self-contained.

**Cross-file validation.** No tool checks that mandatory brand colors appear in a
design system. A future one would need to normalize color formats first, since
`#B8422E` and its `rgb()` and `oklch()` equivalents are the same color and different
strings.

## Worked example

[`examples/marginalia/`](../../../examples/marginalia/) is one brand as two design
systems that deliberately do not match. Both lint clean.
