import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Photo } from '@/components/ui/Photo';
import { bySlug, priceLabel } from '@/data/menu';

const picks = [
  { slug: 'classic-butter-croissant', aspect: 'aspect-square sm:aspect-[4/5]', offset: 'md:mt-0' },
  { slug: 'cinnamon-morning-roll', aspect: 'aspect-square sm:aspect-[4/5]', offset: 'md:mt-20' },
] as const;

/** Homepage bakery teaser: two best-selling bakes, each linking to its own product page. */
export function Bakery() {
  return (
    <Section className="on-color border-y-2 border-espresso bg-blush">
      <Container className="grid gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <h2 className="text-4xl">Baked Fresh, Made to Pair.</h2>
          <p className="mt-6 max-w-measure text-lg text-ink-muted">
            Flaky pastries and soft morning bakes, baked daily to sit beside your cup.
          </p>
          <p className="mt-6 md:mt-10">
            <a href="#/menu" className="text-sm tracking-[0.14em] underline underline-offset-8">SHOP THE BAKERY</a>
          </p>
        </div>
        <div className="grid grid-cols-2 items-start gap-x-4 gap-y-8 sm:gap-x-8 lg:col-span-8">
          {picks.map((p) => {
            const it = bySlug(p.slug);
            if (!it) return null;
            return (
              <article key={it.slug} className={p.offset}>
                <a href={`#/menu/${it.slug}`} className="block">
                  <div className={`${p.aspect} overflow-hidden border-2 border-espresso`}>
                    <Photo name={it.photo} sizes="(min-width:1024px) 33vw, (min-width:640px) 45vw, 100vw" />
                  </div>
                  <p className="mt-5 text-xs tracking-[0.2em] text-accent-text">BEST SELLER</p>
                  <div className="mt-2 flex flex-col gap-1 border-b pb-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <h3 className="text-lg sm:text-2xl">{it.name}</h3>
                    <p className="font-serif text-base sm:text-2xl">{priceLabel(it)}</p>
                  </div>
                  <p className="mt-3 text-sm text-ink-muted sm:text-base">{it.blurb}</p>
                  <span className="mt-4 inline-block min-h-11 text-sm tracking-[0.14em] text-accent-text underline underline-offset-8">VIEW PRODUCT</span>
                </a>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
