import { useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';
import { useCart, money } from '@/lib/cart';
import { FreeShipBar, LineRow } from './parts';
import { buttonStyles } from '@/components/ui/Button';

/** Side drawer shown after adding a product. Esc, the close button or the backdrop all close it. */
export function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, notice, totalsFor } = useCart();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
      if (e.key !== 'Tab' || !ref.current) return;
      const f = [...ref.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input')];
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; previous?.focus(); };
  }, [drawerOpen, closeDrawer]);

  if (!drawerOpen) return null;
  const t = totalsFor();
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-espresso/60" onClick={closeDrawer} aria-hidden="true" />
      <div ref={ref} role="dialog" aria-modal="true" aria-label="Your bag"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface text-ink shadow-lifted">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="font-serif text-2xl">Your bag</h2>
          <button type="button" data-autofocus onClick={closeDrawer} aria-label="Close bag" className="grid h-11 w-11 place-items-center rounded-pill hover:bg-ivory-deep">
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {notice && (
            <p role="status" className="mb-5 flex items-start gap-2 rounded-md bg-sage/30 px-4 py-3 text-sm">
              <Check size={18} className="mt-0.5 shrink-0" aria-hidden="true" /> {notice}
            </p>
          )}
          {lines.length === 0 ? <p>Your bag is empty.</p> : <ul>{lines.map((l) => <LineRow key={l.key} line={l} compact />)}</ul>}
        </div>
        {lines.length > 0 && (
          <div className="space-y-4 border-t bg-surface-raised px-5 py-5">
            <FreeShipBar t={t} />
            <p className="flex justify-between font-serif text-xl"><span>Subtotal</span><span className="tabular-nums">{money(t.subtotal)}</span></p>
            <p className="text-sm text-ink-muted">Delivery, discounts and tax are shown in your bag and at checkout.</p>
            <a href="#/checkout" onClick={closeDrawer} className={buttonStyles({ size: 'lg', className: 'w-full uppercase tracking-[0.14em]' })}>Checkout</a>
            <div className="flex justify-between text-sm">
              <a href="#/cart" onClick={closeDrawer} className="inline-flex min-h-11 items-center underline underline-offset-4">View full bag</a>
              <button type="button" onClick={closeDrawer} className="min-h-11 underline underline-offset-4">Continue shopping</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
