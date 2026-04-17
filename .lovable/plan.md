

## Plan: Sticky Cover Transition — Our Solutions → Proof Grid

Create a cinematic "cover" transition where the Our Solutions section stays pinned in place while the next section (Proof Grid) slides up from below at a higher z-index, visually covering it like a curtain rising.

### Concept

- Our Solutions stays fixed/sticky at its final position (z-index: 45, already set).
- Proof Grid section sits at z-index: 50 and slides up from `translateY(100%)` to `translateY(0)` as the user scrolls.
- Effect: Our Solutions appears frozen while Proof Grid rises up and covers it — like a panel sliding over a stationary background.

### Implementation approach

**1. Make Our Solutions sticky (minimal touch — just add `position: sticky`)**
- Already at `height: 100vh` and `z-index: 45`.
- Add `position: sticky; top: 0` to the section root so it pins as the user scrolls past it.
- No internal logic changes — vignettes, tabs, curtain transitions all preserved.

**2. Create new `ProofGrid.tsx` component**
- Section wrapper at `z-index: 50`, `background: #F9FAFB` (light surface to contrast against dark Solutions section).
- Internal content: placeholder grid (4–6 proof cards with logos/quotes/metrics — exact content TBD with user later, this plan focuses on the transition mechanic).
- The slide-up effect is achieved by scroll positioning: because Solutions is sticky and ProofGrid follows it in the DOM with higher z-index, ProofGrid naturally rises into view while Solutions stays pinned underneath.

**3. Optional enhancement — scroll-driven slide reveal**
- Use Framer Motion `useScroll` + `useTransform` on the ProofGrid root to animate `y` from `100%` to `0%` as it enters the viewport, for an even more deliberate "curtain rising" feel.
- Alternatively, rely purely on natural scroll + sticky behavior (simpler, equally effective). Recommend starting with pure CSS sticky + z-index, add Framer scroll-driven only if needed.

**4. Add ProofGrid to Index.tsx**
- Insert `<ProofGrid />` after `<ProductSection />`.

### Layer order (z-index hierarchy)

```
Hero (z: 10)
Scrollytelling canvas (z: 20)
ProblemReframe (z: 40)        — already covers Scrollytelling
ProductSection (z: 45)        — sticky, pins in place
ProofGrid (z: 50)             — NEW, slides up to cover
```

### What is NOT touched

- Hero, Scrollytelling, ProblemReframe, ProductSection internals — all unchanged.
- Only adding `position: sticky; top: 0` to ProductSection root (one-line addition, non-destructive).

### Files changed

1. `src/components/ProductSection.tsx` — add `position: sticky; top: 0` to the root section style (one line).
2. `src/components/ProofGrid.tsx` — NEW component, placeholder content + `z-index: 50` + light background.
3. `src/pages/Index.tsx` — import + render `<ProofGrid />` after `<ProductSection />`.
4. `mem://layout/layering-architecture` — update z-index hierarchy with ProofGrid at z:50.

### Open question (will ask after approval)

Content for the Proof Grid — logos, testimonials, case study cards, metrics? For now the plan ships a clean placeholder grid with the cover transition working; content can be filled in next iteration.

