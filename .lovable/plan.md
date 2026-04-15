

## Plan: Auto-playing Image Reveal (No Scroll Scrubbing)

### Problem
The image enlargement (circle → full-screen) currently requires the user to scroll through a long phase (0.55–0.8 of scrollYProgress). The user wants it to trigger once and play automatically — no scrubbing through phases.

### Approach
Use Framer Motion's `useInView` to detect when the image container enters the viewport. Once triggered, play a CSS/Framer animation that smoothly scales from a small circle to full-bleed over ~1.8s. The text fades in sequentially after the image finishes expanding.

### Changes to `src/components/ProblemReframe.tsx`

**1. Remove scroll-driven image transforms**
- Delete `imageScale`, `imageWidth`, `imageHeight`, `imageBorderRadius` (lines 38–41)
- Delete scroll-driven `text1Opacity`, `text1Y`, `text2Opacity`, `text2Y` (lines 44–47)

**2. Add state-driven animation**
- Add `useState` for `revealed` boolean
- Use `useInView` on the image container div — once it enters viewport, set `revealed = true`
- Animate the image container with `motion.div` using `animate` prop:
  - Initial: `{ width: "6vw", height: "6vw", borderRadius: "50%", scale: 0.03 }`
  - Revealed: `{ width: "100vw", height: "100vh", borderRadius: "0%", scale: 1 }`
  - Transition: `duration: 1.8, ease: [0.4, 0, 0.2, 1]`

**3. Text fade-in after image**
- Text 1: `animate` with `opacity: 1, y: 0` when revealed, `delay: 1.6`
- Text 2: same but `delay: 2.2`
- Both use `duration: 0.6` for a calm entrance

**4. Reduce section height**
- Since the image reveal no longer needs scroll distance, reduce section height from `450vh` to ~`300vh` (the curtain slide-up and Trust Gap stats still need scroll room, but the image phase is now automatic)

### Result
When the user scrolls past the Trust Gap stats, the image circle appears and automatically expands to full-screen over ~1.8 seconds. Text fades in after. No scroll scrubbing needed for the reveal phase.

### Files Changed
1. `src/components/ProblemReframe.tsx`

