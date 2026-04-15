

## Plan: Remove the Right-Side Gap in the Paragraph Column

### Problem
The paragraph has `maxWidth: "540px"` but sits inside a grid column that's ~720px wide (3fr out of 5fr total in a 1200px container). This creates a ~180px empty gap on the right side.

### Fix
Remove the `maxWidth: "540px"` constraint so the paragraph fills the full column width naturally. The grid column itself already constrains the width appropriately.

### Technical Change

**File: `src/components/ProblemReframe.tsx`** (lines 88–96)

Remove `maxWidth: "540px"` from the paragraph's inline style:

```tsx
style={{
  fontFamily: "var(--font-body)",
  fontSize: "18px",
  fontWeight: 400,
  lineHeight: "1.7",
  color: "#6B7280",
  textIndent: "2em",
}}
```

Single property removal, one file.

