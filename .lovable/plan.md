

## Plan: Fix Image Reveal — Reversible + Slower

### Problems
1. **Image covers Trust Gap permanently** — `useInView` uses `once: true`, so once triggered the image never shrinks back. When scrolling up, you see the full-bleed image instead of the Trust Gap stats.
2. **Too fast** — 1.8s duration needs to be ~30% slower (2.4s).

### Changes to `src/components/ProblemReframe.tsx`

**1. Make the reveal reversible**
- Remove `once: true` from `useInView` — change to `{ amount: 0.3 }` only
- Remove the `useState`/`useEffect` pattern — drive animation directly from `isInView`
- When user scrolls up past the trigger point, `isInView` becomes false → image shrinks back to circle → Trust Gap stats become visible again

**2. Slow down the animation by 30%**
- Image expand/shrink: `1.8s` → `2.4s`
- Text 1 delay: `1.6s` → `2.1s`
- Text 2 delay: `2.2s` → `2.9s`

**3. Text hides when image shrinks**
- Text opacity animates based on `isInView` (same as image), so text fades out when scrolling back up

### Result
Scrolling down past the stats triggers a slow 2.4s circle-to-fullscreen expansion. Scrolling back up reverses it — image shrinks, Trust Gap stats reappear. No content is permanently hidden.

### Files Changed
1. `src/components/ProblemReframe.tsx`

