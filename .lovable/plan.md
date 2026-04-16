

## Plan: Darken-to-Black Transition + Next Section Canvas

### Current scroll timeline (preserving everything)

```text
scrollYProgress:
0.00─0.22  (below viewport, not visible yet)
0.22─0.38  Curtain slides up (Trust Gap content)
0.38─0.55  Trust Gap is readable
0.55─0.68  Image dot → full-bleed
0.68─0.84  Text 1 & 2 fade in
0.84─1.00  ← THIS IS THE NEW ZONE
```

### What happens in the new zone (0.84 → 1.0)

**Phase 3 → 4: Text fades out + filter darkens to pure black**

| Range | What happens |
|-------|-------------|
| `0.84 → 0.90` | Both texts fade out (opacity 1 → 0) |
| `0.88 → 0.96` | A black overlay (z-index 55, above image at 50, below text at 60) fades from `rgba(0,0,0,0)` to `rgba(0,0,0,1)` — progressively darkening the already-dark image to solid black |
| `0.96 → 1.00` | Fully black. The screen is a solid black canvas. |

**Phase 5: Next section loads on top**

A new component (placeholder for now — `ProductSection`) renders immediately after `ProblemReframe` in `Index.tsx`. It has:
- `position: relative` with `z-index: 45` (above ProblemReframe's sticky at z-40)
- `background: #121212` (dark surface) or whatever the next section needs
- Because the ProblemReframe is already solid black at scroll-end, the next section sliding into view is visually seamless — black into dark background

### Technical details

**Changes to `src/components/ProblemReframe.tsx`:**

1. Add new motion values for the text fade-out:
   - `text1FadeOut`: opacity mapped `[0.84, 0.90]` → `[1, 0]`
   - `text2FadeOut`: opacity mapped `[0.84, 0.88]` → `[1, 0]`
   - Combine with existing fade-in using a computed opacity approach (multiply enter × exit)

2. Add a black overlay `<motion.div>` at z-index 55 (between image z-50 and text z-60):
   - `opacity` mapped `[0.88, 0.96]` → `[0, 1]`
   - `background: #000000`, `position: absolute`, `inset: 0`
   - This sits above the image so it covers everything including the `.alvie-photo-dark` filter

3. No changes to scroll ranges before 0.84 — everything prior is untouched.

**Changes to `src/pages/Index.tsx`:**

4. Add a placeholder `ProductSection` component after `ProblemReframe`:
   - Simple div with `position: relative`, `z-index: 45`, dark background
   - Min-height of 100vh as a placeholder canvas
   - Content TBD (you said you'll provide details later)

**Reversibility:** All transforms are driven by `useTransform` on `scrollYProgress` — fully reversible by design. Scrolling back reverses the black overlay, text reappears, image lightens. No state, no imperative animations.

### Files changed
1. `src/components/ProblemReframe.tsx` — text exit animations + black overlay layer
2. `src/pages/Index.tsx` — add placeholder ProductSection
3. `src/components/ProductSection.tsx` — new file, minimal placeholder

