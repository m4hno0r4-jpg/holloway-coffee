import { Confetti } from '@/components/art/Confetti';
import { Sparkle } from '@/components/art/Doodles';
import { PageBand } from '@/components/art/PageBand';
import { Container } from '@/components/layout/Container';
import { buttonStyles } from '@/components/ui/Button';
import { money } from '@/lib/cart';
import { ORDER_KEY, paymentLabel, type Order } from './order';

function read(): Order | null {
  try { return JSON.parse(localStorage.getItem(ORDER_KEY) ?? 'null') as Order | null; } catch { return null; }
}

export function ConfirmationPage() {
  const o = read();
  // Never show a confirmation unless an order was actually recorded by checkout.
  if (!o?.id) {
    return (
      <Container className="py-section text-center">
        <h1 className="text-4xl">There is no recent order to show.</h1>
        <p className="mt-4 text-ink-muted">If you were checking out, your bag is still saved.</p>
        <a href="#/cart" className={buttonStyles({ size: 'lg', className: 'mt-8 uppercase tracking-[0.14em]' })}>Back to your bag</a>
      </Container>
    );
  }
  const f = o.form;
  const cod = o.payment === 'cod';
  return (
    <>
    <Confetti fire={1} />
    <PageBand tint="bg-sage" Art={Sparkle} title="Something Good Is On Its Way." note={`thank you, ${f.first}`} />
    <Container className="py-12 md:py-16">
      <p className="mt-0 max-w-measure text-lg text-ink-muted">
        Order <strong className="text-ink">{o.id}</strong>. We would email a confirmation to {f.email}, but this is a demo store, so no email is sent.
      </p>
      <p className="mt-4 inline-block rounded-md border-2 border-dashed border-terracotta-deep bg-white px-4 py-3 text-sm">
        <strong>Demo order.</strong> {cod ? 'This would be paid on delivery.' : 'No payment was taken and nothing will be shipped.'}
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <section aria-labelledby="items-h" className="rounded-lg border-2 border-espresso bg-surface-raised shadow-hard p-6 lg:col-span-7">
          <h2 id="items-h" className="text-2xl">Your order</h2>
          <ul className="mt-4 divide-y">
            {o.lines.map((l) => (
              <li key={`${l.name}${l.size}`} className="flex justify-between gap-4 py-3">
                <span>{l.qty} × {l.name}{l.size && <span className="text-ink-muted"> ({l.size})</span>}</span>
                <span className="tabular-nums">{money(l.total)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1">
            <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{money(o.totals.subtotal)}</dd></div>
            {o.totals.discount > 0 && <div className="flex justify-between text-olive-deep"><dt>Discount</dt><dd className="tabular-nums">−{money(o.totals.discount)}</dd></div>}
            <div className="flex justify-between"><dt>Delivery ({o.shippingLabel})</dt><dd className="tabular-nums">{o.totals.shipping === 0 ? 'Free' : money(o.totals.shipping)}</dd></div>
            <div className="flex justify-between"><dt>Estimated tax</dt><dd className="tabular-nums">{money(o.totals.tax)}</dd></div>
            <div className="flex justify-between border-t border-espresso/40 pt-3 font-serif text-2xl"><dt>Order total</dt><dd className="tabular-nums">{money(o.totals.total)}</dd></div>
            <div className="flex justify-between text-sm text-ink-muted"><dt>Amount paid</dt><dd>{money(0)} (demo)</dd></div>
          </dl>
        </section>

        <div className="space-y-6 lg:col-span-5">
          <section className="rounded-lg bg-butter/40 p-6">
            <h2 className="text-2xl">What happens next</h2>
            <p className="mt-3">Estimated arrival: <strong>{o.estimate}</strong>.</p>
            <p className="text-sm text-ink-muted">{o.shippingWindow}. This is an illustrative estimate, not a promise.</p>
          </section>
          <section className="rounded-lg border-2 border-espresso bg-surface-raised shadow-hard p-6 text-sm">
            <h2 className="text-2xl">Details</h2>
            <p className="mt-3"><strong>Customer</strong><br />{f.first} {f.last}<br />{f.email}{f.phone && <><br />{f.phone}</>}</p>
            <p className="mt-3"><strong>Delivery address</strong><br />{f.address}{f.address2 && `, ${f.address2}`}<br />{f.city}, {f.region} {f.postal}<br />{f.country}</p>
            <p className="mt-3"><strong>Payment</strong><br />{paymentLabel[o.payment]}<br />Status: {cod ? 'Pay on delivery' : 'Demo, no payment taken'}</p>
          </section>
        </div>
      </div>
      <a href="#/menu" className={buttonStyles({ size: 'lg', className: 'mt-12 uppercase tracking-[0.14em]' })}>Continue shopping</a>
    </Container>
    </>
  );
}
