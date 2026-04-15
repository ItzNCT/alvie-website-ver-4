

## Plan: Delay ProblemReframe Curtain Until Text Finishes

### Problem
The ProblemReframe curtain starts sliding up at the same time as the third headline "Into a living digital presence" (frames 170–195). The -100vh margin overlap means the curtain begins moving at ~frame 166, before the text even starts appearing.

### Root Cause
The y transform maps the full scrollYProgress `[0, 1]` to `["100vh", "0vh"]`. With -100vh overlap, the curtain starts moving at scroll position 500vh (frame ~166), while the final text doesn't finish until frame 195 (scroll ~588vh).

### Fix
Delay the curtain's y transform so it stays off-screen until the text is nearly done, then slides up quickly in the remaining scroll distance.

Change the y mapping from:
```
[0, 1] → ["100vh", "0vh"]
```
to:
```
[0.85, 1] → ["100vh", "0vh"]
```

This keeps the curtain at `100vh` (hidden below) for 85% of the overlap scroll, only sliding up during the final 15vh — which corresponds to frames ~191+, after "Into a living digital presence" has mostly resolved.

### Technical Change

**File: `src/components/ProblemReframe.tsx`** (line 33)
- Change: `useTransform(scrollYProgress, [0, 1], ["100vh", "0vh"])`
- To: `useTransform(scrollYProgress, [0.85, 1], ["100vh", "0vh"])`

Single line change. No other files affected.

