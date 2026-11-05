import { useState, type FormEvent } from 'react';
import { Coffee, Flame, Leaf, Package, ShieldCheck, Sparkles, Sunrise, Truck, type LucideIcon } from 'lucide-react';
import { Cup, Squiggle, Sticker } from '@/components/art/Doodles';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { buttonStyles } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { benefits, brews, principles } from '@/data/content';

const icons: Record<string, LucideIcon> = {
  leaf: Leaf, flame: Flame, sparkles: Sparkles, sunrise: Sunrise,
  coffee: Coffee, shield: ShieldCheck, package: Package, truck: Truck,
};
const label = 'text-xs tracking-[0.2em]';
const caps = 'uppercase tracking-[0.14em]';

interface AddProps { onAdd: (slug: string, size?: string) => void }

export function Hero() {
  return (
    <Section spacing="compact" className="pt-12 md:pt-16">
      <Container className="relative">
        <Cup className="absolute right-2 top-0 hidden h-24 w-24 animate-float text-espresso motion-reduce:animate-none md:block lg:h-32 lg:w-32" />
        <h1 className="text-display">
          Coffee, Worth
          <br />
          <span className="relative inline-block">Slowing Down For.<Squiggle className="absolute -bottom-3 left-0 h-3 w-full text-terracotta" /></span>
        </h1>
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4 lg:pb-2">
            <p className="max-w-measure text-xl text-ink-muted">
              Thoughtfully sourced. Carefully roasted. Made for the moments that matter.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#shop" className={buttonStyles({ size: 'lg', className: caps })}>Explore our coffee</a>
              <a href="#story" className={buttonStyles({ variant: 'secondary', size: 'lg', className: caps })}>Our story</a>
            </div>
          </div>
          <figure className="relative lg:col-span-8">
            <Sticker className="absolute -top-10 right-2 z-10 h-24 w-24 sm:h-32 sm:w-32" />
            <div className="aspect-[4/3] -rotate-1 overflow-hidden border-2 border-espresso shadow-hard sm:aspect-[16/10]">
              <Photo name="hero" eager sizes="(min-width:1024px) 66vw, 100vw" />
            </div>
            <figcaption className="mt-3 text-sm text-ink-muted">Poured to order, one cup at a time.</figcaption>
          </figure>
        </div>
      </Container>
    </Section>
  );
}

export function Intro() {
  return (
    <Section id="story" className="border-t">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="aspect-[3/4] max-w-sm overflow-hidden">
            <Photo name="intro" sizes="(min-width:1024px) 30vw, 80vw" />
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6 lg:pt-24">
          <p className="font-hand text-3xl text-terracotta-deep">(and we really mean it)</p>
          <h2 className="mt-1 text-4xl">Not Just Another Cup.</h2>
          <p className="mt-8 max-w-measure font-serif text-2xl leading-snug">
            We believe great coffee is never an accident. It begins with thoughtful sourcing, comes to life
            through careful roasting, and finds its purpose in the everyday moments we share.
          </p>
        </div>
      </Container>
    </Section>
  );
}

