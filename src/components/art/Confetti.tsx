import { useEffect, useState, type CSSProperties } from 'react';
import { Bean } from './Doodles';

const colors = ['text-butter', 'text-terracotta', 'text-blush', 'text-sage', 'text-ivory'];

/** A burst of little coffee beans. Pass a number that goes up each time it should fire. */
export function Confetti({ fire }: { fire: number }) {
  const [live, setLive] = useState(0);
  useEffect(() => {
    if (!fire) return;
    setLive(fire);
    const t = setTimeout(() => setLive(0), 1500);
    return () => clearTimeout(t);
  }, [fire]);
  if (!live) return null;
  return (
    <div key={live} className="pointer-events-none fixed inset-0 z-[60] overflow-hidden motion-reduce:hidden" aria-hidden="true">
      {Array.from({ length: 20 }, (_, i) => {
        const a = (i / 20) * Math.PI * 2 + (i % 3) * 0.2;
        const d = 140 + ((i * 53) % 160);
        const style = { '--dx': `${Math.cos(a) * d}px`, '--dy': `${Math.sin(a) * d - 80}px`, '--r': `${(i * 67) % 360}deg`, animationDelay: `${(i % 5) * 30}ms` } as CSSProperties;
        return (
          <span key={i} className="bean-pop absolute left-1/2 top-1/2" style={style}>
            <Bean className={`h-8 w-8 ${colors[i % 5]}`} />
          </span>
        );
      })}
    </div>
  );
}
