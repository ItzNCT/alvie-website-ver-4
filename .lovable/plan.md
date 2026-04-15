

## Plan: Flexible Centered Container for ProblemReframe

### Problem
A fixed `max-w-[1200px]` doesn't adapt to different screen sizes. On a 1440px screen it leaves too much dead space; on a 2560px ultrawide it looks tiny.

### Solution
Use a full-width container with consistent safe-space padding on both sides, no max-width cap. The content stretches edge-to-edge minus the breathing room.

```text
|← safe-space →|←——— content area ———→|← safe-space →|
|    48px       |   screen - 96px       |    48px      |
```

On mobile, safe-space shrinks to 24px.

### Technical Changes

**File: `src/components/ProblemReframe.tsx`**
- Replace the placeholder content with the two-row layout (overline + headline | body text, then 3 stat columns).
- Container uses `w-full px-12` (48px each side) instead of `max-w-[1200px] mx-auto`. On mobile: `px-6` (24px).
- Top row: CSS grid `grid-cols-[2fr_3fr]` (40/60 split) with `gap-16`.
- Bottom row: `grid-cols-3` with `gap-12`.
- Typography exactly as specified: Baloo 2 700 42px headline, Baloo 2 400 64px stat numbers, Be Vietnam Pro for body/descriptions.
- Keep existing scroll-driven curtain animation untouched.

