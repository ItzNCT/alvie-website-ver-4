

## Plan: Fix Product Section Styling

Five targeted changes in `src/components/ProductSection.tsx`. Nothing else touched.

### Changes

1. **"Our Solutions" font size**: `20px` → `16px` (line 76)

2. **Headline font size**: `36px` → `42px` (line 90)

3. **Top/bottom split**: Top `50vh` → `40vh`, bottom `50vh` → `60vh` (lines 70, 136)

4. **"Explore →" only on selected image**: Wrap the bottom-right CTA span in a conditional `{selectedImage === i && (...)}` so it only renders on the expanded image (lines 182–195)

5. **Remove tab underline**: Delete the `borderBottom` and `paddingBottom` styles from the tab buttons (lines 120–121)

### Files changed
1. `src/components/ProductSection.tsx` — five small value/conditional changes

