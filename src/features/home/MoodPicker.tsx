import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Photo } from '@/components/ui/Photo';
import { Arrow, Sparkle } from '@/components/art/Doodles';
import { bySlug, priceLabel } from '@/data/menu';

const moods = [
  { id: 'cozy', label: 'Slow & cozy', slug: 'golden-hour', line: 'Honey and brown sugar. Warm hands, no rush.' },
  { id: 'bold', label: 'Bold & deep', slug: 'midnight-reserve', line: 'Dark chocolate and smoke. For the serious mornings.' },
  { id: 'bright', label: 'Bright & floral', slug: 'sunday-bloom', line: 'Bergamot and stone fruit. Like an open window.' },
  { id: 'easy', label: 'Just good coffee', slug: 'holloway-house-blend', line: 'Chocolate, hazelnut, caramel. Our everyday favourite.' },
];

/** Tap a mood, get a coffee. */
export function MoodPicker({ onAdd }: { onAdd: (slug: string, size?: string) => void }) {
  const [id, setId] = useState(moods[0].id);
  const mood = moods.find((m) => m.id === id)!;
  const item = bySlug(mood.slug)!;
  return (
    <Section className="on-color border-y-2 border-espresso bg-butter">
      <Container className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <p className="font-hand text-3xl">what&apos;s the mood today?</p>
          <h2 className="mt-1 text-4xl md:text-5xl">Pick a mood, we&apos;ll pour the coffee.</h2>
          <div role="group" aria-label="Choose a mood" className="mt-8 flex flex-wrap gap-3">
            {moods.map((m) => (
              <button key={m.id} type="button" aria-pressed={m.id === id} onClick={() => setId(m.id)}
                className={`min-h-12 rounded-pill border-2 border-espresso px-5 text-base font-medium transition duration-base hover:-rotate-2 motion-reduce:transform-none ${m.id === id ? 'bg-espresso text-ivory shadow-hard-sm' : 'bg-white hover:bg-blush'}`}>
                {m.label}
              </button>
            ))}
          </div>
          <Arrow className="mt-6 hidden h-14 w-24 rotate-12 lg:block" />
        </div>
        <div className="lg:col-span-6" aria-live="polite">
          <article key={id} className="animate-pop relative mx-auto max-w-md rotate-1 border-2 border-espresso bg-white p-4 shadow-hard">
            <Sparkle className="absolute -right-4 -top-5 h-12 w-12 text-terracotta" />
            <div className="aspect-[4/3] overflow-hidden border-2 border-espresso"><Photo name={item.photo} sizes="(min-width:1024px) 40vw, 90vw" /></div>
            <div className="mt-4 flex items-baseline justify-between gap-3">
              <h3 className="text-2xl">{item.name}</h3><p className="font-serif text-xl">{priceLabel(item)}</p>
            </div>
            <p className="mt-1 text-ink-muted">{mood.line}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={() => onAdd(item.slug, item.sizes?.[0])}
                className="min-h-11 border-2 border-espresso bg-espresso px-5 text-sm tracking-[0.12em] text-ivory hover:bg-terracotta-deep">ADD TO BAG</button>
              <a href={`#/menu/${item.slug}`} className="inline-flex min-h-11 items-center border-2 border-espresso px-5 text-sm tracking-[0.12em] hover:bg-butter">SEE DETAILS</a>
            </div>
          </article>
        </div>
      </Container>
    </Section>
  );
}
