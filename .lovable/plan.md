

## Plan: Fix Gap Between Scrollytelling and ProblemReframe

### Problem
When the scrollytelling section ends (its 600vh scroll space is exhausted), the ProblemReframe curtain hasn't yet slid up to cover the viewport. This exposes the bare page background as a visible gap.

### Root Cause
ProblemReframe's sticky div starts at `y: 100vh` (off-screen below) and slides to `y: 0`. The scroll offset `["start end", "start start"]` means the animation only begins when ProblemReframe's top enters the viewport bottom — but by then, the scrollytelling sticky viewport has already released, leaving an empty frame.

### Fix
Add `marginTop: -100vh` to the ProblemReframe section so it overlaps the tail end of the scrollytelling. This makes the curtain begin sliding up while the scrollytelling is still sticky, creating a seamless transition with no gap.

### Technical Change

**File: `src/components/ProblemReframe.tsx`**
- On the outer `<section>`, add `marginTop: "-100vh"` to the existing style prop, keeping `height: "200vh"` unchanged.

