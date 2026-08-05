---
version: alpha
name: Marginalia Workstation
description: Visual system for the authenticated reading and annotation workspace.
brand: ../BRAND.md
colors:
  primary: "#1B1A17"
  secondary: "#5C574E"
  tertiary: "#B8422E"
  neutral: "#F4F1EA"
  surface: "#FFFFFF"
  outline: "#B4AEA2"
  outline-faint: "#E3DFD5"
typography:
  reader-body:
    fontFamily: Public Sans
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.75
  reader-heading:
    fontFamily: Public Sans
    fontSize: 1.375rem
    fontWeight: 600
    lineHeight: 1.3
  ui-md:
    fontFamily: Public Sans
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.45
  ui-strong:
    fontFamily: Public Sans
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.45
  ui-sm:
    fontFamily: Public Sans
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.4
  annotation:
    fontFamily: Public Sans
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.6
  label-meta:
    fontFamily: Space Grotesk
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.06em
spacing:
  xs: 2px
  sm: 4px
  md: 8px
  lg: 16px
  xl: 24px
  gutter: 12px
  reader-measure: 32rem
  rail: 20rem
rounded:
  none: 0px
  sm: 3px
  md: 5px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.surface}"
    typography: "{typography.ui-strong}"
    rounded: "{rounded.sm}"
    padding: 8px
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.ui-md}"
    rounded: "{rounded.sm}"
    padding: 8px
  annotation-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.annotation}"
    rounded: "{rounded.md}"
    padding: 12px
  annotation-timestamp:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    typography: "{typography.label-meta}"
  passage-highlight:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.ui-md}"
    rounded: "{rounded.sm}"
    padding: 8px
  divider:
    backgroundColor: "{colors.outline-faint}"
    height: 1px
  pane-divider:
    backgroundColor: "{colors.outline}"
    height: 1px
---

# Marginalia Workstation

## Overview

This design system expresses the [Marginalia brand](../BRAND.md) for the
authenticated product: the reader, the annotation rail, and the corpus and thread
views.

The premise is **a research archive workstation.** A surface someone sits at for
four hours without noticing it. Dense where density helps navigation, generous
where the text is being read, keyboard-first throughout, and chrome that recedes
behind the passage under attention.

This is the same identity as the public site and it does not look like it, which
is correct. The site is a document to be read once. This is an instrument to be
operated daily. Both come from the same reference (a library reading room), but a
reading room's catalog terminal and its printed journals are not designed alike.

The dominant visual event on any screen should be the text the reader is reading.
Every interface element competes with that and should lose.

## Colors

The brand's approved colors, extended with the muted and faint variants an
interface needs for de-emphasis and structure. Values are mirrored from the brand;
roles and derived steps are decided here.

| Role | Brand color | Value | Origin |
|---|---|---|---|
| `primary` | Ink (mandatory) | `#1B1A17` | Mirrored |
| `tertiary` | Vermilion (mandatory) | `#B8422E` | Mirrored |
| `neutral` | Limestone | `#F4F1EA` | Mirrored |
| `outline` | Rule | `#B4AEA2` | Mirrored |
| `surface` | none | `#FFFFFF` | Derived |
| `secondary` | none | `#5C574E` | Derived from Ink |
| `outline-faint` | none | `#E3DFD5` | Derived from Rule |

