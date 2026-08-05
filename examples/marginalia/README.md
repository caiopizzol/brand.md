# Marginalia

A worked example of one brand expressed as two design systems.

Marginalia is fictional. It exists to demonstrate the boundary described in
[`spec/design-md-integration.md`](../../spec/design-md-integration.md), using files
that actually validate.

```
marginalia/
├── BRAND.md              identity: strategy, voice, primitives, governance
├── website/DESIGN.md     premise: an independent literary journal
└── product/DESIGN.md     premise: a research archive workstation
```

## What to look at

**One identity, two surfaces that do not match.** Both design systems come from the
same art direction ("the reference room of a research library") and neither quotes
it. The site is a document read once, so it uses a 34rem measure, 0px corners, and
no elevation. The product is an instrument operated daily, so it uses two panes,
3px corners, and a single tonal step. Same brand, different premise.

**Mirrored primitives, derived systems.** Both files repeat the brand's approved
colors at their exact values, because a `DESIGN.md` is self-contained by its own
spec and cannot delegate its tokens to another file. Each then derives what the
brand deliberately does not own: roles, ramps, states, scale, spacing, shape.

**The role mapping.** Brand colors are named for meaning (Ink, Vermilion). Design
tokens are named for role (`primary`, `tertiary`). Each Colors section carries the
mapping table, which is what makes the duplication auditable rather than accidental.

**Inverted grounds.** Limestone is the page background on the site and the
application chrome in the product, with white inverted between them. Both are
correct, and that is the reason role assignment cannot live in `BRAND.md`.

**A one-way link.** Each `DESIGN.md` declares `brand: ../BRAND.md` in frontmatter
and repeats it in the Overview prose. `BRAND.md` does not list its designs.

## Validating

```bash
npx -p @google/design.md designmd lint examples/marginalia/website/DESIGN.md
npx -p @google/design.md designmd lint examples/marginalia/product/DESIGN.md
```

Both report zero errors and zero warnings against `@google/design.md` 0.4.0.

`BRAND.md` has no linter yet, so `examples/marginalia/BRAND.md` is validated by
review only. It is a complete `specVersion: "0.3.0"` file with every required
section, and it doubles as the reference for what 0.3 asks for.
