

## Plan: Fix Featured Gallery — Cursor-Pinned Video Reveal

Five focused fixes. The hard part is #2 (cursor-following video portal), so it gets the most detail.

---

### Fix 1 — Header treatment

- Remove `text-transform: uppercase` and `letter-spacing: 0.1em` from both labels.
- Change copy: "Gallery" → "gallery", "Observe our work →" → "observe our work →".
- Reduce vertical gap between header and Row 1 from `48px` to `24px` (visually groups the label with the gallery below it instead of floating).
- Keep 48px horizontal safe space on both edges.
- Typography: Be Vietnam Pro 14px, weight 400, normal case.

---

### Fix 2 — Cursor-pinned 9:16 video reveal (the hard one)

**Concept:** Hovering a tile does NOT animate the underlying image. Instead, a small 9:16 portrait video appears **floating at the cursor position** and follows the mouse as it moves inside the tile. Like a magnifying glass that plays a clip.

**Mechanics:**

```
Tile (image stays static, gets darker on hover)
   └── Floating video card (position: absolute, follows cursor)
        - Size: 240px wide × 427px tall (9:16 ratio)
        - border-radius: 16px
        - subtle shadow: 0 24px 60px rgba(0,0,0,0.5)
        - transform: translate(cursorX - 120px, cursorY - 213px)
        - opacity: 0 → 1 on enter (200ms)
        - smoothed via requestAnimationFrame lerp (factor ~0.18) — 
          lags slightly behind cursor for elegant "trailing" feel
```

**Implementation details per tile:**

- State: `hovered: boolean`, `cursorPos: {x, y}` (raw, updated on mousemove), `smoothedPos: {x, y}` (lerped, used for transform).
- `useEffect` runs a `requestAnimationFrame` loop while `hovered === true`:
  ```
  smoothedPos.x += (cursorPos.x - smoothedPos.x) * 0.18
  smoothedPos.y += (cursorPos.y - smoothedPos.y) * 0.18
  ```
  Loop cancels on mouseleave.
- The video card is `pointer-events: none` so it doesn't break hover state.
- Edge clamping: clamp the smoothed position so the video card never overflows the tile bounds (keeps it visually contained).
- On mouseenter: `video.play()`, fade card in.
- On mouseleave: `video.pause()`, `video.currentTime = 0`, fade card out (200ms).

**Reduced motion fallback:** Skip the smoothing — video appears centered in the tile, fades in/out only.

**Touch fallback:** No floating card. Instead, fade the video to fill the whole tile (current IntersectionObserver autoplay behavior, simplified).

---

### Fix 3 — Invert filter logic

- Default state: ALVIE dark filter at **opacity 0.35** (image visible, slightly tinted).
- Hover state: ALVIE dark filter at **opacity 0.75** (image darkens, drawing focus to the floating video card).
- Same gradient, just swap the opacity values (`0.55 → 0.15` becomes `0.35 → 0.75`).
- Vignette layer: unchanged, always on top.

---

### Fix 4 — Equal vertical & horizontal safe space

Currently:
- Horizontal safe space: 48px
- Vertical row gap: 48px
- Intra-row gap: 24px
- Section padding: 96px top/bottom

Change to:
- Horizontal safe space: 48px (unchanged)
- **Vertical row gap: 48px** (already matches)
- **Intra-row gap: 48px** (was 24px — bump to match horizontal)
- **Section padding: 48px top/bottom** (was 96px — match horizontal)
- Header-to-row1 gap: 24px (per Fix 1)

Result: every gap between visual elements equals 48px, except the tighter header coupling.

---

### Fix 5 — Stock video sources (replace broken Coverr URLs)

The current Coverr URLs in `ProofGrid.tsx` look fabricated/may 404. Swap to verified Pexels CDN 9:16 vertical videos (free, hot-linkable). I'll source 5 cinematic vertical clips: studio hands, pour shot, fabric texture, walking through forest, fog/landscape — matching the Observer aesthetic.

---

### Files changed

1. `src/components/ProofGrid.tsx` — rewrite `GalleryTile`:
   - Add cursor-following floating video card with rAF-smoothed lerp
   - Invert filter opacity logic
   - Replace video URLs
   - Adjust header copy + spacing
   - Bump intra-row gap and section padding to 48px
2. `mem://features/proof-grid` — update spec: cursor-pinned 9:16 portal mechanic, inverted filter logic, 48px universal spacing.

### What is NOT touched

- Hero, Scrollytelling, ProblemReframe, ProductSection — untouched.
- Z-index 50 sticky cover transition — preserved.
- Tile layout (full / 60-40 / 40-60) — preserved.
- Captions and project names — preserved.

