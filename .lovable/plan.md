

## Plan: Move Image Reveal Origin Below the Stats

### Problem
The image dot currently appears at the vertical center of the sticky viewport (`items-center justify-center`). It should start below the stats row — at the bottom area of the Trust Gap content — then expand to cover the full screen.

### Technical Change

**File: `src/components/ProblemReframe.tsx`** (line 168)

Change the image overlay container from centered to bottom-aligned:

- From: `className="absolute inset-0 flex items-center justify-center pointer-events-none"`
- To: `className="absolute inset-0 flex items-end justify-center pb-16 pointer-events-none"`

This positions the dot's origin just below the stats row. As it scales to `1` and dimensions grow to `100vw × 100vh`, it will naturally overtake the entire screen from that bottom position. The `pb-16` (64px) gives breathing room from the viewport edge.

One line change, one file.

