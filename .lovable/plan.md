

## Plan: Product Display Section

### Layout — 50/50 viewport split

**Top 50vh — Header + Tabs**
- Vertically centered content within the 50vh block
- Overline: "Our Solutions" — 20px, Be Vietnam Pro, uppercase, tracking-widest, #9CA3AF, centered
- 24px gap below overline
- Headline: 36px Baloo 2, bold, #F9FAFB, centered, -2% letter-spacing, 115% line-height
  - Line 1: "For Your True Expertise"
  - Line 2: "To Be Seen"
- 32px gap below headline
- Tab bar: 4 tabs (Strategy, Identity, Design, Solutions) — 20px Be Vietnam Pro, max-width 1200px, centered row
  - Active: #F9FAFB, semibold, subtle bottom border (#4EB5A3, 2px)
  - Inactive: #6B7280, regular weight
  - Tab spacing: 48px between tabs
- Vertical spacing uses flexbox with `justify-center` and consistent gaps — no cramming

**Bottom 50vh — Full-bleed Image Gallery**
- 4 images spanning full viewport width, 2px dark gaps between them
- Width math via flex ratios: selected image gets `flex: 2`, unselected get `flex: 1` → selected = 2× unselected width
- Default: first image selected per tab
- Click to select — smooth width animation (~500ms, ease-out via Framer Motion `animate`)
- Tab switch resets selection to index 0
- Each image has:
  - Bottom gradient overlay: `linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)`
  - Bottom-left text: 36px Baloo 2, #F9FAFB, 48px safe-space from edges
  - Bottom-right text: 28px Be Vietnam Pro, #F9FAFB, "Explore →" with arrow, 48px safe-space

### Tab content (bottom-left labels per image)

| Tab | Img 1 | Img 2 | Img 3 | Img 4 |
|-----|-------|-------|-------|-------|
| Strategy | Digital Transformation | Market Research | Sustainable Development | Brand Positioning |
| Identity | Brand Identity | Logo Suite | Brand Storytelling | Voice & Tone |
| Design | Website Design | User Experience (UX) | User Interface (UI) | Dashboard |
| Solutions | Problem Solving | BIM | AI Solution | Full-stack Development |

### Images
16 unique Unsplash URLs (business/strategy/design/tech themed), 4 per tab.

### What is NOT touched
- ProblemReframe.tsx — no changes. The darken filter transition from the previous section remains exactly as-is.
- HeroSection, ScrollytellingUnified, Index.tsx — no changes.
- z-index 45 and `#121212` background on ProductSection — already set, preserved.

### Technical details
- Single file rewrite: `src/components/ProductSection.tsx`
- State: `activeTab` (0–3), `selectedImage` (0–3, resets on tab change)
- Framer Motion `motion.div` for image panels with `animate={{ flex }}` transitions
- Section height: `100vh`, split into two halves via `h-[50vh]`
- Fully interactive (click-based), not scroll-driven — naturally reversible when scrolling past

