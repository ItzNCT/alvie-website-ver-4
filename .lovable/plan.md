

## Plan: "The Translation Gap" — Cinematic Image Reveal Section

### Vision
After the Trust Gap section finishes scrolling, a small centered image of the rice field appears and dramatically scales to fill the entire viewport — a cinematic "window opening" effect. Once the image is full-bleed, the translation text fades in over it, centered, calm, and unhurried.

### Scroll Choreography

```text
Trust Gap section ends
        │
        ▼
┌─────────────────────────┐
│  Image starts small     │  ← ~20% viewport, centered, rounded
│  at center of screen    │
│                         │
│  Scales to full-bleed   │  ← over ~200vh of scroll
│  as user scrolls        │
│                         │
│  Once full-bleed:       │
│  Text 1 fades in        │  ← "The gap isn't about..."
│  Text 2 fades in        │  ← "That's where we come in."
└─────────────────────────┘
```

### Technical Details

**New file: `src/components/TranslationGap.tsx`**

- Copy uploaded image to `src/assets/problem-statement-image.webp`
- Section height: `400vh` for generous scroll range
- Sticky inner viewport (`top-0, w-screen, h-screen`)
- Uses `useScroll` + `useTransform` (Framer Motion) — consistent with existing pattern
- Image scaling: scroll-driven from `scale(0.4)` + `borderRadius: 24px` → `scale(1)` + `borderRadius: 0` over frames 0–60%
- Apply `.alvie-photo` filter class for cinematic consistency
- Dark vignette overlay (radial gradient) over image for text readability
- Text 1 (main body): fades in at 65–80% scroll progress, Be Vietnam Pro, 20px, light weight, `#F9FAFB`, max-width 640px, centered, line-height 1.8
- Text 2 ("That's where we come in."): fades in at 78–90%, Baloo 2, bold, ALVIE gold color (`#D49A5A`), 18px, letter-spacing 0.02em — sophisticated, not shouting
- Both texts use `opacity` + subtle `y` translate (20px → 0) for the fade-in

**File: `src/pages/Index.tsx`**

- Import and add `<TranslationGap />` after `<ProblemReframe />`

### Sizing & Layout
- Image container: starts at `width: 50vw, height: 50vh` (centered), expands to `100vw × 100vh`
- Text block: `max-width: 640px`, centered horizontally, positioned at vertical center
- Text 1: 20px, font-weight 300 (light), line-height 1.8, color `#F9FAFB`
- Text 2: 18px, font-weight 700 (bold), Baloo 2, color `#D49A5A`, margin-top 32px

### Files Changed
1. Copy `problem-statement-image.webp` → `src/assets/`
2. Create `src/components/TranslationGap.tsx`
3. Update `src/pages/Index.tsx` (add import + component)