- **Primary, Ink (#1B1A17):** Document text, annotation text, and primary UI labels.
- **Secondary (#5C574E):** Secondary UI text, inactive states, and any label the
  reader does not need right now. Derived from Ink, not a new brand color.
- **Surface (#FFFFFF):** The reading surface and the annotation card. The reader
  itself is white because the document is the figure and everything else is ground.
- **Neutral, Limestone (#F4F1EA):** Application ground behind the reader, the
  annotation rail, and the passage highlight. The inversion from the public site is
  deliberate: here Limestone is chrome and white is content.
- **Tertiary, Vermilion (#B8422E):** The primary action only, plus the active
  anchor marker showing which passage the selected annotation belongs to. Two uses,
  both meaning "this one".
- **Outline, Rule (#B4AEA2):** Structural dividers between major panes.
- **Outline faint (#E3DFD5):** Dividers within a pane, such as between annotations.

Tertiary never marks a highlight. A reader with forty annotations on a page would
turn the document into a warning. Highlights are Neutral; Tertiary marks only
the one that is currently selected.

## Typography

The same two families as everywhere else, with a firm split between the document
and the interface.

- **Reader body:** Document text at 1.0625rem and 1.75 line height, matching the
  public site's reading size. The document does not get denser just because it is
  inside an application.
- **Reader heading:** Headings within a document.
- **UI md / strong / sm:** Interface labels, buttons, and rail metadata at 0.875rem
  and below. Smaller than the document on purpose.
- **Annotation:** Between UI and document size. An annotation is something a person
  wrote, so it is set to be read, but it is not the document.
- **Label meta:** Space Grotesk for timestamps, citation keys, counts, and version
  markers. Never for anything a person wrote.

## Layout

Two panes. The reader holds a 32rem measure, centered in its pane so the margins
stay wide even when the window is not. The annotation rail is a fixed 20rem on the
trailing edge and can be collapsed entirely.

Spacing runs on a 4px scale with a 2px half-step for dense rail rows. The rail is
tight, 4px to 8px between related rows. The reader is not: it keeps at least 24px
between the document and any chrome.

At 200% zoom the rail collapses and the reader keeps its measure with no
horizontal scrolling, per the brand's accessibility commitment.

## Elevation & Depth

Depth is tonal, not cast. The Neutral application ground sits behind Surface
content surfaces, and that single step is the whole system.

Nothing has a shadow. The annotation rail is separated from the reader by an Outline
hairline rather than by a raised edge. Modals, where unavoidable, use a full
Neutral overlay at full opacity rather than a scrim and a floating card.

The reason is functional as well as brand-derived: a shadow under a panel that sits
beside body text creates a soft gradient in the reader's peripheral vision for
hours at a time.

## Shapes

Corners are 3px on interactive controls and 5px at most on the annotation card.
Structural panes are square.

This is softer than the public site's 0px, and that is intentional. A control
needs to read as pressable; a page does not. The radius is small enough that the
family resemblance holds.

## Components

- **Button primary:** Tertiary ground, Surface label, 3px radius, 8px padding. One
  per view. On hover the ground becomes Primary. Contrast is 5.4:1, above AA for
  the label size in use.
- **Button secondary:** Neutral ground, Primary label, same geometry. This is the
  default for nearly every action, and primary is reserved for the single most
  important one on the screen.
- **Annotation card:** Surface ground on the Neutral rail, Primary text at
  annotation size, 5px radius, 12px padding, separated from its neighbors by an
  Outline faint divider rather than by a gap alone. The Space Grotesk timestamp
  sits at the bottom in Secondary.
- **Passage highlight:** Neutral ground behind the anchored span, with a 2px
  Tertiary marker in the leading margin when that annotation is selected. The
  highlight never changes the text color.
- **Input field:** Surface ground, 1px Outline border, 3px radius. On focus the
  border becomes Primary and thickens to 2px. Focus is never indicated by color
  alone.
- **Divider:** 1px Outline faint within a pane, 1px Outline between panes.

## Do's and Don'ts

- **Do** keep the reader's measure at 32rem and its line height at 1.75, even when
  the window is wide. Density belongs to the rail, not the document.
- **Do** reserve Tertiary (Vermilion) for the primary action and the selected
  anchor. Two meanings, both "this one".
- **Do** make every annotation action reachable from the keyboard, and show focus
  with a border change rather than a color change.
- **Do** let the rail collapse. A reader in a long session should be able to remove
  the interface entirely.
- **Don't** highlight passages in Tertiary. Forty highlights in the accent color
  turns a document into an error state.
- **Don't** add a shadow to the rail, the cards, or a modal. Depth is the single
  Neutral-to-Surface step.
- **Don't** set interface text at document size, or document text at interface
  size. The gap between them is what tells the reader which is which.
- **Don't** use Space Grotesk for anything a person wrote, including annotation
  bodies.
- **Don't** introduce a dark mode without treating it as a separate design premise.
  Inverting these values produces a different reading instrument, not this one at
  night.
- **Don't** put more than one primary button in a view.
- **Don't** animate anything in the reader pane. Chrome may transition; the
  document does not move.
