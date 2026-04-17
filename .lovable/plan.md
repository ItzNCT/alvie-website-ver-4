

## Plan: Fix Right-Side Safe Space in Gallery

The section already has `padding: "16px"` on all sides. The issue is that each row's `display: flex` container has `height: 100vh` — and `100vh` equals the full viewport width context just fine, but the tile widths inside use `flex: 1` / `flex: 6` / `flex: 4` which should fill the available space correctly.

Let me re-check by reading the file to confirm the actual issue before planning.

Looking at `ProofGrid.tsx`:
- Section: `padding: "16px"` (all sides ✓)
- Rows: `display: flex` with no explicit width — should default to `width: auto` filling parent

The likely culprit: the parent `<section>` has no `width: 100%` or `box-sizing` reset, OR a parent wrapper in `Index.tsx` is causing horizontal overflow / misalignment. Most probably though, since the user reports left works but right doesn't, the rows themselves are overflowing past the right padding.

### Root cause hypothesis

The `<section>` likely needs `width: 100%; box-sizing: border-box;` and/or the row containers need `width: 100%` explicitly so flex children don't overflow the 16px right padding.

### Fix (single file: `src/components/ProofGrid.tsx`)

- Add `width: 100%` and `box-sizing: border-box` to the `<section>` style
- Add `width: 100%` to each of the 3 row `<div>`s (the `display: flex` containers)
- Keep the `padding: "16px"` — this will now correctly create equal 16px space on left AND right

### What is NOT touched

- Header strip, tile composition, hover mechanics, video portal, filter logic
- Tile heights, ratios, gaps, border-radius
- Any other section

