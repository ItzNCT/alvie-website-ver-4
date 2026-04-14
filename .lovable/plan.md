

## Plan: Add ProblemReframe Section with Cover-Up Transition

### Architecture

The current z-index stack:
- ScrollytellingUnified: z-10 (sticky viewport)
- HeroSection: z-30 (fixed, fades out)

The new `ProblemReframe` section needs to slide UP and cover the scrollytelling section, so it needs `z-index: 40` (above everything).

### How It Works

```text
Scroll Position:
─────────────────────────────────────────────────
  0vh        Hero fades out
  ~50vh      Scrollytelling takes over
  ~600vh     Scrollytelling ends (frame 200)
  600-700vh  ProblemReframe slides up from bottom
             covering the frozen scrollytelling
─────────────────────────────────────────────────
```

The trick: ProblemReframe is placed after ScrollytellingUnified in the DOM. It uses its own scroll-driven `translateY(100vh → 0)` animation so it appears to slide up like a curtain over the locked scrollytelling canvas.

### Changes

1. **Create `src/components/ProblemReframe.tsx`**
   - Blank canvas section with `z-40`, dark background
   - Uses Framer Motion `useScroll` + `useTransform` on its own container
   - Container has extra scroll height (e.g. `200vh`) — first `100vh` drives the slide-up, rest is content space
   - Inner sticky `div` with `h-screen` that translates from `y: 100vh` to `y: 0` based on scroll progress

2. **Update `src/pages/Index.tsx`**
   - Import and render `<ProblemReframe />` after `<ScrollytellingUnified />`

