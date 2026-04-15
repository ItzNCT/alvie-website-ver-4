

## Plan: Switch ProblemReframe to 1200px Max-Width Container

Replace the full-width `px-6 md:px-12` padding approach with a centered `max-w-[1200px] mx-auto` container, keeping horizontal padding for smaller screens.

### Change

**File: `src/components/ProblemReframe.tsx`**
- Change the content wrapper from `w-full h-full flex flex-col justify-center px-6 md:px-12` to `w-full h-full flex flex-col justify-center max-w-[1200px] mx-auto px-6`

