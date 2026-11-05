import type { ComponentType, ReactNode } from 'react';
import { Container } from '@/components/layout/Container';

/** Coloured title strip for cart, checkout and confirmation pages. */
export function PageBand({ tint, title, note, Art }: { tint: string; title: ReactNode; note?: string; Art: ComponentType<{ className?: string }> }) {
  return (
    <div className={`on-color border-b-2 border-espresso ${tint}`}>
      <Container className="relative py-10 md:py-14">
        {note && <p className="font-hand text-3xl">{note}</p>}
        <h1 className="max-w-3xl text-4xl md:text-6xl">{title}</h1>
        <Art className="absolute right-6 top-6 hidden h-28 w-28 animate-float text-espresso motion-reduce:animate-none md:block" />
      </Container>
    </div>
  );
}
