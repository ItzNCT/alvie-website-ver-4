

## Plan: Product Display Section

### Overview

Replace the placeholder `ProductSection` with a full tab-based product showcase. Dark background (#121212), z-index 45 (already set). No changes to any prior sections.

### Layout Structure (top to bottom)

**Top 34vh — Header + Tabs**
- Overline: "Our Solutions" — 20px, Be Vietnam Pro, uppercase, #9CA3AF, centered
- Headline: Two lines, 64px Baloo 2, bold, #F9FAFB, centered, -2% letter-spacing, 110% line-height
  - Line 1: "For Your True Expertise"
  - Line 2: "To Be Seen"
- Tab bar: 4 tabs — Strategy, Identity, Design, Solutions — 20px Be Vietnam Pro, 1200px max-width, centered, horizontal row with generous spacing
  - Active tab: #F9FAFB, bold weight
  - Inactive tabs: #6B7280, regular weight
  - Active indicator: small underline or subtle highlight

**Bottom 66vh — Image Gallery (full-bleed)**
- 4 images per tab, spanning full viewport width
- 2px gap between images (dark line separator)
- Selected image width = 2x unselected image width
- Math: if viewport = W, gap total = 6px (3 gaps), selected = 2 units, 3 unselected = 1 unit each → 5 units total. Each unit = (W - 6) / 5. Selected = 2 units, unselected = 1 unit.
- Default: first image selected
- Click any image to select it — selected expands, previous shrinks
- Animate width transition with Framer Motion `layout` or `animate` (smooth ~500ms, ease-out)

**Text overlays on each image:**
- Bottom-left: 36px Baloo 2, #F9FAFB, with 48px safe-space from edges. Content varies per tab/image.
- Bottom-right: 28px Be Vietnam Pro, #F9FAFB, "Explore →" with arrow icon, 48px safe-space
- Text sits over a subtle bottom gradient overlay (transparent → rgba(0,0,0,0.5)) for readability

### Tab Content Data

Each tab has 4 images with bottom-left labels:

| Tab | Image 1 | Image 2 | Image 3 | Image 4 |
|-----|---------|---------|---------|---------|
| Strategy | Digital Transformation | Market Research | Sustainable Development | Brand Positioning |
| Identity | Brand Identity | Logo Suite | Brand Storytelling | Voice & Tone |
| Design | Website Design | User Experience (UX) | User Interface (UI) | Dashboard |
| Solutions | Problem Solving | BIM | AI Solution | Full-stack Development |

### Stock Images

Use 16 unique Unsplash/placeholder images (4 per tab). Will use direct Unsplash URLs for now — e.g. business strategy, branding, design workspace, and tech/development themed photos.

### Animation Details

1. **Tab switching**: Instant content swap (no cross-fade needed — images change)
2. **Image selection**: `framer-motion` `animate` on width with `transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }`. All 4 images animate simultaneously (selected grows, others shrink)
3. **All scroll-reversible**: This section is not scroll-driven — it's interactive (click-based tabs + images). It simply sits in the document flow at z-45, so scrolling past/back is naturally handled.

### Technical Approach

- Single file: `src/components/ProductSection.tsx`
- State: `activeTab` (0-3), `selectedImage` (0-3, default 0, resets on tab change)
- Framer Motion `motion.div` for each image panel with `animate={{ width }}` computed from viewport
- Use `window.innerWidth` via a resize hook or CSS `calc()` for responsive sizing
- CSS approach for width math: use `flex-grow` with ratios (selected gets `flex: 2`, unselected `flex: 1`) — simpler and naturally responsive
- Bottom gradient overlay on each image: `linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)`

### Files Changed
1. `src/components/ProductSection.tsx` — full rewrite from placeholder to complete section

