

## Plan: Speed Up Image Expansion

Compress the scroll ranges so the image reveal happens faster, reducing how much the user needs to scroll through the image-growing phase.

### Changes to `src/components/ProblemReframe.tsx`

**Image reveal** — shrink the range from `[0.55, 0.8]` to `[0.55, 0.68]`:
- `imageScale`: `[0.55, 0.68]`
- `imageWidth`: `[0.55, 0.68]`
- `imageHeight`: `[0.55, 0.68]`
- `imageBorderRadius`: `[0.55, 0.68]`

**Text fade-ins** — shift earlier to match:
- `text1Opacity` / `text1Y`: `[0.68, 0.78]`
- `text2Opacity` / `text2Y`: `[0.76, 0.84]`

This cuts the image expansion scroll distance nearly in half while keeping the same start point and smooth progression.

