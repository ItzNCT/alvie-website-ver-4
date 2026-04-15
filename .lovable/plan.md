

## Plan: Fix ProblemReframe Component Styling

### Issues to Fix

1. **Replace "--" with a visual line**: Change the text "The Reality ——" to show a small horizontal line (using a styled span with border-bottom or an inline-block element) instead of the em dash characters.

2. **Fix first line hanging in body text**: The body paragraph has uneven text flow. Ensure text hangs correctly with proper wrapping and alignment.

3. **Make stat descriptions 4 lines and centered**: The description text and references in the three stat columns should each occupy 4 lines total and be center-aligned.

4. **"The Trust Gap" headline**: Change from 42px to 64px and apply ALVIE green color (`#0F5C4E`).

5. **Stat numbers centered and green**: The 75%, 94%, 84% numbers should be center-aligned in their columns and use ALVIE green (`#0F5C4E`).

6. **Fix third stat**: Change from 75% to 84% for the consumers trust statistic.

### Changes in `src/components/ProblemReframe.tsx`

**Line 4-22 (stats array)**: Change third stat number from "75" to "84".

**Lines 51-60 (overline)**: Replace the "——" text with a styled span element showing a small horizontal line (e.g., `border-bottom: 1px solid #6B7280`, `width: 24px`, `display: inline-block`).

**Line 62-74 (headline)**: Change fontSize from "42px" to "64px", color from "#111827" to "#0F5C4E".

**Lines 78-96 (body text)**: Ensure proper text alignment and line height to prevent hanging issues.

**Lines 99-141 (stat columns)**: 
- Wrap each stat in a centered flex container
- Change number color to "#0F5C4E"
- Add `textAlign: "center"` to description and reference paragraphs
- Ensure descriptions occupy exactly 4 lines with proper lineHeight

