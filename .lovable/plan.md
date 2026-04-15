

## Plan: Fix Right Column Paragraph Alignment

### Problem
The right column paragraph has `my-[50px]` which adds 50px vertical margin, causing it to appear "short" relative to the stats row below. The `flex items-start` on the wrapper also prevents proper vertical alignment with the headline on the left. On reload, the layout doesn't match the desired alignment where the paragraph bottom should sit level with the headline bottom, creating consistent spacing to the stats.

### Fix
Remove the `my-[50px]` margin from the paragraph and change the right column wrapper from `items-start` to `items-end`. This anchors the paragraph text to the bottom of the left column's headline, ensuring the gap to the stats row is consistent regardless of text reflow.

### Technical Changes

**File: `src/components/ProblemReframe.tsx`**

1. **Line 85** — Change right column div:
   - From: `className="flex items-start"`
   - To: `className="flex items-end"`

2. **Line 87** — Remove vertical margin from paragraph:
   - From: `className="md:pt-1 my-[50px] text-lg font-normal text-justify"`
   - To: `className="text-lg font-normal text-justify"`