export function Signature({ onAdd }: AddProps) {
  const specs = [
    ['Tasting notes', 'Dark Chocolate, Hazelnut, Caramel'],
    ['Roast', 'Medium'],
    ['Strength', 'Balanced'],
    ['Origin', 'Carefully selected specialty coffee beans'],
    ['Sizes', '250g and 1kg'],
  ];
  return (
    <section className="bg-surface-inverse py-section text-ink-inverse">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <p className={`${label} text-ivory-deep`}>BEST SELLER</p>
          <h2 className="mt-4 text-4xl text-ink-inverse">Holloway House Blend</h2>
          <p className="mt-6 max-w-measure text-lg text-ivory-deep">
            Our signature everyday coffee. A beautifully balanced blend with rich chocolate notes, hints of
            toasted hazelnut and a smooth caramel finish. Crafted for slow mornings, long conversations and
            everything in between.
          </p>
          <dl className="mt-10 border-b border-ivory/25">
            {specs.map(([k, v]) => (
              <div key={k} className="grid grid-cols-3 gap-4 border-t border-ivory/25 py-3 text-sm">
                <dt className="text-ivory-deep">{k}</dt>
                <dd className="col-span-2">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <p className="font-serif text-4xl">From $18</p>
            <button type="button" onClick={() => onAdd('holloway-house-blend', '250g')}
              className={`min-h-14 rounded-sm bg-ivory px-8 text-ink transition-colors duration-base hover:bg-ivory-deep ${caps}`}>
              Add to bag
            </button>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="aspect-[4/5] overflow-hidden md:aspect-[5/6]">
            <Photo name="blend" sizes="(min-width:1024px) 58vw, 100vw" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Brews({ onAdd }: AddProps) {
  return (
    <Section id="shop">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-4xl">Find Your Kind of Coffee.</h2>
          <p className="mt-6 text-lg text-ink-muted">
            Distinctive profiles. Thoughtful roasting. Something worth coming back to.
          </p>
        </div>
        <div className="mt-16 grid gap-14 md:grid-cols-3 md:items-start md:gap-8 lg:gap-14">
          {brews.map((b) => (
            <article key={b.name} className={b.offset}>
              <div className={`${b.aspect} overflow-hidden`}>
                <Photo name={b.photo} sizes="(min-width:768px) 33vw, 100vw" />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4 border-b pb-3">
                <h3 className="text-2xl">{b.name}</h3>
                <p className="font-serif text-2xl">${b.price}</p>
              </div>
              <p className="mt-3 text-sm text-ink-muted">{b.roast} roast · {b.notes.join(', ')}</p>
              <p className="mt-4">{b.description}</p>
              <button type="button" onClick={() => onAdd(b.name.toLowerCase().replace(/ /g, '-'), '250g')}
                className="mt-5 min-h-11 text-sm tracking-[0.14em] text-accent-text underline underline-offset-8 hover:text-ink">
                ADD TO BAG
              </button>
            </article>
          ))}
        </div>
        <p className="mt-16">
          <a href="#shop" className="text-sm tracking-[0.14em] underline underline-offset-8">SHOP ALL COFFEE</a>
        </p>
      </Container>
    </Section>
  );
}

export function Principles() {
  return (
    <Section className="on-color border-y-2 border-espresso bg-sage">
      <Container className="grid gap-12 lg:grid-cols-12">
        <h2 className="text-4xl lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          Good Coffee Has a Little More Behind It.
        </h2>
        <ul className="lg:col-span-7">
          {principles.map((p) => {
            const Icon = icons[p.icon];
            return (
              <li key={p.title} className="grid gap-4 border-t py-8 first:border-t-0 first:pt-0 sm:grid-cols-[3rem_1fr]">
                <Icon size={26} strokeWidth={1.25} className="text-accent-text" aria-hidden="true" />
                <div>
                  <h3 className="text-2xl">{p.title}</h3>
                  <p className="mt-3 max-w-measure text-ink-muted">{p.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

export function Banner() {
  return (
    <section className="relative flex min-h-[75svh] items-end overflow-hidden bg-espresso">
      <div className="absolute inset-0">
        <Photo name="banner" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-espresso/60" aria-hidden="true" />
      <Container className="relative pb-16 pt-40 md:pb-24">
        <p className="max-w-3xl font-serif text-4xl leading-tight text-ivory md:text-display">
          Take a moment. Make it a good one.
        </p>
      </Container>
    </section>
  );
}

export function Benefits() {
  return (
    <Section spacing="compact">
      <Container>
        <h2 className="text-2xl">The Holloway Difference</h2>
        <ul className="mt-10 grid gap-x-8 gap-y-10 border-t pt-10 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((b) => {
            const Icon = icons[b.icon];
            return (
              <li key={b.text} className="flex flex-col gap-4">
                <Icon size={24} strokeWidth={1.25} className="text-accent-text" aria-hidden="true" />
                <p className="max-w-[16rem]">{b.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

export function Newsletter() {
  const [state, setState] = useState<'idle' | 'error' | 'done'>('idle');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get('email') ?? '').trim();
    setState(/^\S+@\S+\.\S+$/.test(email) ? 'done' : 'error');
  };
  return (
    <Section className="on-color border-t-2 border-espresso bg-butter">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <h2 className="text-4xl">A Better Kind of Inbox.</h2>
          <p className="mt-5 max-w-measure text-lg text-ink-muted">
            Coffee notes, new releases and little things worth slowing down for.
          </p>
        </div>
        <form onSubmit={submit} noValidate className="lg:col-span-5 lg:col-start-8">
          <label htmlFor="email" className="sr-only">Email address</label>
          <div className="flex flex-col gap-4 border-b border-espresso sm:flex-row sm:items-center">
            <input id="email" name="email" type="email" autoComplete="email" placeholder="Your email address"
              aria-invalid={state === 'error'} aria-describedby="email-status"
              className="min-h-12 flex-1 bg-transparent py-2 text-lg placeholder:text-ink-muted focus:outline-none" />
            <button type="submit" className="min-h-11 text-sm tracking-[0.14em] text-accent-text hover:text-ink">SUBSCRIBE</button>
          </div>
          <p id="email-status" role="status" className="mt-3 min-h-6 text-sm text-ink-muted">
            {state === 'error' && 'Enter a valid email address, such as name@example.com.'}
            {state === 'done' && 'Thank you. You are on the list.'}
          </p>
        </form>
      </Container>
    </Section>
  );
}
