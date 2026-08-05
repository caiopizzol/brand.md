# BRAND.md Vision

## Why it exists

AI tools routinely create public work without enough brand context. Teams either
repeat their guidelines in every prompt or accept generic output.

`BRAND.md` is an open file format that gives humans and tools one durable source
for brand strategy, voice, identity primitives, and governance. It lives beside
files such as `README.md` and `AGENTS.md` and remains readable without proprietary
software.

## Principles

- **Identity before application.** `BRAND.md` records decisions that should survive
  a redesign. A surface-specific `DESIGN.md` owns tokens, layout, components, and
  motion.
- **One identity, many expressions.** A brand can inform distinct design systems
  for products, websites, docs, and presentations.
- **Useful to agents.** Tonal rules are executable guidance, phrases are examples,
  and approved claims prevent unsupported assertions.
- **Sparse inheritance.** Product and sub-brand files state only meaningful
  differences from their parent.
- **Evidence over invention.** Research can support proposals, but tools must not
  invent approval, substantiation, or licensing.
- **Plain files over platforms.** Markdown and YAML keep the format portable,
  inspectable, and easy to adopt.

## Non-goals

- Replacing design systems or storing applied visual decisions
- Design-system inheritance
- Claiming that document linting proves rendered visual conformance
- Adding speculative extension points before real usage requires them

## Roadmap

### Now

- Exercise spec 0.3 across real brands and multiple surfaces
- Learn from the opt-in handoff between `BRAND.md` and `DESIGN.md`
- Improve integrations as more AI tools consume the format

### Later, when evidence supports it

- A brand linter for rules worth enforcing
- Cross-file primitive validation with normalized color formats
- Verbal consistency checks against Voice
- An upstream DESIGN.md clarification for unknown frontmatter fields

The [specification](spec/brand-md.md) defines the format. The
[DESIGN.md integration contract](spec/design-md-integration.md) defines the boundary
between identity and its surface-specific expression.
