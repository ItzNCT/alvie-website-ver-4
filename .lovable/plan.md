

## Plan: Fix Curtain Timing — Start After Text, Scroll Slower

### Problem
The current scroll offset `["start end", "start start"]` only provides 100vh of scroll range for the ProblemReframe animation. Combined with the `[0.65, 1]` breakpoint, the curtain starts sliding at ~465vh scroll — while "Into a living digital presence" (frames 170–195) is still animating through ~490vh. The curtain also feels too fast because it covers 100vh of travel in only 35vh of scrolling.

### Root Cause
The scroll tracking range is too short. `"start start"` as the end offset means tracking stops when the section top hits the viewport top — only 100vh of total range. There's not enough room to both wait for the text AND animate slowly.

### Fix
Extend the scroll tracking range by changing the end offset to `"end end"` (section bottom at viewport bottom). This gives 200vh of scroll range instead of 100vh. Then adjust the y transform breakpoints so the curtain:

1. **Stays hidden** until scroll position ~500vh (after frame 195 finishes at ~490vh)
2. **Slides up slowly** over ~70vh of scroll distance

### Technical Changes

**File: `src/components/ProblemReframe.tsx`**

1. **Line 30** — Change scroll offset:
   - From: `["start end", "start start"]`
   - To: `["start end", "end end"]`

2. **Line 33** — Change y transform breakpoints:
   - From: `[0.65, 1]`
   - To: `[0.5, 0.85]`

**Math check:**
- ProblemReframe section top at 500vh (600vh scrollytelling minus 100vh margin)
- New scroll range: 400vh → 600vh (200vh total)
- Curtain starts at `0.5` = 500vh scroll — just after frame 195 finishes at ~490vh
- Curtain completes at `0.85` = 570vh scroll — 70vh of travel distance for a calm, unhurried feel

Two line changes, one file.

