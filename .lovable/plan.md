

## Problem: Gap Between Hero and Scrollytelling

The gap visible in your screenshot is caused by **`App.css`** — the default Vite boilerplate styles on `#root`:

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;  /* ← This creates the gap */
}
```

This `padding: 2rem` pushes all content inward, and `max-width: 1280px` constrains the full-bleed layout. These are Vite defaults that should have been removed for a full-screen cinematic site.

### Fix

**`src/App.css`** — Remove or override the `#root` block. Replace lines 1-6 with:

```css
#root {
  width: 100%;
  margin: 0;
  padding: 0;
}
```

This removes the padding and max-width constraint, letting the hero, scrollytelling, and all sections flow edge-to-edge as intended. No other files need changes.

