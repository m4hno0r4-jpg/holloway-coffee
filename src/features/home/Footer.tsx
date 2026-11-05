import { Container } from '@/components/layout/Container';

const cols = [
  { title: 'Menu', links: ['All coffee', 'House Blend', 'Midnight Reserve', 'Golden Hour', 'Sunday Bloom'] },
  { title: 'Holloway', links: ['Our story', 'Sourcing', 'Roasting', 'Journal'] },
];
const social = ['Instagram', 'Pinterest', 'YouTube'];

export function Footer() {
  return (
    <footer id="contact" className="bg-surface-inverse pt-section-sm text-ink-inverse">
      <Container className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-serif text-2xl tracking-[0.14em]">HOLLOWAY COFFEE</p>
          <p className="mt-4 max-w-xs text-ivory-deep">
            Small-batch specialty coffee, thoughtfully sourced and roasted with care.
          </p>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title} className="lg:col-span-2">
            <h2 className="font-sans text-xs tracking-[0.2em] text-ivory-deep">{c.title.toUpperCase()}</h2>
            <ul className="mt-4 space-y-2">
              {c.links.map((l) => (
                <li key={l}><a href="#/menu" className="hover:underline">{l}</a></li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="lg:col-span-4">
          <h2 className="font-sans text-xs tracking-[0.2em] text-ivory-deep">CONTACT</h2>
          <address className="mt-4 space-y-2 not-italic">
            <p><a href="mailto:hello@hollowaycoffee.example" className="hover:underline">hello@hollowaycoffee.example</a></p>
            <p>Monday to Friday, 9am to 5pm</p>
          </address>
          <ul className="mt-6 flex gap-6">
            {social.map((s) => (
              <li key={s}><a href="#contact" className="text-sm hover:underline">{s}</a></li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="mt-16 flex flex-col gap-2 border-t border-ivory/25 py-6 text-sm text-ivory-deep sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Holloway Coffee. A fictional brand.</p>
        <p>Photography from Pexels.</p>
      </Container>
    </footer>
  );
}
