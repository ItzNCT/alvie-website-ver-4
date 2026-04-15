

## Plan: Delay ProblemReframe Curtain Until Text 3 Finishes

### Problem
The ProblemReframe curtain slides in too early, overlapping with the third headline "Into a living digital presence" (frames 170–195). The curtain animation begins around frame ~166 due to the `-100vh` margin overlap.

### Solution
Increase the scrollytelling section height to give more scroll runway, so the curtain only arrives after frame 195.

### Technical Change

**File: `src/components/ScrollytellingUnified.tsx`**
- Increase desktop section height from `600vh` to `800vh`. This stretches out the frame timing, giving Text 3 more real scroll distance to complete before ProblemReframe's curtain begins.

**File: `src/components/ProblemReframe.tsx`**
- No changes needed. The `-100vh` overlap and `200vh` height remain the same — they just start later because the scrollytelling section is taller.

### Why This Works
With 800vh, frame 195 maps to ~97.5% × 800vh = 780vh scroll. The ProblemReframe curtain starts animating when its section top reaches the viewport bottom — that's at ~700vh (800vh - 200vh + 100vh overlap). Frame at 700vh = 700/800 × 199 ≈ frame 174. The curtain reaches `y: 0` at ~800vh = frame 199. So the curtain fully lands only after all text has appeared, creating a seamless handoff.

