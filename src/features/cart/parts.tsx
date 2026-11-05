import { useState, type FormEvent } from 'react';
import { Minus, Plus, Tag, Trash2, X } from 'lucide-react';
import { Photo } from '@/components/ui/Photo';
import { items, priceLabel } from '@/data/menu';
import { FREE_SHIPPING_AT, money, useCart, unitPrice, type DetailedLine, type Totals } from '@/lib/cart';

export const field =
  'min-h-12 w-full border border-espresso/40 bg-white px-4 text-base text-espresso placeholder:text-espresso-soft/70 focus:border-espresso';

/** One cart line: photo, details, quantity, subtotal and remove. Used in the drawer and the cart page. */
export function LineRow({ line, compact = false }: { line: DetailedLine; compact?: boolean }) {
  const { setQty, remove } = useCart();
  return (
    <li className="grid grid-cols-[4.5rem_1fr] gap-4 border-b py-5 first:pt-0 sm:grid-cols-[6rem_1fr]">
      <div className="aspect-square overflow-hidden rounded-md">
        <Photo name={line.item.photo} sizes="96px" />
      </div>
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <a href={`#/menu/${line.slug}`} className="font-serif text-lg leading-snug hover:underline">{line.item.name}</a>
            {line.size && <p className="text-sm text-ink-muted">Size: {line.size}</p>}
            <p className="text-sm text-ink-muted">{money(line.unit)} each</p>
          </div>
          <p className="font-medium tabular-nums">{money(line.total)}</p>
        </div>
        <div className={`mt-3 flex items-center justify-between gap-3 ${compact ? '' : ''}`}>
          <div className="flex items-center rounded-pill border border-espresso/40 bg-white" role="group" aria-label={`Quantity for ${line.item.name}`}>
            <button type="button" aria-label={`Decrease quantity of ${line.item.name}`} disabled={line.qty <= 1}
              onClick={() => setQty(line.key, line.qty - 1)} className="grid h-11 w-11 place-items-center rounded-pill hover:bg-ivory-deep disabled:opacity-40">
              <Minus size={16} aria-hidden="true" />
            </button>
            <span className="w-8 text-center tabular-nums" aria-live="polite">{line.qty}</span>
            <button type="button" aria-label={`Increase quantity of ${line.item.name}`} disabled={line.qty >= 20}
              onClick={() => setQty(line.key, line.qty + 1)} className="grid h-11 w-11 place-items-center rounded-pill hover:bg-ivory-deep disabled:opacity-40">
              <Plus size={16} aria-hidden="true" />
            </button>
          </div>
          <button type="button" onClick={() => remove(line.key)} aria-label={`Remove ${line.item.name} from bag`}
            className="inline-flex min-h-11 items-center gap-2 px-2 text-sm text-terracotta-deep underline underline-offset-4 hover:text-espresso">
            <Trash2 size={16} aria-hidden="true" /> Remove
          </button>
        </div>
      </div>
    </li>
  );
}

export function FreeShipBar({ t }: { t: Totals }) {
  const pct = Math.min(100, Math.round(((FREE_SHIPPING_AT - t.remainingForFree) / FREE_SHIPPING_AT) * 100));
  return (
    <div>
      <p className="text-sm" aria-live="polite">
        {t.freeEligible
          ? 'Free delivery. Sorted.'
          : `Add ${money(t.remainingForFree)} more for free delivery.`}
      </p>
      <div className="mt-2 h-2.5 overflow-hidden rounded-pill bg-espresso/15" role="progressbar" aria-valuemin={0} aria-valuemax={100}
        aria-valuenow={t.freeEligible ? 100 : pct} aria-label="Progress to free delivery">
        <div className="h-full rounded-pill bg-butter transition-[width] duration-base ease-out-soft motion-reduce:transition-none"
          style={{ width: `${t.freeEligible ? 100 : pct}%` }} />
      </div>
    </div>
  );
}

