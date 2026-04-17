---
name: Philosophy Section
description: Dark editorial two-column section after ProofGrid — sticky headline + three staggered pillars
type: feature
---
Section after ProofGrid. Bg #121212, padding 128px V / 48px H, max-width 1200px.
Desktop: grid 2fr/3fr, gap 96px, left column sticky (top 25vh).
Mobile: single column, gap 64px.
Left: overline "— our philosophy" (Be Vietnam Pro 14px #9CA3AF) + headline (Baloo 2 64px, -2% tracking, 110% lh, #F9FAFB).
Right: 3 pillars, gap 64px. Each = numeral (Baloo 2 32px #4EB5A3) + 32×1px #2D3748 divider + title (Be Vietnam Pro 24px/500 #F9FAFB) + body (Be Vietnam Pro 16px/300, 170% lh, #9CA3AF, max 480px).
Motion: framer-motion whileInView, opacity+y(24→0), 600ms, stagger 120ms, ease (0.4,0,0.2,1). Honors prefers-reduced-motion.
