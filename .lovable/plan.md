

## Plan: Fix Product Section — Headline Size + Tab Positioning

Two changes in `src/components/ProductSection.tsx`. Nothing else touched.

### Changes

1. **Headline font size**: `42px` → `56px` (line 90)

2. **Move tab bar out of the top header block and closer to the image gallery**: Currently the tabs sit inside the 40vh header with `justify-center`, making them visually grouped with the headline. Fix by restructuring the layout:
   - Change the top header from `justify-center` to `justify-center` but remove the tab bar from it
   - Place the tab bar in its own container between the header and gallery, with a small `marginBottom` (e.g. 16px) above the images — so it reads as a label for the gallery below, not a footer of the headline above
   - Practically: split the current 40vh block into two parts — the headline area (flex-grow, centered) and the tab bar pinned near the bottom of the top section with padding-bottom of ~16px before the images

### Files changed
1. `src/components/ProductSection.tsx` — font size update + tab repositioning

