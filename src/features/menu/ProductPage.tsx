import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Photo } from '@/components/ui/Photo';
import { Squiggle } from '@/components/art/Doodles';
import { baristaNotes } from '@/data/notes';
import { bySlug, categoryLabel, items, priceLabel } from '@/data/menu';

const roastScale = ['Light', 'Medium', 'Dark'] as const;
const h3 = 'text-sm tracking-[0.2em] text-ivory-deep';

export function ProductPage({ slug, onAdd }: { slug: string; onAdd: (n: number, size?: string) => void }) {
  const item = bySlug(slug);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const [added, setAdded] = useState('');

  if (!item) {
    return (
      <Container className="py-section">
        <h1 className="text-4xl text-ink-inverse">We couldn’t find that product.</h1>
        <p className="mt-6"><a href="#/menu" className="underline underline-offset-8">Back to the menu</a></p>
      </Container>
    );
  }
  const coffee = item.category === 'coffee';
  const chosen = size || item.sizes?.[0] || '';
  const related = items.filter((i) => i.slug !== item.slug && i.category === item.category).slice(0, 3);
  const spec: [string, string][] = coffee
    ? [['Roast', `${item.roast} roast`], ['Tasting notes', item.notes?.join(' · ') ?? ''], ['Origin', item.origin ?? '']]
    : [['Ingredients', item.ingredients?.join(', ') ?? ''], ['Category', categoryLabel[item.category]]];

  return (
    <article>
      <Container className="grid gap-12 pb-section-sm pt-10 lg:grid-cols-12 lg:gap-16 lg:pt-14">
        <div className="lg:col-span-7">
          <div className="aspect-[4/5] -rotate-1 overflow-hidden border-2 border-ivory shadow-[8px_8px_0_rgb(var(--color-butter))] md:aspect-[5/6]">
            <Photo name={item.photo} eager sizes="(min-width:1024px) 58vw, 100vw" />
          </div>
          {coffee && (
            <div className="mt-6 grid grid-cols-2 gap-6">
              <div className="aspect-[4/3] rotate-1 overflow-hidden border-2 border-ivory shadow-[5px_5px_0_rgb(var(--color-blush))]"><Photo name="intro" sizes="(min-width:1024px) 28vw, 50vw" /></div>
              <div className="aspect-[4/3] -rotate-1 overflow-hidden border-2 border-ivory shadow-[5px_5px_0_rgb(var(--color-sage))]"><Photo name="banner" sizes="(min-width:1024px) 28vw, 50vw" /></div>
            </div>
          )}
        </div>
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <a href="#/menu" className="text-sm tracking-[0.14em] text-ivory-deep hover:text-ivory">← BACK TO THE MENU</a>
          <p className="mt-8 text-xs tracking-[0.2em] text-ivory-deep">{item.bestSeller ? 'BEST SELLER' : categoryLabel[item.category].toUpperCase()}</p>
          <h1 className="mt-3 text-5xl text-ink-inverse"><span className="relative inline-block">{item.name}<Squiggle className="absolute -bottom-3 left-0 h-3 w-full text-butter" /></span></h1>
          <p className="mt-8 inline-block -rotate-2 rounded-pill border-2 border-espresso bg-butter px-5 py-1.5 font-serif text-3xl text-espresso">{priceLabel(item)}</p>
          <p className="mt-6 max-w-measure text-lg text-ivory-deep">{item.description}</p>
          {baristaNotes[item.slug] && (
            <p className="mt-6 max-w-xs -rotate-2 bg-butter p-4 font-hand text-2xl leading-snug text-espresso shadow-[5px_5px_0_rgb(var(--color-ivory)/0.35)]">
              <span className="block font-sans text-xs font-bold tracking-[0.18em]">BARISTA’S NOTE</span>
              {baristaNotes[item.slug]}
            </p>
          )}
          <dl className="mt-8 border-b border-ivory/25">
            {spec.map(([k, v]) => (
              <div key={k} className="grid grid-cols-3 gap-4 border-t border-ivory/25 py-3 text-sm">
                <dt className="text-ivory-deep">{k}</dt><dd className="col-span-2">{v}</dd>
              </div>
            ))}
          </dl>
          {item.sizes && (
            <fieldset className="mt-8">
              <legend className={h3}>SIZE</legend>
              <div className="mt-3 flex gap-3">
                {item.sizes.map((s) => (
                  <button key={s} type="button" aria-pressed={chosen === s} onClick={() => setSize(s)}
                    className={`min-h-11 min-w-20 border px-5 text-sm transition-colors ${chosen === s ? 'border-ivory bg-ivory text-ink' : 'border-ivory/40 hover:border-ivory'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-ivory/40" role="group" aria-label="Quantity">
              <button type="button" aria-label="Decrease quantity" className="grid h-12 w-12 place-items-center text-xl" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span className="w-10 text-center" aria-live="polite">{qty}</span>
              <button type="button" aria-label="Increase quantity" className="grid h-12 w-12 place-items-center text-xl" onClick={() => setQty(Math.min(20, qty + 1))}>+</button>
            </div>
            <button type="button"
              onClick={() => { onAdd(qty, chosen || undefined); setAdded(`Added ${qty} × ${item.name}${chosen ? ` (${chosen})` : ''} to your bag.`); }}
              className="min-h-14 flex-1 rounded-sm bg-ivory px-8 text-sm uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ivory-deep">
              Add to bag
            </button>
          </div>
          <p role="status" className="mt-3 min-h-6 text-sm text-ivory-deep">{added}</p>
          <p className="text-xs text-ivory-deep">Demo store: checkout is not connected, so nothing is charged or shipped.</p>
        </div>
      </Container>

      <section className="border-t border-ivory/25 py-section-sm">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div>
            <h2 className={h3}>THE DETAILS</h2>
            <p className="mt-4 text-ivory-deep">{item.description}</p>
            {!coffee && item.serving && <p className="mt-4">{item.serving}</p>}
          </div>
          <div>
            <h2 className={h3}>{coffee ? 'TASTING PROFILE' : 'WHAT’S INSIDE'}</h2>
            {coffee ? (
              <>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.notes?.map((n) => <li key={n} className="border border-ivory/40 px-3 py-1 text-sm">{n}</li>)}
                </ul>
                <p className="mt-6 text-sm text-ivory-deep">Roast level</p>
                <div className="mt-2 grid grid-cols-3 gap-1" aria-label={`${item.roast} roast`}>
                  {roastScale.map((r) => (
                    <div key={r}>
                      <div className={`h-1 ${r === item.roast ? 'bg-caramel' : 'bg-ivory/20'}`} />
                      <p className={`mt-1 text-xs ${r === item.roast ? 'text-ivory' : 'text-ivory-deep'}`}>{r}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <ul className="mt-4 space-y-1 text-ivory-deep">{item.ingredients?.map((n) => <li key={n}>{n}</li>)}</ul>
            )}
          </div>
          <div>
            <h2 className={h3}>{coffee ? 'BREWING RECOMMENDATIONS' : 'HOW TO ENJOY'}</h2>
            <ul className="mt-4 space-y-2 text-ivory-deep">
              {(coffee ? item.brew : item.serving ? [item.serving] : [])?.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-t border-ivory/25 py-section-sm">
        <Container>
          <h2 className="text-3xl text-ink-inverse">{coffee ? 'Related coffees' : 'You might also like'}</h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {related.map((r) => (
              <a key={r.slug} href={`#/menu/${r.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden border-2 border-ivory shadow-[5px_5px_0_rgb(var(--color-butter))] transition duration-base group-hover:-translate-y-1 group-hover:-rotate-1 motion-reduce:transform-none">
                  <Photo name={r.photo} sizes="(min-width:640px) 30vw, 100vw" className="transition-transform duration-base ease-out-soft group-hover:scale-[1.04]" />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-ivory/25 pb-2">
                  <h3 className="text-xl text-ink-inverse">{r.name}</h3><p className="font-serif text-lg">{priceLabel(r)}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-12"><a href="#/menu" className="text-sm tracking-[0.14em] underline decoration-caramel underline-offset-8">← RETURN TO THE MENU</a></p>
        </Container>
      </section>
    </article>
  );
}
