

## Plan: Fade-to-Black Transition + Next Section Canvas

### Scroll Timeline (current → new)

```text
Scroll Progress within ProblemReframe (450vh):

0.22–0.38  Curtain slides up (existing)
0.55–0.68  Image dot → full-bleed (existing)
0.68–0.78  Text 1 fades in (existing)
0.76–0.84  Text 2 fades in (existing)
0.84–0.90  ← NEW: Both texts fade OUT
0.90–0.98  ← NEW: Black overlay fades from 0 → 1 opacity
0.98–1.00  Fully black — seamless handoff
```

### Changes

**1. `src/components/ProblemReframe.tsx`** — Add two new scroll-driven transforms:

- **Text fade-out** `[0.84, 0.90]`: Both `text1Opacity` and `text2Opacity` animate back to 0. This means changing from simple `[0.68, 0.78] → [0, 1]` to a multi-stop: `[0.68, 0.78, 0.84, 0.90] → [0, 1, 1, 0]` (fade in, hold, fade out).
- **Black overlay opacity** `[0.90, 0.98] → [0, 1]`: A new `<motion.div>` at **z-index 70**, `position: absolute`, `inset: 0`, `background: #000`, opacity driven by scroll. This sits above the image (z-50) and text (z-60), darkening everything to pure black.

**2. `src/components/ProblemReframe.tsx`** — Increase section height from `450vh` to `550vh`:
- Gives breathing room for the new fade-out + blackout phases without rushing the existing animations.

**3. `src/pages/Index.tsx`** — Add a placeholder `ProductSection` component:
- Renders after `<ProblemReframe />` with `position: relative`, `z-index: 41` (above the sticky z-40 panel), `background: #000`, and `min-height: 100vh`.
- Because ProblemReframe's sticky panel ends at pure black, and ProductSection starts with `#000` background at a higher z-index, the transition is completely seamless.
- Content will be empty for now — just the black canvas ready for the product section.

**4. Reversibility**: All transforms use Framer Motion's `useTransform` which is inherently bidirectional — scrolling back reverses every value. No imperative state, no one-way triggers.

### Technical Detail

Multi-stop `useTransform` for text fade-in then fade-out:
```tsx
const text1Opacity = useTransform(
  scrollYProgress, 
  [0.68, 0.78, 0.84, 0.90], 
  [0, 1, 1, 0]
);
```

Black overlay:
```tsx
const blackOverlay = useTransform(
  scrollYProgress, 
  [0.90, 0.98], 
  [0, 1]
);

// In JSX, z-index 70 (above text at 60)
<motion.div
  className="absolute inset-0"
  style={{ zIndex: 70, backgroundColor: "#000", opacity: blackOverlay }}
/>
```

