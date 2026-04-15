

## Plan: Make Image Much Darker (80% Black Overlay)

The user wants 20% transparency — meaning you can only see 20% of the image through an 80% black overlay. The current setup uses `brightness(0.8)` (only 20% darker) plus a light vignette. That's far too subtle.

### Changes

**File: `src/index.css`** — Update `.alvie-photo-dark` filter
- Change `brightness(0.8)` to `brightness(0.3)` to significantly darken the base image

**File: `src/components/ProblemReframe.tsx`** — Update vignette overlay
- Change the radial gradient from `rgba(0,0,0,0.05)` center / `rgba(0,0,0,0.6)` edges to `rgba(0,0,0,0.6)` center / `rgba(0,0,0,0.85)` edges
- This combines with the darkened image filter to achieve roughly 80% black coverage while keeping the vignette (corners even darker)

### Result
The image will be dramatically darker — only 20% of the original brightness visible — making the white and gold text pop significantly more. The vignette adds extra depth at corners.

