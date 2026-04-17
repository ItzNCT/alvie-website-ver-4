---
name: Proof Grid Featured Gallery
description: Cinematic dark gallery — 5 tiles across 3 rows, hover reveals stock video with cursor parallax + ALVIE dark filter fade
type: feature
---
Layout: header strip (Gallery / Observe our work →) + Row1 full-width + Row2 60/40 + Row3 40/60. Each row 100vh, 24px intra-row gap, 48px row gap, 48px safe space, bg #121212.

Tile layers (bottom→top): img (Unsplash) → video (Coverr stock mp4, opacity 0→1 on hover, parallax translate3d ±12px scale 1.04 follows cursor) → ALVIE filter linear-gradient(rgba(8,47,40,.55)→rgba(18,18,18,.7)) mix-blend multiply opacity 0.55→0.15 on hover → vignette radial always on → caption (Baloo 2 32px title + Be Vietnam Pro 14px category, fades up).

Hover lifecycle: mouseenter plays video; mousemove updates parallax offset; mouseleave pauses + resets. Touch fallback: IntersectionObserver autoplays in view. Respects prefers-reduced-motion (no parallax).

Z-index 50 preserved — slides up over sticky ProductSection per layering architecture.
