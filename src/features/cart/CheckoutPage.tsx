import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { Bean } from '@/components/art/Doodles';
import { PageBand } from '@/components/art/PageBand';
import { Container } from '@/components/layout/Container';
import { buttonStyles } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { money, shippingOptions, useCart, type ShippingId } from '@/lib/cart';
import { countries, emptyForm, FORM_KEY, ORDER_KEY, paymentLabel, toOrder, validate, type Form, type Payment } from './order';
import { field, TotalsTable } from './parts';

const steps = [
  { id: 'contact', label: 'Contact' }, { id: 'delivery', label: 'Delivery' }, { id: 'method', label: 'Method' },
  { id: 'payment', label: 'Payment' }, { id: 'review', label: 'Review' },
];

function Step({ n, id, title, children }: { n: number; id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28 rounded-lg border-2 border-espresso bg-surface-raised shadow-hard p-5 sm:p-8">
      <h2 id={`${id}-h`} className="flex items-center gap-3 text-2xl">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-pill bg-butter font-sans text-base text-espresso" aria-hidden="true">{n}</span>
        {title}
      </h2>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

interface InputProps {
  name: keyof Form; label: string; form: Form; set: (k: keyof Form, v: string) => void; err?: string; optional?: boolean;
  hint?: string; type?: string; auto?: string; mode?: 'text' | 'tel' | 'email' | 'numeric'; touch: (k: string) => void;
}
function Input({ name, label, form, set, err, optional, hint, type = 'text', auto, mode, touch }: InputProps) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">{label}{optional ? <span className="font-normal text-ink-muted"> (optional)</span> : <span className="text-terracotta-deep"> *</span>}</label>
      <input id={id} name={name} type={type} value={String(form[name])} autoComplete={auto} inputMode={mode}
        onChange={(e: ChangeEvent<HTMLInputElement>) => set(name, e.target.value)} onBlur={() => touch(name)}
        aria-invalid={err ? true : undefined} aria-describedby={`${hint ? `${id}-hint ` : ''}${err ? `${id}-err` : ''}`.trim() || undefined}
        className={`${field} mt-1.5 ${err ? 'border-terracotta-deep' : ''}`} />
      {hint && <p id={`${id}-hint`} className="mt-1 text-sm text-ink-muted">{hint}</p>}
      {err && <p id={`${id}-err`} className="mt-1 text-sm text-terracotta-deep">{err}</p>}
    </div>
  );
}

function loadForm(): { form: Form; payment: Payment } {
  try {
    const raw = JSON.parse(localStorage.getItem(FORM_KEY) ?? 'null') as { form?: Partial<Form>; payment?: Payment } | null;
    return { form: { ...emptyForm, ...(raw?.form ?? {}) }, payment: raw?.payment ?? 'card' };
  } catch { return { form: emptyForm, payment: 'card' }; }
}

