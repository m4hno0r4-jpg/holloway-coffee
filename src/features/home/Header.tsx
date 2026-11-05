import { useState } from 'react';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const links = [
  { label: 'Home', href: '#top' },
  { label: 'Menu', href: '#/menu' },
  { label: 'Our Story', href: '#story' },
  { label: 'Contact', href: '#contact' },
];

export function Header({ bagCount }: { bagCount: number }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <p className="bg-espresso px-gutter py-2 text-center text-xs tracking-[0.2em] text-ivory">
        GOOD COFFEE. GOOD MOMENTS. FREE SHIPPING ON ORDERS OVER $50.
      </p>
      <header className="sticky top-0 z-40 border-b bg-surface/95 backdrop-blur">
        <Container className="flex h-20 items-center justify-between">
          <a href="#top" className="font-serif text-xl tracking-[0.14em] md:text-2xl">
            HOLLOWAY <span className="text-accent-text">COFFEE</span>
          </a>
          <nav aria-label="Primary" className="hidden gap-12 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm tracking-[0.12em] underline-offset-8 hover:underline">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <button type="button" aria-label="Search" className="grid h-11 w-11 place-items-center">
              <Search size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <a href="#/cart" aria-label={`Shopping bag, ${bagCount} items`} className="relative grid h-11 w-11 place-items-center">
              <ShoppingBag size={20} strokeWidth={1.5} aria-hidden="true" />
              {bagCount > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-pill bg-espresso px-1 text-[10px] text-ivory">
                  {bagCount}
                </span>
              )}
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </Container>
        {open && (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t bg-surface md:hidden">
            <Container className="flex flex-col py-4">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b py-4 font-serif text-2xl last:border-0">
                  {l.label}
                </a>
              ))}
            </Container>
          </nav>
        )}
      </header>
    </>
  );
}
