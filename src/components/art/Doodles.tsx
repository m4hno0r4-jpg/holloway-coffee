import type { SVGProps } from 'react';

/** Hand-drawn line illustrations. They use currentColor, so colour them with text-* classes. */
const line: SVGProps<SVGSVGElement> = {
  fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
  style: { filter: 'url(#wobble)' },
};
interface P { className?: string }

/** Rendered once. Gives every doodle a slightly shaky, pen-drawn edge. */
export function WobbleDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <filter id="wobble" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" />
      </filter>
    </svg>
  );
}

export const Cup = ({ className }: P) => (
  <svg viewBox="0 0 64 64" className={className} {...line}>
    <path d="M10 28h36v9a15 15 0 0 1-15 15h-6a15 15 0 0 1-15-15z" />
    <path d="M46 31h3.5a6 6 0 0 1 0 12H44" />
    <path d="M6 56h44" />
    <path className="steam" d="M20 22c-4-3 3-5-1-10" />
    <path className="steam [animation-delay:.5s]" d="M29 22c-4-3 3-5-1-10" />
    <path className="steam [animation-delay:1s]" d="M38 22c-4-3 3-5-1-10" />
  </svg>
);

export const Bean = ({ className }: P) => (
  <svg viewBox="0 0 48 48" className={className} {...line}>
    <ellipse cx="24" cy="24" rx="11" ry="18" transform="rotate(35 24 24)" />
    <path d="M17 36c7-5 8-12 14-24" />
  </svg>
);

export const Sparkle = ({ className }: P) => (
  <svg viewBox="0 0 40 40" className={className} {...line}>
    <path d="M20 4c1 9 4 13 16 16-12 3-15 7-16 16-1-9-4-13-16-16C16 17 19 13 20 4z" />
  </svg>
);

export const Leaf = ({ className }: P) => (
  <svg viewBox="0 0 48 48" className={className} {...line}>
    <path d="M8 40C6 20 18 8 40 8c0 22-12 34-32 32z" />
    <path d="M8 40C18 28 26 22 34 16" />
  </svg>
);

export const Croissant = ({ className }: P) => (
  <svg viewBox="0 0 64 40" className={className} {...line}>
    <path d="M4 30c2-14 14-24 28-24s26 10 28 24c-5 2-8-1-10-4-3 4-8 5-12 2-3 3-9 3-12 0-4 3-9 2-12-2-2 3-5 6-10 4z" />
    <path d="M24 8l-4 20M32 6v22M40 8l4 20" />
  </svg>
);

export const Squiggle = ({ className }: P) => (
  <svg viewBox="0 0 220 14" preserveAspectRatio="none" className={className} {...line} strokeWidth={4}>
    <path d="M3 8c14-9 22 7 36 0s22 7 36 0 22 7 36 0 22 7 36 0 22 7 36 0" />
  </svg>
);

export const Arrow = ({ className }: P) => (
  <svg viewBox="0 0 80 50" className={className} {...line}>
    <path d="M4 8c22-8 52-2 62 28" />
    <path d="M54 32l12 5 4-13" />
  </svg>
);

/** Round rotating badge. */
export function Sticker({ className }: P) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="h-full w-full animate-spin-slow motion-reduce:animate-none">
        <defs><path id="ring" d="M60 60m-43 0a43 43 0 1 1 86 0a43 43 0 1 1-86 0" /></defs>
        <circle cx="60" cy="60" r="57" fill="rgb(var(--color-butter))" stroke="rgb(var(--color-espresso))" strokeWidth="3" />
        <text fontSize="11.5" fontWeight="700" letterSpacing="2.2" fill="rgb(var(--color-espresso))">
          <textPath href="#ring">ROASTED THIS WEEK ✦ SMALL BATCH ✦</textPath>
        </text>
      </svg>
      <Cup className="absolute inset-0 m-auto h-1/2 w-1/2 text-espresso" />
    </div>
  );
}
