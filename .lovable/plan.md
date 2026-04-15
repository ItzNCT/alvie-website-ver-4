

## Plan: Fix Image Reveal Timing and Word-by-Word Text

### Problem 1: Image reveals too early
The `useInView` on `imageTriggerRef` fires immediately because the ref is an `absolute inset-0` div inside the sticky container — it's "in view" the moment the curtain finishes sliding up. The reveal should only trigger after the user scrolls past the Trust Gap stats.

**Fix:** Replace `useInView` trigger with a `scrollYProgress` threshold check. When `scrollYProgress > 0.55` (meaning the user has scrolled well past the Trust Gap content), set `revealed = true`. This keeps the auto-play animation (no scrubbing) but delays the trigger to the right moment. The user can also scroll back to see the Trust Gap stats since the image won't cover them until that threshold.

### Problem 2: Text appears all at once
Both paragraphs fade in as single blocks. The user wants word-by-word reveal.

**Fix:** Split each text string into individual words. Wrap each word in a `motion.span` with staggered delay. Text 1 starts after the image finishes expanding (~1.8s), each word appears ~80ms apart. Text 2 starts after Text 1 completes, same stagger.

### Changes to `src/components/ProblemReframe.tsx`

1. **Remove `useInView`** — replace with `useMotionValueEvent` on `scrollYProgress` to set `revealed = true` when progress crosses 0.55
2. **Remove `imageTriggerRef`** — no longer needed
3. **Word-by-word text rendering** — create a helper that splits text into words and returns `motion.span` elements with staggered opacity/y animations
   - Text 1 words: start at delay 1.8s, each word +80ms
   - Text 2 words: start after Text 1 finishes (~1.8 + wordCount*0.08), each word +80ms
4. Keep the image `motion.div` animation unchanged (1.8s auto-expand)

### Result
- Image reveal waits until user scrolls past Trust Gap stats
- Scrolling back shows Trust Gap content, not just the hero
- Text appears word by word with a calm stagger after the image expands

### Files Changed
1. `src/components/ProblemReframe.tsx`

