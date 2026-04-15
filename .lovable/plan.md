

## Plan: Fix Circle Shape and Size

### Problems
1. **Oval, not circle**: `imageHeight` starts at `"6vw"` but diverges to `"50vh"` in the second keyframe while width goes to `"50vw"`. Since `vw ≠ vh`, the shape becomes oval during growth. Need to keep width and height equal (both using `vw`) until the final full-bleed frame.
2. **Too big**: `6vw` ≈ 86px on a 1440px screen — too large for a "small dot". Should start at `1vw` (~14px).

### Technical Change

**File: `src/components/ProblemReframe.tsx`** (lines 38–39)

Replace the width/height transforms:

```tsx
const imageWidth = useTransform(scrollYProgress, [0.55, 0.65, 0.78], ["1vw", "50vw", "100vw"]);
const imageHeight = useTransform(scrollYProgress, [0.55, 0.65, 0.78], ["1vw", "50vw", "100vh"]);
```

Key changes:
- Start size: `1vw` × `1vw` (a true small dot)
- Mid size: `50vw` × `50vw` (equal dimensions = perfect circle, since borderRadius is still `50%`)
- End size: `100vw` × `100vh` (full-bleed, borderRadius already goes to `0%` here)

Two property values changed, one file.

