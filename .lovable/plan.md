

## Plan: Image Overtakes Trust Gap (No Fade-Out)

### Clarification
The Trust Gap content should **not** fade out. Instead, the image grows from a small dot at the center of the Trust Gap canvas and visually covers/overtakes everything as it scales to full-bleed. The Trust Gap stays rendered underneath — the image simply layers on top.

### Approach
Merge the TranslationGap image + text directly into ProblemReframe's sticky viewport as an overlay layer. The image starts as a tiny dot (centered, high z-index) and scales up to cover the entire screen. No content fades out — it's purely a visual takeover.

### Scroll Choreography

```text
ProblemReframe (extend to 450vh)
├── 0.22–0.38  Curtain slides up (adjusted from current 0.5–0.85)
├── 0.38–0.55  Trust Gap content visible, static
├── 0.55–0.80  Image dot appears at center, scales to full-bleed OVER the content
├── 0.80–0.90  Text 1 fades in over image
├── 0.88–0.95  Text 2 fades in over image
└── 0.95–1.0   Hold
```

### Technical Changes

**File: `src/components/ProblemReframe.tsx`**

1. Import `problemImage` from `@/assets/problem-statement-image.webp`
2. Change section height from `200vh` to `450vh`
3. Adjust curtain `y` transform: `[0.22, 0.38]` maps `["100vh", "0vh"]`
4. Add inside the sticky viewport (after the content div, so it layers on top):
   - A `motion.div` for the image with z-index 50
   - `position: absolute; inset: 0; display: flex; align-items: center; justify-content: center`
   - Image container scales: `useTransform(scrollYProgress, [0.55, 0.8], [0.03, 1])` 
   - Border radius: `useTransform([0.55, 0.8], ["50%", "0%"])`
   - Width/height: `useTransform` from `"6vw"/"6vw"` to `"100vw"/"100vh"`
   - Apply `.alvie-photo` filter class + radial vignette overlay
5. Add text overlays (z-index 60, absolute centered):
   - Text 1: opacity `[0.8, 0.9]`, y `[20, 0]`, Be Vietnam Pro, 20px, light, `#F9FAFB`
   - Text 2: opacity `[0.88, 0.95]`, y `[20, 0]`, Baloo 2, bold, `#D49A5A`, 18px

**File: `src/pages/Index.tsx`**

- Remove `TranslationGap` import and `<TranslationGap />` from JSX

**File: `src/components/TranslationGap.tsx`**

- Delete (merged into ProblemReframe)

### Result
Trust Gap content stays visible. A small circular dot appears at the center of the screen, grows cinematically to cover everything, then the translation text fades in over the full-bleed image. One continuous, immersive sequence.

