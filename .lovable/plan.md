

## Plan: Bump Both Texts to 32px

### Changes to `src/components/ProblemReframe.tsx`

**Text 1** ("The gap isn't about technology..."):
- `fontSize`: `"20px"` → `"32px"`
- `lineHeight`: `1.8` → `1.5`

**Text 2** ("That's where we come in."):
- `fontSize`: `"20px"` → `"32px"`
- `marginTop`: `"40px"` → `"48px"` for breathing room

**Container**: Increase `maxWidth` from `"680px"` to `"800px"` to fit larger text comfortably.

### Result
Both text layers become 32px with proper spacing to avoid overlap.

