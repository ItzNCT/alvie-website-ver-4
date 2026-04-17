---
name: Proof Grid Featured Gallery
description: Cinematic dark gallery — 5 tiles, hover spawns cursor-pinned 9:16 video card with rAF-lerp trailing
type: feature
---
Layout: header strip (lowercase "gallery" / "observe our work →", 14px Be Vietnam Pro, normal case, 24px below) + Row1 full-width + Row2 60/40 + Row3 40/60. Each row 100vh. Universal 16px spacing: section padding 16px, intra-row gap 16px, row-to-row 16px (header→row1 stays 24px). Bg #121212. Z-index 50 (slides up over sticky ProductSection).

Tile composition (no underlying image transform — image is static):
1. <img> base (Unsplash, static)
2. ALVIE filter linear-gradient(rgba(8,47,40,.55)→rgba(18,18,18,.7)) mix-blend multiply, opacity 0.35 default → 0.75 on hover (DARKER on hover to focus floating card)
3. Vignette radial always on
4. Floating cursor-pinned video card (desktop only): 240×427px (9:16), border-radius 16px, shadow 0 24px 60px rgba(0,0,0,.5), opacity 0→1 on hover (200ms), transform driven by rAF lerp (factor 0.18) trailing the cursor. Position clamped inside tile bounds. pointer-events: none.
5. Caption (Baloo 2 32px title + Be Vietnam Pro 14px category, fades up).

Hover lifecycle: mouseenter snaps both target + smoothed positions to cursor (no fly-in), starts video, starts rAF loop. mousemove updates target only. mouseleave pauses + resets video, cancels rAF, fades card out.

Touch fallback: IntersectionObserver autoplays — video fills entire tile (no floating card). Reduced motion: no lerp, card centered, fade only.

Videos: Pexels CDN vertical 9:16 mp4s.
