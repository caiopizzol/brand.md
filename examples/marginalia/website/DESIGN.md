---
version: alpha
name: Marginalia Journal
description: Visual system for the public marketing and writing site.
brand: ../BRAND.md
colors:
  primary: "#1B1A17"
  secondary: "#B4AEA2"
  tertiary: "#B8422E"
  neutral: "#F4F1EA"
  surface: "#FFFFFF"
typography:
  display:
    fontFamily: Public Sans
    fontSize: 4rem
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Public Sans
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Public Sans
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.25
  body-lg:
    fontFamily: Public Sans
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.65
  body-md:
    fontFamily: Public Sans
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.7
  pull-quote:
    fontFamily: Public Sans
    fontSize: 1.75rem
    fontWeight: 400
    lineHeight: 1.35
  label-meta:
    fontFamily: Space Grotesk
    fontSize: 0.8125rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.08em
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  section: 128px
  measure: 34rem
  margin: 48px
rounded:
  none: 0px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-meta}"
    rounded: "{rounded.none}"
    padding: 16px
  button-primary-hover:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.surface}"
  link-inline:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.tertiary}"
    typography: "{typography.body-md}"
  pull-quote:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.pull-quote}"
    padding: 32px
  meta-rule:
    backgroundColor: "{colors.secondary}"
    height: 1px
---

# Marginalia Journal

## Overview

This design system expresses the [Marginalia brand](../BRAND.md) for the public
site: the homepage, the essays, and the pricing and about pages.

The premise is **an independent literary journal.** Not a software marketing site
that has been calmed down, an actual journal: one long column of text set at a
reading size, generous white space above and below each section, hairline rules
instead of cards, and a masthead rather than a hero. A visitor should feel they
have arrived at something written, not something sold.

The audience reads professionally and is measured on comprehension. They will
read a long paragraph if it earns it. The layout should assume that rather than
break the argument into scannable fragments.

The site is quiet. There is no gradient, no drop shadow, no glass, no dark mode,
and no illustration that is not a diagram. The single accent appears roughly once
per page.

## Colors

Warm neutrals carrying a single point of heat. The values are mirrored from the
brand's approved identity colors; the role names are assigned here, because a role
is a decision this surface makes and not something the brand can know in advance.

| Role | Brand color | Value | Origin |
|---|---|---|---|
| `primary` | Ink (mandatory) | `#1B1A17` | Mirrored |
| `tertiary` | Vermilion (mandatory) | `#B8422E` | Mirrored |
| `neutral` | Limestone | `#F4F1EA` | Mirrored |
| `secondary` | Rule | `#B4AEA2` | Mirrored |
| `surface` | none | `#FFFFFF` | Derived |

- **Primary, Ink (#1B1A17):** All body text, all headlines, and the primary
  button. Warm rather than pure black, so a full page of it reads as printed
  rather than backlit.
- **Neutral, Limestone (#F4F1EA):** The page ground and the pull-quote surface.
  Pure white is reserved for reversed text and is never the page background.
- **Tertiary, Vermilion (#B8422E):** Inline links and the primary button's hover
  state. Nothing else. On a well-built page it appears once or twice.
- **Secondary, Rule (#B4AEA2):** Hairline rules between sections and beneath
  metadata. Never text, never a fill.
- **Surface (#FFFFFF):** Type reversed out of Primary or Tertiary only. Not a brand
  primitive. The brand approves no white, so this is derived here and carries no
  identity meaning.

## Typography

Public Sans carries everything a person wrote. Space Grotesk carries only what
the system knows, which on this site means dates, reading times, and section
numbers.

- **Display:** The masthead and the single page title. Set once per page.
- **Headline lg / md:** Section and subsection headings. The step down from
  Display is deliberate and modest, because a journal signals hierarchy with
  space rather than with size.
- **Body lg:** Essay openings and the lede paragraph.
- **Body md:** All other running text, at a comfortable 1.7 line height for
  long-form reading.
- **Pull quote:** Set at reading weight rather than bold, so emphasis comes from
  the surface and the space around it.
- **Label meta:** Space Grotesk, uppercase, letterspaced. Dates, reading times,
  section numbers, and the primary button.

## Layout

A single column at a fixed measure of 34rem, centered, with 48px page margins on
mobile widening to accommodate the measure on larger screens. The site never
becomes a grid. There is no sidebar, no two-column feature row, and no card
gallery.

Sections are separated by 128px of vertical space, and by a hairline rule only
where the change of subject would otherwise be ambiguous. Space is the primary
structural device.

A page that ends two thirds of the way down the viewport is correct, not
underfilled.

## Elevation & Depth

There is no elevation. Nothing is raised, nothing casts a shadow, and there are
no layered surfaces.

Hierarchy comes from three things only: the amount of space around an element,
the hairline rule, and the Neutral-to-Surface tonal shift on pull quotes. If a
piece of content needs to feel more important, it gets more space, not a card.

## Shapes

Square. Every corner on this site is 0px: buttons, pull-quote surfaces, images,
and any inset block.

The reasoning is inherited from the brand's territory. A rounded corner reads as
an interface control. This site is a document, and documents have edges.

## Components

- **Button primary:** Primary ground, Surface text, Space Grotesk uppercase label,
  square corners, 16px padding. On hover the ground becomes Tertiary and the
  text stays Surface. This is the only element on the site that inverts.
- **Link inline:** Tertiary text with a 1px underline that sits clear of the
  baseline. No color change on hover; the underline thickens. Links keep their
  color when visited, because a journal is not a navigation surface.
- **Pull quote:** Neutral ground, Primary text at pull-quote size, 32px padding,
  square. No quotation marks and no attribution styling beyond Label meta.
- **Meta rule:** A 1px Secondary hairline. Full measure width beneath metadata,
  section width between sections. Never doubled, never used as a border on all
  four sides of anything.

## Do's and Don'ts

- **Do** keep the measure at 34rem regardless of viewport width. A wider column
  is easier to build and worse to read.
- **Do** let Tertiary appear once per page. Twice is the ceiling, and the second
  one needs a reason.
- **Do** use space to signal hierarchy before reaching for size or weight.
- **Do** set pull quotes at reading weight. The surface is the emphasis.
- **Don't** add a hero section. The masthead is the top of the page and the first
  paragraph is the first content.
- **Don't** introduce cards, tiles, or a feature grid. There is no layout in this
  system that puts two things side by side.
- **Don't** round any corner, anywhere.
- **Don't** add a shadow, gradient, glow, glass surface, or dark mode.
- **Don't** use Tertiary on type larger than body size. At display sizes it stops
  being an accent and becomes the page's subject.
- **Don't** use Space Grotesk for anything a person wrote. It is for machine
  facts only.
- **Don't** use pure white as a page background. Neutral is the ground.
