
## Plan: Add Vignette Filter to Product Gallery Images

Apply a cinematic vignette to all 16 images in the Product section, matching the immersive treatment used in the Hero.

### Approach

Wrap each image with a vignette overlay — a radial gradient `div` layered above the `<img>` but below the existing bottom gradient + text. This keeps the existing bottom-text gradient and "Explore" CTA fully readable while adding cinematic edge darkening.

### Vignette spec (matches Hero cinematic feel)

- Pure CSS radial gradient overlay, no extra assets
- `background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)`
- `mix-blend-mode: multiply` for natural darkening that respects underlying image tones
- `pointer-events: none` so clicks still register on the image
- Sits absolutely positioned, full inset, below the bottom gradient overlay in z-order

### Layer order inside each image panel (bottom → top)
1. `<img>` — the photo
2. **NEW**: Vignette radial overlay
3. Existing bottom-to-top black gradient (text legibility)
4. Bottom-left label
5. Bottom-right "Explore →" (selected only)

### Files changed
- `src/components/ProductSection.tsx` — add one `<div>` per image panel inside the existing `motion.div` map (lines ~155–200)

### What is NOT touched
- Layout, typography, tab logic, 40/60 split, `ProblemReframe` darken transition, image URLs — all unchanged
