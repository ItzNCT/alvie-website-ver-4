

## Plan: Slow Down the Curtain Slide-Up

### Problem
The curtain slides up too quickly because it maps only the last 15% of scroll progress (`[0.85, 1]`) to the full 100vh travel distance.

### Fix
Widen the animation range from `[0.85, 1]` to `[0.65, 1]` — giving 35% of scroll distance instead of 15%. This makes the curtain rise feel calm and unhurried while still starting after the scrollytelling text finishes.

### Technical Change

**File: `src/components/ProblemReframe.tsx`** (line ~33)
- Change: `useTransform(scrollYProgress, [0.85, 1], ["100vh", "0vh"])`
- To: `useTransform(scrollYProgress, [0.65, 1], ["100vh", "0vh"])`

Single line change.

