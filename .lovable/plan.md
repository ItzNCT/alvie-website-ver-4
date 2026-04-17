

## Plan: "Our Philosophy" Section

A calm, editorial section that follows the cinematic gallery. Normal-flow (not sticky), dark background to continue the mood from the gallery, then breathes into a quiet typographic statement.

### Placement
- New file: `src/components/PhilosophySection.tsx`
- Mount in `src/pages/Index.tsx` directly after `<ProofGrid />`

### Visual concept

Editorial two-column layout on a dark canvas. Left column = small overline + large display headline. Right column = three philosophy pillars stacked vertically, each with a numeral, a short title, and a body paragraph. Generous whitespace, no imagery — typography carries the entire section.

```text
┌─────────────────────────────────────────────────────────────┐
│  [48px safe space]                                           │
│                                                              │
│   — our philosophy                                           │
│                                                              │
│   Three quiet         01  Show, don't tell                   │
│   principles          ─── We let the work speak. No buzz...  │
│   that shape                                                 │
│   everything          02  Empathy as method                  │
│   we make.            ─── Before strategy, we listen...      │
│                                                              │
│                       03  Craft over noise                   │
│                       ─── Every pixel earns its place...     │
│                                                              │
│  [128px bottom space]                                        │
└─────────────────────────────────────────────────────────────┘
```

### Specs

**Container**
- Background: `#121212` (continues gallery's dark mood)
- Section padding: `128px` top, `128px` bottom, `48px` horizontal safe space
- Max content width: `1200px`, centered
- `box-sizing: border-box`, `width: 100%`

**Layout grid**
- Desktop: `grid-cols-[2fr_3fr]`, gap `96px`
- Mobile: single column, gap `64px`

**Left column**
- Overline: "— our philosophy" — Be Vietnam Pro 14px / weight 400 / `#9CA3AF` / lowercase / no letter-spacing
- Headline: Baloo 2 / 64px / weight 700 / line-height 110% / letter-spacing -2% / color `#F9FAFB`
  - Copy: "Three quiet principles that shape everything we make."
- Sticky on desktop (`position: sticky; top: 25vh`) so it holds while pillars scroll past — subtle editorial touch

**Right column — three pillars**
Each pillar:
- Numeral: Baloo 2 / 32px / weight 700 / `#4EB5A3` (dark-mode primary) — small, sits above title
- Thin divider: 32px wide × 1px, `#2D3748`, margin 16px 0
- Title: Be Vietnam Pro 24px / weight 500 / `#F9FAFB`
- Body: Be Vietnam Pro 16px / weight 300 / line-height 170% / `#9CA3AF` / max-width 480px
- Vertical gap between pillars: 64px

**Content (placeholder, easy to swap)**
1. **Show, don't tell** — "We let the work speak. No buzzwords, no manufactured urgency. Clarity is the highest form of craft."
2. **Empathy as method** — "Before strategy, we listen. Every decision starts with understanding what you've already built and what you're trying to protect."
3. **Craft over noise** — "Every pixel, every transition, every word earns its place. If it doesn't serve the story, it doesn't ship."

### Motion (subtle, on-scroll)
- Framer Motion `whileInView` per pillar
- Each pillar fades in (opacity 0→1) and lifts (`y: 24 → 0`) over 600ms, staggered 120ms
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Headline fades in once when section enters
- Respects `prefers-reduced-motion` (skip transforms, instant opacity)

### What is NOT touched
- Hero, Scrollytelling, ProblemReframe, ProductSection, ProofGrid — all preserved
- No new dependencies (Framer Motion already in project)
- No global CSS changes

### Memory
- Save `mem://features/philosophy-section` — dark editorial section, sticky-headline two-column, three pillars with stagger reveal

