# Design handoff: BRAND.md to DESIGN.md

Use this checklist only after the user has approved a `BRAND.md` and requested a
`DESIGN.md` for a named surface. The full ownership contract is
[`spec/design-md-integration.md`](../../../spec/design-md-integration.md).

## 1. Confirm the inputs

Identify the approved brand, target surface, and target `DESIGN.md`. If the target
already exists, read it fully and preserve decisions that do not conflict with the
brand.

Resolve the effective brand root to leaf. A child section overrides its parent and
a missing section inherits. Guardrails inherit unless the child is `independent`;
accessibility commitments always inherit. Merge applicable commitments additively
and never loosen them.

## 2. Write a surface-specific premise

Synthesize the Overview from the effective brand's audience, personality,
references, anti-references, and art direction, plus the surface's purpose. Do not
copy art direction verbatim into every design.

For example, one brand territory can become an independent literary journal for a
marketing site and a dense research archive workstation for a product. Each is a
specific expression of the same identity.

## 3. Mirror primitives and derive the system

Copy approved colors and typefaces at their exact values. Use only the subset the
surface needs. Never change an approved primitive under the same meaning.

Name DESIGN.md tokens by their role, such as `primary`, `secondary`, `surface`, or
`outline`, not by the brand color name. Record what was mirrored and what was
derived in the Colors prose:

```markdown
| Role | Brand color | Value | Origin |
|---|---|---|---|
| `primary` | Ink | `#1B1A17` | Mirrored |
| `secondary` | none | `#5C574E` | Derived from Ink |
```

Derive surface-specific ramps, semantic roles, type scale, layout, spacing, shapes,
elevation, motion, components, iconography, logo placement, imagery treatment, and
render-level do's and don'ts. These belong only in `DESIGN.md`.

Follow the upstream section order:

```text
Overview -> Colors -> Typography -> Layout -> Elevation & Depth
         -> Shapes -> Components -> Do's and Don'ts
```

## 4. Add the one-way link

Add a scalar path in DESIGN.md frontmatter and repeat the relationship in Overview:

```yaml
brand: ../BRAND.md
```

Do not add a reverse list to `BRAND.md` or a redundant `scope` field.

## 5. Lint and review alignment

Run:

```bash
bunx --package @google/design.md designmd lint path/to/DESIGN.md
```

Fix every error and warning, or explain any accepted warning. Then report:

- mandatory primitives present or intentionally missing;
- approved typefaces used;
- relevant logo and imagery rules preserved;
- accessibility commitment checked against declared component pairs;
- contradictions that require human approval.

The linter validates the document, not the rendered product or its consistency with
`BRAND.md`. Never describe clean lint as visual or cross-file validation.

## Conflict rules

- An unused optional primitive is acceptable.
- A missing mandatory primitive must be reported.
- Derived ramps, states, and roles are expected.
- A different value with the same brand meaning must be reported, not reconciled.
- A prohibited pattern must be reported.

Never edit `BRAND.md` merely to make a design system pass. If the approved brand
needs to change, handle that as a separate decision.
