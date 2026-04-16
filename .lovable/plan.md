

## Plan: Fix Black Overlay Range + Match Color

### Changes to `src/components/ProblemReframe.tsx`

1. **Extend overlay range**: Change `blackOverlayOpacity` from `[0.88, 0.96]` to `[0.88, 1.0]` — eliminates the flash where the image peeks through at the tail end.

2. **Match overlay color**: Change the overlay `backgroundColor` from `#000000` to `#121212` — seamless match with the ProductSection background.

### Files changed
1. `src/components/ProblemReframe.tsx` — two small value changes

