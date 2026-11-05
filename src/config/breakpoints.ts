/**
 * Breakpoints in rem so they respect the visitor's font-size settings.
 * Keep in sync with `screens` in tailwind.config.ts.
 */
export const BREAKPOINTS = {
  sm: '40rem', // 640px
  md: '48rem', // 768px: tablet starts
  lg: '64rem', // 1024px: desktop starts
  xl: '80rem', // 1280px
  '2xl': '96rem', // 1536px
} as const;
