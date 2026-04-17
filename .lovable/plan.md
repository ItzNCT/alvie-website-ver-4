

## Plan: Tighten Gallery Spacing 48px → 16px

Reduce the universal spacing in `ProofGrid.tsx` from 48px to 16px so tiles breathe less and feel more cinematic / edge-to-edge.

### Changes (single file: `src/components/ProofGrid.tsx`)

- Section padding: `48px` → `16px` (all sides)
- Intra-row gap (between tiles in Row 2 and Row 3): `48px` → `16px`
- Row-to-row margin-bottom: `48px` → `16px`
- Header-to-Row1 gap: keep at `24px` (header coupling unchanged)

### What is NOT touched

- Tile heights (100vh each), border-radius (24px), layout ratios (full / 60-40 / 40-60)
- Header copy, typography, cursor-pinned video portal, filter logic, vignette
- All other sections

### Memory update

- `mem://features/proof-grid` — update spacing spec from "48px universal" to "16px universal (header→row1 stays 24px)"

