import { Bean } from './Doodles';

const words = ['Small batch', 'Roasted to order', 'Free shipping over $50', 'Slow mornings', 'Baked fresh daily', 'Made for good moments'];

/** Scrolling ribbon between sections. Pauses on hover, and stops entirely with reduced motion. */
export function Marquee() {
  const row = words.map((w) => (
    <span key={w} className="flex items-center gap-6 pr-6 font-serif text-2xl md:text-3xl">
      {w} <Bean className="h-8 w-8 text-butter" />
    </span>
  ));
  return (
    <div className="group overflow-hidden border-y-2 border-espresso bg-espresso py-4 text-ivory" role="presentation">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none" aria-hidden="true">
        <div className="flex">{row}</div><div className="flex">{row}</div>
      </div>
      <p className="sr-only">Small batch. Roasted to order. Free shipping over $50. Baked fresh daily.</p>
    </div>
  );
}