export function CheckoutPage() {
  const cart = useCart();
  const [{ form: f0, payment: p0 }] = useState(loadForm);
  const [form, setForm] = useState<Form>(f0);
  const [payment, setPayment] = useState<Payment>(p0);
  const [ship, setShip] = useState<ShippingId | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState('');
  const orderId = useRef(`HC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`); // one id per checkout, so a double click can never create two orders
  const placed = useRef(false);
  const summary = useRef<HTMLDivElement>(null);

  const t = cart.totalsFor(ship ?? undefined);
  const errors = validate(form);
  const codOk = form.country === 'United States';
  const effPayment: Payment = payment === 'cod' && !codOk ? 'card' : payment;
  const shown = (k: keyof Form) => (touched[k] || submitted ? errors[k] : undefined);

  // Saved on this device only when the customer opts in. Card details are never collected here.
  useEffect(() => {
    try { form.save ? localStorage.setItem(FORM_KEY, JSON.stringify({ form, payment })) : localStorage.removeItem(FORM_KEY); } catch { /* ignore */ }
  }, [form, payment]);

  const set = (k: keyof Form, v: string) => setForm((s) => ({ ...s, [k]: v }));
  const touch = (k: string) => setTouched((s) => ({ ...s, [k]: true }));
  const go = (id: string) => document.getElementById(id)?.scrollIntoView();
  const props = (name: keyof Form) => ({ name, form, set, touch, err: shown(name) });

  if (cart.lines.length === 0 && !placed.current) {
    return (
      <Container className="py-section text-center">
        <h1 className="text-4xl">Your bag is empty.</h1>
        <p className="mt-4 text-ink-muted">Add something to your bag before checking out.</p>
        <a href="#/menu" className={buttonStyles({ size: 'lg', className: 'mt-8 uppercase tracking-[0.14em]' })}>Back to the menu</a>
      </Container>
    );
  }

  const stepDone: Record<string, boolean> = {
    contact: !errors.email && !errors.phone,
    delivery: !(errors.first || errors.last || errors.address || errors.city || errors.region || errors.postal || errors.country || errors.phone2),
    method: true, payment: true, review: false,
  };
  const method = shippingOptions.find((o) => o.id === t.shippingId)!;
  const errorKeys = Object.keys(errors) as (keyof Form)[];

  const place = async (e: FormEvent) => {
    e.preventDefault();
    if (busy || placed.current) return;
    setSubmitted(true); setFailure('');
    if (errorKeys.length) { requestAnimationFrame(() => summary.current?.focus()); return; }
    setBusy(true);
    try {
      // DEMO: no payment gateway is connected, so nothing is charged and nothing here confirms a payment.
      await new Promise((r) => setTimeout(r, 1200));
      const order = toOrder(orderId.current, cart.lines, t, form, effPayment, method);
      localStorage.setItem(ORDER_KEY, JSON.stringify(order));
      placed.current = true;
      cart.clear();
      window.location.hash = '#/order';
    } catch {
      setFailure('We could not save your order on this device. Nothing was charged. Please try again.');
      setBusy(false);
    }
  };

  const summaryBody = (
    <>
      <ul className="divide-y">
        {cart.lines.map((l) => (
          <li key={l.key} className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 py-3">
            <div className="relative aspect-square rounded-md">
              <div className="h-full w-full overflow-hidden rounded-md border-2 border-espresso"><Photo name={l.item.photo} sizes="56px" /></div>
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-pill bg-espresso px-1 text-xs text-ivory">{l.qty}</span>
            </div>
            <p className="text-sm"><span className="font-medium">{l.item.name}</span>{l.size && <span className="block text-ink-muted">{l.size}</span>}</p>
            <p className="text-sm tabular-nums">{money(l.total)}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4"><TotalsTable t={t} shippingNote={method.label} /></div>
    </>
  );

  const radio = (on: boolean, off = false) =>
    `flex cursor-pointer items-start gap-3 rounded-md border p-4 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-espresso ${on ? 'border-espresso bg-butter/30' : 'border-espresso/30 bg-white'} ${off ? 'cursor-not-allowed opacity-55' : ''}`;

  return (
    <>
    <PageBand tint="bg-blush" Art={Bean} title="Checkout" note="nearly there, promise" />
    <Container className="py-10 md:py-14">
      <nav aria-label="Checkout progress" className="overflow-x-auto pb-2">
        <ol className="flex min-w-max gap-2 sm:gap-4">
          {steps.map((s, i) => (
            <li key={s.id}>
              <button type="button" onClick={() => go(s.id)} className="flex min-h-11 items-center gap-2 rounded-pill border border-espresso/30 bg-white px-4 text-sm hover:border-espresso">
                <span className={`grid h-6 w-6 place-items-center rounded-pill text-xs ${stepDone[s.id] ? 'bg-sage text-espresso' : 'bg-ivory-deep'}`}>
                  {stepDone[s.id] ? <Check size={14} aria-label="complete" /> : i + 1}
                </span>
                {s.label}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <details className="mt-6 rounded-lg border bg-surface-raised lg:hidden">
        <summary className="flex min-h-14 cursor-pointer items-center justify-between px-5 font-medium">
          <span>Show order summary</span><span className="font-serif text-xl tabular-nums">{money(t.total)}</span>
        </summary>
        <div className="border-t px-5 pb-5 pt-3">{summaryBody}</div>
      </details>

      <form onSubmit={place} noValidate className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="space-y-8 lg:col-span-7">
          <Step n={1} id="contact" title="Where Can We Reach You?">
            <Input {...props('email')} label="Email address" type="email" auto="email" mode="email" hint="We will send your order confirmation here." />
            <Input {...props('phone')} label="Phone number" optional type="tel" auto="tel" mode="tel" />
          </Step>

          <Step n={2} id="delivery" title="Where Should We Send Your Coffee?">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input {...props('first')} label="First name" auto="given-name" />
              <Input {...props('last')} label="Last name" auto="family-name" />
            </div>
            <Input {...props('address')} label="Street address" auto="address-line1" />
            <Input {...props('address2')} label="Apartment, suite or unit" optional auto="address-line2" />
            <div className="grid gap-5 sm:grid-cols-2">
              <Input {...props('city')} label="City" auto="address-level2" />
              <Input {...props('region')} label="State / province / region" auto="address-level1" />
              <Input {...props('postal')} label="Postal code" auto="postal-code" />
              <div>
                <label htmlFor="f-country" className="text-sm font-medium">Country<span className="text-terracotta-deep"> *</span></label>
                <select id="f-country" value={form.country} autoComplete="country-name" onChange={(e) => set('country', e.target.value)} className={`${field} mt-1.5`}>
                  {countries.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <Input {...props('phone2')} label="Phone number for the courier" type="tel" auto="tel" mode="tel" hint="Only used if the courier needs to reach you." />
            <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm">
              <input type="checkbox" checked={form.save} onChange={(e) => setForm((s) => ({ ...s, save: e.target.checked }))} className="h-5 w-5 accent-espresso" />
              Save these details on this device for next time
            </label>
          </Step>

          <Step n={3} id="method" title="How Would You Like It Delivered?">
            <fieldset>
              <legend className="sr-only">Delivery method</legend>
              <div className="space-y-3">
                {shippingOptions.map((o) => {
                  const off = o.id === 'free' && !t.freeEligible;
                  return (
                    <label key={o.id} className={radio(t.shippingId === o.id, off)}>
                      <input type="radio" name="ship" className="mt-1 h-5 w-5 accent-espresso" disabled={off} checked={t.shippingId === o.id} onChange={() => setShip(o.id)} />
                      <span className="flex-1">
                        <span className="flex justify-between gap-3 font-medium"><span>{o.label}</span><span>{o.price === 0 ? 'Free' : money(o.price)}</span></span>
                        <span className="block text-sm text-ink-muted">
                          {off ? `Available on orders over $50. Add ${money(t.remainingForFree)} more.` : `${o.window} (an estimate, not a guarantee)`}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </Step>

          <Step n={4} id="payment" title="How Would You Like to Pay?">
            <p className="rounded-md border-2 border-dashed border-terracotta-deep bg-white p-4 text-sm">
              <strong>Demo checkout.</strong> No payment gateway is connected, so no money is taken and no card details are collected. Orders are recorded as demo orders.
            </p>
            <fieldset>
              <legend className="sr-only">Payment method</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {(['card', 'paypal', 'cod'] as Payment[]).map((p) => {
                  const off = p === 'cod' && !codOk;
                  return (
                    <label key={p} className={radio(effPayment === p, off)}>
                      <input type="radio" name="pay" className="mt-1 h-5 w-5 accent-espresso" disabled={off} checked={effPayment === p} onChange={() => setPayment(p)} />
                      <span className="font-medium">{p === 'card' ? 'Credit / Debit Card' : p === 'paypal' ? 'PayPal' : 'Cash on Delivery'}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <p className="text-sm text-ink-muted" aria-live="polite">
              {effPayment === 'card' && 'When a gateway such as Stripe is connected, its secure card fields will appear here. Card numbers never touch our own servers or database.'}
              {effPayment === 'paypal' && 'When PayPal is connected you will confirm the payment in PayPal. For now this is a demo.'}
              {effPayment === 'cod' && 'Pay the courier when your order arrives.'}
              {!codOk && ' Cash on Delivery is available for United States addresses only.'}
            </p>
          </Step>

          <Step n={5} id="review" title="Review Your Order">
            <dl className="grid gap-5 text-sm sm:grid-cols-2">
              <div><dt className="flex items-center justify-between font-medium">Contact <button type="button" onClick={() => go('contact')} className="min-h-11 underline underline-offset-4">Edit</button></dt><dd className="text-ink-muted">{form.email || 'Not entered yet'}{form.phone && <><br />{form.phone}</>}</dd></div>
              <div><dt className="flex items-center justify-between font-medium">Delivery address <button type="button" onClick={() => go('delivery')} className="min-h-11 underline underline-offset-4">Edit</button></dt>
                <dd className="text-ink-muted">{form.address ? <>{form.first} {form.last}<br />{form.address}{form.address2 && `, ${form.address2}`}<br />{form.city}, {form.region} {form.postal}<br />{form.country}</> : 'Not entered yet'}</dd></div>
              <div><dt className="flex items-center justify-between font-medium">Delivery <button type="button" onClick={() => go('method')} className="min-h-11 underline underline-offset-4">Edit</button></dt><dd className="text-ink-muted">{method.label}, {t.shipping === 0 ? 'Free' : money(t.shipping)}<br />{method.window}</dd></div>
              <div><dt className="flex items-center justify-between font-medium">Payment <button type="button" onClick={() => go('payment')} className="min-h-11 underline underline-offset-4">Edit</button></dt><dd className="text-ink-muted">{paymentLabel[effPayment]}</dd></div>
            </dl>
            <div className="border-t pt-4 text-sm">{summaryBody}</div>

            {submitted && errorKeys.length > 0 && (
              <div ref={summary} tabIndex={-1} role="alert" className="rounded-md border-2 border-terracotta-deep bg-white p-4 text-sm">
                <p className="font-medium">Please fix {errorKeys.length === 1 ? 'this field' : `these ${errorKeys.length} fields`} before placing your order:</p>
                <ul className="mt-2 list-disc pl-5">
                  {errorKeys.map((k) => <li key={k}><a href={`#f-${k}`} onClick={(e) => { e.preventDefault(); document.getElementById(`f-${k}`)?.focus(); }} className="underline underline-offset-4">{errors[k]}</a></li>)}
                </ul>
              </div>
            )}
            {failure && <p role="alert" className="rounded-md border-2 border-terracotta-deep bg-white p-4 text-sm">{failure}</p>}

            <p className="text-sm text-ink-muted">Total today: <strong className="text-ink">{money(t.total)}</strong>, including delivery and estimated tax. There are no other charges. This is a demo order, so nothing will be charged.</p>
            <button type="submit" disabled={busy} aria-busy={busy}
              className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-sm bg-espresso px-8 text-base tracking-[0.14em] text-ivory transition-colors duration-base hover:bg-terracotta-deep disabled:cursor-wait disabled:opacity-70">
              {busy ? <><Loader2 size={20} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> PLACING YOUR ORDER…</> : 'PLACE MY ORDER'}
            </button>
          </Step>
        </div>

        <aside aria-label="Order summary" className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28 rounded-lg border-2 border-espresso bg-surface-raised shadow-hard p-6">
            <h2 className="mb-2 text-2xl">Order summary</h2>
            {summaryBody}
            <a href="#/cart" className="mt-4 inline-block min-h-11 text-sm underline underline-offset-4">Edit bag</a>
          </div>
        </aside>
      </form>
    </Container>
    </>
  );
}
