

## Plan: Waterfall Curtain Tab Transition

Replace the current snap/flicker tab swap with a staggered top-down "curtain" reveal where each new image slides down from the top of its panel, covering the previous tab's image, with a small delay between panels for a waterfall feel.

### Concept

When the user clicks a new tab:
1. The previous tab's images stay visible underneath (no flicker / no fly-in from left).
2. The new tab's 4 images each slide down from `y: -100%` to `y: 0` **inside their own panel** (clipped — they never escape the 60vh gallery zone).
3. A stagger of ~80ms between panels (left → right) creates the waterfall cascade.
4. Once the new images finish covering, the old ones unmount silently.

### Implementation approach

**1. Render both old + new layers during transition**
- Keep `displayedTab` (currently visible) and `activeTab` (target) in state.
- On tab click: set `activeTab` immediately, render the new tab's images on top of the old ones, then after animation completes (~700ms total) update `displayedTab` to match and unmount the old layer.

**2. Per-panel curtain animation (Framer Motion)**
- Each new image panel wraps its `<img>` + vignette + gradient + label in a `motion.div` with:
  - `initial={{ y: "-100%" }}`
  - `animate={{ y: "0%" }}`
  - `transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: i * 0.08 }}`
- The parent panel has `overflow: hidden` (already present) so the slide is clipped to its own column — never bleeds into the 40vh header above.

**3. Layer order inside each panel column during transition**
```
[ Old image (static, underneath) ]
[ New image (sliding down from top, on top, z-index: 2) ]
```
Both share the same `flex` width animation so the selected-panel expansion still works.

**4. Selected image / Explore CTA**
- `selectedImage` resets to `0` on tab change (already does).
- The "Explore →" CTA animates in with the new layer naturally.

### Reversibility
- Pure click-driven state — no scroll listeners, no GSAP timelines pinned to scroll. Scrolling up/down past the section never breaks anything.
- Clicking back to a previous tab plays the same curtain animation in reverse direction (top-down again, just with that tab's images) — consistent, predictable.

### Timing
- Per-panel slide: 600ms, ease `[0.4, 0, 0.2, 1]` (matches existing flex transition)
- Stagger between panels: 80ms (panel 0 → 0ms, panel 1 → 80ms, panel 2 → 160ms, panel 3 → 240ms)
- Total transition: ~840ms — calm, unhurried, on-brand.
- Respects `prefers-reduced-motion`: fall back to instant swap (use `useReducedMotion` hook already in project).

### What is NOT touched
- 40/60 vh split, typography, tab bar position/styling, vignette overlay, ProblemReframe darken transition, hero, scrollytelling, image URLs — all unchanged.

### Files changed
- `src/components/ProductSection.tsx` — add `displayedTab` state, refactor gallery render to layer old + new during transition, wrap each new panel's content in a `motion.div` with curtain animation + stagger delay.

