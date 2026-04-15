
Root cause: the reveal is currently tied to a full-screen absolute layer inside the sticky viewport, so it counts as “in view” too early. That makes the image expand as soon as the Problem section arrives, instead of only after the Trust Gap reading phase.

```text
Hero/Scrollytelling -> Trust Gap stays readable -> Trigger point reached -> Image auto-expands
Scroll back up past trigger -> Image auto-shrinks -> Trust Gap is readable again
```

### Plan

1. Fix the trigger in `src/components/ProblemReframe.tsx`
- Remove the current `useInView(imageTriggerRef)` logic for the image reveal.
- Trigger the reveal from the section’s own `scrollYProgress` threshold instead.
- Set that threshold after the Trust Gap has already settled on screen and had time to be read.

2. Keep the reveal automatic, not scroll-scrubbed
- Scroll will only start the animation.
- The image will still enlarge from small circle to full screen on its own.
- It will no longer be tied frame-by-frame to scroll position.

3. Make the animation properly reversible
- When scroll progress goes back above the Trust Gap zone, switch the reveal state back to false.
- The image shrinks automatically to the small circle again.
- The overlay text fades out before or alongside the shrink so the Trust Gap is visible again immediately.

4. Preserve the calm pacing
- Keep the slower timing already requested for the enlarge/shrink animation.
- Match the text delays to the new reveal state so the sequence still feels unhurried.

5. Limit changes to the problem section
- Main file: `src/components/ProblemReframe.tsx`
- Keep the curtain slide-up behavior intact unless the new threshold needs a tiny timing adjustment.

### Expected result
- The Trust Gap appears first and remains accessible.
- The fullscreen image takeover happens only after the Trust Gap section, not immediately.
- Scrolling back up shrinks the image again and restores the Trust Gap view.
- The whole effect stays reversible and calm.
