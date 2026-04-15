

## Plan: Fix Translation Gap Text Size and Image Treatment

### Changes to `src/components/ProblemReframe.tsx`

**1. Text sizing — increase "That's where we come in." to 20px and add spacing**

- Change Text 2 (`fontSize`) from `18px` to `20px`
- Both texts are already 20px / will be 20px — ensure `marginTop: 40px` between them to prevent overlap
- Increase `maxWidth` from `640px` to `680px` for breathing room

**2. Image filter — replace `.alvie-photo` with a new darker treatment**

- Remove the `alvie-photo` class from the `<img>` tag
- Apply a new class `alvie-photo-dark` instead — this will have 20% darker treatment (brightness 0.8) with slight desaturation
- Keep the existing vignette overlay (radial gradient) but make it more subtle at center so the darkening layer handles the mood

### Changes to `src/index.css`

**3. Add new `.alvie-photo-dark` filter class**

```css
.alvie-photo-dark {
  filter: brightness(0.8) saturate(0.9) contrast(1.08) sepia(0.05);
  transition: filter 300ms ease;
}
```

This creates a 20% darker image that keeps detail visible while making white/light text pop. Separate from `.alvie-photo` so the hero treatment stays untouched.

**4. Vignette adjustment**

Update the vignette overlay gradient to use a more transparent center (the darkness now comes from the filter itself):
- Center: `rgba(0,0,0,0.05)` (nearly clear — let image show)
- Edges: `rgba(0,0,0,0.6)` (soft corner blur/vignette)

### Files Changed
1. `src/components/ProblemReframe.tsx` — text size, class swap, vignette values
2. `src/index.css` — add `.alvie-photo-dark` class

