

## Plan: Fix Image Not Covering Full Screen

### Problem
The image container uses `flex items-end justify-center pb-16`, which keeps the image anchored at the bottom even at full-bleed size. A `100vw × 100vh` element inside a flex container with `pb-16` won't align to all edges — there's a gap at the bottom/top.

### Solution
Use absolute positioning with animated `bottom` instead of flex alignment. This way the image starts at the bottom and transitions to `inset: 0` (filling the entire viewport) as it grows.

### Technical Changes

**File: `src/components/ProblemReframe.tsx`**

1. **Remove flex alignment from the image wrapper** — change from `flex items-end justify-center pb-16` to just a positioning container.

2. **Position the inner image element absolutely** with animated `bottom` and `left: 50%` / `translateX(-50%)` for horizontal centering initially, transitioning to `inset: 0` at full-bleed.

Simpler approach: keep the current container as `absolute inset-0` with no flex, and position the inner `motion.div` absolutely with:
- `left: 50%`, `transform: translateX(-50%)` for horizontal centering
- Animated `bottom`: `10%` → `0%`
- At full size (`100vw × 100vh`), set `top: 0, left: 0, transform: none` so it fills the viewport completely

**Revised transforms** (lines 37–41):
```tsx
const imageWidth = useTransform(scrollYProgress, [0.55, 0.65, 0.78], ["1vw", "50vw", "100vw"]);
const imageHeight = useTransform(scrollYProgress, [0.55, 0.65, 0.78], ["1vw", "50vw", "100vh"]);
const imageBorderRadius = useTransform(scrollYProgress, [0.55, 0.65, 0.78], ["50%", "50%", "0%"]);
const imageBottom = useTransform(scrollYProgress, [0.55, 0.65, 0.78], ["10%", "5%", "0%"]);
const imageLeft = useTransform(scrollYProgress, [0.55, 0.65, 0.78], ["50%", "50%", "0%"]);
const imageTranslateX = useTransform(scrollYProgress, [0.55, 0.65, 0.78], ["-50%", "-50%", "0%"]);
```

**Image container** (lines 167–178): Remove flex, use plain absolute container. Inner div gets:
```tsx
style={{
  position: "absolute",
  bottom: imageBottom,
  left: imageLeft,
  x: imageTranslateX,
  width: imageWidth,
  height: imageHeight,
  borderRadius: imageBorderRadius,
}}
```

Also remove the old `imageScale` transform (line 38) — it's no longer needed.

### Result
The circle starts as a small dot near the bottom, grows as a circle, morphs to square, and at full size covers the entire viewport edge-to-edge with no gaps.

