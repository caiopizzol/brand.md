# BRAND.md

An open standard for brand identity files.

`BRAND.md` lives in a project and gives AI tools durable context about how a brand
looks, sounds, and behaves. Like `AGENTS.md` provides coding instructions,
`BRAND.md` provides brand strategy, voice, approved identity primitives, and
governance.

## Install and run

Add the Claude Code marketplace, install the plugin, then invoke the skill:

```text
/plugin marketplace add caiopizzol/brand.md
/plugin install brand-md@brand-md
/brand-md:brand
```

To test the plugin from a local clone:

```bash
git clone https://github.com/caiopizzol/brand.md
claude --plugin-dir ./brand.md
```

## Example

This abbreviated excerpt is not a conformant file. See the
[complete Marginalia example](examples/marginalia/BRAND.md) for every required
section.

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

### Positioning
Category: Zero-downtime deployment infrastructure.
Not a CI/CD pipeline. Not a hosting provider. Not DevOps consulting.

## Voice

### Tonal Rules
- Write like an engineer explaining to another engineer.
- Never use "revolutionary" or "game-changing."

## Visual

### Core Colors
- Deep Navy `#0F172A` (mandatory): the brand's weight and steadiness

### Art Direction
Visual territory: an aircraft maintenance log. Plain, exact, no ornament.
```

The format has four layers: Strategy, Voice, Visual, and optional Governance. It
also supports sparse product and sub-brand files that inherit from a parent. The
[specification](spec/brand-md.md) defines all sections, hierarchy rules, and version
behavior. Files without `specVersion` continue to be interpreted as 0.2.

## Relationship to DESIGN.md

`BRAND.md` owns identity that should survive a complete visual redesign.
[`DESIGN.md`](https://github.com/google-labs-code/design.md) owns the applied visual
system for one surface, including tokens, type scales, layout, components, and
motion.

One brand can inform several separate design systems. Each `DESIGN.md` points to
its brand with `brand: ../BRAND.md`; the brand file does not maintain a reverse
list. Read the [integration contract](spec/design-md-integration.md) or explore the
[worked example](examples/marginalia).

## License

MIT

## Contributors

<a href="https://github.com/caiopizzol"><img src="https://github.com/caiopizzol.png" width="50" height="50" alt="caiopizzol" title="Caio Pizzol" /></a>
