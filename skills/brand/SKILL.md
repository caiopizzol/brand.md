---
name: brand
description: Generate a brand.md file — a complete brand identity system for a project. Use when the user asks to create branding, a brand.md file, brand strategy, or brand identity for a product or company. Supports hierarchy — detects parent brand.md files and generates product-level brands that inherit from them.
---

# brand.md Generator

Generate a `brand.md` file — an open standard for brand identity. The output is a markdown file with YAML frontmatter and three layers: Strategy, Voice, and Visual. It lives alongside README.md and CLAUDE.md, readable by both humans and AI tools.

The format is defined at thebrand.md (brand.md). This skill is the reference generator.

## Process

### Phase 0: Hierarchy Detection

Before anything else, check for existing `brand.md` files in the directory tree.

1. **Walk up** from the current working directory to the project root, looking for `brand.md` files
2. **If a parent `brand.md` exists**, read it fully — this is the master brand. The new file will be a product or sub-brand that inherits from it
3. **Tell the user** what you found: "I found a master brand.md for [Name] at the project root. I'll generate a product-level brand.md that inherits from it."
4. **If no parent exists**, proceed normally — the output will be a master brand

When generating a product brand:
- The parent's Strategy, Voice, and Visual layers are your foundation
- You are generating a **sparse file** — only include sections where the product diverges
- The parent's Guardrails always apply. You can tighten them, not loosen them
- Ask the user which architecture type fits: branded-house, endorsed, sub-brand, or independent

### Phase 1: Research

Before asking the user anything, research the brand independently. This is the work a strategist does in week one.

1. **If a URL is provided**, use web search and scraping to understand what the product actually does — not just the marketing, but the real substance
2. **Search for 3-5 direct competitors** — their positioning, messaging tone, what they communicate. Focus on homepages, about pages, and pricing pages — that's where positioning lives
3. **Search for audience discussions** — Reddit threads, forums, reviews about this type of product. What do people actually care about? What frustrates them?
4. **Identify the market gap** — what pattern do all competitors follow? Where's the whitespace?

Do 5-8 searches with different angles. Don't stop at surface-level — dig into competitor about pages, read actual user complaints, understand the category dynamics.

**For product brands:** focus research on the product's specific market, not the parent company. The parent brand's positioning is already defined — research how this product carves its own space within that umbrella.

### Phase 2: Founder Interview

After research, present your findings and ask questions. This is NOT a form — it's a hypothesis the founder reacts to. Use your research to suggest defaults they can accept or modify.

**Seed (ask first):**
- Brand name
- One-line description (what it does, in their words)
- URL (if exists)

**For product brands, also ask:**
- How does this product relate to the parent brand? (extension, standalone, experiment?)
- Architecture type: branded-house, endorsed, sub-brand, or independent? (explain each briefly, suggest one based on your research)
- What should this product inherit from the parent brand? What should be different?

