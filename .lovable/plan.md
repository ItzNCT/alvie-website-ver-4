

## Plan: Featured Gallery Section — Cinematic Hover Reveals

Replace the current placeholder ProofGrid with a full cinematic featured gallery. Five proof tiles arranged across three full-viewport rows. Dark, immersive, hover-driven storytelling.

### Layout (top to bottom)

```
┌─────────────────────────────────────────────────┐
│ Gallery                       Observe our work →│  ← Header strip (compact, ~80px tall)
├─────────────────────────────────────────────────┤
│                                                 │
│              [Tile 1 — Full width]              │  ← Row 1: 100vh
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│      [Tile 2 — 60%]      [Tile 3 — 40%]        │  ← Row 2: 100vh
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│      [Tile 4 — 40%]      [Tile 5 — 60%]        │  ← Row 3: 100vh
│                                                 │
└─────────────────────────────────────────────────┘
```

- Background: solid `#121212` everywhere
- Safe space: 48px from all screen edges (matches `--safe-space`)
- Gap between tiles in the same row: 24px
- Gap between rows: 48px

### Header strip

- Height: ~80px, vertically centered content
- Left (48px from screen edge): "Gallery" — Be Vietnam Pro, 16px, weight 500, color `#9CA3AF`, letter-spacing 0.1em, uppercase
- Right (48px from screen edge): "Observe our work →" — same typography, color `#F9FAFB`, ghost-link hover (arrow translates +4px on hover)

### Per-tile composition (identical for all 5 tiles)

Each tile is a `border-radius: 24px; overflow: hidden;` container holding stacked layers (bottom → top):

```
1. <img>      stock photo (always visible, base layer)
2. <video>    stock mp4/gif loop, opacity 0 by default → 1 on hover
              transform follows cursor with parallax (~12px range)
3. ALVIE dark filter overlay   — rgba(15, 92, 78, 0.25) tinted dark veil
                                 fades OUT on hover (so video pops)
4. Vignette overlay            — radial-gradient transparent center → 
                                 rgba(0,0,0,0.6) edges, ALWAYS on top
5. Bottom-left caption block   — project name + category, fades up on hover
```

### Hover interaction (the key moment)

On `mouseenter`:
- Video starts playing, fades in (300ms)
- Dark ALVIE filter fades from 0.55 → 0.15 opacity (300ms)
- Caption slides up 8px and brightens
- Cursor tracking begins

On `mousemove` inside tile:
- Calculate cursor position relative to tile center (-1 to +1 on each axis)
- Apply `transform: translate3d(x * -12px, y * -12px, 0) scale(1.04)` to the video layer
- Smooth via `transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1)`
- Creates parallax — video subtly follows cursor, ~24px max range, scaled slightly so edges never reveal

On `mouseleave`:
- Video pauses, fades out
- Dark filter restores
- Video transform resets to center
- Caption settles back

### Stock media (5 tiles)

Use Unsplash for images (`https://images.unsplash.com/...`) and free hosted stock loops (e.g. Pexels/Coverr CDN URLs) for video. I'll source 5 cohesive cinematic clips — moody studio/workspace/hands-on-craft footage to match the Observer aesthetic.

Each tile gets:
- `image`: cinematic still
- `video`: 4-8s muted loop (.mp4)
- `title`: project name
- `category`: e.g. "Brand System · 2024"

### Vignette + ALVIE filter specs

- Vignette: `radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)` — always 100% opacity, sits topmost (below caption)
- ALVIE dark filter: solid layer with `background: linear-gradient(180deg, rgba(8,47,40,0.55) 0%, rgba(18,18,18,0.7) 100%)`, `mix-blend-mode: multiply` — opacity 0.55 default, 0.15 on hover

### Accessibility & performance

- Respect `prefers-reduced-motion`: disable cursor parallax, fade only
- Videos: `muted`, `playsInline`, `preload="metadata"`, `loop` — only `play()` on hover (saves bandwidth)
- Touch devices: no hover state — show video autoplay-on-scroll-into-view as fallback (use IntersectionObserver)

### Total section height

- Header: 80px
- Row 1: 100vh
- Row 2: 100vh  
- Row 3: 100vh
- Plus row gaps (48px × 2) + outer padding (96px top/bottom)
- ≈ 300vh + ~270px

Sticky cover transition from ProductSection (already in place at z:50) is preserved — this gallery slides up over the pinned Solutions section as designed.

### Files changed

1. `src/components/ProofGrid.tsx` — full rewrite: header strip + 3 rows + 5 `GalleryTile` instances. Internal `GalleryTile` sub-component handles hover state, cursor tracking, video play/pause, parallax transform.
2. `mem://features/proof-grid` — NEW memory file documenting the gallery structure, hover mechanic, and stock asset sources.

### What is NOT touched

- Hero, Scrollytelling, ProblemReframe, ProductSection, Index.tsx layering, sticky cover transition — all preserved.
- ProofGrid's z-index (50), background (#121212 now instead of #F9FAFB — switching to dark per spec), and sticky cover behavior remain.

### Open question (will ask after approval if needed)

Caption content for the 5 tiles — for now I'll use evocative placeholder titles ("Quiet Atelier", "Hinoki Group", "Northbound Labs", "Solène Wellness", "Verdant Co."). Easy to swap later.