export function CouponBox({ idPrefix = 'c' }: { idPrefix?: string }) {
  const { coupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const r = applyCoupon(code);
    setMsg({ ok: r.ok, text: r.message });
    if (r.ok) setCode('');
  };
  if (coupon) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-md bg-sage/30 px-4 py-3 text-sm">
        <span className="flex items-center gap-2"><Tag size={16} aria-hidden="true" /> <strong>{coupon}</strong> applied</span>
        <button type="button" onClick={() => { removeCoupon(); setMsg(null); }} className="inline-flex min-h-11 items-center gap-1 underline underline-offset-4">
          <X size={14} aria-hidden="true" /> Remove code
        </button>
      </div>
    );
  }
  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor={`${idPrefix}-coupon`} className="text-sm font-medium">Discount code</label>
      <div className="mt-2 flex gap-2">
        <input id={`${idPrefix}-coupon`} value={code} onChange={(e) => setCode(e.target.value)} autoComplete="off" autoCapitalize="characters"
          aria-describedby={`${idPrefix}-coupon-msg`} aria-invalid={msg ? !msg.ok : undefined} placeholder="Try WELCOME10" className={field} />
        <button type="submit" className="min-h-12 shrink-0 rounded-sm border border-espresso px-5 text-sm tracking-[0.12em] hover:bg-espresso hover:text-ivory">APPLY</button>
      </div>
      <p id={`${idPrefix}-coupon-msg`} role="status" className={`mt-2 min-h-5 text-sm ${msg && !msg.ok ? 'text-terracotta-deep' : 'text-ink-muted'}`}>{msg?.text}</p>
    </form>
  );
}

export function TotalsTable({ t, shippingNote }: { t: Totals; shippingNote?: string }) {
  const row = 'flex justify-between gap-4 py-1.5';
  return (
    <dl className="text-base">
      <div className={row}><dt>Subtotal</dt><dd className="tabular-nums">{money(t.subtotal)}</dd></div>
      {t.discount > 0 && <div className={`${row} text-olive-deep`}><dt>Discount</dt><dd className="tabular-nums">−{money(t.discount)}</dd></div>}
      <div className={row}>
        <dt>Delivery{shippingNote && <span className="block text-sm text-ink-muted">{shippingNote}</span>}</dt>
        <dd className="tabular-nums">{t.shipping === 0 ? 'Free' : money(t.shipping)}</dd>
      </div>
      <div className={row}><dt>Estimated tax (8%)</dt><dd className="tabular-nums">{money(t.tax)}</dd></div>
      <div className="mt-2 flex justify-between gap-4 border-t border-espresso/40 pt-3 font-serif text-2xl">
        <dt>Total</dt><dd className="tabular-nums">{money(t.total)}</dd>
      </div>
    </dl>
  );
}

/** "You might also love": the other category first, then anything not already in the bag. */
export function Recs() {
  const { lines, add } = useCart();
  const inBag = new Set(lines.map((l) => l.slug));
  const hasCoffee = lines.some((l) => l.item.category === 'coffee');
  const pool = items.filter((i) => !inBag.has(i.slug));
  const picks = [...pool.filter((i) => (hasCoffee ? i.category !== 'coffee' : i.category === 'coffee')), ...pool].filter((v, i, a) => a.indexOf(v) === i).slice(0, 3);
  if (!picks.length) return null;
  return (
    <section aria-labelledby="recs-h" className="mt-section-sm border-t pt-10">
      <h2 id="recs-h" className="text-3xl">You might also love</h2>
      <ul className="mt-8 grid gap-6 sm:grid-cols-3">
        {picks.map((i) => (
          <li key={i.slug} className="rounded-lg border-2 border-espresso bg-surface-raised shadow-hard p-4">
            <div className="aspect-[4/3] overflow-hidden rounded-md"><Photo name={i.photo} sizes="(min-width:640px) 30vw, 100vw" /></div>
            <h3 className="mt-4 text-xl">{i.name}</h3>
            <p className="text-sm text-ink-muted">{priceLabel(i)}</p>
            <button type="button" onClick={() => add(i.slug, 1, i.sizes?.[0])}
              className="mt-3 min-h-11 rounded-sm border border-espresso px-5 text-sm tracking-[0.12em] hover:bg-espresso hover:text-ivory"
              aria-label={`Add ${i.name} to bag`}>
              ADD TO BAG
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export { unitPrice };