**Market (present your research, ask for confirmation/edits):**
- Category — be specific ("Operating System for Sports Organizations" not "sports tech")
- Competitors (from your research — ask if they'd add/remove any)
- Market gap (your analysis — ask if they agree)
- What the brand is NOT (suggest 3-4 based on competitive whitespace)

**Identity (suggest based on research, ask them to pick/edit):**
- Brand archetype (suggest 2-3 options, e.g., "The Architect", "The Rebel", "The Guide")
- Brand attributes (suggest 4-6 words the brand should transmit)
- Tone words (suggest 4-6 based on competitive whitespace)
- What the brand must communicate (things the market ISN'T saying)
- What the brand must never communicate (messaging patterns to avoid)

**For product brands:** skip identity questions for sections that will be inherited. If the architecture is `branded-house`, you likely only need the product's tagline, positioning, and a few unique phrases. Don't ask about things the parent already defines.

**Founder context:**
- Why are you building this? (the personal reason)
- Where does this go in 3 years? (the dream)
- Reference brands (brands whose vibe resonates, from any industry)
- Anti-reference brands (brands that represent the opposite)

**Language:** en / pt-BR

### Phase 3: Generation

Generate the `brand.md` file with three layers. Each layer builds on the previous one — Strategy first (the foundation), then Voice (derived from strategy), then Visual (informed by both).

---

#### Layer 1: Strategy

The strategic foundation. Why the brand exists and where it stands.

**Overview**
- What the brand is (1-2 sentences)
- Origin story (1-2 sentences, if applicable)
- What it really does — the deep description, not the surface product
- The problem it solves — structural/deep, not feature-level
- The transformation: Before state → After state
- Long-term ambition (1 sentence)

**Positioning**
- The category it creates or occupies — be hyper-specific
- What it is NOT — explicit negations (e.g., "Not a consultancy. Not software. Not SaaS.")
- Competitive landscape: how the market layers work, where this brand sits
- Structural differentials: 3-5 bullet points
- The territory the brand occupies: the concept/space only this brand owns

**Personality**
- Dominant archetype (e.g., "The Architect / The Calm Strategist")
- 4-6 attributes the brand transmits
- What it IS: short declarative list
- What it is NOT: anti-pattern list

**Promise**
- Core promise: 2-4 short declarative statements
- Base message: one sentence capturing the brand thesis
- Synthesizing phrase: one sentence that captures everything (e.g., "Simplicae exists so sport can grow up.")

**Guardrails**
- Tone summary: 3-5 attributes
- What the brand cannot be: explicit list of identities to avoid
- Litmus test: a one-line test for brand alignment (e.g., "If it sounds like a vendor, it's wrong.")

---

#### Layer 2: Voice

The verbal identity. How the brand speaks and writes. This is the most directly useful layer for AI tools generating content.

**Identity**
- Who we are: 2-3 paragraph identity statement, first person, as if the brand is speaking. Include strong negations ("We are not consultants. We are not software.")
- Essence: one powerful sentence

**Tagline & Slogans**
- Primary tagline with context for where to use it
- 2-3 tagline alternatives
- 4-5 slogan options for different contexts

**Manifesto** (optional — include for brands with strong narrative identity)
- 8-12 short paragraphs with poetic rhythm
- Alternates between statement and expansion
- Written as a declaration, not a description
- Ends with brand name as signature

**Message Pillars**
- 4-6 core messaging themes (one word or short phrase each)
- Under each pillar: 1-2 key statements that express it

**Phrases**
- 5-8 punchy one-liners the brand owns
- Must be ownable — swap in any other brand name and it should break

**Social Bios** (optional — include when the brand has social presence)
- LinkedIn: paragraph format
- Instagram: bullet point format
- X/Twitter: single-line format
- Website: short paragraph format

**Tonal Rules**
- 8-12 rules for how to communicate (e.g., "Speak in short, declarative sentences.", "Calm authority. Always.")
- Identity boundaries: 4-6 "What we are not" statements (e.g., "We are not consultants who leave a deck behind.")
- We Say / We Never Say table with 5-8 contrasting pairs:

```
| We Say | We Never Say |
|---|---|
| "Install clarity" | "Unlock your potential" |
```

---

#### Layer 3: Visual

The visual direction. Everything text-describable — no binary assets.

**Colors**
- Primary, secondary, accent colors with hex values
- Usage rules for each (e.g., "headings and CTAs", "backgrounds")
- Colors or color families to avoid

**Typography**
- Display font: name, weight, usage
- Body font: name, weight, usage
- Mono font (if applicable): name, usage

**Photography** (optional)
- Mood: 3-5 descriptive words
- Subjects: what to photograph
- Avoid: what never to show

**Style** (optional)
- Design keywords: 4-8 words
- Reference brands or studios
- Direction statement: 1-2 sentences (e.g., "The identity should communicate system, not decoration.")

---

### Output Format

#### Master brand

Write the `brand.md` file as markdown with YAML frontmatter:

```markdown
---
name: "[Brand Name]"
tagline: "[Primary tagline]"
version: 1
language: en
---

# [Brand Name]

## Strategy

### Overview
...

### Positioning
...

### Personality
...

### Promise
...

### Guardrails
...

## Voice

### Identity
...

### Tagline & Slogans
...

### Manifesto
...

### Message Pillars
...

### Phrases
...

### Social Bios
...

### Tonal Rules
...

## Visual

### Colors
...

### Typography
...

### Photography
...

### Style
...
```

Save the file as `brand.md` in the project root (or wherever the user specifies).

#### Product / sub-brand

When a parent `brand.md` exists, generate a sparse file. Only include sections where the product diverges from the parent. Missing sections are inherited.

```markdown
---
name: "[Product Name]"
tagline: "[Product tagline]"
version: 1
language: en
type: product
architecture: endorsed
---

# [Product Name]

## Strategy

### Overview
[Product-specific overview — what this product is within the parent brand]

### Positioning
[Product-specific positioning — its own market, category, differentials]

## Voice

### Identity
[Product-specific identity — how this product introduces itself]

### Tagline & Slogans
[Product-specific taglines and slogans]

### Phrases
[Product-specific ownable one-liners]
```

The file should include a comment at the top (after frontmatter) indicating the inheritance:

```markdown
<!-- Inherits from: ../../brand.md (Acme Corp) -->
```

Save the file as `brand.md` in the product's directory.

## Quality Standards

- Every section must feel like it was written by a senior brand strategist at a top studio. Never generic.
- Ground everything in competitive whitespace — not just what sounds nice, but what the market ISN'T saying.
- The essence must be a single powerful concept, not a generic word like "quality" or "innovation."
- The manifesto must have rhythmic, declarative quality — short lines, poetic structure, alternating between statement and expansion.
- Tonal rules must be directly usable as AI system prompt modifiers.
- Phrases must be ownable — if you swap in any other brand name and it still works, it's too generic.
- The "What we are not" sections are as important as "What we are" — they define boundaries that prevent brand drift.
- Be opinionated. A good strategist has a point of view. Do not hedge.
- The Positioning section must include explicit negations. Every strong brand defines what it is NOT.
- The Guardrails litmus test must be a single sentence that anyone in the org can apply instantly.
