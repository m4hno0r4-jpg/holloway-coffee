import { Container } from '@/components/layout/Container';
import { Photo } from '@/components/ui/Photo';
import { Marquee } from '@/components/art/Marquee';
import { Croissant, Cup, Leaf, Sparkle, Squiggle } from '@/components/art/Doodles';
import { items, priceLabel, type Category, type Item } from '@/data/menu';

const shapes = [
  { aspect: 'aspect-[4/5]', offset: 'md:mt-0' },
  { aspect: 'aspect-square', offset: 'md:mt-16' },
  { aspect: 'aspect-[3/4]', offset: 'md:mt-6' },
];
const sections: { id: string; title: string; hand: string; note: string; cat?: Category; Icon: typeof Cup; color: string; shadow: string; chip: string }[] = [
  { id: 'menu-coffee', title: 'Signature Coffee', hand: 'start here', note: 'Beans roasted in small batches, and the drinks we pour from them.', cat: 'coffee', Icon: Cup, color: 'text-butter', shadow: 'shadow-[6px_6px_0_rgb(var(--color-butter))]', chip: 'bg-butter' },
  { id: 'menu-bakery', title: 'The Bakery', hand: 'still warm', note: 'Baked fresh each morning.', cat: 'bakery', Icon: Croissant, color: 'text-blush', shadow: 'shadow-[6px_6px_0_rgb(var(--color-blush))]', chip: 'bg-blush' },
  { id: 'menu-savory', title: 'Savory Bites', hand: 'for the hungry ones', note: 'Something warm to go with your cup.', cat: 'savory', Icon: Leaf, color: 'text-sage', shadow: 'shadow-[6px_6px_0_rgb(var(--color-sage))]', chip: 'bg-sage' },
  { id: 'menu-favorites', title: 'Customer Favorites', hand: 'people keep ordering these', note: 'The ones people come back for.', Icon: Sparkle, color: 'text-terracotta', shadow: 'shadow-[6px_6px_0_rgb(var(--color-terracotta))]', chip: 'bg-ivory' },
];

function Card({ item, aspect, offset = '', shadow }: { item: Item; aspect: string; offset?: string; shadow: string }) {
  const detail = item.category === 'coffee' ? `${item.roast} roast · ${item.notes?.join(' · ')}` : item.blurb;
  return (
    <a href={`#/menu/${item.slug}`} className={`group block ${offset}`}>
      <div className={`relative ${aspect} overflow-hidden border-2 border-ivory ${shadow} transition duration-base ease-out-soft group-hover:-translate-y-1 group-hover:-rotate-1 motion-reduce:transform-none`}>
        <Photo name={item.photo} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
          className="transition-transform duration-base ease-out-soft group-hover:scale-[1.05]" />
        {item.bestSeller && (
          <span className="absolute left-3 top-3 -rotate-3 border-2 border-espresso bg-butter px-2.5 py-1 text-xs font-bold tracking-[0.14em] text-espresso">BEST SELLER</span>
        )}
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <h3 className="text-2xl text-ink-inverse">{item.name}</h3>
        <p className="shrink-0 -rotate-3 rounded-pill border-2 border-espresso bg-butter px-3 py-1 font-medium text-espresso transition-transform duration-base group-hover:rotate-3 motion-reduce:transform-none">{priceLabel(item)}</p>
      </div>
      <p className="mt-3 text-sm text-ivory-deep">{detail}</p>
      <span className="mt-3 inline-block min-h-11 text-sm tracking-[0.14em] text-ivory underline decoration-caramel decoration-2 underline-offset-8 group-hover:decoration-butter">
        {item.category === 'coffee' ? 'EXPLORE COFFEE' : 'VIEW PRODUCT'}
      </span>
    </a>
  );
}

export function MenuPage() {
  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <>
      <section className="relative overflow-hidden pb-section-sm pt-16 md:pt-24">
        <Container className="relative">
          <p className="font-hand text-3xl text-butter">what are we having today?</p>
          <h1 className="mt-1 text-display uppercase text-ink-inverse">
            <span className="relative inline-block">The Menu<Squiggle className="absolute -bottom-3 left-0 h-3 w-full text-butter" /></span>
          </h1>
          <p className="mt-10 max-w-measure text-xl text-ivory-deep">
            Explore our collection of thoughtfully sourced and carefully roasted specialty coffees, with fresh bakes and savory bites to match.
          </p>
          <Cup className="absolute right-4 top-0 hidden h-32 w-32 animate-float text-butter motion-reduce:animate-none md:block" />
          <Sparkle className="absolute bottom-0 right-40 hidden h-12 w-12 text-blush md:block" />
          <nav aria-label="Menu categories" className="mt-10 flex flex-wrap gap-3">
            {sections.map((s) => (
              <button key={s.id} type="button" onClick={() => jump(s.id)}
                className={`min-h-11 rounded-pill border-2 border-espresso px-5 text-sm font-medium text-espresso transition duration-base hover:-rotate-2 hover:shadow-[3px_3px_0_rgb(var(--color-ivory))] motion-reduce:transform-none ${s.chip}`}>
                {s.title}
              </button>
            ))}
          </nav>
        </Container>
      </section>
      <Marquee />
      {sections.map((s) => {
        const list = s.cat ? items.filter((i) => i.category === s.cat) : items.filter((i) => i.favorite);
        const fav = !s.cat;
        return (
          <section key={s.id} id={s.id} data-reveal className="scroll-mt-24 border-b-2 border-ivory/20 py-section">
            <Container>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex items-center gap-5">
                  <s.Icon className={`h-14 w-14 shrink-0 ${s.color}`} />
                  <div>
                    <p className={`font-hand text-2xl ${s.color}`}>{s.hand}</p>
                    <h2 className="text-4xl text-ink-inverse">{s.title}</h2>
                  </div>
                </div>
                <p className="max-w-md text-ivory-deep">{s.note}</p>
              </div>
              <div className={`mt-14 grid gap-14 sm:grid-cols-2 md:gap-8 lg:gap-14 ${fav ? 'lg:grid-cols-4 lg:gap-8' : 'md:grid-cols-3 md:items-start'}`}>
                {list.map((it, i) => (
                  <Card key={it.slug} item={it} shadow={s.shadow} aspect={fav ? 'aspect-square' : shapes[i % 3].aspect} offset={fav ? '' : shapes[i % 3].offset} />
                ))}
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
