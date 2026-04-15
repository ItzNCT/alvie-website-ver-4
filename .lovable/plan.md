

## Plan: Reposition Image Reveal Below Content with Circle-to-Square Morphing

### Problem
The image currently appears at the **center** of the screen and uses `scale` to grow. The user wants:
1. The image to originate **below the text/stats content** (bottom area of the Trust Gap canvas)
2. Shape progression: **small circle → larger circle → corners fill in (square) → full-bleed**

### Scroll Choreography

```text
ProblemReframe (450vh)
├── 0.22–0.38  Curtain slides up
├── 0.38–0.55  Trust Gap content visible, static
├── 0.55–0.65  Small circle appears BELOW stats, grows as a circle
├── 0.65–0.75  Circle continues growing, borderRadius transitions 50% → 0% (square morph)
├── 0.75–0.80  Square expands to full-bleed, covering entire viewport
├── 0.80–0.90  Text 1 fades in
├── 0.88–0.95  Text 2 fades in
└── 0.95–1.0   Hold
```

### Technical Changes

**File: `src/components/ProblemReframe.tsx`**

1. **Image container positioning** — Change from `flex items-center justify-center` (centered) to position the origin point at **bottom center** of the viewport (~75% down). Use `items-end justify-center` with padding-bottom, or absolute positioning with `bottom: 12vh`.

2. **Shape animation** — Split into two phases:
   - Phase 1 (0.55–0.65): Width/height grow from `6vw`/`6vw` to `50vw`/`50vw`, borderRadius stays `50%` (pure circle growth)
   - Phase 2 (0.65–0.75): Width/height grow from `50vw`/`50vw` to `100vw`/`100vh`, borderRadius transitions `50%` → `0%` (circle morphs to square)
   - Phase 3 (0.75–0.80): Already full-bleed, hold

3. **Remove `scale` transform** — Use only `width`/`height`/`borderRadius` for the sizing. The current `imageScale` from 0.03→1 combined with width/height is redundant and makes the dot too tiny. Remove `scale` entirely.

4. **Updated transforms**:
   ```
   imageWidth:        [0.55, 0.65, 0.78] → ["6vw",  "50vw",  "100vw"]
   imageHeight:       [0.55, 0.65, 0.78] → ["6vw",  "50vh",  "100vh"]
   imageBorderRadius: [0.55, 0.65, 0.78] → ["50%",  "50%",   "0%"]
   ```
   Three keyframes: circle stays circular during initial growth, then corners square off as it approaches full-bleed.

5. **Vertical origin** — Position the image container with `bottom: 10%` instead of centered, so it emerges from below the stats row. As it grows to full-bleed, it naturally covers upward and outward.

### Result
The image appears as a small circle below the stats, grows as a circle, then morphs from round to square corners as it expands to cover the entire viewport. Trust Gap content stays underneath. Text fades in after full-bleed.

